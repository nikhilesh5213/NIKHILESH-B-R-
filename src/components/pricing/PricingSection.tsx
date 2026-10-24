import React, { useState } from 'react';
import { 
  Check, 
  X as CloseIcon, 
  Sparkles, 
  Crown, 
  ShieldCheck, 
  Zap, 
  Flame, 
  Coins,
  Globe2,
  Sliders
} from 'lucide-react';
import { SubscriptionTier, CurrencyCode, CurrencyConfig, SubscriptionPlan } from '../../types';
import { CURRENCIES, SUBSCRIPTION_PLANS, formatPrice } from '../../data/subscriptions';
import { sound } from '../../utils/sound';
import { CheckoutModal } from './CheckoutModal';

interface PricingSectionProps {
  currentTier: SubscriptionTier;
  selectedCurrency: CurrencyCode;
  onSelectCurrency: (code: CurrencyCode) => void;
  onSelectPlan: (tier: SubscriptionTier, billingCycle: 'monthly' | 'yearly') => void;
  onOpenBackgroundStudio: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  currentTier,
  selectedCurrency,
  onSelectCurrency,
  onSelectPlan,
  onOpenBackgroundStudio,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [checkoutPlan, setCheckoutPlan] = useState<SubscriptionPlan | null>(null);

  const activeCurrencyConfig = CURRENCIES[selectedCurrency];

  const handleChoosePlan = (plan: SubscriptionPlan) => {
    sound.playClick();
    setCheckoutPlan(plan);
  };

  return (
    <div id="pricing" className="relative py-16 scroll-mt-12">
      {/* Checkout Modal */}
      {checkoutPlan && (
        <CheckoutModal
          isOpen={!!checkoutPlan}
          onClose={() => setCheckoutPlan(null)}
          plan={checkoutPlan}
          currency={activeCurrencyConfig}
          billingCycle={billingCycle}
          onConfirmSubscription={(tier, cycle) => {
            onSelectPlan(tier, cycle);
            setCheckoutPlan(null);
          }}
        />
      )}

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-500/10 via-slate-900 to-blue-500/10 border border-slate-700/80 text-xs font-semibold text-slate-300 mb-4 shadow-sm">
          <Crown className="w-3.5 h-3.5 text-yellow-400" />
          <span className="font-gamer tracking-wide">GAMER ONLINE MEMBERSHIPS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-gamer tracking-tight text-white mb-4">
          Choose Your Level:{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-blue-500">
            Exclusive, Pro & Deluxe
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Tailored for every player: Eliminate ads, unlock masterclass resources, or transform the site with the most gorgeous dynamic backgrounds.
        </p>

        {/* Currency Switcher Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl shadow-lg">
            <span className="text-xs text-slate-400 font-semibold px-2 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-blue-400" /> Currency:
            </span>
            <div className="flex items-center gap-1">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                const curr = CURRENCIES[code];
                const isSelected = selectedCurrency === code;
                return (
                  <button
                    key={code}
                    onClick={() => {
                      sound.playClick();
                      onSelectCurrency(code);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-md shadow-red-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <span>{curr.flag}</span>
                    <span>{code}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Billing Cadence Toggle */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => {
                sound.playClick();
                setBillingCycle('monthly');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
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
              className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Yearly</span>
              <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 px-1 rounded uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Pricing Cards Grid: Exclusive (649), Pro (1499), Deluxe (2499) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrent = currentTier === plan.id;
          const rawPrice = activeCurrencyConfig.prices[plan.id as keyof typeof activeCurrencyConfig.prices];
          const formattedPrice = formatPrice(rawPrice, activeCurrencyConfig, billingCycle);

          const isDeluxe = plan.id === 'deluxe';
          const isPro = plan.id === 'pro';
          const isExclusive = plan.id === 'exclusive';

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                isDeluxe
                  ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-red-500/60 shadow-[0_0_35px_rgba(239,68,68,0.25)] hover:border-blue-500 hover:shadow-[0_0_45px_rgba(14,165,233,0.35)] md:-translate-y-2'
                  : isPro
                  ? 'bg-slate-900/90 border-2 border-blue-500/50 shadow-[0_0_25px_rgba(14,165,233,0.2)] hover:border-blue-400'
                  : 'bg-slate-900/80 border border-red-500/40 hover:border-red-400'
              } p-6 sm:p-7 overflow-hidden`}
            >
              {/* Top ambient colored line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 ${
                  isDeluxe
                    ? 'bg-gradient-to-r from-red-600 via-rose-500 to-blue-500'
                    : isPro
                    ? 'bg-blue-500'
                    : 'bg-red-500'
                }`}
              />

              {/* Plan Card Body */}
              <div>
                {/* Header Tag / Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                  {isCurrent && (
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Active Tier
                    </span>
                  )}
                </div>

                {/* Plan Name & Tagline */}
                <h3 className="text-2xl font-bold font-gamer text-white tracking-wide">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 min-h-[32px]">
                  {plan.tagline}
                </p>

                {/* User's exact stated core benefit callout */}
                <div
                  className={`my-4 p-2.5 rounded-xl border text-xs font-semibold ${
                    isDeluxe
                      ? 'bg-gradient-to-r from-red-950/60 to-blue-950/60 border-red-500/30 text-rose-300'
                      : isPro
                      ? 'bg-blue-950/50 border-blue-500/30 text-blue-300'
                      : 'bg-red-950/50 border-red-500/30 text-red-300'
                  }`}
                >
                  <span className="font-bold text-white block mb-0.5">Core Inclusions:</span>
                  {plan.userStatedCore}
                </div>

                {/* Price Display */}
                <div className="my-5 pb-5 border-b border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold font-mono text-white tracking-tight">
                      {formattedPrice}
                    </span>
                    <span className="text-slate-400 text-xs font-medium">
                      /{billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  </div>
                  {activeCurrencyConfig.code === 'INR' && (
                    <p className="text-[11px] text-slate-400 mt-1">
                      {plan.id === 'exclusive' && 'Exact price: 649 rupees only'}
                      {plan.id === 'pro' && 'Exact price: 1499 rupees only'}
                      {plan.id === 'deluxe' && 'Exact price: 2499 rupees only'}
                    </p>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div
                        className={`p-0.5 rounded-full mt-0.5 shrink-0 ${
                          isDeluxe
                            ? 'text-red-400 bg-red-500/10'
                            : isPro
                            ? 'text-blue-400 bg-blue-500/10'
                            : 'text-red-400 bg-red-500/10'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-slate-800/80">
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full py-3 px-4 rounded-xl bg-slate-800 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center justify-center gap-1.5 cursor-default"
                  >
                    <Check className="w-4 h-4" /> Current Active Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleChoosePlan(plan)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center gap-2 ${
                      isDeluxe
                        ? 'bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white shadow-red-600/30'
                        : isPro
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                        : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30'
                    }`}
                  >
                    {isDeluxe && <Crown className="w-4 h-4" />}
                    {isPro && <Zap className="w-4 h-4" />}
                    {isExclusive && <ShieldCheck className="w-4 h-4" />}
                    <span>Get {plan.name}</span>
                  </button>
                )}

                {isDeluxe && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onOpenBackgroundStudio();
                    }}
                    className="w-full mt-2 py-1.5 text-center text-xs font-semibold text-rose-400 hover:text-rose-300 transition flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" /> Preview Gorgeous Backgrounds
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Plan Comparison Breakdown Table */}
      <div className="mt-16 max-w-5xl mx-auto rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 overflow-hidden">
        <h3 className="text-xl font-bold font-gamer text-white mb-2 text-center">
          Compare Gamer Online Tiers
        </h3>
        <p className="text-xs text-slate-400 text-center mb-6">
          Clear, transparent breakdown of what is included in Free, Exclusive, Pro, and Deluxe.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono">
                <th className="pb-3 font-semibold">Features & Benefits</th>
                <th className="pb-3 text-center">Free</th>
                <th className="pb-3 text-center text-red-400">Exclusive ({formatPrice(activeCurrencyConfig.prices.exclusive, activeCurrencyConfig)})</th>
                <th className="pb-3 text-center text-blue-400">Pro ({formatPrice(activeCurrencyConfig.prices.pro, activeCurrencyConfig)})</th>
                <th className="pb-3 text-center text-rose-400 font-bold">Deluxe ({formatPrice(activeCurrencyConfig.prices.deluxe, activeCurrencyConfig)})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3 font-medium text-white">Full Playable Game Access & 3 Trial Games</td>
                <td className="py-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                <td className="py-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                <td className="py-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                <td className="py-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Standard Game Resources (Basic / Retro)</td>
                <td className="py-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                <td className="py-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                <td className="py-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                <td className="py-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">
                  <strong>No Ads (100% Ad-Free Experience Across Site & Studio)</strong>
                </td>
                <td className="py-3 text-center text-slate-500"><CloseIcon className="w-4 h-4 mx-auto text-slate-600" /></td>
                <td className="py-3 text-center font-bold text-red-400 bg-red-950/20">
                  <Check className="w-4 h-4 text-red-400 mx-auto" />
                </td>
                <td className="py-3 text-center font-bold text-blue-400 bg-blue-950/20">
                  <Check className="w-4 h-4 text-blue-400 mx-auto" />
                </td>
                <td className="py-3 text-center font-bold text-rose-400 bg-rose-950/20">
                  <Check className="w-4 h-4 text-rose-400 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">
                  <strong>Elite Resources to Build Your Own Game (Lasers, Shield Core, Boss AI, Portals)</strong>
                </td>
                <td className="py-3 text-center text-slate-500"><CloseIcon className="w-4 h-4 mx-auto text-slate-600" /></td>
                <td className="py-3 text-center text-slate-500"><CloseIcon className="w-4 h-4 mx-auto text-slate-600" /></td>
                <td className="py-3 text-center font-bold text-blue-400 bg-blue-950/20">
                  <Check className="w-4 h-4 text-blue-400 mx-auto" />
                </td>
                <td className="py-3 text-center font-bold text-rose-400 bg-rose-950/20">
                  <Check className="w-4 h-4 text-rose-400 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">
                  <strong>Elite Backgrounds for the Game You Are Creating (3D Hypergrid, Nebula, Matrix Rain)</strong>
                </td>
                <td className="py-3 text-center text-slate-500"><CloseIcon className="w-4 h-4 mx-auto text-slate-600" /></td>
                <td className="py-3 text-center text-slate-500"><CloseIcon className="w-4 h-4 mx-auto text-slate-600" /></td>
                <td className="py-3 text-center text-slate-500"><CloseIcon className="w-4 h-4 mx-auto text-slate-600" /></td>
                <td className="py-3 text-center font-bold text-rose-400 bg-rose-950/30">
                  <Crown className="w-4 h-4 text-yellow-400 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">
                  <strong>The Most Gorgeous Backgrounds for Website & Studio Shaders</strong>
                </td>
                <td className="py-3 text-center text-slate-500"><CloseIcon className="w-4 h-4 mx-auto text-slate-600" /></td>
                <td className="py-3 text-center text-slate-500"><CloseIcon className="w-4 h-4 mx-auto text-slate-600" /></td>
                <td className="py-3 text-center text-slate-500"><CloseIcon className="w-4 h-4 mx-auto text-slate-600" /></td>
                <td className="py-3 text-center font-bold text-rose-400 bg-rose-950/30">
                  <Crown className="w-4 h-4 text-yellow-400 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Deluxe Background Studio Controls & Sliders</td>
                <td className="py-3 text-center text-slate-500"><CloseIcon className="w-4 h-4 mx-auto text-slate-600" /></td>
                <td className="py-3 text-center text-slate-500"><CloseIcon className="w-4 h-4 mx-auto text-slate-600" /></td>
                <td className="py-3 text-center text-slate-500"><CloseIcon className="w-4 h-4 mx-auto text-slate-600" /></td>
                <td className="py-3 text-center font-bold text-rose-400 bg-rose-950/30">
                  <Check className="w-4 h-4 text-rose-400 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
