export interface GameCharacter {
  id: string;
  name: string;
  type: 'player' | 'enemy' | 'npc';
  tierRequired: 'free' | 'exclusive' | 'pro' | 'deluxe';
  color: string;
  secondaryColor: string;
  speed: number;
  health: number;
  jumpForce: number;
  icon: string;
  snippet: string;
}

export interface GameBackgroundAsset {
  id: string;
  name: string;
  category: 'deluxe-dynamic' | 'cyber-landscape' | 'retro-space';
  tierRequired: 'free' | 'exclusive' | 'pro' | 'deluxe';
  gradient: string;
  isDeluxeDynamic?: boolean;
  snippet: string;
}

export interface GameResourceItem {
  id: string;
  name: string;
  type: 'collectible' | 'projectile' | 'hazard' | 'powerup';
  tierRequired: 'free' | 'exclusive' | 'pro' | 'deluxe';
  color: string;
  effect: string;
  snippet: string;
}

export interface GameTemplate {
  id: string;
  name: string;
  genre: string;
  description: string;
  code: string;
}
