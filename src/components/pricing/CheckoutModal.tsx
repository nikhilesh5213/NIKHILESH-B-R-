import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Check, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Sparkles, 
  Crown, 
  Zap, 
  ArrowRight,
  Receipt,
  Download
} from 'lucide-react';
import { SubscriptionTier, CurrencyConfig, SubscriptionPlan } from '../../types';
import { formatPrice } from '../../data/subscriptions';
import { sound } from '../../utils/sound';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: SubscriptionPlan;
  currency: CurrencyConfig;
  billingCycle: 'monthly' | 'yearly';
  onConfirmSubscription: (tier: SubscriptionTier, billingCycle: 'monthly' | 'yearly') => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  plan,
  currency,
  billingCycle: initialBillingCycle,
  onConfirmSubscription,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(initialBillingCycle);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'wallet'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const rawPrice = currency.prices[plan.id as keyof typeof currency.prices] || 649;
  const displayPrice = formatPrice(rawPrice, currency, billingCycle);

  const handleCompletePayment = () => {
    sound.playClick();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      sound.playUpgrade();

      // Trigger celebratory confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#0284c7', '#ffffff', '#38bdf8', '#f43f5e'],
      });

      onConfirmSubscription(plan.id, billingCycle);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Glowing dual-tone bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-blue-500" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
                  <Crown className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Checkout & Activation
                </span>
              </div>
              <h3 className="text-2xl font-bold font-gamer text-white tracking-wide">
                Subscribe to {plan.name} Tier
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Instant activation on Gamer Online with zero waiting time.
              </p>
            </div>

            {/* Plan Summary Card */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold text-white font-gamer">{plan.name}</h4>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {plan.userStatedCore}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{plan.tagline}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white font-mono">{displayPrice}</div>
                  <div className="text-[10px] text-slate-400">
                    per {billingCycle === 'yearly' ? 'year (2 mo free)' : 'month'}
                  </div>
                </div>
              </div>

              {/* Billing toggle inside modal */}
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Billing cadence:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setBillingCycle('monthly');
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                      billingCycle === 'monthly'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setBillingCycle('yearly');
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                      billingCycle === 'yearly'
                        ? 'bg-red-600 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Yearly (Save 17%)
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Select Payment Method
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'upi', label: 'UPI / QR / GPay', icon: QrCode, desc: 'Google Pay, PhonePe, Paytm' },
                  { id: 'card', label: 'Card', icon: CreditCard, desc: 'Visa, MasterCard, RuPay' },
                  { id: 'wallet', label: 'NetBanking / PayPal', icon: Zap, desc: 'Global Wallets' },
                ].map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      onClick={() => {
                        sound.playClick();
                        setPaymentMethod(pm.id as typeof paymentMethod);
                      }}
                      className={`p-3 rounded-xl border text-left transition ${
                        isSelected
                          ? 'border-blue-500 bg-blue-950/40 shadow-[0_0_15px_rgba(14,165,233,0.25)]'
                          : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-1 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`} />
                      <div className="text-xs font-bold text-white leading-tight">{pm.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{pm.desc}</div>
                    </button>
                  );
                })}
              </div>

              {/* UPI Quick simulation input */}
              {paymentMethod === 'upi' && (
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-400 font-bold">UPI ID:</span>
                    <input
                      type="text"
                      readOnly
                      value="gamer.online@okaxis"
                      className="bg-transparent text-slate-200 font-mono text-xs focus:outline-none"
                    />
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    Verified Merchant
                  </span>
                </div>
              )}
            </div>

            {/* Features check list */}
            <div className="mb-6 space-y-1.5 text-xs text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
              {plan.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <button
              onClick={handleCompletePayment}
              disabled={isProcessing}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-gamer font-bold text-sm uppercase tracking-wider shadow-xl shadow-red-600/25 flex items-center justify-center gap-2 transition transform active:scale-95 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authorizing {displayPrice}...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm & Activate Now ({displayPrice})</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>

            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit SSL Encrypted • Instant Activation • Cancel Anytime</span>
            </div>
          </div>
        ) : (
          /* Success Receipt View */
          <div className="text-center py-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>

            <h3 className="text-2xl font-bold font-gamer text-white tracking-wide">
              Welcome to {plan.name}!
            </h3>
            <p className="text-slate-400 text-xs mt-1 mb-6">
              Your subscription is now active on <strong className="text-white">Gamer Online</strong>.
            </p>

            {/* Receipt Summary Box */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left text-xs space-y-2 mb-6">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <Receipt className="w-4 h-4 text-blue-400" /> Transaction Receipt
                </span>
                <span className="font-mono text-[10px]">#GO-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Plan:</span>
                <span className="font-bold text-white uppercase">{plan.name} Tier</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="font-bold text-emerald-400 font-mono">{displayPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-bold">100% Active & Ad-Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Platform:</span>
                <span className="text-slate-200">Gamer Online Hub</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-gamer font-bold text-xs uppercase tracking-wider transition shadow-lg"
              >
                Start Exploring Perks
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
