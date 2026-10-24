import React, { useState } from 'react';
import { 
  Gamepad2, 
  Code2, 
  Wrench, 
  Package, 
  Sparkles, 
  Crown, 
  ShieldCheck, 
  Zap, 
  Eye, 
  Columns3,
  Layers
} from 'lucide-react';
import { AssetsColumn } from './AssetsColumn';
import { CodingPlaygroundColumn } from './CodingPlaygroundColumn';
import { ToolsColumn } from './ToolsColumn';
import { TrialGamesReferenceBar } from './TrialGamesReferenceBar';
import { TRIAL_GAMES } from '../../data/gameAssets';
import { SubscriptionTier, CurrencyConfig } from '../../types';
import { GameBackgroundAsset, GameTemplate } from '../../types/gameStudio';
import { sound } from '../../utils/sound';

interface GameStudioProps {
  userTier: SubscriptionTier;
  currency: CurrencyConfig;
  onUpgradePrompt: (tier: 'pro' | 'deluxe') => void;
  onUpgradeToExclusive: () => void;
  onSelectDeluxeBackground: () => void;
}

export const GameStudio: React.FC<GameStudioProps> = ({
  userTier,
  currency,
  onUpgradePrompt,
  onUpgradeToExclusive,
  onSelectDeluxeBackground,
}) => {
  const [injectedSnippet, setInjectedSnippet] = useState<string | null>(null);
  const [activeMobileColumn, setActiveMobileColumn] = useState<'assets' | 'playground' | 'tools'>('playground');
  const [activeTrialGame, setActiveTrialGame] = useState<GameTemplate>(TRIAL_GAMES[0]);

  const handleInsertCode = (snippet: string) => {
    setInjectedSnippet(snippet);
  };

  const handleSelectBackground = (bg: GameBackgroundAsset) => {
    if (bg.isDeluxeDynamic) {
      onSelectDeluxeBackground();
    }
  };

  return (
    <section id="studio" className="relative py-4 sm:py-8">
      {/* 3 Trial Games Reference Bar in the Menu */}
      <div className="mb-4 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
        <TrialGamesReferenceBar
          currentTrialId={activeTrialGame.id}
          onSelectTrialGame={(template) => setActiveTrialGame(template)}
          onLoadAsReference={(template) => {
            setActiveTrialGame(template);
            setActiveMobileColumn('playground');
          }}
        />
      </div>

      {/* Studio Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-500/10 via-slate-900 to-blue-500/10 border border-slate-700/80 text-xs font-semibold text-slate-300 mb-2">
            <Gamepad2 className="w-3.5 h-3.5 text-red-400" />
            <span className="font-gamer tracking-wide">GAMER ONLINE GAME CREATOR STUDIO</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-gamer text-white tracking-wide flex items-center gap-2">
            Create Your Own Game
            <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-mono font-medium hidden sm:inline">
              3-Column IDE Layout
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Separate columns for <strong>Resources & Characters</strong>, live <strong>Coding Playground</strong>, and <strong>Dev Tools</strong>.
          </p>
        </div>

        {/* Mobile Column Switcher (Visible on small screens) */}
        <div className="flex xl:hidden items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => {
              sound.playClick();
              setActiveMobileColumn('assets');
            }}
            className={`py-1.5 px-3 rounded-lg font-bold flex items-center gap-1.5 transition ${
              activeMobileColumn === 'assets'
                ? 'bg-red-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Col 1: Assets</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveMobileColumn('playground');
            }}
            className={`py-1.5 px-3 rounded-lg font-bold flex items-center gap-1.5 transition ${
              activeMobileColumn === 'playground'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Col 2: Playground</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveMobileColumn('tools');
            }}
            className={`py-1.5 px-3 rounded-lg font-bold flex items-center gap-1.5 transition ${
              activeMobileColumn === 'tools'
                ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Col 3: Tools</span>
          </button>
        </div>
      </div>

      {/* 3-COLUMN STUDIO WORKSPACE GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 h-auto xl:h-[780px]">
        {/* COLUMN 1: Assets, Backgrounds, Characters (Span 3 on Desktop) */}
        <div
          className={`xl:col-span-3 h-[600px] xl:h-full ${
            activeMobileColumn !== 'assets' ? 'hidden xl:block' : 'block'
          }`}
        >
          <AssetsColumn
            userTier={userTier}
            currency={currency}
            onInsertCode={handleInsertCode}
            onSelectBackground={handleSelectBackground}
            onUpgradePrompt={onUpgradePrompt}
          />
        </div>

        {/* COLUMN 2: Coding Playground & Playable Screen (Span 6 on Desktop) */}
        <div
          className={`xl:col-span-6 h-[720px] xl:h-full ${
            activeMobileColumn !== 'playground' ? 'hidden xl:block' : 'block'
          }`}
        >
          <CodingPlaygroundColumn
            userTier={userTier}
            currency={currency}
            onUpgradeToExclusive={onUpgradeToExclusive}
            injectedSnippet={injectedSnippet}
            onSnippetHandled={() => setInjectedSnippet(null)}
            externalTemplate={activeTrialGame}
          />
        </div>

        {/* COLUMN 3: Tools in Menu Table (Span 3 on Desktop) */}
        <div
          className={`xl:col-span-3 h-[600px] xl:h-full ${
            activeMobileColumn !== 'tools' ? 'hidden xl:block' : 'block'
          }`}
        >
          <ToolsColumn
            userTier={userTier}
            currency={currency}
            onInjectSnippet={handleInsertCode}
            onUpgradePrompt={onUpgradePrompt}
          />
        </div>
      </div>
    </section>
  );
};
