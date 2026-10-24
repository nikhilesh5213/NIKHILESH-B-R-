import React, { useState } from 'react';
import { 
  Download, 
  Lock, 
  Sparkles, 
  Play, 
  Volume2, 
  BookOpen, 
  Sliders, 
  Image as ImageIcon,
  CheckCircle2, 
  ExternalLink,
  Crown
} from 'lucide-react';
import { SubscriptionTier, CurrencyConfig } from '../../types';
import { formatPrice } from '../../data/subscriptions';
import { sound } from '../../utils/sound';

interface ExclusiveResourcesProps {
  userTier: SubscriptionTier;
  currency: CurrencyConfig;
  onUpgradeToPro: () => void;
  onUpgradeToDeluxe: () => void;
}

export const ExclusiveResources: React.FC<ExclusiveResourcesProps> = ({
  userTier,
  currency,
  onUpgradeToPro,
  onUpgradeToDeluxe,
}) => {
  const isUnlocked = userTier === 'pro' || userTier === 'deluxe';
  const [activeTab, setActiveTab] = useState<'configs' | 'wallpapers' | 'guides' | 'soundboard'>('configs');
  const [selectedCrosshair, setSelectedCrosshair] = useState('dot');
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const handleDownload = (resourceName: string) => {
    if (!isUnlocked) {
      sound.playDenied();
      onUpgradeToPro();
      return;
    }
    sound.playClick();
    setDownloadSuccessMessage(`Downloaded "${resourceName}" successfully!`);
    setTimeout(() => setDownloadSuccessMessage(null), 3500);
  };

  const playDemoSound = (effect: string) => {
    if (!isUnlocked) {
      sound.playDenied();
      onUpgradeToPro();
      return;
    }
    if (effect === 'laser') sound.playLaser();
    else if (effect === 'upgrade') sound.playUpgrade();
    else sound.playClick();
  };

  return (
    <div id="resources" className="relative py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIP Resource Vault</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-gamer text-white tracking-wide flex items-center gap-3">
            Exclusive Gamer Resources
            {isUnlocked ? (
              <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-mono font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked ({userTier.toUpperCase()})
              </span>
            ) : (
              <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-1 rounded-full font-mono font-medium flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> Pro & Deluxe Only
              </span>
            )}
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Tournament-grade game configuration files, 4K cyber wallpapers, masterclass strategy guides, and audio sound assets.
          </p>
        </div>

        {/* Upgrade Callout if locked */}
        {!isUnlocked && (
          <div className="flex items-center gap-3 bg-slate-900/90 border border-blue-500/40 p-3 rounded-xl">
            <div>
              <p className="text-xs text-slate-300 font-medium">Unlock full vault with Pro:</p>
              <p className="text-sm font-bold text-blue-400 font-mono">
                {formatPrice(currency.prices.pro, currency)} only
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onUpgradeToPro();
              }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/20 transition transform hover:scale-105"
            >
              Get Pro Access
            </button>
          </div>
        )}
      </div>

      {/* Download Alert Toast */}
      {downloadSuccessMessage && (
        <div className="mb-6 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between animate-fadeIn">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {downloadSuccessMessage}
          </span>
          <span className="font-mono text-emerald-400/80">Saved to Vault</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto">
        {[
          { id: 'configs', label: 'Pro Configs & Crosshairs', icon: Sliders },
          { id: 'wallpapers', label: '4K Red & Blue Wallpapers', icon: ImageIcon },
          { id: 'guides', label: 'Grand Master Guides', icon: BookOpen },
          { id: 'soundboard', label: 'Cyber Audio Soundboard', icon: Volume2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-red-600/30 to-blue-600/30 text-white border border-blue-500/50 shadow-[0_0_15px_rgba(14,165,233,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4 text-blue-400" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Locked overlay container */}
      <div className="relative rounded-2xl bg-slate-900/70 border border-slate-800 p-6 min-h-[380px] overflow-hidden">
        {!isUnlocked && (
          <div className="absolute inset-0 z-20 backdrop-blur-md bg-slate-950/75 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-4 shadow-xl">
              <Lock className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold font-gamer text-white tracking-wide">
              Exclusive Resources Vault Locked
            </h3>
            <p className="text-slate-400 text-sm max-w-md mt-2 mb-6">
              Exclusive tier includes <strong className="text-white">no ads only</strong>. Upgrade to <strong className="text-blue-400">Pro ({formatPrice(currency.prices.pro, currency)})</strong> or <strong className="text-red-400">Deluxe ({formatPrice(currency.prices.deluxe, currency)})</strong> to instantly unlock all configs, 4K wallpapers, guides, and soundboards.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  onUpgradeToPro();
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/30 transition transform hover:scale-105"
              >
                Unlock with Pro ({formatPrice(currency.prices.pro, currency)})
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  onUpgradeToDeluxe();
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-500/30 transition transform hover:scale-105 flex items-center gap-1.5"
              >
                <Crown className="w-4 h-4" />
                Unlock with Deluxe ({formatPrice(currency.prices.deluxe, currency)})
              </button>
            </div>
          </div>
        )}

        {/* TAB 1: PRO CONFIGS */}
        {activeTab === 'configs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-bold font-gamer text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-red-400" />
                Pro Esports Config Presets
              </h3>
              <p className="text-xs text-slate-400">
                Custom low-latency autoexec.cfg and sensitivity profiles engineered for maximum FPS and 240Hz+ monitors.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    game: 'Apex Arena / Shooter',
                    title: 'Ultra Low Input Latency Config',
                    fps: '+35% Avg FPS',
                    file: 'gamer_online_apex_pro.cfg',
                  },
                  {
                    game: 'Valorant Reflex',
                    title: 'Dynamic Crosshair & Netcode Tweaks',
                    fps: '1ms Tick Sync',
                    file: 'gamer_online_val_master.json',
                  },
                  {
                    game: 'Cyber Runner Speedrun',
                    title: 'Physics Unlock & Frame Cap Script',
                    fps: 'Zero Screen Tearing',
                    file: 'cyber_runner_speedrun_v2.cfg',
                  },
                  {
                    game: 'Tactical CS2 Warfare',
                    title: 'Pro Recoil Compensation Profile',
                    fps: 'Precision DPI 800',
                    file: 'cs2_recoil_master_pro.cfg',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/40 transition"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>{item.game}</span>
                      <span className="text-emerald-400 font-mono font-semibold">{item.fps}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-3">{item.title}</h4>
                    <button
                      onClick={() => handleDownload(item.file)}
                      className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-400" />
                      Download {item.file}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Crosshair Customizer */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-white font-gamer mb-2">
                  Interactive Crosshair Studio
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  Test-fire and copy tournament crosshair codes in real-time.
                </p>

                {/* Reticle Target Preview */}
                <div className="h-32 w-full rounded-lg bg-slate-900 border border-slate-800 relative flex items-center justify-center mb-4 overflow-hidden">
                  <div className="absolute inset-0 cyber-grid opacity-20" />
                  {selectedCrosshair === 'dot' && (
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
                  )}
                  {selectedCrosshair === 'cross' && (
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className="absolute w-6 h-0.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                      <div className="absolute h-6 w-0.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                    </div>
                  )}
                  {selectedCrosshair === 'dual-circle' && (
                    <div className="w-7 h-7 rounded-full border-2 border-red-500 flex items-center justify-center shadow-[0_0_8px_#ef4444]">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'dot', label: 'Crimson Dot' },
                    { id: 'cross', label: 'Cyan Cross' },
                    { id: 'dual-circle', label: 'Dual Halo' },
                  ].map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedCrosshair(ch.id);
                      }}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition ${
                        selectedCrosshair === ch.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleDownload('crosshair_profile.txt')}
                className="mt-4 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wider uppercase transition flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Copy Code
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: 4K WALLPAPERS */}
        {activeTab === 'wallpapers' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold font-gamer text-white">
                  Ultra 4K Red & Blue Cyber Wallpapers
                </h3>
                <p className="text-xs text-slate-400">
                  Custom high-resolution 3840x2160 artwork rendered for dual monitor setups.
                </p>
              </div>
              <button
                onClick={() => handleDownload('Gamer_Online_Wallpaper_Pack_4K.zip')}
                className="py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" /> Download All (ZIP)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: 'Red Cyber Samurai & Blue Katana',
                  res: '3840 x 2160 (4K)',
                  gradient: 'from-red-600 via-rose-900 to-blue-900',
                  badge: 'Featured',
                },
                {
                  title: 'Tokyo Neon Highway 2099',
                  res: '3840 x 2160 (4K)',
                  gradient: 'from-blue-600 via-slate-900 to-red-600',
                  badge: 'Ultra HD',
                },
                {
                  title: 'Dual Mecha Titans: Crimson vs Azure',
                  res: '3840 x 2160 (4K)',
                  gradient: 'from-red-700 via-zinc-950 to-cyan-600',
                  badge: 'eSports',
                },
              ].map((wp, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950/60 group hover:border-red-500/40 transition"
                >
                  <div
                    className={`h-40 w-full bg-gradient-to-tr ${wp.gradient} relative flex items-center justify-center p-4`}
                  >
                    <div className="absolute inset-0 cyber-grid opacity-30" />
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold bg-black/60 px-2 py-0.5 rounded text-white border border-white/20">
                      {wp.badge}
                    </span>
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-bold text-white line-clamp-1">{wp.title}</h4>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                      <span>{wp.res}</span>
                      <button
                        onClick={() => handleDownload(`${wp.title}.png`)}
                        className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: GUIDES */}
        {activeTab === 'guides' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-gamer text-white">
              Grand Master Strategy Guides & Secrets
            </h3>
            <p className="text-xs text-slate-400">
              In-depth breakdown of frame data, map timings, speedrun skips, and game engine mechanics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {[
                {
                  title: 'The Art of Cyber Reflex: Frame Perfect Inputs',
                  pages: '38 Pages PDF',
                  tag: 'Mechanics',
                  desc: 'Comprehensive study of human reaction times, tick rates, and sub-tick buffer mechanics.',
                },
                {
                  title: 'Hidden Boss Weakpoints & Speedrun Skip Maps',
                  pages: '52 Pages PDF',
                  tag: 'Speedrun',
                  desc: 'Route coordinates, boundary glitches, and secret item location charts.',
                },
              ].map((guide, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        {guide.tag}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{guide.pages}</span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-1">{guide.title}</h4>
                    <p className="text-xs text-slate-400">{guide.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => handleDownload(`${guide.title}.pdf`)}
                      className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Download PDF
                    </button>
                    <span className="text-xs text-slate-400">Updated for 2026 Season</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SOUNDBOARD */}
        {activeTab === 'soundboard' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold font-gamer text-white">
                  Cyber Soundboard FX Pack
                </h3>
                <p className="text-xs text-slate-400">
                  Royalty-free high quality gaming audio stems, lasers, and victory fanfares for streams and games.
                </p>
              </div>
              <button
                onClick={() => handleDownload('Gamer_Online_Audio_FX_Pack.zip')}
                className="py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" /> Download Audio Pack
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'Plasma Laser Beam', sound: 'laser', type: 'Combat FX' },
                { name: 'Level Up Fanfare', sound: 'upgrade', type: 'Victory FX' },
                { name: 'Cybernetic UI Blip', sound: 'click', type: 'HUD FX' },
                { name: 'Critical Hit Surge', sound: 'laser', type: 'Stinger FX' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between text-left"
                >
                  <div>
                    <span className="text-[10px] font-mono text-slate-400">{item.type}</span>
                    <h5 className="text-sm font-bold text-white mt-0.5">{item.name}</h5>
                  </div>
                  <button
                    onClick={() => playDemoSound(item.sound)}
                    className="mt-3 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-blue-600/40 text-blue-300 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition"
                  >
                    <Play className="w-3 h-3 fill-current" /> Play Preview
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
