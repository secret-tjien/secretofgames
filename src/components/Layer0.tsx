import { useEffect, useRef } from 'react';
import { CONFIG } from '../config';

interface Layer0Props {
  showParticles?: boolean;
}

export default function Layer0({ showParticles = true }: Layer0Props) {
  const bgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetPos = useRef({ x: 0.5, y: 0.5 }); // Default to center
  const currentPos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }
      targetPos.current = {
        x: clientX / window.innerWidth,
        y: clientY / window.innerHeight,
      };
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    const canvas = canvasRef.current;
    let ctx: CanvasRenderingContext2D | null = null;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number; baseSpeed: number }> = [];

    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx = canvas.getContext('2d');

      const particleCount = CONFIG.layer0.particleCount || 70;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.3,
          baseSpeed: Math.random() * 1.5 + 0.5,
        });
      }
    }

    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    const handleResize = () => {
      if (canvas) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (Math.abs(w - lastWidth) > 10 || Math.abs(h - lastHeight) > 120) {
          canvas.width = w;
          canvas.height = h;
          lastWidth = w;
          lastHeight = h;
        }
      }
    };
    window.addEventListener('resize', handleResize);

    let animationFrame: number;
    let time = 0;
    let lastTime = performance.now();
    const fpsInterval = 1000 / 30; // 30fps for smooth performance

    const animate = (now: number) => {
      animationFrame = requestAnimationFrame(animate);

      const elapsed = now - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = now - (elapsed % fpsInterval);

      time += 32 * CONFIG.layer0.orbitSpeed;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * CONFIG.layer0.transitionSpeed * 2;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * CONFIG.layer0.transitionSpeed * 2;

      const progress = (window as any).__VOLTARE_SCROLL_PROGRESS || 0;

      // Update dynamic background gradient div
      if (bgRef.current) {
        const { hueRange, baseSaturationStart, baseSaturationTarget, baseLightnessStart, baseLightnessTarget, baseHueStart, baseHueTarget, color1Offset, color2Offset, orbitRadius } = CONFIG.layer0;
        
        const currentSaturation = baseSaturationStart + (baseSaturationTarget - baseSaturationStart) * progress;
        const currentLightness = baseLightnessStart + (baseLightnessTarget - baseLightnessStart) * progress;
        const currentBaseHue = baseHueStart + (baseHueTarget - baseHueStart) * progress;

        const hueX = currentPos.current.x * hueRange;
        const hueY = currentPos.current.y * hueRange;
        const baseHue = (currentBaseHue + hueX + hueY) % 360; 

        const baseColor = `hsl(${baseHue}, ${currentSaturation}%, 97%)`;

        const p1x = currentPos.current.x * 100 + Math.sin(time) * orbitRadius;
        const p1y = currentPos.current.y * 100 + Math.cos(time) * orbitRadius;
        
        const r = Math.round(255);
        const g = Math.round(255 - progress * 80);
        const b = Math.round(255 - progress * 195);
        const grad1 = `radial-gradient(circle at ${p1x.toFixed(1)}% ${p1y.toFixed(1)}%, rgba(${r}, ${g}, ${b}, 0.9) 0%, rgba(${r}, ${g}, ${b}, 0) 55%)`;

        const p2x = currentPos.current.x * 100 + Math.sin(time + Math.PI * 2 / 3) * orbitRadius;
        const p2y = currentPos.current.y * 100 + Math.cos(time + Math.PI * 2 / 3) * (orbitRadius * 1.2);
        const hue1 = Math.round((baseHue + color1Offset + 360) % 360);
        const grad2 = `radial-gradient(circle at ${p2x.toFixed(1)}% ${p2y.toFixed(1)}%, hsla(${hue1}, ${currentSaturation}%, ${currentLightness}%, 0.8) 0%, hsla(${hue1}, ${currentSaturation}%, ${currentLightness}%, 0) 60%)`;

        const p3x = currentPos.current.x * 100 + Math.sin(time + Math.PI * 4 / 3) * (orbitRadius * 1.1);
        const p3y = currentPos.current.y * 100 + Math.cos(time + Math.PI * 4 / 3) * orbitRadius;
        const hue2 = Math.round((baseHue + color2Offset + 360) % 360);
        const grad3 = `radial-gradient(circle at ${p3x.toFixed(1)}% ${p3y.toFixed(1)}%, hsla(${hue2}, ${currentSaturation}%, ${currentLightness}%, 0.8) 0%, hsla(${hue2}, ${currentSaturation}%, ${currentLightness}%, 0) 60%)`;

        bgRef.current.style.background = `${grad1}, ${grad2}, ${grad3}, ${baseColor}`;
      }

      // Render particle stream on canvas if enabled
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (showParticles) {
          const scrollTop = (window as any).__VOLTARE_SCROLL_TOP || 0;
          const blindsMaxScroll = (window as any).__VOLTARE_BLINDS_MAX_SCROLL || (window.innerHeight * 1.5);
          const scrollBeyond = Math.max(0, scrollTop - blindsMaxScroll);

          ctx.save();
          if (scrollBeyond > 0) {
            ctx.translate(0, -scrollBeyond);
          }

          const minY = progress * (CONFIG.blinds.closingWidth * 0.01) * canvas.height;
          const maxY = canvas.height - minY;
          const span = Math.max(10, maxY - minY);

          const streamSpeed = 0.5 + progress * 12;

          for (let p of particles) {
            p.x += p.vx + streamSpeed * p.baseSpeed;
            p.y += p.vy + Math.sin(time + p.x * 0.01) * 0.3;

            const distTop = p.y - minY;
            const distBottom = maxY - p.y;
            const repelRange = 100 + progress * 150;

            if (distTop < repelRange && distTop > 0) {
              const force = Math.pow((repelRange - distTop) / repelRange, 2);
              p.vy += force * (1.2 + progress * 4);
            }
            if (distBottom < repelRange && distBottom > 0) {
              const force = Math.pow((repelRange - distBottom) / repelRange, 2);
              p.vy -= force * (1.2 + progress * 4);
            }

            if (p.y < minY) {
              p.y = minY;
              p.vy = Math.abs(p.vy) * 0.2 + 0.5;
            } else if (p.y > maxY) {
              p.y = maxY;
              p.vy = -(Math.abs(p.vy) * 0.2 + 0.5);
            }

            if (p.x > canvas.width) {
              p.x = 0;
              p.y = minY + Math.random() * span;
            }
            if (p.x < 0) {
              p.x = canvas.width;
              p.y = minY + Math.random() * span;
            }

            const particleAlpha = Math.min(1, p.alpha * 0.9);
            const currentSize = p.size * (1 + progress * 0.5);

            ctx.beginPath();
            ctx.arc(p.x, p.y, currentSize * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${(particleAlpha * 0.25).toFixed(2)})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particleAlpha.toFixed(2)})`;
            ctx.fill();
          }

          ctx.restore();
        }
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, [showParticles]);

  return (
    <>
      <div
        ref={bgRef}
        className="fixed inset-0 w-full h-full -z-20 transition-opacity duration-1000 ease-out"
        style={{ background: `hsl(0, 0%, 98%)` }}
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-500 ${showParticles ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      />
    </>
  );
}
