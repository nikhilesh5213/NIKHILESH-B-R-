export type SubscriptionTier = 'free' | 'exclusive' | 'pro' | 'deluxe';

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  // Exact plan prices per currency (INR as defined by user, standard conversions for others)
  prices: {
    exclusive: number;
    pro: number;
    deluxe: number;
  };
  symbolFirst: boolean;
}

export interface PlanFeature {
  text: string;
  includedIn: SubscriptionTier[];
  highlight?: boolean;
}

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  tagline: string;
  badge?: string;
  badgeColor?: string;
  borderColor: string;
  glowColor: string;
  features: string[];
  userStatedCore: string;
  popular?: boolean;
}

export type DeluxeBackgroundTheme = 
  | 'crimson-azure-void' 
  | 'neon-hypergrid' 
  | 'nebula-vortex' 
  | 'cyber-rain' 
  | 'quantum-particles' 
  | 'inferno-pulse';

export interface BackgroundPreset {
  id: DeluxeBackgroundTheme;
  name: string;
  description: string;
  tag: string;
  previewGradient: string;
}

export interface UserSubscriptionState {
  currentTier: SubscriptionTier;
  subscribedAt?: string;
  expiresAt?: string;
  billingCycle: 'monthly' | 'yearly';
  currency: CurrencyCode;
  selectedBackground: DeluxeBackgroundTheme;
  autoRenew: boolean;
}
