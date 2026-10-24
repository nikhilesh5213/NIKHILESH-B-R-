import React, { useEffect, useRef } from 'react';
import { DeluxeBackgroundTheme } from '../../types';

interface DynamicBackgroundProps {
  theme: DeluxeBackgroundTheme;
  isActive: boolean; // active when Deluxe tier is subscribed or during preview
  previewRemaining?: number | null;
  intensity?: number; // 0.5 to 1.5
}

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({
  theme,
  isActive,
  intensity = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates for interactive themes
    let mouse = { x: width / 2, y: height / 2, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particles setup based on theme
    const particleCount = isActive ? Math.floor(75 * intensity) : 25;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: 'red' | 'blue';
      alpha: number;
      pulse: number;
      char?: string;
    }> = [];

    const chars = '01ABCDEF9X#$<>{}';
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 3 + 1.5,
        color: i % 2 === 0 ? 'red' : 'blue',
        alpha: Math.random() * 0.7 + 0.3,
        pulse: Math.random() * Math.PI * 2,
        char: chars[Math.floor(Math.random() * chars.length)],
      });
    }

    let tick = 0;

    const render = () => {
      tick += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Deep dark cyber background base
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#030712');
      gradient.addColorStop(0.5, '#050b1d');
      gradient.addColorStop(1, '#0c0512');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      if (!isActive) {
        // Standard sleek Red & Blue subtle glow for non-deluxe
        const redGlow = ctx.createRadialGradient(width * 0.15, height * 0.2, 10, width * 0.15, height * 0.2, 450);
        redGlow.addColorStop(0, 'rgba(239, 68, 68, 0.08)');
        redGlow.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = redGlow;
        ctx.fillRect(0, 0, width, height);

        const blueGlow = ctx.createRadialGradient(width * 0.85, height * 0.75, 10, width * 0.85, height * 0.75, 450);
        blueGlow.addColorStop(0, 'rgba(14, 165, 233, 0.09)');
        blueGlow.addColorStop(1, 'rgba(14, 165, 233, 0)');
        ctx.fillStyle = blueGlow;
        ctx.fillRect(0, 0, width, height);

        // Subtle drifting dust
        particles.slice(0, 20).forEach((p) => {
          p.x += p.vx * 0.4;
          p.y += p.vy * 0.4;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = p.color === 'red' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(14, 165, 233, 0.25)';
          ctx.fill();
        });

        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // DELUXE ACTIVE BACKGROUNDS:
      if (theme === 'crimson-azure-void') {
        // Bioluminescent red & blue energy filaments & interconnected nodes
        // Atmospheric radial pulses
        const rg = ctx.createRadialGradient(width * 0.25 + Math.sin(tick) * 50, height * 0.35, 10, width * 0.25, height * 0.35, 600);
        rg.addColorStop(0, 'rgba(239, 68, 68, 0.16)');
        rg.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = rg;
        ctx.fillRect(0, 0, width, height);

        const bg = ctx.createRadialGradient(width * 0.75 + Math.cos(tick) * 50, height * 0.65, 10, width * 0.75, height * 0.65, 600);
        bg.addColorStop(0, 'rgba(14, 165, 233, 0.18)');
        bg.addColorStop(1, 'rgba(14, 165, 233, 0)');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);

        // Constellation laser connections between nearby particles
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 115) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              const strokeGrad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
              strokeGrad.addColorStop(0, particles[i].color === 'red' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(14, 165, 233, 0.25)');
              strokeGrad.addColorStop(1, particles[j].color === 'red' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(14, 165, 233, 0.25)');
              ctx.strokeStyle = strokeGrad;
              ctx.lineWidth = (1 - dist / 115) * 1.5;
              ctx.stroke();
            }
          }
        }

        // Draw glowing particle nodes
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.shadowBlur = 12;
          ctx.shadowColor = p.color === 'red' ? '#ef4444' : '#0ea5e9';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color === 'red' ? 'rgba(248, 113, 113, 0.9)' : 'rgba(56, 189, 248, 0.9)';
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      } else if (theme === 'neon-hypergrid') {
        // 3D perspective synthwave grid moving forward
        const horizonY = height * 0.45;
        const speed = (tick * 45) % 40;

        // Dual Neon Sun on the horizon
        const sunRadius = 90;
        const sunGrad = ctx.createRadialGradient(width / 2, horizonY, 5, width / 2, horizonY, sunRadius);
        sunGrad.addColorStop(0, '#ffffff');
        sunGrad.addColorStop(0.3, '#f43f5e');
        sunGrad.addColorStop(0.7, '#0284c7');
        sunGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(width / 2, horizonY, sunRadius, Math.PI, 0, false);
        ctx.fill();

        // Horizontal perspective lines
        for (let y = horizonY; y < height; y += 4) {
          const depth = (y - horizonY) / (height - horizonY);
          const offset = (y + speed * depth * 3) % 45;
          if (offset < 2.5) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${depth * 0.4})`;
            ctx.lineWidth = depth * 2;
            ctx.stroke();
          }
        }

        // Perspective vertical rays radiating from center horizon
        const vanishX = width / 2;
        const lineCount = 30;
        for (let i = -lineCount; i <= lineCount; i++) {
          const bottomX = vanishX + i * 70;
          ctx.beginPath();
          ctx.moveTo(vanishX, horizonY);
          ctx.lineTo(bottomX, height);
          ctx.strokeStyle = i < 0 ? 'rgba(239, 68, 68, 0.28)' : 'rgba(14, 165, 233, 0.28)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      } else if (theme === 'nebula-vortex') {
        // Swirling interstellar ruby & sapphire clouds
        const centerX = width / 2;
        const centerY = height / 2;

        for (let i = 0; i < 3; i++) {
          const angle = tick * 0.3 + (i * Math.PI * 2) / 3;
          const rx = centerX + Math.cos(angle) * (width * 0.2);
          const ry = centerY + Math.sin(angle) * (height * 0.2);

          const grad = ctx.createRadialGradient(rx, ry, 20, rx, ry, 500);
          if (i % 2 === 0) {
            grad.addColorStop(0, 'rgba(239, 68, 68, 0.2)');
            grad.addColorStop(0.6, 'rgba(225, 29, 72, 0.08)');
            grad.addColorStop(1, 'rgba(0,0,0,0)');
          } else {
            grad.addColorStop(0, 'rgba(14, 165, 233, 0.22)');
            grad.addColorStop(0.6, 'rgba(37, 99, 235, 0.08)');
            grad.addColorStop(1, 'rgba(0,0,0,0)');
          }
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);
        }

        // Swirling dust particles
        particles.forEach((p, idx) => {
          const r = 100 + (idx * 7) % (width * 0.45);
          const currAngle = tick * (idx % 2 === 0 ? 0.35 : -0.25) + idx;
          p.x = centerX + Math.cos(currAngle) * r;
          p.y = centerY + Math.sin(currAngle) * (r * 0.6);

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = p.color === 'red' ? 'rgba(251, 113, 133, 0.8)' : 'rgba(125, 211, 252, 0.8)';
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color === 'red' ? '#ef4444' : '#38bdf8';
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      } else if (theme === 'cyber-rain') {
        // Neo-Tokyo matrix falling rain
        particles.forEach((p) => {
          p.y += (p.vy + 3) * 1.8;
          if (p.y > height) {
            p.y = 0;
            p.x = Math.random() * width;
          }

          ctx.font = '14px "Chakra Petch", monospace';
          ctx.fillStyle = p.color === 'red' ? 'rgba(239, 68, 68, 0.85)' : 'rgba(56, 189, 248, 0.85)';
          ctx.fillText(p.char || '1', p.x, p.y);

          // Glow streak trailing up
          ctx.beginPath();
          ctx.moveTo(p.x + 4, p.y - 4);
          ctx.lineTo(p.x + 4, p.y - 25);
          ctx.strokeStyle = p.color === 'red' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(56, 189, 248, 0.2)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });
      } else if (theme === 'quantum-particles') {
        // Interactive quantum nodes that react to mouse pointer
        particles.forEach((p) => {
          // Gravitational pull / repulsion from cursor
          if (mouse.active) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 220 && dist > 1) {
              const force = (220 - dist) / 220;
              p.vx += (dx / dist) * force * 0.35;
              p.vy += (dy / dist) * force * 0.35;

              // Laser line to cursor
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = p.color === 'red' ? `rgba(239, 68, 68, ${force * 0.4})` : `rgba(14, 165, 233, ${force * 0.4})`;
              ctx.lineWidth = force * 1.8;
              ctx.stroke();
            }
          }

          // friction & speed limit
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color === 'red' ? '#ef4444' : '#0ea5e9';
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color === 'red' ? '#ef4444' : '#0ea5e9';
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      } else {
        // inferno-pulse: fire and ice collision
        const redWaveX = (Math.sin(tick * 0.8) * 0.5 + 0.5) * width;
        const blueWaveX = (Math.cos(tick * 0.8) * 0.5 + 0.5) * width;

        const g1 = ctx.createRadialGradient(redWaveX, height * 0.2, 50, redWaveX, height * 0.2, 500);
        g1.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
        g1.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, width, height);

        const g2 = ctx.createRadialGradient(blueWaveX, height * 0.8, 50, blueWaveX, height * 0.8, 500);
        g2.addColorStop(0, 'rgba(14, 165, 233, 0.25)');
        g2.addColorStop(1, 'rgba(14, 165, 233, 0)');
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme, isActive, intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Subtle scanline overlay for cyber texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
          backgroundSize: '100% 4px',
        }}
      />
    </div>
  );
};
