import React, { useState } from 'react';
import { 
  Gamepad2, 
  Layers, 
  Sparkles, 
  BookOpen, 
  Code2, 
  ArrowRight, 
  Check, 
  Play, 
  ChevronDown, 
  X,
  Cpu,
  Trophy
} from 'lucide-react';
import { TRIAL_GAMES } from '../../data/gameAssets';
import { GameTemplate } from '../../types/gameStudio';
import { sound } from '../../utils/sound';

interface TrialGamesReferenceBarProps {
  currentTrialId: string;
  onSelectTrialGame: (template: GameTemplate) => void;
  onLoadAsReference: (template: GameTemplate) => void;
}

export const TrialGamesReferenceBar: React.FC<TrialGamesReferenceBarProps> = ({
  currentTrialId,
  onSelectTrialGame,
  onLoadAsReference,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<GameTemplate>(TRIAL_GAMES[0]);

  const activeGame = TRIAL_GAMES.find((g) => g.id === currentTrialId) || TRIAL_GAMES[0];

  return (
    <div className="w-full bg-slate-950/90 border-b border-slate-800 p-2 sm:p-3 relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Left Label */}
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-gradient-to-r from-red-600/30 to-blue-600/30 text-white border border-blue-500/40 shrink-0">
            <Gamepad2 className="w-4 h-4 text-rose-400" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-gamer tracking-wide text-white uppercase">
                3 Trial Games Reference Bar
              </span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-blue-950 text-blue-300 border border-blue-500/30">
                Blueprint Studio
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Study these 3 trial games as architectural reference to engineer your own custom game.
            </p>
          </div>
        </div>

        {/* 3 Trial Game Selectors */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {TRIAL_GAMES.map((trial, index) => {
            const isSelected = trial.id === currentTrialId;
            return (
              <button
                key={trial.id}
                onClick={() => {
                  sound.playClick();
                  onSelectTrialGame(trial);
                  setSelectedPreview(trial);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-md shadow-red-500/20 border border-blue-400'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/40 text-[10px] flex items-center justify-center font-mono font-bold">
                  {index + 1}
                </span>
                <span>{trial.name.split(':')[1]?.trim() || trial.name}</span>
              </button>
            );
          })}

          {/* Blueprint Reference Breakdown Button */}
          <button
            onClick={() => {
              sound.playClick();
              setIsOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-blue-300 hover:text-white border border-blue-500/40 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Inspect Blueprint</span>
          </button>
        </div>
      </div>

      {/* Blueprint Reference Inspector Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 to-blue-600 rounded-t-2xl" />

            <div className="flex items-start justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-rose-400 bg-red-950/60 border border-red-500/30 px-2 py-0.5 rounded">
                  Game Architecture Blueprint
                </span>
                <h3 className="text-2xl font-bold font-gamer text-white tracking-wide mt-1">
                  {selectedPreview.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedPreview.genre}</p>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Trial Game Switcher inside modal */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {TRIAL_GAMES.map((tg, i) => (
                <button
                  key={tg.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedPreview(tg);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    selectedPreview.id === tg.id
                      ? 'border-blue-500 bg-blue-950/50 text-white'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-[10px] font-mono text-blue-400 font-bold block">
                    TRIAL {i + 1}
                  </span>
                  <span className="text-xs font-bold font-gamer line-clamp-1 text-white">
                    {tg.name.split(':')[1]?.trim() || tg.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Architecture Pillars */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-gamer flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-red-400" />
                How to use this trial game as reference to build your own:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <h5 className="font-bold text-white mb-1">1. Entity & State Architecture</h5>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Notice how player coordinates, jump velocity, grounded state, and score variables are structured as an extensible object.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <h5 className="font-bold text-white mb-1">2. Collision & Physics Pipeline</h5>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Uses bounding-box hitbox detection (`x &lt; obs.x + obs.width`) to trigger events without heavy external libraries.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <h5 className="font-bold text-white mb-1">3. Spawner & Memory Cleanup</h5>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Arrays of entities shift and respawn as they leave the screen, preventing memory leaks and maintaining 60 FPS.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <h5 className="font-bold text-white mb-1">4. Red & Blue Visual Styling</h5>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Dual neon canvas shaders with shadowBlur effects render smooth glowing lines and particles on any phone screen.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsOpen(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white"
              >
                Close
              </button>

              <button
                onClick={() => {
                  sound.playUpgrade();
                  onLoadAsReference(selectedPreview);
                  setIsOpen(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-gamer font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition"
              >
                <Code2 className="w-4 h-4" />
                <span>Load Blueprint into Playground</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
