import React from 'react';
import { Crown, ShieldCheck, Zap, Sparkles, CheckCircle2, RefreshCw, XCircle } from 'lucide-react';
import { SubscriptionTier, CurrencyConfig } from '../../types';
import { formatPrice } from '../../data/subscriptions';
import { sound } from '../../utils/sound';

interface SubscriptionStatusHUDProps {
  currentTier: SubscriptionTier;
  currency: CurrencyConfig;
  onOpenPricing: () => void;
  onOpenBackgroundStudio: () => void;
  onResetToFree: () => void;
  onSwitchTier: (tier: SubscriptionTier) => void;
}

export const SubscriptionStatusHUD: React.FC<SubscriptionStatusHUDProps> = ({
  currentTier,
  currency,
  onOpenPricing,
  onOpenBackgroundStudio,
  onResetToFree,
  onSwitchTier,
}) => {
  return (
    <div className="relative my-8 rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 backdrop-blur-md overflow-hidden">
      {/* Background glow strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-blue-600" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Tier Info */}
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
              currentTier === 'deluxe'
                ? 'bg-gradient-to-br from-red-600 to-blue-600 text-white shadow-red-500/30'
                : currentTier === 'pro'
                ? 'bg-blue-600 text-white shadow-blue-500/30'
                : currentTier === 'exclusive'
                ? 'bg-red-600 text-white shadow-red-500/30'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            {currentTier === 'deluxe' && <Crown className="w-6 h-6 text-yellow-300" />}
            {currentTier === 'pro' && <Zap className="w-6 h-6 text-white" />}
            {currentTier === 'exclusive' && <ShieldCheck className="w-6 h-6 text-white" />}
            {currentTier === 'free' && <ShieldCheck className="w-6 h-6 text-slate-400" />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Your Current Subscription
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            <h3 className="text-xl font-bold font-gamer text-white tracking-wide flex items-center gap-2">
              <span className="capitalize">{currentTier} Tier</span>
              {currentTier !== 'free' && (
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Active Member
                </span>
              )}
            </h3>

            {/* Inclusions summary */}
            <p className="text-xs text-slate-300 mt-1">
              {currentTier === 'free' && 'Free member (ad-supported). Upgrade to Exclusive, Pro, or Deluxe to unlock perks.'}
              {currentTier === 'exclusive' && (
                <span>
                  Includes: <strong className="text-red-400">No Ads Only</strong> ({formatPrice(currency.prices.exclusive, currency)} tier)
                </span>
              )}
              {currentTier === 'pro' && (
                <span>
                  Includes: <strong className="text-red-400">No Ads</strong> and <strong className="text-blue-400">Exclusive Resources</strong> ({formatPrice(currency.prices.pro, currency)} tier)
                </span>
              )}
              {currentTier === 'deluxe' && (
                <span>
                  Includes: <strong className="text-red-400">No Ads</strong>, <strong className="text-blue-400">Exclusive Resources</strong> and <strong className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-400 font-bold">The Most Gorgeous Backgrounds</strong> ({formatPrice(currency.prices.deluxe, currency)} tier)
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-start lg:justify-end">
          {currentTier === 'deluxe' ? (
            <button
              onClick={() => {
                sound.playClick();
                onOpenBackgroundStudio();
              }}
              className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-500/20 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Customize Deluxe Backgrounds
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playClick();
                onOpenPricing();
              }}
              className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-500/20 transition"
            >
              <Crown className="w-3.5 h-3.5" />
              Upgrade Tier
            </button>
          )}

          {currentTier !== 'free' && (
            <button
              onClick={() => {
                sound.playClick();
                onResetToFree();
              }}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold border border-slate-700 transition"
              title="Cancel membership and return to free tier"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
