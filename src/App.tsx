/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  SubscriptionTier, 
  CurrencyCode, 
  DeluxeBackgroundTheme 
} from './types';
import { CURRENCIES } from './data/subscriptions';
import { sound } from './utils/sound';

// Components
import { DynamicBackground } from './components/backgrounds/DynamicBackground';
import { BackgroundStudioModal } from './components/backgrounds/BackgroundStudioModal';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { AdBanner } from './components/ads/AdSystem';
import { GameCenter } from './components/games/GameCenter';
import { ExclusiveResources } from './components/resources/ExclusiveResources';
import { PricingSection } from './components/pricing/PricingSection';
import { SubscriptionStatusHUD } from './components/pricing/SubscriptionStatusHUD';
import { GameStudio } from './components/studio/GameStudio';
import { Footer } from './components/footer/Footer';

export default function App() {
  // 1. Subscription Tier state (persisted)
  const [currentTier, setCurrentTier] = useState<SubscriptionTier>(() => {
    try {
      const saved = localStorage.getItem('gamer_online_tier');
      if (saved && ['free', 'exclusive', 'pro', 'deluxe'].includes(saved)) {
        return saved as SubscriptionTier;
      }
    } catch {
      // fallback
    }
    return 'free';
  });

  // 2. Currency State (persisted)
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('gamer_online_currency');
      if (saved && Object.keys(CURRENCIES).includes(saved)) {
        return saved as CurrencyCode;
      }
    } catch {
      // fallback
    }
    return 'INR'; // Baseline INR as specified in prompt
  });

  // 3. Deluxe Background Theme State (persisted)
  const [selectedBackground, setSelectedBackground] = useState<DeluxeBackgroundTheme>(() => {
    try {
      const saved = localStorage.getItem('gamer_online_bg');
      if (saved) return saved as DeluxeBackgroundTheme;
    } catch {
      // fallback
    }
    return 'crimson-azure-void';
  });

  // 4. Background Intensity & Preview state
  const [backgroundIntensity, setBackgroundIntensity] = useState<number>(1.0);
  const [previewRemaining, setPreviewRemaining] = useState<number | null>(null);
  const [isBackgroundStudioOpen, setIsBackgroundStudioOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('gamer_online_tier', currentTier);
      localStorage.setItem('gamer_online_currency', selectedCurrency);
      localStorage.setItem('gamer_online_bg', selectedBackground);
    } catch {
      // ignore
    }
  }, [currentTier, selectedCurrency, selectedBackground]);

  // Handle 15-second preview countdown for non-deluxe users
  useEffect(() => {
    if (previewRemaining === null) return;
    if (previewRemaining <= 0) {
      setPreviewRemaining(null);
      return;
    }
    const timer = setInterval(() => {
      setPreviewRemaining((prev) => (prev && prev > 1 ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(timer);
  }, [previewRemaining]);

  const isDeluxeBackgroundActive = currentTier === 'deluxe' || (previewRemaining !== null && previewRemaining > 0);

  // Sound toggle handler
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
  };

  // Switch Tier
  const handleSelectPlan = (tier: SubscriptionTier) => {
    setCurrentTier(tier);
  };

  const handleStartPreview = (theme: DeluxeBackgroundTheme) => {
    setSelectedBackground(theme);
    setPreviewRemaining(15);
    sound.playUpgrade();
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToArcade = () => {
    const el = document.getElementById('arcade');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-slate-100 relative selection:bg-red-600 selection:text-white">
      {/* Dynamic Background Canvas (Deluxe Feature + Red/Blue Cyber Ambience) */}
      <DynamicBackground
        theme={selectedBackground}
        isActive={isDeluxeBackgroundActive}
        previewRemaining={previewRemaining}
        intensity={backgroundIntensity}
      />

      {/* Background Studio Modal for Deluxe Users */}
      <BackgroundStudioModal
        isOpen={isBackgroundStudioOpen}
        onClose={() => setIsBackgroundStudioOpen(false)}
        currentTheme={selectedBackground}
        onSelectTheme={(theme) => setSelectedBackground(theme)}
        userTier={currentTier}
        currency={CURRENCIES[selectedCurrency]}
        onUpgradeToDeluxe={() => {
          setIsBackgroundStudioOpen(false);
          scrollToPricing();
        }}
        onStartPreview={handleStartPreview}
        previewRemaining={previewRemaining}
        intensity={backgroundIntensity}
        onChangeIntensity={(val) => setBackgroundIntensity(val)}
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar
          currentTier={currentTier}
          selectedCurrency={selectedCurrency}
          onSelectCurrency={setSelectedCurrency}
          onOpenBackgroundStudio={() => setIsBackgroundStudioOpen(true)}
          onOpenPricing={scrollToPricing}
          onSimulateTier={setCurrentTier}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />

        {/* Top Ad Banner - Visible on Free Tier, Clean Ad-Free Shield on Exclusive/Pro/Deluxe */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-2">
          <AdBanner
            userTier={currentTier}
            currency={CURRENCIES[selectedCurrency]}
            onUpgradeToExclusive={scrollToPricing}
            position="top"
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Hero Section */}
          <HeroSection
            currentTier={currentTier}
            currency={CURRENCIES[selectedCurrency]}
            onExplorePricing={scrollToPricing}
            onPlayArcade={scrollToArcade}
            onOpenBackgroundStudio={() => setIsBackgroundStudioOpen(true)}
          />

          {/* Active Membership Status Bar & Perk Highlights */}
          <SubscriptionStatusHUD
            currentTier={currentTier}
            currency={CURRENCIES[selectedCurrency]}
            onOpenPricing={scrollToPricing}
            onOpenBackgroundStudio={() => setIsBackgroundStudioOpen(true)}
            onResetToFree={() => setCurrentTier('free')}
            onSwitchTier={setCurrentTier}
          />

          {/* 3-COLUMN GAME CREATOR STUDIO (Resources/Backgrounds/Characters, Playground, Tools) */}
          <GameStudio
            userTier={currentTier}
            currency={CURRENCIES[selectedCurrency]}
            onUpgradePrompt={(tier) => {
              scrollToPricing();
            }}
            onUpgradeToExclusive={scrollToPricing}
            onSelectDeluxeBackground={() => setIsBackgroundStudioOpen(true)}
          />

          {/* Playable Arcade Games on Gamer Online */}
          <GameCenter
            userTier={currentTier}
            currency={CURRENCIES[selectedCurrency]}
            onUpgradeToExclusive={scrollToPricing}
          />

          {/* In-feed Ad Banner (if free tier) */}
          <AdBanner
            userTier={currentTier}
            currency={CURRENCIES[selectedCurrency]}
            onUpgradeToExclusive={scrollToPricing}
            position="in-feed"
          />

          {/* Exclusive Resources Vault (Pro & Deluxe Tier) */}
          <ExclusiveResources
            userTier={currentTier}
            currency={CURRENCIES[selectedCurrency]}
            onUpgradeToPro={scrollToPricing}
            onUpgradeToDeluxe={scrollToPricing}
          />

          {/* Subscription Plans & Pricing (Exclusive 649, Pro 1499, Deluxe 2499) */}
          <PricingSection
            currentTier={currentTier}
            selectedCurrency={selectedCurrency}
            onSelectCurrency={setSelectedCurrency}
            onSelectPlan={handleSelectPlan}
            onOpenBackgroundStudio={() => setIsBackgroundStudioOpen(true)}
          />
        </main>

        {/* Site Footer */}
        <Footer />
      </div>
    </div>
  );
}
