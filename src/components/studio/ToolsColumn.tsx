import React, { useState } from 'react';
import { 
  Wrench, 
  Sliders, 
  Volume2, 
  Sparkles, 
  Download, 
  Share2, 
  Layers, 
  Activity, 
  Play, 
  Check, 
  Plus,
  ShieldAlert,
  Flame,
  Zap,
  Cpu
} from 'lucide-react';
import { SubscriptionTier, CurrencyConfig } from '../../types';
import { sound } from '../../utils/sound';

interface ToolsColumnProps {
  userTier: SubscriptionTier;
  currency: CurrencyConfig;
  onInjectSnippet: (snippet: string) => void;
  onUpgradePrompt: (tier: 'pro' | 'deluxe') => void;
}

export const ToolsColumn: React.FC<ToolsColumnProps> = ({
  userTier,
  currency,
  onInjectSnippet,
  onUpgradePrompt,
}) => {
  const [activeToolTab, setActiveToolTab] = useState<'inspector' | 'physics' | 'audio' | 'particles' | 'export'>('inspector');

  // Inspector & Physics state
  const [gravity, setGravity] = useState(0.65);
  const [jumpForce, setJumpForce] = useState(13);
  const [speed, setSpeed] = useState(5.5);
  const [friction, setFriction] = useState(0.98);

  // Particle state
  const [particleColor, setParticleColor] = useState<'red' | 'blue' | 'dual'>('dual');
  const [particleDensity, setParticleDensity] = useState(25);

  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [injectedNotice, setInjectedNotice] = useState<string | null>(null);

  const handleInject = (label: string, codeSnippet: string) => {
    sound.playClick();
    onInjectSnippet(codeSnippet);
    setInjectedNotice(`Injected ${label} into Playground`);
    setTimeout(() => setInjectedNotice(null), 2000);
  };

  const handleExportGame = () => {
    sound.playUpgrade();
    // Generate standalone self-contained playable HTML file
    const standaloneHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Gamer Online Custom Game</title>
  <style>
    body { margin: 0; background: #030712; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; }
    canvas { border: 2px solid #ef4444; border-radius: 12px; box-shadow: 0 0 25px rgba(14, 165, 233, 0.4); }
    h1 { margin-bottom: 8px; font-size: 24px; color: #ef4444; text-shadow: 0 0 10px #ef4444; }
    p { font-size: 13px; color: #94a3b8; }
  </style>
</head>
<body>
  <h1>Gamer Online Custom Game</h1>
  <p>Press SPACEBAR or Click to Play</p>
  <canvas id="c" width="740" height="240"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    let tick = 0;
    let score = 0;
    const player = { x: 70, y: 160, vy: 0, w: 26, h: 26, color: '#ef4444' };
    let obstacles = [{ x: 500, w: 22, h: 40, color: '#ef4444' }];
    const floorY = 190;
    let gameOver = false;

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        if (gameOver) { gameOver = false; score = 0; obstacles = [{ x: 500, w: 22, h: 40, color: '#ef4444' }]; }
        else if (player.y >= floorY - player.h) { player.vy = -13; }
      }
    });

    function loop() {
      tick++;
      if (!gameOver) {
        player.vy += 0.65;
        player.y += player.vy;
        if (player.y >= floorY - player.h) { player.y = floorY - player.h; player.vy = 0; }
        obstacles.forEach(o => {
          o.x -= 5;
          if (player.x < o.x + o.w && player.x + player.w > o.x && player.y + player.h > floorY - o.h) { gameOver = true; }
        });
        if (obstacles[0].x < -50) {
          obstacles.shift();
          obstacles.push({ x: 750, w: 24, h: 35 + Math.random() * 25, color: Math.random() > 0.5 ? '#ef4444' : '#0284c7' });
          score += 50;
        }
      }
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, floorY, canvas.width, 1);
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.w, player.h);
      obstacles.forEach(o => { ctx.fillStyle = o.color; ctx.fillRect(o.x, floorY - o.h, o.w, o.h); });
      ctx.fillStyle = '#fff';
      ctx.fillText('SCORE: ' + score, 20, 25);
      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ef4444';
        ctx.fillText('GAME OVER - PRESS SPACEBAR', 280, 120);
      }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`;

    const blob = new Blob([standaloneHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Gamer_Online_Custom_Game.html';
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Column Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/70">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-gradient-to-r from-red-500/20 to-blue-500/20 text-blue-400 border border-blue-500/30">
              <Wrench className="w-4 h-4" />
            </span>
            <h3 className="font-bold font-gamer text-white text-base tracking-wide">
              Tools Menu Table
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
            COLUMN 3
          </span>
        </div>

        {/* Menu Table Tabs */}
        <div className="grid grid-cols-4 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[11px]">
          {[
            { id: 'inspector', label: 'Physics', icon: Sliders },
            { id: 'audio', label: 'Audio FX', icon: Volume2 },
            { id: 'particles', label: 'Particles', icon: Sparkles },
            { id: 'export', label: 'Export', icon: Download },
          ].map((tool) => {
            const Icon = tool.icon;
            const isActive = activeToolTab === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => {
                  sound.playClick();
                  setActiveToolTab(tool.id as typeof activeToolTab);
                }}
                className={`py-1.5 px-1.5 rounded-lg font-bold uppercase transition flex flex-col items-center justify-center gap-1 ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="truncate">{tool.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notice alert */}
      {injectedNotice && (
        <div className="mx-3 mt-3 p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-1.5 animate-fadeIn">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{injectedNotice}</span>
        </div>
      )}

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* 1. PHYSICS & INSPECTOR TOOL */}
        {activeToolTab === 'inspector' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-white font-gamer text-sm flex items-center gap-2 mb-1">
                <Sliders className="w-4 h-4 text-blue-400" />
                Scene Physics & Mechanics
              </h4>
              <p className="text-[11px] text-slate-400">
                Calibrate engine parameters and inject customized physics formulas into the playground.
              </p>
            </div>

            {/* Gravity Slider */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex justify-between font-mono">
                <span className="text-slate-300">Gravity Constant</span>
                <span className="text-red-400 font-bold">{gravity} G</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.5"
                step="0.05"
                value={gravity}
                onChange={(e) => setGravity(parseFloat(e.target.value))}
                className="w-full accent-red-500 cursor-pointer"
              />
            </div>

            {/* Jump Force Slider */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex justify-between font-mono">
                <span className="text-slate-300">Jump Velocity</span>
                <span className="text-blue-400 font-bold">{jumpForce} px/frame</span>
              </div>
              <input
                type="range"
                min="8"
                max="22"
                step="1"
                value={jumpForce}
                onChange={(e) => setJumpForce(parseInt(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            {/* Speed Slider */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex justify-between font-mono">
                <span className="text-slate-300">Movement Velocity</span>
                <span className="text-emerald-400 font-bold">{speed}x</span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <button
              onClick={() => {
                const physicsCode = `// --- CUSTOM PHYSICS INJECTED FROM TOOLS ---
const gravity = ${gravity};
player.jumpForce = ${jumpForce};
player.speed = ${speed};`;
                handleInject('Physics Configuration', physicsCode);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-gamer font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              Apply Physics To Playground
            </button>
          </div>
        )}

        {/* 2. AUDIO & SFX TOOL */}
        {activeToolTab === 'audio' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-white font-gamer text-sm flex items-center gap-2 mb-1">
                <Volume2 className="w-4 h-4 text-red-400" />
                Zero-Latency Web Audio FX
              </h4>
              <p className="text-[11px] text-slate-400">
                Audition real-time synthesized retro SFX and embed audio trigger code.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { name: 'Plasma Laser Beam', sound: () => sound.playLaser(), code: `// Play Laser SFX\nfunction playLaserAudio() {\n  const ctx = new (window.AudioContext || window.webkitAudioContext)();\n  const osc = ctx.createOscillator();\n  const g = ctx.createGain();\n  osc.type = 'sawtooth';\n  osc.frequency.setValueAtTime(850, ctx.currentTime);\n  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);\n  g.gain.setValueAtTime(0.1, ctx.currentTime);\n  g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);\n  osc.connect(g); g.connect(ctx.destination);\n  osc.start(); osc.stop(ctx.currentTime + 0.1);\n}` },
                { name: 'Victory Fanfare', sound: () => sound.playUpgrade(), code: `// Victory Fanfare Audio\nfunction playVictoryAudio() {\n  const ctx = new (window.AudioContext || window.webkitAudioContext)();\n  [440, 554, 659, 880].forEach((f, i) => {\n    const osc = ctx.createOscillator();\n    osc.type = 'triangle';\n    osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.08);\n    osc.connect(ctx.destination);\n    osc.start(ctx.currentTime + i * 0.08);\n    osc.stop(ctx.currentTime + i * 0.08 + 0.2);\n  });\n}` },
                { name: 'Hit / Crash Alert', sound: () => sound.playDenied(), code: `// Collision Crash Tone\nfunction playCrashAudio() {\n  const ctx = new (window.AudioContext || window.webkitAudioContext)();\n  const osc = ctx.createOscillator();\n  osc.type = 'sawtooth';\n  osc.frequency.setValueAtTime(140, ctx.currentTime);\n  osc.connect(ctx.destination);\n  osc.start(); osc.stop(ctx.currentTime + 0.15);\n}` },
              ].map((sfx, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-white block">{sfx.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Synthesizer node</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => sfx.sound()}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 transition"
                      title="Audition"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={() => handleInject(sfx.name, sfx.code)}
                      className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] flex items-center gap-1 transition"
                    >
                      <Plus className="w-3 h-3" /> Insert
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. PARTICLE FX EMITTER */}
        {activeToolTab === 'particles' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-white font-gamer text-sm flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-red-400" />
                Red & Blue Particle Emitter
              </h4>
              <p className="text-[11px] text-slate-400">
                Add glowing cyber particle explosions and thruster trails.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-slate-300 font-semibold block">Emitter Palette</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'red', label: 'Crimson Flame', color: '#ef4444' },
                  { id: 'blue', label: 'Azure Plasma', color: '#0284c7' },
                  { id: 'dual', label: 'Dual Fusion', color: '#ec4899' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      sound.playClick();
                      setParticleColor(p.id as typeof particleColor);
                    }}
                    className={`py-2 px-1 rounded-xl text-center border font-semibold text-[11px] transition ${
                      particleColor === p.id
                        ? 'border-blue-500 bg-blue-950/60 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block mr-1"
                      style={{ backgroundColor: p.color }}
                    />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex justify-between font-mono">
                <span className="text-slate-300">Particles Emitted / sec</span>
                <span className="text-rose-400 font-bold">{particleDensity}</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={particleDensity}
                onChange={(e) => setParticleDensity(parseInt(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            <button
              onClick={() => {
                const particleCode = `// --- PARTICLE EMITTER CODE ---
const particles = [];
function spawnBurst(x, y) {
  for (let i = 0; i < ${particleDensity}; i++) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      radius: Math.random() * 3 + 1,
      color: ${particleColor === 'red' ? "'#ef4444'" : particleColor === 'blue' ? "'#0284c7'" : "i % 2 === 0 ? '#ef4444' : '#0284c7'"},
      life: 30
    });
  }
}`;
                handleInject('Particle Burst Emitter', particleCode);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-gamer font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              Inject Particle System
            </button>
          </div>
        )}

        {/* 4. EXPORT & PUBLISH TOOL */}
        {activeToolTab === 'export' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-white font-gamer text-sm flex items-center gap-2 mb-1">
                <Download className="w-4 h-4 text-emerald-400" />
                Export & Publish Game
              </h4>
              <p className="text-[11px] text-slate-400">
                Package your game into an independent, self-contained HTML5 web application.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                <Cpu className="w-4 h-4 text-blue-400" /> Standalone Single-File Bundle
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Includes HTML, CSS, JavaScript, canvas game loops, and retro audio synthesizer in one file. Runs offline in Chrome, Safari, Firefox, or Edge.
              </p>
              <button
                onClick={handleExportGame}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-gamer font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition"
              >
                <Download className="w-4 h-4" />
                Download Playable .HTML
              </button>
              {downloadSuccess && (
                <div className="text-center font-semibold text-emerald-400 text-xs">
                  ✓ Game bundle downloaded successfully!
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-2">
              <span className="font-bold text-white text-xs block">Engine Specifications</span>
              <div className="space-y-1 text-[11px] text-slate-400 font-mono">
                <div>• Resolution: 740 x 240 Native Canvas</div>
                <div>• Frame Rate: VSync 60 FPS Engine</div>
                <div>• Platform: Gamer Online 2.0 Web Studio</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
