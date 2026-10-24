import React, { useState } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  Crown, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Globe2, 
  ChevronDown, 
  Flame, 
  Menu, 
  X,
  Zap,
  ArrowRight
} from 'lucide-react';
import { SubscriptionTier, CurrencyCode } from '../../types';
import { CURRENCIES, formatPrice } from '../../data/subscriptions';
import { sound } from '../../utils/sound';

interface NavbarProps {
  currentTier: SubscriptionTier;
  selectedCurrency: CurrencyCode;
  onSelectCurrency: (code: CurrencyCode) => void;
  onOpenBackgroundStudio: () => void;
  onOpenPricing: () => void;
  onSimulateTier: (tier: SubscriptionTier) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTier,
  selectedCurrency,
  onSelectCurrency,
  onOpenBackgroundStudio,
  onOpenPricing,
  onSimulateTier,
  soundEnabled,
  onToggleSound,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [tierSwitcherOpen, setTierSwitcherOpen] = useState(false);

  const activeCurrency = CURRENCIES[selectedCurrency];

  const getTierBadge = () => {
    switch (currentTier) {
      case 'deluxe':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]">
            <Crown className="w-3.5 h-3.5" /> Deluxe VIP
          </span>
        );
      case 'pro':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/40 shadow-[0_0_12px_rgba(14,165,233,0.3)]">
            <Zap className="w-3.5 h-3.5" /> Pro Member
          </span>
        );
      case 'exclusive':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.3)]">
            <ShieldCheck className="w-3.5 h-3.5" /> Exclusive (No Ads)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-slate-400 bg-slate-800/80 border border-slate-700">
            Free Member
          </span>
        );
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/80">
      {/* Top dual-tone accent hairline */}
      <div className="h-[2px] w-full bg-gradient-to-r from-red-600 via-rose-500 via-slate-900 to-blue-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo - Changed from Games Top to Gamer Online */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={() => sound.playClick()}
              className="group flex items-center gap-2.5 text-left select-none"
            >
              <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden shadow-lg group-hover:border-blue-500 transition">
                {/* Red & Blue split glow */}
                <div className="absolute top-0 left-0 bottom-0 w-1/2 bg-red-600/30 blur-xs" />
                <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-blue-600/30 blur-xs" />
                <Gamepad2 className="w-5 h-5 text-white relative z-10 transition transform group-hover:scale-110" />
              </div>

              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-xl font-extrabold font-gamer tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-blue-500 text-glow-red">
                    GAMER ONLINE
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-400 px-1 py-0.2 rounded bg-blue-950 border border-blue-500/30">
                    2.0
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase font-mono block mt-0.5">
                  Play • Upgrade • Customize
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
            <a
              href="#studio"
              onClick={() => sound.playClick()}
              className="text-white hover:text-red-400 transition flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-red-600/20 to-blue-600/20 border border-blue-500/40"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Game Creator Studio</span>
            </a>

            <a
              href="#arcade"
              onClick={() => sound.playClick()}
              className="text-slate-300 hover:text-white transition flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>Arcade Games</span>
            </a>

            <a
              href="#pricing"
              onClick={() => sound.playClick()}
              className="text-slate-300 hover:text-white transition flex items-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5 text-yellow-400" />
              <span>Subscriptions</span>
            </a>

            <a
              href="#resources"
              onClick={() => sound.playClick()}
              className="text-slate-300 hover:text-white transition flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>VIP Resources</span>
            </a>

            {/* Deluxe Background Studio Trigger */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenBackgroundStudio();
              }}
              className="group relative px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-950/80 to-blue-950/80 hover:from-red-900/80 hover:to-blue-900/80 border border-slate-700/80 text-rose-300 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-400 group-hover:rotate-12 transition-transform" />
              <span>Gorgeous Backgrounds</span>
              {currentTier === 'deluxe' && (
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              )}
            </button>
          </div>

          {/* Right Action Tools: Currency Switcher, Sound, Tier badge */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Currency Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrencyDropdownOpen(!currencyDropdownOpen);
                  setTierSwitcherOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-600 text-xs text-slate-200 transition"
              >
                <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-mono font-bold">{activeCurrency.code}</span>
                <span className="text-slate-400">({activeCurrency.symbol})</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-mono text-slate-400 border-b border-slate-800">
                    Select Currency
                  </div>
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                    const c = CURRENCIES[code];
                    const isSelected = selectedCurrency === code;
                    return (
                      <button
                        key={code}
                        onClick={() => {
                          sound.playClick();
                          onSelectCurrency(code);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition ${
                          isSelected
                            ? 'bg-gradient-to-r from-red-600/30 to-blue-600/30 text-white font-bold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{c.flag}</span>
                          <span>{c.name}</span>
                        </span>
                        <span className="font-mono text-slate-400">{c.symbol}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                onToggleSound();
                if (!soundEnabled) sound.playClick();
              }}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition"
              title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-blue-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Current Tier Badge & Quick Simulator Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  sound.playClick();
                  setTierSwitcherOpen(!tierSwitcherOpen);
                  setCurrencyDropdownOpen(false);
                }}
                className="flex items-center gap-1 focus:outline-none"
                title="Switch simulated tier for instant testing"
              >
                {getTierBadge()}
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {tierSwitcherOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-mono text-slate-400 border-b border-slate-800">
                    Switch Test Tier
                  </div>
                  {[
                    { id: 'free', label: 'Free (Ad Supported)', desc: 'Shows all simulated ads' },
                    { id: 'exclusive', label: 'Exclusive (₹649)', desc: 'No ads only' },
                    { id: 'pro', label: 'Pro (₹1499)', desc: 'No ads + Resources' },
                    { id: 'deluxe', label: 'Deluxe (₹2499)', desc: 'No ads + Resources + Backgrounds' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        sound.playUpgrade();
                        onSimulateTier(t.id as SubscriptionTier);
                        setTierSwitcherOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs transition ${
                        currentTier === t.id
                          ? 'bg-blue-600/30 text-white font-bold border-l-2 border-blue-500'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="font-semibold">{t.label}</div>
                      <div className="text-[10px] text-slate-400">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Subscribe CTA Button if free */}
            {currentTier === 'free' && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenPricing();
                }}
                className="py-1.5 px-3 rounded-lg bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider transition shadow-md shadow-red-500/25"
              >
                Upgrade
              </button>
            )}

            {/* CREATOR BADGE: NIKHILESH B R (Desktop) */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-950/70 via-slate-900 to-blue-950/70 border border-slate-700/80 shadow-[0_0_15px_rgba(239,68,68,0.25)]">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-red-600 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold font-mono shadow-sm">
                  NB
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 leading-none">
                    <span className="text-[9px] uppercase font-mono text-slate-400">Creator</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-xs font-bold font-gamer text-white tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-blue-400 whitespace-nowrap">
                    Nikhilesh B R
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Right Corner with Creator Badge & Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            {/* CREATOR BADGE: NIKHILESH B R (Mobile Top Right) */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800">
              <div className="w-5 h-5 rounded bg-gradient-to-r from-red-600 to-blue-600 text-white text-[9px] font-mono font-bold flex items-center justify-center">
                NB
              </div>
              <span className="text-[11px] font-bold font-gamer text-white whitespace-nowrap">
                Nikhilesh B R
              </span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 border-t border-slate-800 bg-slate-950/95 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs text-slate-400 font-mono">Current Tier:</span>
            {getTierBadge()}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href="#studio"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-gradient-to-r from-red-600/30 to-blue-600/30 border border-blue-500/40 text-white font-bold flex items-center gap-2 col-span-2"
            >
              <Gamepad2 className="w-4 h-4 text-blue-400" /> Game Creator Studio (3-Cols)
            </a>
            <a
              href="#arcade"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-bold flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-red-500" /> Arcade Games
            </a>
            <a
              href="#pricing"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-bold flex items-center gap-2"
            >
              <Crown className="w-4 h-4 text-yellow-400" /> Subscriptions
            </a>
            <a
              href="#resources"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-bold flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-blue-400" /> VIP Resources
            </a>
            <button
              onClick={() => {
                sound.playClick();
                onOpenBackgroundStudio();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-rose-300 font-bold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-red-400" /> Backgrounds
            </button>
          </div>

          {/* Currency Switcher in mobile */}
          <div>
            <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
              Select Currency
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                const c = CURRENCIES[code];
                return (
                  <button
                    key={code}
                    onClick={() => {
                      sound.playClick();
                      onSelectCurrency(code);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold transition flex items-center justify-center gap-1 ${
                      selectedCurrency === code
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-900 text-slate-300 border border-slate-800'
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.code}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
