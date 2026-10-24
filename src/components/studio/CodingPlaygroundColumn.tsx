import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Square, 
  RotateCcw, 
  Code2, 
  Terminal, 
  Sparkles, 
  Check, 
  Copy, 
  ShieldCheck, 
  AlertCircle,
  FileCode,
  Zap,
  Maximize2
} from 'lucide-react';
import { GameTemplate } from '../../types/gameStudio';
import { GAME_TEMPLATES } from '../../data/gameAssets';
import { SubscriptionTier, CurrencyConfig } from '../../types';
import { formatPrice } from '../../data/subscriptions';
import { sound } from '../../utils/sound';

interface CodingPlaygroundColumnProps {
  userTier: SubscriptionTier;
  currency: CurrencyConfig;
  onUpgradeToExclusive: () => void;
  injectedSnippet: string | null;
  onSnippetHandled: () => void;
  externalTemplate?: GameTemplate | null;
}

export const CodingPlaygroundColumn: React.FC<CodingPlaygroundColumnProps> = ({
  userTier,
  currency,
  onUpgradeToExclusive,
  injectedSnippet,
  onSnippetHandled,
  externalTemplate,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<GameTemplate>(GAME_TEMPLATES[0]);
  const [code, setCode] = useState<string>(GAME_TEMPLATES[0].code);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [errorLog, setErrorLog] = useState<string | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'Gamer Online 2D Engine Initialized.',
    'Loaded trial reference: ' + GAME_TEMPLATES[0].name,
    'Canvas 60 FPS ready (Sub-1s zero latency).',
  ]);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Sync external template if user selects one from the Trial Games Bar
  useEffect(() => {
    if (externalTemplate) {
      setSelectedTemplate(externalTemplate);
      setCode(externalTemplate.code);
      compileAndExecute(externalTemplate.code);
      setConsoleLogs((prev) => [
        ...prev.slice(-6),
        `>> Loaded Blueprint Reference: ${externalTemplate.name}. Use this architecture to construct your game.`,
      ]);
    }
  }, [externalTemplate]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const runtimeContextRef = useRef<{
    updateFn?: () => void;
    renderFn?: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
    actionFn?: () => void;
  }>({});

  // Insert code snippet if passed from Column 1 (Assets) or Column 3 (Tools)
  useEffect(() => {
    if (injectedSnippet) {
      setCode((prev) => {
        return prev + '\n\n' + injectedSnippet;
      });
      setConsoleLogs((prev) => [...prev.slice(-6), '>> Asset snippet injected into script.']);
      onSnippetHandled();
      // Auto run on injection
      setTimeout(() => compileAndExecute(code + '\n\n' + injectedSnippet), 50);
    }
  }, [injectedSnippet]);

  // Compile and evaluate script safely
  const compileAndExecute = (sourceCode: string) => {
    try {
      setErrorLog(null);
      // Create isolated sandbox function with canvas context helpers
      // We expose update, render, onAction
      const builder = new Function(
        sourceCode +
        `\nreturn {
          update: typeof update === 'function' ? update : undefined,
          render: typeof render === 'function' ? render : undefined,
          onAction: typeof onAction === 'function' ? onAction : undefined,
        };`
      );

      const exported = builder();
      runtimeContextRef.current = {
        updateFn: exported.update,
        renderFn: exported.render,
        actionFn: exported.onAction,
      };

      setConsoleLogs((prev) => [
        ...prev.slice(-6),
        `[${new Date().toLocaleTimeString()}] Script compiled successfully. Engine active.`,
      ]);
      sound.playClick();
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setErrorLog(errMsg);
      sound.playDenied();
      setConsoleLogs((prev) => [
        ...prev.slice(-6),
        `[${new Date().toLocaleTimeString()}] COMPILATION ERROR: ${errMsg}`,
      ]);
    }
  };

  // Switch template
  const handleTemplateChange = (template: GameTemplate) => {
    sound.playClick();
    setSelectedTemplate(template);
    setCode(template.code);
    compileAndExecute(template.code);
  };

  // Trigger Action
  const triggerAction = () => {
    if (runtimeContextRef.current.actionFn) {
      runtimeContextRef.current.actionFn();
      sound.playLaser();
    }
  };

  // Keyboard controls for game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space or ArrowUp to trigger action
      if (e.code === 'Space' && (document.activeElement?.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        triggerAction();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main 60fps Game Loop
  useEffect(() => {
    compileAndExecute(code);
  }, [selectedTemplate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const gameLoop = () => {
      if (isRunning && !errorLog) {
        try {
          if (runtimeContextRef.current.updateFn) {
            runtimeContextRef.current.updateFn();
          }
          if (runtimeContextRef.current.renderFn) {
            runtimeContextRef.current.renderFn(ctx, canvas.width, canvas.height);
          }
        } catch (runtimeErr: unknown) {
          const msg = runtimeErr instanceof Error ? runtimeErr.message : String(runtimeErr);
          setErrorLog('Runtime Exception: ' + msg);
        }
      }
      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, errorLog]);

  const handleCopyCode = () => {
    sound.playClick();
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="flex flex-col h-full bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Column Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Code2 className="w-4 h-4" />
          </span>
          <div>
            <h3 className="font-bold font-gamer text-white text-base tracking-wide flex items-center gap-2">
              Coding Playground
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Live 60 FPS Engine
              </span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Template Selector */}
          <select
            value={selectedTemplate.id}
            onChange={(e) => {
              const found = GAME_TEMPLATES.find((t) => t.id === e.target.value);
              if (found) handleTemplateChange(found);
            }}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 font-semibold focus:outline-none focus:border-blue-500"
          >
            {GAME_TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                Template: {t.name}
              </option>
            ))}
          </select>

          <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded hidden sm:inline">
            COLUMN 2
          </span>
        </div>
      </div>

      {/* 1. PLAYABLE GAME SCREEN */}
      <div className="p-3 bg-slate-950 border-b border-slate-800">
        <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            width={740}
            height={240}
            onClick={triggerAction}
            className="w-full h-[220px] sm:h-[240px] block cursor-pointer select-none bg-black"
          />

          {/* Top Canvas HUD overlay */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
            <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {isRunning ? 'RUNNING' : 'PAUSED'} • {selectedTemplate.name}
            </span>

            <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-slate-300 border border-white/10">
              SPACEBAR / Click = Action
            </span>
          </div>

          {/* Error overlay on canvas if script fails */}
          {errorLog && (
            <div className="absolute inset-0 bg-red-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
              <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
              <h4 className="text-sm font-bold text-white font-gamer">SYNTAX OR RUNTIME ERROR</h4>
              <p className="text-xs text-red-200 font-mono mt-1 max-w-md">{errorLog}</p>
              <button
                onClick={() => {
                  setCode(selectedTemplate.code);
                  compileAndExecute(selectedTemplate.code);
                }}
                className="mt-3 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Template Code
              </button>
            </div>
          )}
        </div>

        {/* Canvas Control Bar */}
        <div className="mt-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setIsRunning(!isRunning);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {isRunning ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isRunning ? 'Pause Engine' : 'Resume Engine'}
            </button>

            <button
              onClick={() => {
                sound.playClick();
                compileAndExecute(code);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
              Restart State
            </button>

            <button
              onClick={triggerAction}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-500/20 transition active:scale-95"
            >
              <Zap className="w-3.5 h-3.5" />
              Jump / Action
            </button>
          </div>

          {/* Ad Status indicator */}
          <div className="hidden md:flex items-center">
            {userTier === 'free' ? (
              <button
                onClick={() => {
                  sound.playClick();
                  onUpgradeToExclusive();
                }}
                className="text-[11px] text-red-400 hover:text-red-300 font-medium underline"
              >
                Exclusive removes all simulator ads for {formatPrice(currency.prices.exclusive, currency)}
              </button>
            ) : (
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Ad-Free Playground ({userTier.toUpperCase()})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. LIVE CODE EDITOR */}
      <div className="flex-1 flex flex-col min-h-[240px] bg-slate-950">
        {/* Editor Toolbar */}
        <div className="px-3 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-red-400" />
            <span className="font-mono text-slate-300 font-bold">
              game_script.js ({lineCount} lines)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition"
            >
              {copySuccess ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copySuccess ? 'Copied!' : 'Copy Code'}
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setCode(selectedTemplate.code);
                compileAndExecute(selectedTemplate.code);
              }}
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Code
            </button>

            <button
              onClick={() => compileAndExecute(code)}
              className="px-4 py-1 rounded-md bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-gamer font-bold text-xs uppercase tracking-wider shadow-md shadow-red-500/20 flex items-center gap-1.5 transition transform active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Run Script
            </button>
          </div>
        </div>

        {/* Code Textarea with line numbers */}
        <div className="flex-1 relative flex overflow-hidden">
          {/* Line Numbers column */}
          <div className="w-10 bg-slate-950/90 border-r border-slate-800/80 py-3 text-right pr-2.5 font-mono text-[11px] text-slate-600 select-none overflow-hidden">
            {Array.from({ length: Math.min(lineCount, 300) }).map((_, i) => (
              <div key={i} className="leading-5">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              // Quick Ctrl+Enter / Cmd+Enter to run
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                compileAndExecute(code);
              }
            }}
            spellCheck={false}
            className="flex-1 p-3 bg-transparent font-mono text-xs text-slate-200 leading-5 resize-none focus:outline-none selection:bg-red-600 selection:text-white overflow-y-auto whitespace-pre font-normal tracking-wide"
            placeholder="// Write custom JavaScript game code here..."
          />
        </div>

        {/* 3. CONSOLE LOGS DRAWER */}
        <div className="border-t border-slate-800/80 bg-slate-950/90 p-2.5 max-h-24 overflow-y-auto font-mono text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-bold uppercase tracking-wider text-[10px]">Console Output</span>
          </div>
          <div className="space-y-0.5">
            {consoleLogs.map((log, i) => (
              <div
                key={i}
                className={log.includes('ERROR') ? 'text-red-400 font-bold' : 'text-slate-400'}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
