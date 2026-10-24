import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy, Sparkles, Volume2, ShieldCheck, Flame, Zap } from 'lucide-react';
import { SubscriptionTier, CurrencyConfig } from '../../types';
import { sound } from '../../utils/sound';
import { GameAdModal } from '../ads/AdSystem';

interface GameCenterProps {
  userTier: SubscriptionTier;
  currency: CurrencyConfig;
  onUpgradeToExclusive: () => void;
}

export const GameCenter: React.FC<GameCenterProps> = ({
  userTier,
  currency,
  onUpgradeToExclusive,
}) => {
  const [activeGame, setActiveGame] = useState<'runner' | 'blaster'>('runner');
  const [showAdModal, setShowAdModal] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(420);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Runner Game state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameStateRef = useRef({
    playerY: 150,
    velocity: 0,
    isJumping: false,
    obstacles: [] as Array<{ x: number; width: number; height: number; color: 'red' | 'blue' }>,
    frame: 0,
    speed: 5,
  });

  const startGame = () => {
    sound.playClick();
    // If free tier, 30% chance to show interstitial ad before playing
    if (userTier === 'free' && Math.random() < 0.45) {
      setShowAdModal(true);
      return;
    }
    launchGame();
  };

  const launchGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    gameStateRef.current = {
      playerY: 150,
      velocity: 0,
      isJumping: false,
      obstacles: [{ x: 500, width: 25, height: 40, color: 'red' }],
      frame: 0,
      speed: 4.5,
    };
  };

  const handleJump = () => {
    if (!isPlaying || gameOver) return;
    if (!gameStateRef.current.isJumping) {
      gameStateRef.current.velocity = -11;
      gameStateRef.current.isJumping = true;
      sound.playLaser();
    }
  };

  // Game Loop for Runner
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const loop = () => {
      const state = gameStateRef.current;
      state.frame++;

      // Update player
      state.velocity += 0.65; // gravity
      state.playerY += state.velocity;
      if (state.playerY >= 150) {
        state.playerY = 150;
        state.velocity = 0;
        state.isJumping = false;
      }

      // Update obstacles
      if (state.frame % 90 === 0) {
        state.obstacles.push({
          x: canvas.width + 20,
          width: 24,
          height: Math.random() > 0.5 ? 35 : 50,
          color: Math.random() > 0.5 ? 'red' : 'blue',
        });
      }

      state.obstacles.forEach((obs) => {
        obs.x -= state.speed;
      });

      // Score counter
      if (state.frame % 8 === 0) {
        setScore((prev) => {
          const next = prev + 1;
          if (next > highScore) setHighScore(next);
          return next;
        });
      }

      // Collision check
      const playerX = 50;
      const playerWidth = 26;
      const playerHeight = 26;
      const playerActualY = state.playerY - playerHeight;

      for (let i = 0; i < state.obstacles.length; i++) {
        const obs = state.obstacles[i];
        const obsActualY = 150 - obs.height;
        if (
          playerX < obs.x + obs.width &&
          playerX + playerWidth > obs.x &&
          playerActualY + playerHeight > obsActualY
        ) {
          sound.playDenied();
          setGameOver(true);
          setIsPlaying(false);
          return;
        }
      }

      // Filter out off-screen obstacles
      state.obstacles = state.obstacles.filter((obs) => obs.x > -50);

      // Draw game frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Floor line
      ctx.beginPath();
      ctx.moveTo(0, 150);
      ctx.lineTo(canvas.width, 150);
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Floor grid accents
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.2)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 150);
        ctx.lineTo(x - 20, canvas.height);
        ctx.stroke();
      }

      // Draw Obstacles (Red and Blue laser pylons)
      state.obstacles.forEach((obs) => {
        ctx.shadowBlur = 12;
        ctx.shadowColor = obs.color === 'red' ? '#ef4444' : '#0284c7';
        ctx.fillStyle = obs.color === 'red' ? '#ef4444' : '#38bdf8';
        ctx.fillRect(obs.x, 150 - obs.height, obs.width, obs.height);
        ctx.shadowBlur = 0;

        // Energy core inside obstacle
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(obs.x + 8, 150 - obs.height + 4, obs.width - 16, obs.height - 8);
      });

      // Draw Player (Cyber Runner Drone)
      const py = state.playerY - 26;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#f43f5e';
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(playerX, py, 26, 26);

      // Cyan visor
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(playerX + 14, py + 6, 8, 5);
      ctx.shadowBlur = 0;

      // Thruster tail
      ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
      ctx.fillRect(playerX - 6, py + 10, 6, 6);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, gameOver, highScore]);

  return (
    <div id="arcade" className="relative py-10">
      {/* Interstitial Ad for Free Tier players */}
      <GameAdModal
        isOpen={showAdModal}
        onClose={() => {
          setShowAdModal(false);
          launchGame();
        }}
        currency={currency}
        onUpgradeToExclusive={onUpgradeToExclusive}
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>Instant Playable Arcade</span>
          </div>
          <h2 className="text-3xl font-bold font-gamer text-white tracking-wide">
            Gamer Online Arena
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Jump in and play directly in your browser. Subscribing removes all ad interruptions forever!
          </p>
        </div>

        {/* Ad Status badge */}
        <div className="flex items-center gap-2">
          {userTier === 'free' ? (
            <div className="px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Free Tier: Ad-Supported Gameplay</span>
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ad-Free Protected ({userTier.toUpperCase()})</span>
            </div>
          )}
        </div>
      </div>

      {/* Game Canvas Container */}
      <div className="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
        {/* Top game HUD bar */}
        <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold font-gamer text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-500" /> Cyber Runner 2099
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">| Controls: [SPACE] or Click to Jump</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-slate-400">
              Score: <strong className="text-white text-sm">{score}</strong>
            </span>
            <span className="text-yellow-400 flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" /> High: <strong>{highScore}</strong>
            </span>
          </div>
        </div>

        {/* Playable Canvas Screen */}
        <div
          onClick={handleJump}
          className="relative w-full h-[220px] bg-slate-950 flex items-center justify-center cursor-pointer select-none"
        >
          <canvas
            ref={canvasRef}
            width={760}
            height={220}
            className="w-full h-full block"
          />

          {/* Overlay when NOT playing */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center p-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startGame();
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-gamer font-bold text-base tracking-wider uppercase shadow-xl shadow-red-600/30 flex items-center gap-2 transition transform hover:scale-105"
              >
                <Play className="w-5 h-5 fill-current" /> Play Game Now
              </button>
              <p className="text-xs text-slate-400 mt-2">
                Click canvas or press Spacebar to jump over obstacles.
              </p>
            </div>
          )}

          {/* Game Over Screen */}
          {gameOver && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
              <h3 className="text-2xl font-bold font-gamer text-red-500 tracking-wide mb-1">
                SYSTEM CRASH!
              </h3>
              <p className="text-sm text-slate-300 font-mono mb-4">
                Final Score: <strong className="text-white font-bold">{score}</strong> (Best: {highScore})
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startGame();
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition transform hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
            </div>
          )}
        </div>

        {/* Bottom Game bar */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Online Server: Tokyo-01 (Ping: 12ms)</span>
          </div>

          {userTier === 'free' && (
            <button
              onClick={() => {
                sound.playClick();
                onUpgradeToExclusive();
              }}
              className="text-red-400 hover:text-red-300 font-semibold underline"
            >
              Want zero ad breaks? Exclusive starts at ₹649 only
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
