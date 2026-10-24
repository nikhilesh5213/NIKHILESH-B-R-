import React, { useState } from 'react';
import { 
  Users, 
  Image as ImageIcon, 
  Package, 
  Sparkles, 
  Lock, 
  Plus, 
  Search, 
  Crown, 
  Zap,
  Info,
  Check,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { 
  GameCharacter, 
  GameBackgroundAsset, 
  GameResourceItem 
} from '../../types/gameStudio';
import { 
  GAME_CHARACTERS, 
  GAME_BACKGROUNDS, 
  GAME_RESOURCES 
} from '../../data/gameAssets';
import { SubscriptionTier, CurrencyConfig } from '../../types';
import { formatPrice } from '../../data/subscriptions';
import { sound } from '../../utils/sound';

interface AssetsColumnProps {
  userTier: SubscriptionTier;
  currency: CurrencyConfig;
  onInsertCode: (snippet: string) => void;
  onSelectBackground: (bg: GameBackgroundAsset) => void;
  onUpgradePrompt: (requiredTier: 'pro' | 'deluxe') => void;
}

export const AssetsColumn: React.FC<AssetsColumnProps> = ({
  userTier,
  currency,
  onInsertCode,
  onSelectBackground,
  onUpgradePrompt,
}) => {
  const [activeTab, setActiveTab] = useState<'resources' | 'backgrounds' | 'characters'>('resources');
  const [searchQuery, setSearchQuery] = useState('');
  const [justInsertedId, setJustInsertedId] = useState<string | null>(null);

  // Check access based on user requirements:
  // - Basic/free items: accessible to all
  // - Elite resources: require 'pro' or 'deluxe'
  // - Elite backgrounds: require 'deluxe'
  const checkAccess = (tierRequired: 'free' | 'exclusive' | 'pro' | 'deluxe') => {
    if (tierRequired === 'free' || tierRequired === 'exclusive') return true;
    if (tierRequired === 'pro') return userTier === 'pro' || userTier === 'deluxe';
    if (tierRequired === 'deluxe') return userTier === 'deluxe';
    return false;
  };

  const handleAction = (item: { 
    id: string; 
    name: string; 
    tierRequired: 'free' | 'exclusive' | 'pro' | 'deluxe'; 
    snippet: string 
  }) => {
    const hasAccess = checkAccess(item.tierRequired);
    if (!hasAccess) {
      sound.playDenied();
      onUpgradePrompt(item.tierRequired === 'deluxe' ? 'deluxe' : 'pro');
      return;
    }
    sound.playClick();
    onInsertCode(item.snippet);
    setJustInsertedId(item.id);
    setTimeout(() => setJustInsertedId(null), 1800);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Column Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/70">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
              <Package className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold font-gamer text-white text-base tracking-wide">
                Resources & Backgrounds
              </h3>
              <span className="text-[10px] text-slate-400 block -mt-0.5">
                Game building objects & scenery
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
            COLUMN 1
          </span>
        </div>

        {/* Column Navigation Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('resources');
            }}
            className={`py-1.5 px-2 rounded-lg text-xs font-bold uppercase transition flex items-center justify-center gap-1.5 ${
              activeTab === 'resources'
                ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="truncate">Resources</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('backgrounds');
            }}
            className={`py-1.5 px-2 rounded-lg text-xs font-bold uppercase transition flex items-center justify-center gap-1.5 ${
              activeTab === 'backgrounds'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="truncate">Backgrounds</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('characters');
            }}
            className={`py-1.5 px-2 rounded-lg text-xs font-bold uppercase transition flex items-center justify-center gap-1.5 ${
              activeTab === 'characters'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span className="truncate">Characters</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mt-2.5">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={`Filter ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* 1. RESOURCES TAB (Basic vs Elite Resources) */}
        {activeTab === 'resources' && (
          <>
            {/* Section A: Elite Resources (Pro Membership Only) */}
            <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 mb-2">
              <div className="flex items-center justify-between text-xs font-bold text-blue-300 font-gamer mb-1">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-400" />
                  Elite Game Resources
                </span>
                <span className="text-[9px] font-mono bg-blue-900/60 px-2 py-0.5 rounded text-cyan-300">
                  PRO MEMBERSHIP ONLY
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Modern high-tier game building objects. Requires Pro ({formatPrice(currency.prices.pro, currency)}) to insert into your game.
              </p>
            </div>

            {GAME_RESOURCES.filter(
              (r) =>
                r.tierRequired === 'pro' &&
                r.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((res) => {
              const unlocked = checkAccess(res.tierRequired);
              const isInserted = justInsertedId === res.id;

              return (
                <div
                  key={res.id}
                  className={`p-3 rounded-xl border transition-all ${
                    unlocked
                      ? 'bg-slate-950/80 border-blue-500/40 hover:border-blue-400'
                      : 'bg-slate-950/50 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full border border-white/30 shrink-0 shadow-sm"
                        style={{ backgroundColor: res.color }}
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white">{res.name}</h4>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            PRO ELITE
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">{res.effect}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-1.5">
                    {unlocked ? (
                      <button
                        onClick={() => handleAction(res)}
                        className={`w-full py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                          isInserted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                      >
                        {isInserted ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Injected Into Game!
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" /> Use Elite Resource
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAction(res)}
                        className="w-full py-1.5 px-2 rounded-lg bg-slate-900 border border-blue-500/40 text-blue-400 hover:bg-blue-950/60 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                      >
                        <Lock className="w-3.5 h-3.5 text-blue-400" />
                        Unlock with Pro ({formatPrice(currency.prices.pro, currency)})
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Section B: Basic / Standard Resources (Free to all) */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-1 mb-2">
                <span>Standard Resources (Basic / Retro)</span>
                <span className="text-[9px] font-mono bg-slate-800 px-1.5 rounded">FREE TO ALL</span>
              </div>

              {GAME_RESOURCES.filter(
                (r) =>
                  r.tierRequired === 'free' &&
                  r.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((res) => {
                const isInserted = justInsertedId === res.id;
                return (
                  <div
                    key={res.id}
                    className="p-3 mb-2 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-slate-700 transition"
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: res.color }}
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-200">{res.name}</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">{res.effect}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAction(res)}
                      className={`w-full mt-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                        isInserted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                      }`}
                    >
                      {isInserted ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Injected!
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-slate-400" /> Use Basic Resource
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* 2. GAME BACKGROUNDS TAB (Basic vs Elite Backgrounds for your game) */}
        {activeTab === 'backgrounds' && (
          <>
            {/* Section A: Elite Backgrounds for your created game (Deluxe Only) */}
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-red-950/50 to-blue-950/50 border border-red-500/40 mb-2">
              <div className="flex items-center justify-between text-xs font-bold text-rose-300 font-gamer mb-1">
                <span className="flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-yellow-400" />
                  Elite Game Backgrounds
                </span>
                <span className="text-[9px] font-mono bg-gradient-to-r from-red-500 to-blue-500 text-white font-bold px-2 py-0.5 rounded">
                  DELUXE ONLY
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                The most gorgeous backgrounds for the game you are creating. Requires Deluxe ({formatPrice(currency.prices.deluxe, currency)}) to use in your game.
              </p>
            </div>

            {GAME_BACKGROUNDS.filter(
              (b) =>
                b.tierRequired === 'deluxe' &&
                b.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((bg) => {
              const unlocked = checkAccess(bg.tierRequired);
              const isInserted = justInsertedId === bg.id;

              return (
                <div
                  key={bg.id}
                  className={`p-3 rounded-xl border transition-all ${
                    unlocked
                      ? 'bg-slate-950/80 border-rose-500/50 hover:border-rose-400'
                      : 'bg-slate-950/50 border-slate-800/80'
                  }`}
                >
                  <div
                    className={`h-16 w-full rounded-lg mb-2 bg-gradient-to-r ${bg.gradient} relative overflow-hidden flex items-center justify-center p-2`}
                  >
                    <div className="absolute inset-0 cyber-grid opacity-30" />
                    <span className="text-[10px] font-mono font-bold text-white bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs z-10 border border-white/20">
                      Game Canvas Shader
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5 mb-2">
                    {bg.name}
                  </h4>

                  <div>
                    {unlocked ? (
                      <button
                        onClick={() => {
                          handleAction(bg);
                          onSelectBackground(bg);
                        }}
                        className={`w-full py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                          isInserted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gradient-to-r from-red-600 to-blue-600 text-white'
                        }`}
                      >
                        {isInserted ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Applied to Game Canvas!
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" /> Apply Elite Background
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAction(bg)}
                        className="w-full py-1.5 px-2 rounded-lg bg-slate-900 border border-rose-500/40 text-rose-300 hover:bg-rose-950/60 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                      >
                        <Crown className="w-3.5 h-3.5 text-yellow-400" />
                        Unlock with Deluxe ({formatPrice(currency.prices.deluxe, currency)})
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Section B: Basic Game Backgrounds (Free to all) */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-1 mb-2">
                <span>Basic Game Backgrounds (Retro / Simple)</span>
                <span className="text-[9px] font-mono bg-slate-800 px-1.5 rounded">FREE TO ALL</span>
              </div>

              {GAME_BACKGROUNDS.filter(
                (b) =>
                  b.tierRequired === 'free' &&
                  b.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((bg) => {
                const isInserted = justInsertedId === bg.id;
                return (
                  <div
                    key={bg.id}
                    className="p-3 mb-2 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-slate-700 transition"
                  >
                    <div
                      className={`h-12 w-full rounded-lg mb-2 bg-gradient-to-r ${bg.gradient} flex items-center justify-center text-[10px] text-slate-400`}
                    >
                      Standard Flat Background
                    </div>
                    <h4 className="text-xs font-bold text-slate-200 mb-2">{bg.name}</h4>
                    <button
                      onClick={() => {
                        handleAction(bg);
                        onSelectBackground(bg);
                      }}
                      className={`w-full py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                        isInserted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                      }`}
                    >
                      {isInserted ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Applied!
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-slate-400" /> Apply Basic Background
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* 3. CHARACTERS TAB */}
        {activeTab === 'characters' && (
          <>
            <div className="text-[11px] text-slate-400 flex items-center justify-between px-1 mb-2">
              <span>Player & Enemy Sprites</span>
              <span className="font-mono text-[10px]">{GAME_CHARACTERS.length} Available</span>
            </div>

            {GAME_CHARACTERS.filter((c) =>
              c.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((char) => {
              const unlocked = checkAccess(char.tierRequired);
              const isInserted = justInsertedId === char.id;

              return (
                <div
                  key={char.id}
                  className={`p-3 rounded-xl border transition-all ${
                    unlocked
                      ? 'bg-slate-950/70 border-slate-800 hover:border-red-500/50'
                      : 'bg-slate-950/40 border-slate-800/60 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl p-1 rounded-lg bg-slate-900 border border-slate-800">
                        {char.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white">{char.name}</h4>
                          {char.tierRequired === 'pro' && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                              PRO
                            </span>
                          )}
                          {char.tierRequired === 'deluxe' && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-gradient-to-r from-red-500 to-blue-500 text-white font-bold">
                              DELUXE
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5 font-mono">
                          <span>SPD: {char.speed}</span>
                          <span>HP: {char.health}</span>
                          <span>JMP: {char.jumpForce}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    {unlocked ? (
                      <button
                        onClick={() => handleAction(char)}
                        className={`w-full py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                          isInserted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 hover:bg-red-600/40 text-slate-200 border border-slate-700'
                        }`}
                      >
                        {isInserted ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Injected!
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 text-red-400" /> Insert Character
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAction(char)}
                        className="w-full py-1.5 px-2 rounded-lg bg-slate-900 border border-red-500/40 text-red-400 hover:bg-red-950/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        Unlock ({char.tierRequired.toUpperCase()})
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/80 text-[11px] text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-blue-400" /> Click to inject into your game
        </span>
        <span className="font-mono text-[10px] text-slate-400">Gamer Online Engine</span>
      </div>
    </div>
  );
};
