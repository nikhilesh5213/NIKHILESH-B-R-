import React from 'react';
import { Sparkles, Crown, ShieldCheck, Zap, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { SubscriptionTier, CurrencyConfig } from '../../types';
import { formatPrice } from '../../data/subscriptions';
import { sound } from '../../utils/sound';

interface HeroSectionProps {
  currentTier: SubscriptionTier;
  currency: CurrencyConfig;
  onExplorePricing: () => void;
  onPlayArcade: () => void;
  onOpenBackgroundStudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentTier,
  currency,
  onExplorePricing,
  onPlayArcade,
  onOpenBackgroundStudio,
}) => {
  return (
    <div className="relative pt-8 pb-12 overflow-hidden">
      {/* Ambient Red & Blue Energy Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 mb-6 shadow-lg shadow-black/50">
          <span className="flex h-2 w-2 rounded-full bg-gradient-to-r from-red-500 to-blue-500 animate-pulse" />
          <span className="text-slate-400 font-medium">Game Creator Studio:</span>
          <span className="font-bold text-white tracking-wide">
            Created by <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-blue-400">Nikhilesh B R</span>
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-blue-400 font-mono text-[11px]">3 Trial Reference Games</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-gamer tracking-tight text-white leading-tight sm:leading-none mb-6">
          CREATE YOUR GAME ON{' '}
          <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-blue-500 text-glow-red">
            GAMER ONLINE
          </span>
        </h1>

        {/* Subhead with exact requirements emphasized */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Engineered by <strong>Nikhilesh B R</strong>. Build custom games using resources, backgrounds, and tools. Use the <strong className="text-white">3 Trial Games</strong> as reference blueprints. Remove all ads with <strong className="text-red-400">Exclusive ({formatPrice(currency.prices.exclusive, currency)})</strong>, unlock Elite Resources with <strong className="text-blue-400">Pro ({formatPrice(currency.prices.pro, currency)})</strong>, or unlock Elite Game Backgrounds with <strong className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-400 font-bold">Deluxe ({formatPrice(currency.prices.deluxe, currency)})</strong>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <a
            href="#studio"
            onClick={() => sound.playClick()}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-gamer font-bold text-sm uppercase tracking-wider shadow-xl shadow-red-600/30 flex items-center gap-2.5 transition transform hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Launch Game Creator (3-Cols)</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            onClick={() => {
              sound.playClick();
              onExplorePricing();
            }}
            className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-gamer font-bold text-sm uppercase tracking-wider border border-slate-700 hover:border-blue-500 flex items-center gap-2 transition shadow-lg"
          >
            <Crown className="w-4 h-4 text-yellow-400" />
            <span>Subscriptions</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onPlayArcade();
            }}
            className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-gamer font-bold text-sm uppercase tracking-wider border border-slate-700 hover:border-red-500 flex items-center gap-2 transition shadow-lg"
          >
            <Play className="w-4 h-4 text-red-500 fill-current" />
            <span>Play Arcade</span>
          </button>
        </div>

        {/* Quick Tiers Snapshot Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 max-w-4xl mx-auto text-left">
          {/* Exclusive Card Snapshot */}
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-red-500/30 hover:border-red-500/60 transition group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold font-gamer uppercase text-red-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-red-500" /> Exclusive
              </span>
              <span className="text-sm font-mono font-extrabold text-white">
                {formatPrice(currency.prices.exclusive, currency)}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Includes <strong className="text-white">no ads only</strong> across the entire site and games.
            </p>
          </div>

          {/* Pro Card Snapshot */}
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-blue-500/40 hover:border-blue-400 transition group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold font-gamer uppercase text-blue-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-400" /> Pro
              </span>
              <span className="text-sm font-mono font-extrabold text-white">
                {formatPrice(currency.prices.pro, currency)}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Includes <strong className="text-white">no ads</strong> and <strong className="text-blue-400">exclusive resources</strong>.
            </p>
          </div>

          {/* Deluxe Card Snapshot */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-red-950/50 via-slate-900/80 to-blue-950/50 border border-transparent bg-origin-border relative p-[1px] rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 opacity-60 rounded-xl" />
            <div className="relative p-3.5 bg-slate-950 rounded-xl">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold font-gamer uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-400 flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-yellow-400" /> Deluxe VIP
                </span>
                <span className="text-sm font-mono font-extrabold text-white">
                  {formatPrice(currency.prices.deluxe, currency)}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                No ads, exclusive resources and <strong className="text-white">the most gorgeous backgrounds</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Live Network & Server Stats Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Players Online: <strong className="text-white font-mono">14,290</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500">🛡️</span>
            <span>Ads Blocked Today: <strong className="text-white font-mono">182,400+</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">⚡</span>
            <span>Global Server Latency: <strong className="text-emerald-400 font-mono">14ms</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
