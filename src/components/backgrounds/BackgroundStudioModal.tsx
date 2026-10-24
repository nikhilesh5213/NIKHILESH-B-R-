import React from 'react';
import { Sparkles, Check, Lock, Play, X, Crown, Sliders } from 'lucide-react';
import { DeluxeBackgroundTheme, SubscriptionTier, CurrencyConfig } from '../../types';
import { BACKGROUND_PRESETS, formatPrice } from '../../data/subscriptions';
import { sound } from '../../utils/sound';

interface BackgroundStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: DeluxeBackgroundTheme;
  onSelectTheme: (theme: DeluxeBackgroundTheme) => void;
  userTier: SubscriptionTier;
  currency: CurrencyConfig;
  onUpgradeToDeluxe: () => void;
  onStartPreview: (theme: DeluxeBackgroundTheme) => void;
  previewRemaining: number | null;
  intensity: number;
  onChangeIntensity: (val: number) => void;
}

export const BackgroundStudioModal: React.FC<BackgroundStudioModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
  userTier,
  currency,
  onUpgradeToDeluxe,
  onStartPreview,
  previewRemaining,
  intensity,
  onChangeIntensity,
}) => {
  if (!isOpen) return null;

  const isDeluxe = userTier === 'deluxe';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8">
        {/* Glowing border accents: Red left, Blue right */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-blue-500 rounded-t-2xl" />

        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-gradient-to-br from-red-500/20 to-blue-500/20 border border-red-500/30 text-rose-400">
                <Sparkles className="w-5 h-5 text-red-400" />
              </span>
              <h2 className="text-2xl font-bold font-gamer tracking-wide text-white">
                Deluxe Background Studio
              </h2>
              <span className="ml-2 px-2.5 py-0.5 text-xs font-bold uppercase rounded-full bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-sm flex items-center gap-1">
                <Crown className="w-3 h-3" /> Deluxe Only
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Transform the atmosphere of Gamer Online with responsive canvas shaders in neon crimson and electric cyan.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tier Status Alert */}
        {!isDeluxe && (
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-950/60 via-slate-900 to-blue-950/60 border border-red-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">
                  The Most Gorgeous Backgrounds are unlocked with the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-400 font-bold">Deluxe Tier</span>
                </p>
                <p className="text-xs text-slate-400">
                  Includes no ads, exclusive resources, and all dynamic backgrounds for {formatPrice(currency.prices.deluxe, currency)} only.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  sound.playClick();
                  onUpgradeToDeluxe();
                }}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white shadow-lg shadow-red-500/25 transition-all transform hover:scale-105 active:scale-95"
              >
                Upgrade to Deluxe
              </button>
            </div>
          </div>
        )}

        {/* Live Preview Countdown if active */}
        {previewRemaining !== null && previewRemaining > 0 && (
          <div className="mb-6 p-3 rounded-lg bg-blue-950/70 border border-blue-500/40 flex items-center justify-between text-blue-200 text-sm">
            <span className="flex items-center gap-2">
              <Play className="w-4 h-4 text-blue-400 animate-pulse" />
              <strong>Deluxe Preview Active:</strong> Experiencing full visual effects!
            </span>
            <span className="font-mono font-bold bg-blue-900/60 px-2 py-1 rounded text-cyan-300">
              {previewRemaining}s left
            </span>
          </div>
        )}

        {/* Background Presets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {BACKGROUND_PRESETS.map((preset) => {
            const isSelected = currentTheme === preset.id;
            return (
              <div
                key={preset.id}
                className={`relative group rounded-xl p-4 border transition-all duration-200 overflow-hidden ${
                  isSelected
                    ? 'border-blue-500 bg-slate-800/90 shadow-[0_0_20px_rgba(14,165,233,0.35)]'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                {/* Background visual sample */}
                <div
                  className={`h-24 w-full rounded-lg mb-3 bg-gradient-to-r ${preset.previewGradient} opacity-60 group-hover:opacity-85 transition-opacity relative flex items-center justify-center overflow-hidden`}
                >
                  <div className="absolute inset-0 cyber-grid opacity-30" />
                  <span className="text-xs font-mono font-semibold text-white/90 bg-black/50 px-2.5 py-1 rounded backdrop-blur-sm z-10 border border-white/20">
                    {preset.tag}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-white text-base font-gamer flex items-center gap-2">
                      {preset.name}
                      {isSelected && (
                        <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Active
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {preset.description}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  {isDeluxe ? (
                    <button
                      onClick={() => {
                        sound.playClick();
                        onSelectTheme(preset.id);
                      }}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                        isSelected
                          ? 'bg-blue-600 text-white cursor-default'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {isSelected ? 'Applied to Gamer Online' : 'Apply Background'}
                    </button>
                  ) : (
                    <div className="w-full flex items-center gap-2">
                      <button
                        onClick={() => {
                          sound.playClick();
                          onStartPreview(preset.id);
                        }}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center justify-center gap-1.5 transition"
                      >
                        <Play className="w-3.5 h-3.5 text-blue-400" />
                        15s Preview
                      </button>
                      <button
                        onClick={() => {
                          sound.playClick();
                          onUpgradeToDeluxe();
                        }}
                        className="py-1.5 px-3 rounded-lg bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white text-xs font-bold tracking-wide flex items-center gap-1 transition"
                      >
                        <Crown className="w-3.5 h-3.5" />
                        Unlock
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Background controls for Deluxe users */}
        {isDeluxe && (
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sliders className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm font-semibold text-white">Visual Particle Intensity</p>
                <p className="text-xs text-slate-400">Fine-tune dynamic particle density and glow</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {[0.5, 1.0, 1.5].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    sound.playClick();
                    onChangeIntensity(val);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    intensity === val
                      ? 'bg-blue-600 text-white border border-blue-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {val === 0.5 ? 'Gentle' : val === 1.0 ? 'Standard' : 'Ultra'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
