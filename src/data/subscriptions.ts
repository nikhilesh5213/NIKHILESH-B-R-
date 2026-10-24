import { CurrencyCode, CurrencyConfig, SubscriptionPlan, BackgroundPreset } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    flag: '🇮🇳',
    prices: {
      exclusive: 649, // User specified: 649 rupees only
      pro: 1499,      // User specified: 1499 rupees only
      deluxe: 2499,   // User specified: 2499 rupees only
    },
    symbolFirst: true,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    flag: '🇺🇸',
    prices: {
      exclusive: 7.99,
      pro: 17.99,
      deluxe: 29.99,
    },
    symbolFirst: true,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    flag: '🇪🇺',
    prices: {
      exclusive: 7.49,
      pro: 16.99,
      deluxe: 27.99,
    },
    symbolFirst: true,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    flag: '🇬🇧',
    prices: {
      exclusive: 6.49,
      pro: 14.99,
      deluxe: 24.99,
    },
    symbolFirst: true,
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    flag: '🇯🇵',
    prices: {
      exclusive: 1190,
      pro: 2750,
      deluxe: 4590,
    },
    symbolFirst: true,
  },
  CAD: {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
    flag: '🇨🇦',
    prices: {
      exclusive: 10.99,
      pro: 24.49,
      deluxe: 40.99,
    },
    symbolFirst: true,
  },
};

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'exclusive',
    name: 'Exclusive',
    tagline: 'Clean & uninterrupted gaming experience',
    badge: 'Ad-Free Pass',
    badgeColor: 'bg-red-500/20 text-red-400 border border-red-500/30',
    borderColor: 'border-red-500/40 hover:border-red-500',
    glowColor: 'hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]',
    userStatedCore: 'Includes No Ads Only',
    features: [
      '100% Ad-Free Experience (No banners, no popup ads, no video interruptions)',
      'Zero latency ad-block bypass across all games',
      'Uninterrupted arcade gameplay & leaderboards',
      'Exclusive Member profile badge',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Build games with Elite Resources & high-tier mechanics',
    badge: 'Most Popular',
    badgeColor: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    borderColor: 'border-blue-500/60 hover:border-blue-400',
    glowColor: 'hover:shadow-[0_0_30px_rgba(14,165,233,0.45)]',
    popular: true,
    userStatedCore: 'Includes No Ads and Elite Resources',
    features: [
      'Everything in Exclusive (Zero ads guaranteed)',
      'Unlock Elite Resources to build your own game (Dual Lasers, Shield Core, Homing Missiles, Warp Gates)',
      'Full Access to VIP Resources vault & Pro Configs',
      'Grand Master strategy guides & 3 trial blueprints',
      'Gamer soundboard FX pack with high-res audio stems',
      'Pro animated gamer tag & discord role status',
    ],
  },
  {
    id: 'deluxe',
    name: 'Deluxe',
    tagline: 'The ultimate VIP tier with Elite Game Backgrounds & visual mastery',
    badge: 'Ultimate VIP',
    badgeColor: 'bg-gradient-to-r from-red-500 to-blue-500 text-white font-bold',
    borderColor: 'border-transparent bg-gradient-to-b from-red-500 via-blue-500 to-red-500 p-[1.5px]',
    glowColor: 'shadow-[0_0_35px_rgba(239,68,68,0.3)] hover:shadow-[0_0_45px_rgba(14,165,233,0.5)]',
    userStatedCore: 'Includes No Ads, Elite Resources and Elite Game Backgrounds',
    features: [
      'Everything in Pro (Zero ads + All Elite Resources for building games)',
      'Unlock Elite Backgrounds for the game you are creating (3D Hypergrid, Nebula Plasma, Matrix Rain)',
      'Unlock the most gorgeous backgrounds in Gamer Online',
      '6 Live interactive dynamic canvas themes & Deluxe Studio customizer',
      'Ultra 4K animated wallpapers & master collection downloads',
      'Deluxe Crown VIP glowing aura in leaderboards and games',
      'Direct Priority gamer support & beta game access',
    ],
  },
];

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: 'crimson-azure-void',
    name: 'Crimson & Azure Cyber Void',
    description: 'Bioluminescent red & blue energy filaments floating across a dark cosmic abyss',
    tag: 'Signature Red & Blue',
    previewGradient: 'from-red-600 via-slate-900 to-blue-600',
  },
  {
    id: 'neon-hypergrid',
    name: 'Neon Hypergrid 3D',
    description: 'Futuristic synthwave 3D laser grid undulating with red & blue pulses',
    tag: 'Retro 80s Cyber',
    previewGradient: 'from-blue-600 via-slate-950 to-red-600',
  },
  {
    id: 'nebula-vortex',
    name: 'Ruby & Sapphire Nebula',
    description: 'Swirling deep-space interstellar plasma nebula with glowing stellar dust',
    tag: 'Deep Cosmic',
    previewGradient: 'from-rose-600 via-slate-900 to-cyan-500',
  },
  {
    id: 'cyber-rain',
    name: 'Neo-Tokyo Cyber Rain',
    description: 'Digital rain matrix dropping luminous red and cyan data packets',
    tag: 'Matrix Rain',
    previewGradient: 'from-red-700 via-slate-950 to-sky-500',
  },
  {
    id: 'quantum-particles',
    name: 'Interactive Quantum Rift',
    description: 'High-density quantum nodes that gravitate and repel around your cursor',
    tag: 'Interactive Physics',
    previewGradient: 'from-cyan-600 via-slate-900 to-red-500',
  },
  {
    id: 'inferno-pulse',
    name: 'Inferno & Glacial Dual Pulse',
    description: 'Harmonic collision of fire and ice wave ripples across the viewport',
    tag: 'Fire & Ice Dual',
    previewGradient: 'from-red-500 via-zinc-950 to-blue-500',
  },
];

export function formatPrice(
  amount: number,
  currency: CurrencyConfig,
  billingCycle: 'monthly' | 'yearly' = 'monthly'
): string {
  // If yearly, give 2 months free (pay 10 months for 12 months)
  const finalAmount = billingCycle === 'yearly' ? Math.round(amount * 10) : amount;
  
  if (currency.code === 'INR' || currency.code === 'JPY') {
    return `${currency.symbol}${finalAmount.toLocaleString('en-IN')}`;
  }
  return `${currency.symbol}${finalAmount.toFixed(2)}`;
}
