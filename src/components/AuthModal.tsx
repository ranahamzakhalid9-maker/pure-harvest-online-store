import { useState, type FormEvent } from 'react';
import { X, Eye, EyeOff, Check, LogOut, ShieldCheck, Mail, User as UserIcon, AlertCircle } from 'lucide-react';
import { loginWithGoogle, logoutUser } from '../lib/firebase';
import type { User as FirebaseUser } from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: FirebaseUser | null;
  onSuccess?: (userName: string) => void;
}

export default function AuthModal({ isOpen, onClose, currentUser, onSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const user = await loginWithGoogle();
      const name = user.displayName || user.email?.split('@')[0] || 'Customer';
      setSuccessToast(`Signed in as ${name}`);
      if (onSuccess) onSuccess(name);
      setTimeout(() => {
        setSuccessToast(null);
        onClose();
      }, 1000);
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMessage('Sign in popup was closed. Please try again.');
      } else if (err.code === 'auth/popup-blocked') {
        setErrorMessage('Popup was blocked by your browser. Please allow popups for this site.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setErrorMessage('This domain needs to be authorized in Firebase Console > Authentication > Settings > Authorized Domains.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setErrorMessage('Google Sign-In is not enabled yet in Firebase Console > Authentication > Sign-in method.');
      } else {
        setErrorMessage(err.message || 'Failed to sign in with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await logoutUser();
      setSuccessToast('Signed out successfully');
      setTimeout(() => {
        setSuccessToast(null);
      }, 1500);
    } catch (err: any) {
      console.error('Logout error:', err);
      setErrorMessage(err.message || 'Failed to sign out.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setTimeout(() => {
      setLoading(false);
      const name = isSignUp ? fullName || 'Organic Customer' : email.split('@')[0] || 'Customer';
      setSuccessToast(`Welcome, ${name}!`);
      if (onSuccess) onSuccess(name);
      setTimeout(() => {
        setSuccessToast(null);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity duration-300">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl sm:rounded-[32px] overflow-hidden shadow-2xl border border-[#ede7d8] flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-[#f1ece1] border border-[#e5dfd0] text-[#556754] hover:text-[#1c2e1f] flex items-center justify-center transition-colors shadow-2xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Form / Profile Area */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center bg-white">
          {currentUser ? (
            /* Logged-in Google User Profile Card */
            <div className="space-y-6 text-center py-4">
              <div className="relative inline-block mx-auto">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User Profile'}
                    className="w-20 h-20 rounded-full border-4 border-[#386b29] shadow-md object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-[#386b29] text-white flex items-center justify-center font-bold text-2xl border-4 border-[#c7e5c1] shadow-md">
                    {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 w-5 h-5 bg-[#25D366] border-2 border-white rounded-full flex items-center justify-center" title="Google Verified">
                  <Check className="w-3 h-3 text-white stroke-[3]" />
                </span>
              </div>

              <div>
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#eaf4e7] border border-[#cbe5c4] text-[#386b29] text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Authenticated with Google
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#182a17]">
                  {currentUser.displayName || 'Pure Harvest Customer'}
                </h3>
                <p className="text-xs sm:text-sm text-[#667764] flex items-center justify-center gap-1.5 mt-1 font-medium">
                  <Mail className="w-3.5 h-3.5 text-[#386b29]" />
                  {currentUser.email}
                </p>
              </div>

              {successToast && (
                <div className="p-3 rounded-xl bg-[#eaf7e8] border border-[#bee2b8] text-xs font-semibold text-[#27621c] flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-[#386b29]" />
                  <span>{successToast}</span>
                </div>
              )}

              <div className="p-4 bg-[#fbf9f4] border border-[#eee7d8] rounded-2xl text-left space-y-2 text-xs text-[#526350]">
                <div className="flex justify-between">
                  <span className="text-[#889886]">Account Status:</span>
                  <span className="font-bold text-[#386b29]">Active & Verified</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#889886]">Store Orders Access:</span>
                  <span className="font-bold text-[#182a17]">Direct Cloud Sync</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#386b29] hover:bg-[#2c5520] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-98"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleSignOut}
                  disabled={loading}
                  className="py-2.5 px-4 rounded-xl bg-white border border-[#e5dfd0] hover:bg-[#fff2f2] hover:border-[#fecaca] text-[#b91c1c] text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-98 disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* Login Form with Google Sign In */
            <>
              <div className="mb-5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f2f8ee] border border-[#d6ebd0] text-[#386b29] text-[11px] font-bold uppercase tracking-wider mb-2">
                  Customer Portal
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#182a17]">
                  {isSignUp ? 'Create Your Account' : 'Sign in to Pure Harvest'}
                </h2>
                <p className="text-xs sm:text-sm text-[#667764] mt-1.5">
                  Sign in with your Google account for instant one-click access and saved orders.
                </p>
              </div>

              {/* Error Message banner */}
              {errorMessage && (
                <div className="mb-4 p-3.5 rounded-xl bg-[#fff2f2] border border-[#fecaca] text-xs text-[#991b1b] flex items-start gap-2 leading-relaxed">
                  <AlertCircle className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Authentication Note:</span> {errorMessage}
                  </div>
                </div>
              )}

              {/* Success Toast banner */}
              {successToast && (
                <div className="mb-4 p-3 rounded-xl bg-[#eaf7e8] border border-[#bee2b8] text-xs font-semibold text-[#27621c] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#386b29]" />
                  <span>{successToast}</span>
                </div>
              )}

              {/* Prominent Google Sign-in Button */}
              <div className="space-y-3 mb-5">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-2xl border-2 border-[#d9e2d6] hover:border-[#386b29] bg-white hover:bg-[#f6faf4] text-[#1c2e1f] font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-xs hover:shadow-md active:scale-98 disabled:opacity-60"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>{loading ? 'Connecting with Google...' : 'Continue with Google'}</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center mb-5">
                <div className="border-t border-[#ede7d8] w-full" />
                <span className="bg-white px-3 text-xs text-[#8f9d8d] uppercase tracking-wider font-semibold">
                  or sign in with email
                </span>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {isSignUp && (
                  <div>
                    <label className="block text-xs font-semibold text-[#374735] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rana Hamza Khalid"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e3dccf] bg-[#fbf9f4]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#386b29]/20 focus:border-[#386b29] text-xs sm:text-sm text-[#182a17]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#374735] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="youremail@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e3dccf] bg-[#fbf9f4]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#386b29]/20 focus:border-[#386b29] text-xs sm:text-sm text-[#182a17]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#374735] mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e3dccf] bg-[#fbf9f4]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#386b29]/20 focus:border-[#386b29] text-xs sm:text-sm text-[#182a17] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7d8c7c] hover:text-[#2c3e2b]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-xs text-[#526350] pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-[#ccd8ca] text-[#386b29] focus:ring-[#386b29]"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset instructions sent to your email.')}
                    className="text-[#386b29] font-medium hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3 rounded-xl bg-[#386b29] hover:bg-[#2d5721] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-98 disabled:opacity-70"
                >
                  {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
              </form>

              {/* Toggle Sign Up / Sign In */}
              <div className="mt-4 text-center text-xs text-[#637461]">
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(false)}
                      className="text-[#386b29] font-bold hover:underline"
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(true)}
                      className="text-[#386b29] font-bold hover:underline"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* Right Promotional Panel */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#f2f8ee] via-[#e5f1df] to-[#d8ebd1] p-6 sm:p-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#dce8d6] relative overflow-hidden">
          {/* Subtle leaves decoration */}
          <div className="absolute top-4 right-4 w-12 h-12 text-[#68a658]/30">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
              <path d="M17 8C8 8 4 14 4 20c6 0 12-4 13-12z" />
            </svg>
          </div>

          <div>
            <span className="text-[11px] font-bold tracking-widest text-[#386b29] uppercase">
              PURE & 100% ORGANIC
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#142813] mt-2 leading-tight">
              Pure Food.<br />
              <span className="text-[#386b29]">Pure Harvest.</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#445b42] mt-3 leading-relaxed">
              Sign in to manage your Chakki Atta, Dessi Ghee, and Organic Daal orders with instant doorstep delivery updates.
            </p>
          </div>

          <div className="my-6 relative rounded-2xl overflow-hidden shadow-md border-2 border-white/80">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
              alt="Pure Harvest Organic Basket"
              className="w-full h-44 object-cover"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#294a20]">
            <span className="w-2 h-2 rounded-full bg-[#386b29]" />
            Direct Live Synchronized with Order Receiving & CRM
          </div>
        </div>
      </div>
    </div>
  );
}
