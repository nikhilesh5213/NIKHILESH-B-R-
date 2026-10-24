import React from 'react';
import { Gamepad2, ShieldCheck, Zap, Crown, Heart, ArrowUp } from 'lucide-react';
import { sound } from '../../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 border-t border-slate-800 bg-slate-950/90 text-slate-400 text-xs">
      {/* Red & Blue split line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-red-600 via-rose-500 to-blue-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-white">
                <Gamepad2 className="w-4 h-4 text-red-500" />
              </div>
              <span className="font-bold font-gamer text-lg text-white tracking-wider">
                GAMER ONLINE
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Previously Games Top. Upgraded with an electric red and blue cyberpunk aesthetic, instant arcade gaming, and tiered memberships.
            </p>
          </div>

          {/* Col 2: Subscriptions */}
          <div className="space-y-2">
            <h4 className="font-bold font-gamer text-white uppercase tracking-wider text-xs">
              Subscription Tiers
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <strong className="text-slate-200">Exclusive (₹649):</strong> No ads only
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <strong className="text-slate-200">Pro (₹1499):</strong> No ads + Resources
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-red-400 to-blue-400" />
                <strong className="text-slate-200">Deluxe (₹2499):</strong> Gorgeous backgrounds
              </li>
            </ul>
          </div>

          {/* Col 3: Currencies */}
          <div className="space-y-2">
            <h4 className="font-bold font-gamer text-white uppercase tracking-wider text-xs">
              Supported Currencies
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Native real-time pricing available in Indian Rupee (INR ₹), Euro (EUR €), US Dollar (USD $), British Pound (GBP £), Japanese Yen (JPY ¥), and Canadian Dollar (CAD $).
            </p>
          </div>

          {/* Col 4: Platform Guarantee */}
          <div className="space-y-2">
            <h4 className="font-bold font-gamer text-white uppercase tracking-wider text-xs">
              Platform Features
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Playable instant web games, zero-ad engine, downloadable pro configs & crosshair codes, 4K wallpapers, and responsive canvas visualizers.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-[11px]">
            © {new Date().getFullYear()} <strong className="text-white">Gamer Online</strong>. Created by <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-blue-400 font-bold">Nikhilesh B R</span>. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
