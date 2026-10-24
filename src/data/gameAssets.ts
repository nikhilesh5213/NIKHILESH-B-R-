import { GameCharacter, GameBackgroundAsset, GameResourceItem, GameTemplate } from '../types/gameStudio';

// 1. GAME CHARACTERS (Used to build your game)
export const GAME_CHARACTERS: GameCharacter[] = [
  // Basic / Classic Characters (Free to all)
  {
    id: 'retro-pixel-drone',
    name: 'Basic Pixel Runner',
    type: 'player',
    tierRequired: 'free',
    color: '#94a3b8',
    secondaryColor: '#64748b',
    speed: 5,
    health: 60,
    jumpForce: 11,
    icon: '🟩',
    snippet: `// Basic Retro Player Object (Standard)
const player = {
  x: 60,
  y: 180,
  vx: 0,
  vy: 0,
  width: 24,
  height: 24,
  color: '#94a3b8',
  speed: 5,
  jumpForce: 11,
  grounded: false,
  score: 0
};`,
  },
  {
    id: 'basic-alien-bug',
    name: 'Classic Bug Enemy',
    type: 'enemy',
    tierRequired: 'free',
    color: '#e2e8f0',
    secondaryColor: '#475569',
    speed: 3,
    health: 30,
    jumpForce: 0,
    icon: '👾',
    snippet: `// Classic Bug Enemy Object (Standard)
const enemies = [
  { x: 500, y: 190, width: 20, height: 20, vx: -3, color: '#e2e8f0' }
];`,
  },
  // Elite Characters (Pro & Deluxe Membership)
  {
    id: 'cyber-runner',
    name: 'Elite Neon Striker (Pro)',
    type: 'player',
    tierRequired: 'pro',
    color: '#ef4444',
    secondaryColor: '#38bdf8',
    speed: 7.5,
    health: 120,
    jumpForce: 14,
    icon: '⚡',
    snippet: `// Elite Neon Striker Entity (Pro Membership Resource)
const player = {
  x: 70,
  y: 160,
  vx: 0,
  vy: 0,
  width: 28,
  height: 28,
  color: '#ef4444',
  accent: '#38bdf8',
  speed: 7.5,
  jumpForce: 14,
  grounded: false,
  score: 0,
  lives: 3
};`,
  },
  {
    id: 'crimson-mecha',
    name: 'Elite Mecha Titan (Pro)',
    type: 'player',
    tierRequired: 'pro',
    color: '#dc2626',
    secondaryColor: '#f59e0b',
    speed: 6.0,
    health: 220,
    jumpForce: 12,
    icon: '🤖',
    snippet: `// Elite Mecha Titan Armor Entity (Pro Membership Resource)
const player = {
  x: 60,
  y: 160,
  vx: 0,
  vy: 0,
  width: 36,
  height: 38,
  color: '#dc2626',
  shield: 100,
  speed: 6.0,
  jumpForce: 12,
  grounded: false,
  score: 0,
  lives: 5
};`,
  },
  {
    id: 'quantum-specter',
    name: 'Elite Archon God (Deluxe)',
    type: 'player',
    tierRequired: 'deluxe',
    color: '#ec4899',
    secondaryColor: '#38bdf8',
    speed: 10,
    health: 250,
    jumpForce: 17,
    icon: '👑',
    snippet: `// Elite Archon Entity (Deluxe Subscription Resource)
const player = {
  x: 60,
  y: 160,
  vx: 0,
  vy: 0,
  width: 32,
  height: 32,
  color: '#ec4899',
  aura: 'rgba(239, 68, 68, 0.8)',
  speed: 10,
  jumpForce: 17,
  hasDoubleJump: true,
  score: 0,
  lives: 5
};`,
  },
];

// 2. GAME BACKGROUNDS (Backgrounds inside the game you are creating)
export const GAME_BACKGROUNDS: GameBackgroundAsset[] = [
  // Basic / Simple Game Backgrounds (Free to all - basic, retro, not modern)
  {
    id: 'basic-black-void',
    name: 'Basic Retro Flat Grid',
    category: 'retro-space',
    tierRequired: 'free',
    gradient: 'from-slate-900 to-black',
    isDeluxeDynamic: false,
    snippet: `// Basic Retro Game Background (Standard Free)
function drawGameBackground(ctx, width, height) {
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, width, height);
  // Simple retro flat lines
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
}`,
  },
  {
    id: 'basic-simple-stars',
    name: 'Basic Static Starfield',
    category: 'retro-space',
    tierRequired: 'free',
    gradient: 'from-gray-950 to-slate-950',
    isDeluxeDynamic: false,
    snippet: `// Basic Static Starfield Game Background (Standard Free)
function drawGameBackground(ctx, width, height) {
  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#94a3b8';
  for (let i = 0; i < 25; i++) {
    ctx.fillRect((i * 41) % width, (i * 29) % height, 2, 2);
  }
}`,
  },
  // Elite Game Backgrounds (Deluxe Subscription Only - ₹2,499)
  {
    id: 'elite-3d-hypergrid',
    name: 'Elite 3D Cyber Hypergrid (Deluxe)',
    category: 'deluxe-dynamic',
    tierRequired: 'deluxe',
    gradient: 'from-blue-900 via-slate-950 to-red-900',
    isDeluxeDynamic: true,
    snippet: `// Elite 3D Synthwave Horizon Game Background (Deluxe Subscription Only)
function drawGameBackground(ctx, width, height, tick) {
  ctx.fillStyle = '#030712';
  ctx.fillRect(0, 0, width, height);
  const horizon = height * 0.45;

  // Horizon Neon Sun
  const sunGrad = ctx.createRadialGradient(width/2, horizon, 5, width/2, horizon, 80);
  sunGrad.addColorStop(0, '#ffffff');
  sunGrad.addColorStop(0.3, '#ef4444');
  sunGrad.addColorStop(0.8, '#0284c7');
  sunGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(width/2, horizon, 75, Math.PI, 0);
  ctx.fill();

  // Perspective 3D ground lines
  ctx.strokeStyle = 'rgba(14, 165, 233, 0.45)';
  for (let y = horizon; y < height; y += 12) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  for (let i = -15; i <= 15; i++) {
    ctx.beginPath();
    ctx.moveTo(width/2, horizon);
    ctx.lineTo(width/2 + i * 55, height);
    ctx.strokeStyle = i < 0 ? 'rgba(239, 68, 68, 0.35)' : 'rgba(14, 165, 233, 0.35)';
    ctx.stroke();
  }
}`,
  },
  {
    id: 'elite-crimson-nebula',
    name: 'Elite Crimson-Azure Nebula (Deluxe)',
    category: 'deluxe-dynamic',
    tierRequired: 'deluxe',
    gradient: 'from-red-950 via-slate-950 to-blue-950',
    isDeluxeDynamic: true,
    snippet: `// Elite Crimson & Azure Interstellar Game Background (Deluxe Subscription Only)
function drawGameBackground(ctx, width, height, tick) {
  const g = ctx.createLinearGradient(0, 0, width, height);
  g.addColorStop(0, '#1c0606');
  g.addColorStop(0.5, '#050f1d');
  g.addColorStop(1, '#020617');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);

  // Luminous red & blue energy pulses
  ctx.fillStyle = 'rgba(239, 68, 68, 0.18)';
  ctx.beginPath();
  ctx.arc(width * 0.25, height * 0.3, 160 + Math.sin(tick * 0.04) * 25, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(14, 165, 233, 0.20)';
  ctx.beginPath();
  ctx.arc(width * 0.75, height * 0.65, 180 + Math.cos(tick * 0.04) * 25, 0, Math.PI * 2);
  ctx.fill();
}`,
  },
  {
    id: 'elite-tokyo-rain',
    name: 'Elite Neo-Tokyo Rain Matrix (Deluxe)',
    category: 'deluxe-dynamic',
    tierRequired: 'deluxe',
    gradient: 'from-red-900 via-slate-950 to-cyan-900',
    isDeluxeDynamic: true,
    snippet: `// Elite Neo-Tokyo Rain Matrix Game Background (Deluxe Subscription Only)
function drawGameBackground(ctx, width, height, tick) {
  ctx.fillStyle = '#030712';
  ctx.fillRect(0, 0, width, height);
  // Red & Cyan digital rain stream
  for (let i = 0; i < 35; i++) {
    const rx = (i * 37) % width;
    const ry = (tick * 8 + i * 53) % height;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(239, 68, 68, 0.7)' : 'rgba(56, 189, 248, 0.7)';
    ctx.fillRect(rx, ry, 2, 14);
  }
}`,
  },
];

// 3. GAME RESOURCES (Objects, Items, Mechanics used to build games)
export const GAME_RESOURCES: GameResourceItem[] = [
  // Basic / Standard Resources (Free to all - useful, very simple, retro)
  {
    id: 'basic-coin',
    name: 'Classic Yellow Coin',
    type: 'collectible',
    tierRequired: 'free',
    color: '#eab308',
    effect: '+50 Basic Score',
    snippet: `// Basic Collectible Coin (Standard Free)
const coins = [
  { x: 300, y: 140, radius: 6, color: '#eab308', value: 50 },
  { x: 550, y: 120, radius: 6, color: '#eab308', value: 50 }
];`,
  },
  {
    id: 'basic-spike',
    name: 'Standard Spike Trap',
    type: 'hazard',
    tierRequired: 'free',
    color: '#94a3b8',
    effect: 'Standard collision reset',
    snippet: `// Standard Static Spike Hazard (Standard Free)
const hazards = [
  { x: 420, y: 175, width: 18, height: 15, color: '#94a3b8' }
];`,
  },
  {
    id: 'basic-platform',
    name: 'Static Wooden Platform',
    type: 'hazard',
    tierRequired: 'free',
    color: '#78716c',
    effect: 'Solid walkable platform',
    snippet: `// Basic Static Platform (Standard Free)
const platforms = [
  { x: 250, y: 130, width: 80, height: 10, color: '#78716c' }
];`,
  },
  // Elite Resources (Pro & Deluxe Membership Only - ₹1,499)
  {
    id: 'elite-plasma-laser',
    name: 'Elite Dual Laser Cannon (Pro)',
    type: 'projectile',
    tierRequired: 'pro',
    color: '#38bdf8',
    effect: 'High-frequency dual lasers with particle sparks',
    snippet: `// Elite Dual Laser System (Pro Membership Resource)
function fireEliteLasers(player, bullets) {
  bullets.push({
    x: player.x + player.width,
    y: player.y + 4,
    vx: 14,
    color: '#ef4444',
    width: 16,
    height: 4,
    damage: 25
  });
  bullets.push({
    x: player.x + player.width,
    y: player.y + player.height - 4,
    vx: 14,
    color: '#38bdf8',
    width: 16,
    height: 4,
    damage: 25
  });
}`,
  },
  {
    id: 'elite-shield-generator',
    name: 'Elite Forcefield Shield Core (Pro)',
    type: 'powerup',
    tierRequired: 'pro',
    color: '#0284c7',
    effect: 'Absorbs 3 hits + glowing neon barrier',
    snippet: `// Elite Shield Generator Core (Pro Membership Resource)
const eliteShield = {
  active: true,
  hp: 3,
  radius: 26,
  color: 'rgba(14, 165, 233, 0.45)',
  glowColor: '#38bdf8'
};`,
  },
  {
    id: 'elite-homing-missile',
    name: 'Elite Homing Plasma Missile (Pro)',
    type: 'projectile',
    tierRequired: 'pro',
    color: '#f43f5e',
    effect: 'Auto-targets nearest hostile drone',
    snippet: `// Elite Homing Plasma Missile (Pro Membership Resource)
function updateHomingMissile(missile, target) {
  const angle = Math.atan2(target.y - missile.y, target.x - missile.x);
  missile.x += Math.cos(angle) * 8;
  missile.y += Math.sin(angle) * 8;
}`,
  },
  {
    id: 'elite-teleport-portal',
    name: 'Elite Quantum Warp Gate (Pro)',
    type: 'hazard',
    tierRequired: 'pro',
    color: '#a855f7',
    effect: 'Instant phase transition across coordinates',
    snippet: `// Elite Quantum Warp Gate (Pro Membership Resource)
const warpGate = {
  x: 600,
  y: 130,
  targetX: 80,
  targetY: 80,
  color: '#a855f7',
  radius: 20
};`,
  },
];

// 4. THE 3 TRIAL GAMES FOR REFERENCE
export const TRIAL_GAMES: GameTemplate[] = [
  {
    id: 'cyber-runner',
    name: 'Trial Game 1: Cyber Runner 2099',
    genre: 'Platformer / Endless Runner Architecture',
    description: 'Jump, duck, avoid laser barriers, and gather energy nodes. Reference for physics, gravity, hitboxes, and obstacle spawner loops.',
    code: `// ========================================================
// TRIAL GAME 1 REFERENCE: CYBER RUNNER 2099
// Blueprint: Platformer / Endless Runner Engine
// Creator Architecture by Nikhilesh B R
// ========================================================

// 1. Player Entity Structure
const player = {
  x: 70,
  y: 160,
  vy: 0,
  width: 26,
  height: 26,
  color: '#ef4444',
  accent: '#38bdf8',
  speed: 5.5,
  jumpForce: 13,
  grounded: false,
  score: 0,
  lives: 3
};

// 2. Obstacles and Collectibles Arrays
let obstacles = [
  { x: 500, width: 22, height: 42, color: '#ef4444' },
  { x: 800, width: 24, height: 55, color: '#0284c7' }
];

let coins = [
  { x: 350, y: 130, radius: 7, color: '#facc15' },
  { x: 650, y: 110, radius: 7, color: '#38bdf8' }
];

const floorY = 190;
const gravity = 0.65;
let tick = 0;
let gameOver = false;

// 3. Action Input Handler (Jump)
function onAction() {
  if (gameOver) {
    player.score = 0;
    player.y = 160;
    player.vy = 0;
    obstacles = [
      { x: 500, width: 22, height: 42, color: '#ef4444' },
      { x: 820, width: 24, height: 50, color: '#0284c7' }
    ];
    gameOver = false;
    return;
  }

  if (player.grounded) {
    player.vy = -player.jumpForce;
    player.grounded = false;
  }
}

// 4. Game Loop Update Logic
function update() {
  if (gameOver) return;
  tick++;

  // Apply Gravity
  player.vy += gravity;
  player.y += player.vy;

  if (player.y >= floorY - player.height) {
    player.y = floorY - player.height;
    player.vy = 0;
    player.grounded = true;
  }

  // Move and check obstacle collisions
  obstacles.forEach(obs => {
    obs.x -= player.speed;
    if (
      player.x < obs.x + obs.width &&
      player.x + player.width > obs.x &&
      player.y + player.height > floorY - obs.height
    ) {
      gameOver = true;
    }
  });

  // Cycle obstacles
  if (obstacles.length > 0 && obstacles[0].x < -50) {
    obstacles.shift();
    obstacles.push({
      x: 750 + Math.random() * 200,
      width: 22 + Math.random() * 8,
      height: 35 + Math.random() * 30,
      color: Math.random() > 0.5 ? '#ef4444' : '#0284c7'
    });
    player.score += 50;
  }

  // Collect coins
  coins.forEach(coin => {
    coin.x -= player.speed;
    const dx = (player.x + player.width / 2) - coin.x;
    const dy = (player.y + player.height / 2) - coin.y;
    if (Math.sqrt(dx * dx + dy * dy) < player.width / 2 + coin.radius) {
      player.score += 100;
      coin.x = -100;
    }
  });

  if (coins.length > 0 && coins[0].x < -50) {
    coins.shift();
    coins.push({
      x: 600 + Math.random() * 300,
      y: 90 + Math.random() * 70,
      radius: 7,
      color: Math.random() > 0.5 ? '#facc15' : '#38bdf8'
    });
  }
}

// 5. Canvas Render Pipeline
function render(ctx, width, height) {
  ctx.fillStyle = '#030712';
  ctx.fillRect(0, 0, width, height);

  // Neon Floor
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, floorY);
  ctx.lineTo(width, floorY);
  ctx.stroke();

  // Draw Coins
  coins.forEach(coin => {
    ctx.fillStyle = coin.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = coin.color;
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, coin.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  // Draw Obstacles
  obstacles.forEach(obs => {
    ctx.fillStyle = obs.color;
    ctx.shadowBlur = 12;
    ctx.shadowColor = obs.color;
    ctx.fillRect(obs.x, floorY - obs.height, obs.width, obs.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(obs.x + 6, floorY - obs.height + 4, obs.width - 12, obs.height - 8);
    ctx.shadowBlur = 0;
  });

  // Draw Player
  ctx.fillStyle = player.color;
  ctx.shadowBlur = 14;
  ctx.shadowColor = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.fillStyle = player.accent;
  ctx.fillRect(player.x + 14, player.y + 6, 8, 6);
  ctx.shadowBlur = 0;

  // HUD
  ctx.font = 'bold 14px "Rajdhani", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('SCORE: ' + player.score, 20, 30);

  if (gameOver) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 26px "Chakra Petch", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CRASH DETECTED!', width / 2, height / 2 - 10);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px "Rajdhani", sans-serif';
    ctx.fillText('PRESS SPACEBAR OR CLICK TO RESTART', width / 2, height / 2 + 25);
    ctx.textAlign = 'left';
  }
}`,
  },
  {
    id: 'laser-blaster',
    name: 'Trial Game 2: Laser Defense Arcade',
    genre: 'Shooter / Wave Defense Architecture',
    description: 'Shoot ascending hostile alien drones with dual crimson and azure lasers. Reference for projectile pooling, trajectory math, and wave spawn matrices.',
    code: `// ========================================================
// TRIAL GAME 2 REFERENCE: LASER DEFENSE ARCADE
// Blueprint: Space Shooter / Wave Defense Engine
// Creator Architecture by Nikhilesh B R
// ========================================================

const ship = {
  x: 350,
  y: 190,
  width: 32,
  height: 20,
  speed: 7,
  color: '#38bdf8'
};

let lasers = [];
let drones = [
  { x: 100, y: 30, vx: 2.2, hp: 20, color: '#ef4444' },
  { x: 260, y: 60, vx: -2.5, hp: 20, color: '#f43f5e' },
  { x: 450, y: 40, vx: 2.0, hp: 20, color: '#ef4444' }
];

let score = 0;
let gameOver = false;

function onAction() {
  if (gameOver) {
    score = 0;
    lasers = [];
    drones = [
      { x: 100, y: 30, vx: 2, hp: 20, color: '#ef4444' },
      { x: 300, y: 60, vx: -2, hp: 20, color: '#f43f5e' }
    ];
    gameOver = false;
    return;
  }

  // Fire Dual Lasers (Red left, Blue right)
  lasers.push({ x: ship.x + 6, y: ship.y, vy: -9.5, color: '#ef4444' });
  lasers.push({ x: ship.x + ship.width - 6, y: ship.y, vy: -9.5, color: '#38bdf8' });
}

function update() {
  if (gameOver) return;

  // Move lasers
  lasers.forEach(l => l.y += l.vy);
  lasers = lasers.filter(l => l.y > -20);

  // Move hostile drones
  drones.forEach(d => {
    d.x += d.vx;
    if (d.x < 20 || d.x > 680) d.vx *= -1;

    // Check hit by lasers
    lasers.forEach(l => {
      if (Math.abs(l.x - d.x) < 20 && Math.abs(l.y - d.y) < 18) {
        d.hp -= 10;
        l.y = -99;
        if (d.hp <= 0) {
          score += 150;
          d.x = 50 + Math.random() * 600;
          d.y = 20 + Math.random() * 40;
          d.hp = 20;
        }
      }
    });
  });
}

function render(ctx, width, height) {
  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, width, height);

  // Draw Space Ship
  ctx.fillStyle = ship.color;
  ctx.shadowBlur = 15;
  ctx.shadowColor = ship.color;
  ctx.beginPath();
  ctx.moveTo(ship.x + ship.width / 2, ship.y);
  ctx.lineTo(ship.x, ship.y + ship.height);
  ctx.lineTo(ship.x + ship.width, ship.y + ship.height);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;

  // Draw Lasers
  lasers.forEach(l => {
    ctx.fillStyle = l.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = l.color;
    ctx.fillRect(l.x - 2, l.y, 4, 12);
    ctx.shadowBlur = 0;
  });

  // Draw Drones
  drones.forEach(d => {
    ctx.fillStyle = d.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = d.color;
    ctx.fillRect(d.x - 12, d.y - 8, 24, 16);
    ctx.shadowBlur = 0;
  });

  ctx.font = 'bold 14px "Rajdhani", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('SCORE: ' + score, 20, 25);
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('CLICK / SPACEBAR TO FIRE DUAL LASERS', 20, 45);
}`,
  },
  {
    id: 'neon-brick-bounce',
    name: 'Trial Game 3: Quantum Brick Breaker',
    genre: 'Physics / Collision Deflection Architecture',
    description: 'Bounce the quantum particle ball to shatter neon nodes. Reference for vector reflections, multi-row matrix generation, and angle deflection.',
    code: `// ========================================================
// TRIAL GAME 3 REFERENCE: QUANTUM BRICK BREAKER
// Blueprint: 2D Physics Deflection Engine
// Creator Architecture by Nikhilesh B R
// ========================================================

const paddle = {
  x: 320,
  y: 200,
  width: 90,
  height: 12,
  color: '#0284c7'
};

const ball = {
  x: 360,
  y: 180,
  vx: 4,
  vy: -4,
  radius: 6,
  color: '#ef4444'
};

let bricks = [];
for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 8; c++) {
    bricks.push({
      x: 70 + c * 75,
      y: 35 + r * 25,
      width: 65,
      height: 18,
      color: r % 2 === 0 ? '#ef4444' : '#0284c7',
      alive: true
    });
  }
}

let score = 0;

function onAction() {
  // Move paddle right on click, wrap around
  paddle.x += 40;
  if (paddle.x > 620) paddle.x = 40;
}

function update() {
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Bounce walls
  if (ball.x < 10 || ball.x > 710) ball.vx *= -1;
  if (ball.y < 10) ball.vy *= -1;

  // Paddle collision
  if (
    ball.y + ball.radius >= paddle.y &&
    ball.x >= paddle.x &&
    ball.x <= paddle.x + paddle.width
  ) {
    ball.vy = -Math.abs(ball.vy);
  }

  // Floor reset
  if (ball.y > 230) {
    ball.x = 360;
    ball.y = 170;
    ball.vy = -4;
  }

  // Bricks collision check
  bricks.forEach(b => {
    if (b.alive &&
        ball.x > b.x && ball.x < b.x + b.width &&
        ball.y > b.y && ball.y < b.y + b.height) {
      b.alive = false;
      ball.vy *= -1;
      score += 50;
    }
  });
}

function render(ctx, width, height) {
  ctx.fillStyle = '#030712';
  ctx.fillRect(0, 0, width, height);

  // Draw paddle
  ctx.fillStyle = paddle.color;
  ctx.shadowBlur = 10;
  ctx.shadowColor = paddle.color;
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.shadowBlur = 0;

  // Draw ball
  ctx.fillStyle = ball.color;
  ctx.shadowBlur = 12;
  ctx.shadowColor = ball.color;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Draw bricks
  bricks.forEach(b => {
    if (b.alive) {
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, b.y, b.width, b.height);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.strokeRect(b.x, b.y, b.width, b.height);
    }
  });

  ctx.font = 'bold 14px "Rajdhani", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('SCORE: ' + score, 20, 25);
  ctx.fillText('CLICK TO MOVE PADDLE', width - 180, 25);
}`,
  },
];

// Fallback for GAME_TEMPLATES pointing to TRIAL_GAMES
export const GAME_TEMPLATES = TRIAL_GAMES;
