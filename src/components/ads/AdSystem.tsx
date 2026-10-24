import React, { useState } from 'react';
import { ShieldCheck, Sparkles, X, ExternalLink, Zap } from 'lucide-react';
import { SubscriptionTier, CurrencyConfig } from '../../types';
import { sound } from '../../utils/sound';
import { formatPrice } from '../../data/subscriptions';

interface AdBannerProps {
  userTier: SubscriptionTier;
  currency: CurrencyConfig;
  onUpgradeToExclusive: () => void;
  position?: 'top' | 'sidebar' | 'in-feed';
}

export const AdBanner: React.FC<AdBannerProps> = ({
  userTier,
  currency,
  onUpgradeToExclusive,
  position = 'top',
}) => {
  const [closedManually, setClosedManually] = useState(false);
  const isAdFree = userTier !== 'free'; // Exclusive, Pro, Deluxe are all ad-free

  if (isAdFree) {
    // Show sleek ad-block status pill or nothing
    return (
      <div className="w-full py-1.5 px-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg flex items-center justify-between text-xs text-emerald-300">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold">
            Ad-Free Shield Active:
          </span>
          <span className="text-emerald-400/80">
            All banner, video & interstitial ads blocked by your <span className="capitalize font-bold text-white">{userTier}</span> membership.
          </span>
        </div>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-200 border border-emerald-500/30">
          Clean Mode
        </span>
      </div>
    );
  }

  if (closedManually) {
    return (
      <div className="w-full py-2 px-4 bg-slate-900/70 border border-slate-800 rounded-lg flex items-center justify-between text-xs text-slate-400">
        <span>Sponsored advertisement minimized. Ads help keep free servers online.</span>
        <button
          onClick={() => {
            sound.playClick();
            onUpgradeToExclusive();
          }}
          className="text-red-400 hover:text-red-300 font-semibold underline"
        >
          Remove permanently for {formatPrice(currency.prices.exclusive, currency)}
        </button>
      </div>
    );
  }

  // Realistic gamer ad content for free tier
  return (
    <div className={`relative overflow-hidden rounded-xl border border-red-500/30 bg-gradient-to-r from-red-950/60 via-slate-900 to-blue-950/60 shadow-lg ${
      position === 'top' ? 'p-3.5 my-3' : 'p-4 my-4'
    }`}>
      {/* Background glow lines */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 bg-slate-800/80 border border-slate-700 px-1.5 py-0.5 rounded">
            Ad
          </span>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shrink-0 shadow-md">
            <Zap className="w-5 h-5 text-yellow-300" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white tracking-wide">
                HyperGear Apex Pro RTX Wireless Headset
              </h4>
              <span className="text-[10px] bg-red-600/30 text-red-300 border border-red-500/30 px-1.5 py-0.2 rounded font-bold">
                50% OFF
              </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-1">
              7.1 Spatial Surround, 80hr Battery & Ultra-Low 1ms Latency for competitive esports.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <a
            href="#exclusive"
            onClick={(e) => {
              e.preventDefault();
              sound.playClick();
              onUpgradeToExclusive();
            }}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-600/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Remove Ads ({formatPrice(currency.prices.exclusive, currency)})
          </a>

          <button
            onClick={() => {
              sound.playClick();
              setClosedManually(true);
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
            title="Close this ad"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface GameAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyConfig;
  onUpgradeToExclusive: () => void;
}

export const GameAdModal: React.FC<GameAdModalProps> = ({
  isOpen,
  onClose,
  currency,
  onUpgradeToExclusive,
}) => {
  const [countdown, setCountdown] = useState(5);

  React.useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-red-500/50 rounded-2xl p-6 shadow-2xl text-center overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-blue-600" />
        
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800 text-xs text-slate-400">
          <span className="uppercase font-mono tracking-wider bg-slate-800 px-2 py-0.5 rounded text-red-400 font-bold">
            Sponsored Interstitial
          </span>
          <span>Free Tier Play</span>
        </div>

        <div className="h-44 w-full rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 relative flex flex-col items-center justify-center p-4 mb-4 overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-blue-600 flex items-center justify-center text-white mb-2 shadow-lg">
            <Zap className="w-7 h-7 text-white animate-pulse" />
          </div>
          <h3 className="text-lg font-bold text-white font-gamer">CYBER STORM ENERGY DRINK</h3>
          <p className="text-xs text-slate-400 max-w-sm mt-1">
            Zero sugar, 200mg natural caffeine & neuro-enhancers to keep your APM at peak performance!
          </p>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Tired of ad interruptions? The <strong className="text-red-400">Exclusive</strong> subscription removes 100% of ads for just <strong className="text-white">{formatPrice(currency.prices.exclusive, currency)}</strong> only!
        </p>

        <div className="flex items-center justify-center gap-3">
          {countdown > 0 ? (
            <button
              disabled
              className="py-2.5 px-5 rounded-xl bg-slate-800 text-slate-400 text-xs font-mono font-semibold cursor-not-allowed"
            >
              Skip Ad in {countdown}s...
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-1.5"
            >
              Skip to Game <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => {
              sound.playClick();
              onUpgradeToExclusive();
              onClose();
            }}
            className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/30 transition transform hover:scale-105"
          >
            Never See Ads Again
          </button>
        </div>
      </div>
    </div>
  );
};
