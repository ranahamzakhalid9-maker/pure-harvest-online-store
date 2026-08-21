import { useState, useEffect } from 'react';
import {
  X,
  Database,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Settings,
  ShoppingBag,
  Clock,
  Send,
  Eye,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  getActiveFirebaseConfig,
  saveCustomFirebaseConfig,
  resetToDefaultFirebaseConfig,
  subscribeToOrders,
  updateFirestoreOrderStatus,
  FirebaseOrderPayload
} from '../lib/firebase';
import defaultConfig from '../../firebase-applet-config.json';
import { WHATSAPP_DISPLAY_NUMBER, openWhatsAppChat } from '../utils/whatsapp';

interface CrmSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CrmSyncModal({ isOpen, onClose }: CrmSyncModalProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'crm-config' | 'architecture'>('orders');
  const [orders, setOrders] = useState<FirebaseOrderPayload[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [customConfigJson, setCustomConfigJson] = useState('');
  const [configError, setConfigError] = useState<string | null>(null);

  const { config, isCustom } = getActiveFirebaseConfig();

  useEffect(() => {
    if (!isOpen) return;

    setLoadingOrders(true);
    const unsubscribe = subscribeToOrders(
      (updatedOrders) => {
        setOrders(updatedOrders);
        setLoadingOrders(false);
      },
      (err) => {
        console.error('Firestore listener error:', err);
        setLoadingOrders(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyFirebaseConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  const handleApplyCustomConfig = () => {
    try {
      const parsed = JSON.parse(customConfigJson);
      if (!parsed.projectId || !parsed.apiKey) {
        setConfigError('Config me projectId aur apiKey zaroori hain.');
        return;
      }
      setConfigError(null);
      saveCustomFirebaseConfig(parsed);
    } catch (e: any) {
      setConfigError('Invalid JSON format: ' + e.message);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: FirebaseOrderPayload['status']) => {
    await updateFirestoreOrderStatus(orderId, newStatus);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#fbf9f4] border border-[#d2edd0] rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="bg-[#182a17] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#2d472c]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#386b29] text-white flex items-center justify-center shadow-md">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg sm:text-xl">
                  Firestore & CRM Integration Hub
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#52b13c]/20 text-[#7de564] text-[10px] font-bold border border-[#52b13c]/40 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52b13c] animate-pulse" />
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-[#a4b8a2]">
                Central Database connected to Pure Harvest Store & CRM Management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-[#e6decb] bg-white text-xs font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'orders'
                ? 'border-[#386b29] text-[#386b29]'
                : 'border-transparent text-[#6e7f6b] hover:text-[#182a17]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Live Firestore Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'architecture'
                ? 'border-[#386b29] text-[#386b29]'
                : 'border-transparent text-[#6e7f6b] hover:text-[#182a17]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>3-Way Architecture Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('crm-config')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'crm-config'
                ? 'border-[#386b29] text-[#386b29]'
                : 'border-transparent text-[#6e7f6b] hover:text-[#182a17]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>CRM & Firebase Keys Sync</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: LIVE ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#eef7ec] p-4 rounded-2xl border border-[#cbe8c6]">
                <div className="text-xs text-[#2e5522]">
                  <p className="font-bold text-sm text-[#182a17] mb-0.5">
                    Real-time Firestore Collection: <code className="bg-white px-2 py-0.5 rounded border border-[#b8deb2] font-mono">/orders</code>
                  </p>
                  <p>
                    Har naya customer order foran is collection me record hota hai aur CRM me live show ho jata hai.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://pure-harvest-managment.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-[#386b29] hover:bg-[#2c5520] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>Open CRM Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {loadingOrders ? (
                <div className="py-12 text-center text-sm text-[#6f836d] flex flex-col items-center gap-2">
                  <RefreshCw className="w-6 h-6 animate-spin text-[#386b29]" />
                  <span>Loading live Firestore orders...</span>
                </div>
              ) : orders.length === 0 ? (
                <div className="py-12 text-center bg-white rounded-2xl border border-[#ede5d5] p-6 space-y-2">
                  <ShoppingBag className="w-10 h-10 text-[#a2b5a0] mx-auto" />
                  <h4 className="font-bold text-sm text-[#182a17]">No Orders In Firestore Yet</h4>
                  <p className="text-xs text-[#6e806c] max-w-sm mx-auto">
                    Aap storefront se koi bhi item cart me daal kar checkout karein, order foran yahan aur CRM me appear hoga!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.orderId}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-[#ede5d5] shadow-2xs hover:shadow-md transition-shadow space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f1ebd9] pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#182a17] font-mono">
                            {ord.orderId}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#f4efe4] text-[#6b583e] font-medium">
                            {ord.source || 'pure-harvest-storefront'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={ord.status || 'pending'}
                            onChange={(e) => handleStatusChange(ord.orderId, e.target.value as any)}
                            className="text-xs font-bold px-2.5 py-1 rounded-lg border border-[#c4dbbf] bg-[#f9fcf8] text-[#2c5320] cursor-pointer"
                          >
                            <option value="pending">🟡 Pending</option>
                            <option value="confirmed">🟢 Confirmed</option>
                            <option value="processing">🔵 Processing</option>
                            <option value="dispatched">🚚 Dispatched</option>
                            <option value="delivered">✅ Delivered</option>
                            <option value="cancelled">❌ Cancelled</option>
                          </select>

                          <button
                            onClick={() => {
                              const msg = `🌿 *ORDER UPDATE - ${ord.orderId}*\nCustomer: ${ord.customer.fullName} (${ord.customer.phone})\nStatus: ${ord.status?.toUpperCase()}\nTotal: Rs. ${ord.total?.toLocaleString()}`;
                              openWhatsAppChat(msg);
                            }}
                            className="p-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/30 text-[#1d8f45] transition-colors"
                            title="Send WhatsApp update"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Customer & Order details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#485d46]">
                        <div>
                          <p className="font-bold text-[#182a17]">{ord.customer?.fullName}</p>
                          <p>📞 {ord.customer?.phone}</p>
                          <p className="text-[11px] text-[#6d806b]">
                            📍 {ord.customer?.address}, {ord.customer?.city}
                          </p>
                        </div>

                        <div className="sm:text-right space-y-1">
                          <p className="font-bold text-sm text-[#386b29]">
                            Rs. {ord.total?.toLocaleString()}{' '}
                            <span className="text-[10px] font-normal text-[#758873]">
                              ({ord.paymentMethod?.toUpperCase()})
                            </span>
                          </p>
                          <p className="text-[11px] text-[#869984]">
                            🕒 {new Date(ord.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Items Pill list */}
                      <div className="pt-1 flex flex-wrap gap-1.5">
                        {ord.items?.map((it, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-[11px] bg-[#f9f7f0] border border-[#e5ded0] px-2 py-0.5 rounded-md text-[#2f422e]"
                          >
                            <span className="font-bold">{it.quantity}x</span> {it.name}{' '}
                            <span className="text-[#889b86]">({it.netWeight})</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ARCHITECTURE & MULTI-STORE WORKFLOW */}
          {activeTab === 'architecture' && (
            <div className="space-y-5 text-xs text-[#394d37] leading-relaxed">
              <div className="bg-white rounded-2xl p-5 border border-[#ede5d5] shadow-xs space-y-3">
                <h4 className="font-serif font-bold text-base text-[#182a17] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#386b29] text-white flex items-center justify-center text-xs">1</span>
                  3 Websites & Central CRM Sync Architecture
                </h4>
                <p>
                  Aapka poora setup 3 components par mushtamil hai jo ek hi central cloud database se real-time connected rehte hain:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="bg-[#f7faf5] border border-[#d2edd0] rounded-xl p-3.5 space-y-1.5">
                    <span className="font-bold text-[#386b29] text-xs">🛒 Website 1 (Storefront)</span>
                    <p className="text-[11px] text-[#5b7059]">
                      Ye wali customer website jahan par log products browse karte hain aur WhatsApp + Direct Checkout se order place karte hain.
                    </p>
                  </div>

                  <div className="bg-[#f7faf5] border border-[#d2edd0] rounded-xl p-3.5 space-y-1.5">
                    <span className="font-bold text-[#386b29] text-xs">📱 Website 2 (Order Receiving Portal)</span>
                    <p className="text-[11px] text-[#5b7059]">
                      Aapki personal order recieving website jahan notification chime bajega aur new orders status ke sath receive honge.
                    </p>
                  </div>

                  <div className="bg-[#f7faf5] border border-[#d2edd0] rounded-xl p-3.5 space-y-1.5">
                    <span className="font-bold text-[#386b29] text-xs">💼 Website 3 (CRM Management)</span>
                    <p className="text-[11px] text-[#5b7059]">
                      Aapka central CRM (<a href="https://pure-harvest-managment.vercel.app/" target="_blank" rel="noreferrer" className="text-[#386b29] underline font-semibold">pure-harvest-managment.vercel.app</a>) jahan revenue, stock aur dispatch manage hota hai.
                    </p>
                  </div>
                </div>
              </div>

              {/* Firestore Document Schema */}
              <div className="bg-white rounded-2xl p-5 border border-[#ede5d5] shadow-xs space-y-3">
                <h4 className="font-serif font-bold text-sm text-[#182a17]">
                  Firestore Standard Order Schema (<code className="font-mono text-[#386b29]">/orders</code>)
                </h4>
                <p className="text-[11px] text-[#697c67]">
                  Jab bhi customer is website par checkout karega, to database me yeh standard structure save hoga jo aapke CRM se 100% compatible hai:
                </p>
                <pre className="bg-[#182a17] text-[#a4d797] p-4 rounded-xl text-[11px] font-mono overflow-x-auto">
{`{
  "orderId": "#PHO-2026-8942",
  "source": "pure-harvest-storefront",
  "status": "pending",
  "customer": {
    "fullName": "Muhammad Ali",
    "phone": "03094083549",
    "email": "customer@gmail.com",
    "address": "Street 4, Phase 5, DHA",
    "city": "Lahore"
  },
  "items": [
    { "productId": "1", "name": "Pure Sidr Honey", "price": 2800, "quantity": 1, "netWeight": "500g" }
  ],
  "subtotal": 2800,
  "deliveryPrice": 150,
  "total": 2950,
  "paymentMethod": "cod",
  "createdAt": "2026-08-21T03:40:00.000Z"
}`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: FIREBASE KEYS & CRM DIRECT SYNC */}
          {activeTab === 'crm-config' && (
            <div className="space-y-5 text-xs text-[#394d37]">
              {/* Option A: Use Current App's Firebase in CRM */}
              <div className="bg-white rounded-2xl p-5 border border-[#ede5d5] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#182a17]">
                      Option A: Use Current Firebase Project in your CRM
                    </h4>
                    <p className="text-[11px] text-[#6c7f6a]">
                      Aap ye Firebase config copy kar ke apne CRM app (`pure-harvest-managment`) me daal sakte hain.
                    </p>
                  </div>
                  <button
                    onClick={handleCopyFirebaseConfig}
                    className="px-3.5 py-1.5 rounded-xl bg-[#386b29] hover:bg-[#2c5520] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all"
                  >
                    {copiedConfig ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedConfig ? 'Copied Config!' : 'Copy Config'}</span>
                  </button>
                </div>

                <pre className="bg-[#182a17] text-[#a4d797] p-3.5 rounded-xl text-[11px] font-mono overflow-x-auto">
{JSON.stringify(config, null, 2)}
                </pre>
              </div>

              {/* Option B: Connect Existing CRM Firebase to This Store */}
              <div className="bg-white rounded-2xl p-5 border border-[#ede5d5] shadow-xs space-y-3">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#182a17]">
                    Option B: Paste your CRM's Existing Firebase Config Here
                  </h4>
                  <p className="text-[11px] text-[#6c7f6a]">
                    Agar aapke CRM (`pure-harvest-managment.vercel.app`) ka pehle se koi Firebase project hai, to uska config JSON yahan paste karein:
                  </p>
                </div>

                {isCustom && (
                  <div className="p-3 bg-[#f0f8ed] rounded-xl border border-[#bfe2b8] flex items-center justify-between">
                    <span className="text-[#2b5120] font-semibold">
                      Currently using Custom CRM Firebase Project
                    </span>
                    <button
                      onClick={resetToDefaultFirebaseConfig}
                      className="text-xs text-red-600 underline font-semibold hover:text-red-800"
                    >
                      Reset to Default
                    </button>
                  </div>
                )}

                {configError && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{configError}</span>
                  </div>
                )}

                <textarea
                  rows={4}
                  value={customConfigJson}
                  onChange={(e) => setCustomConfigJson(e.target.value)}
                  placeholder={`{\n  "apiKey": "AIzaSy...",\n  "projectId": "your-crm-project",\n  "firestoreDatabaseId": "(default)"\n}`}
                  className="w-full font-mono text-xs p-3 rounded-xl border border-[#d2cfc4] bg-[#faf8f2] text-[#182a17] focus:outline-none focus:border-[#386b29]"
                />

                <button
                  onClick={handleApplyCustomConfig}
                  className="w-full py-2.5 rounded-xl bg-[#182a17] hover:bg-[#2c472a] text-white font-bold text-xs transition-colors"
                >
                  Save & Connect CRM Firebase
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f3efe4] border-t border-[#e2d8c3] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#566a54]">
            <span className="w-2 h-2 rounded-full bg-[#25D366]" />
            <span>Direct WhatsApp order line: <strong className="text-[#182a17]">{WHATSAPP_DISPLAY_NUMBER}</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#386b29] hover:bg-[#2c5520] text-white font-bold transition-colors"
          >
            Close Hub
          </button>
        </div>
      </div>
    </div>
  );
}
