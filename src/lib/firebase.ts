import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  Auth
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  serverTimestamp,
  Firestore
} from 'firebase/firestore';
import defaultConfig from '../../firebase-applet-config.json';
import { CartItem, ShippingInfo } from '../types';

export interface FirebaseOrderPayload {
  orderId: string;
  source: string;
  storeName: string;
  status: 'pending' | 'confirmed' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';
  customer: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    netWeight: string;
    image?: string;
  }>;
  subtotal: number;
  deliveryMethod: 'standard' | 'express';
  deliveryPrice: number;
  discountAmount: number;
  total: number;
  paymentMethod: 'cod' | 'card' | 'wallet';
  createdAt: string;
  updatedAt: string;
  timestamp?: any;
}

// Local storage key for optional custom CRM Firebase Config
const CUSTOM_FIREBASE_KEY = 'pho_custom_firebase_config';

export function getActiveFirebaseConfig() {
  try {
    const custom = localStorage.getItem(CUSTOM_FIREBASE_KEY);
    if (custom) {
      const parsed = JSON.parse(custom);
      if (parsed.projectId && parsed.apiKey) {
        return { config: parsed, isCustom: true };
      }
    }
  } catch (e) {
    console.error('Error reading custom firebase config', e);
  }
  return { config: defaultConfig, isCustom: false };
}

export function saveCustomFirebaseConfig(configObj: any) {
  localStorage.setItem(CUSTOM_FIREBASE_KEY, JSON.stringify(configObj));
  window.location.reload();
}

export function resetToDefaultFirebaseConfig() {
  localStorage.removeItem(CUSTOM_FIREBASE_KEY);
  window.location.reload();
}

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

function getFirebaseAppInstance(): FirebaseApp {
  if (!app) {
    const { config } = getActiveFirebaseConfig();
    app = getApps().length === 0 ? initializeApp(config) : getApp();
  }
  return app;
}

export function getAuthInstance(): Auth {
  if (!auth) {
    const firebaseApp = getFirebaseAppInstance();
    auth = getAuth(firebaseApp);
  }
  return auth;
}

export async function loginWithGoogle(): Promise<FirebaseUser> {
  const authInstance = getAuthInstance();
  const provider = new GoogleAuthProvider();
  // Set custom parameters if needed
  provider.setCustomParameters({ prompt: 'select_account' });
  const result = await signInWithPopup(authInstance, provider);
  return result.user;
}

export async function logoutUser(): Promise<void> {
  const authInstance = getAuthInstance();
  await signOut(authInstance);
}

export function subscribeToAuth(callback: (user: FirebaseUser | null) => void) {
  try {
    const authInstance = getAuthInstance();
    return onAuthStateChanged(authInstance, callback);
  } catch (err) {
    console.error('Error subscribing to auth state:', err);
    return () => {};
  }
}

function getDbInstance(): Firestore {
  if (!db) {
    const { config } = getActiveFirebaseConfig();
    const firebaseApp = getFirebaseAppInstance();

    if (config.firestoreDatabaseId && config.firestoreDatabaseId !== '(default)') {
      db = getFirestore(firebaseApp, config.firestoreDatabaseId);
    } else {
      db = getFirestore(firebaseApp);
    }
  }
  return db;
}

export async function createOrderInFirestore(
  orderId: string,
  shippingInfo: ShippingInfo,
  cartItems: CartItem[],
  subtotal: number,
  deliveryMethod: 'standard' | 'express',
  deliveryPrice: number,
  discountAmount: number,
  total: number,
  paymentMethod: 'cod' | 'card' | 'wallet'
): Promise<{ success: boolean; id: string; error?: string }> {
  try {
    const firestore = getDbInstance();
    const cleanId = orderId.replace('#', '').trim();
    const docRef = doc(firestore, 'orders', cleanId);

    const payload: FirebaseOrderPayload = {
      orderId,
      source: 'pure-harvest-storefront',
      storeName: 'Pure Harvest Organic (Customer Store)',
      status: 'pending',
      customer: {
        fullName: shippingInfo.fullName,
        phone: shippingInfo.phone,
        email: shippingInfo.email || '',
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state || '',
        postalCode: shippingInfo.postalCode || ''
      },
      items: cartItems.map((it) => ({
        productId: it.product.id,
        name: it.product.name,
        price: it.product.price,
        quantity: it.quantity,
        netWeight: it.product.netWeight,
        image: it.product.image
      })),
      subtotal,
      deliveryMethod,
      deliveryPrice,
      discountAmount,
      total,
      paymentMethod,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timestamp: serverTimestamp()
    };

    await setDoc(docRef, payload, { merge: true });
    return { success: true, id: cleanId };
  } catch (err: any) {
    console.error('Failed to save order to Firestore:', err);
    return { success: false, id: orderId, error: err.message || 'Unknown database error' };
  }
}

export function subscribeToOrders(
  onOrdersUpdated: (orders: FirebaseOrderPayload[]) => void,
  onError?: (err: any) => void
) {
  try {
    const firestore = getDbInstance();
    const ordersCol = collection(firestore, 'orders');
    const q = query(ordersCol, orderBy('createdAt', 'desc'));

    return onSnapshot(
      q,
      (snapshot) => {
        const list: FirebaseOrderPayload[] = [];
        snapshot.forEach((d) => {
          list.push({ ...(d.data() as FirebaseOrderPayload), orderId: d.data().orderId || `#${d.id}` });
        });
        onOrdersUpdated(list);
      },
      (error) => {
        console.error('Error fetching real-time orders:', error);
        if (onError) onError(error);
      }
    );
  } catch (err) {
    console.error('Subscription error:', err);
    if (onError) onError(err);
    return () => {};
  }
}

export async function updateFirestoreOrderStatus(
  orderId: string,
  newStatus: FirebaseOrderPayload['status']
) {
  try {
    const firestore = getDbInstance();
    const cleanId = orderId.replace('#', '').trim();
    const docRef = doc(firestore, 'orders', cleanId);
    await updateDoc(docRef, {
      status: newStatus,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (e: any) {
    console.error('Error updating order status:', e);
    return { success: false, error: e.message };
  }
}
