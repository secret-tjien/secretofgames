import { useEffect, useRef } from 'react';
import { CONFIG } from '../config';
import { PARTICLE_PHRASES } from '../data/particlePhrases';

interface CalloutState {
  word: string;
  timer: number;       // frames remaining before fade
  maxTimer: number;
  fadeAlpha: number;   // 0 to 1
  dirX: 1 | -1;        // direction of callout line (1 = right, -1 = left)
  dirY: 1 | -1;        // direction of callout line (1 = down, -1 = up)
  isHovered: boolean;
  isClosing: boolean;
  elbowX?: number;     // Current trailing elbow X position
  elbowY?: number;     // Current trailing elbow Y position
  color: string;       // Store the custom readable pastel color for this callout
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseSpeed: number;
  callout?: CalloutState;
}

interface Layer0Props {
  showParticles?: boolean;
}

export default function Layer0({ showParticles = true }: Layer0Props) {
  const bgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetPos = useRef({ x: 0.5, y: 0.5 }); // Default to center
  const currentPos = useRef({ x: 0.5, y: 0.5 });
  const pointerPos = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });
  const phraseBagRef = useRef<string[]>([]);

  useEffect(() => {
    const phraseList = (CONFIG.particleCalloutWords && CONFIG.particleCalloutWords.length > 0)
      ? CONFIG.particleCalloutWords
      : PARTICLE_PHRASES;

    const canvas = canvasRef.current;
    let ctx: CanvasRenderingContext2D | null = null;
    let particles: Particle[] = [];

    const triggerCalloutOnParticle = (pt: Particle, forceNewWord = false, isAutomatic = false) => {
      // If a callout is already present/visible on this particle, do not change the phrase
      if (!pt.callout) {
        // Enforce max 10 active callouts
        const activeCallouts = particles.filter(p => p.callout && p.callout.fadeAlpha > 0);
        if (activeCallouts.length >= 10) {
          // Deactivate longest living callout
          const oldest = activeCallouts.sort((a, b) => (a.callout!.timer - b.callout!.timer))[0];
          if (oldest.callout) oldest.callout.isClosing = true;
        }

        // Tetris random: Pick from bag
        if (phraseBagRef.current.length === 0) {
          phraseBagRef.current = [...phraseList].sort(() => Math.random() - 0.5);
        }
        const randomWord = phraseBagRef.current.pop() || 'Vertical slice';

        const cw = canvas ? canvas.width : window.innerWidth;
        const ch = canvas ? canvas.height : window.innerHeight;
        
        // Pick direction away from canvas edges
        const dirX: 1 | -1 = pt.x > cw * 0.75 ? -1 : 1;
        const dirY: 1 | -1 = pt.y < 100 ? 1 : -1;

        const boxSize = CONFIG.particleCallout?.boxSize ?? 18;
        const halfBox = boxSize / 2;
        const cornerX = dirX === 1 ? pt.x + halfBox : pt.x - halfBox;
        const cornerY = dirY === 1 ? pt.y + halfBox : pt.y - halfBox;

        // Generate color: lighter for automatic
        const minSat = CONFIG.particleCallout?.minSaturation ?? 35;
        const maxSat = CONFIG.particleCallout?.maxSaturation ?? 55;
        const minLight = isAutomatic ? 75 : (CONFIG.particleCallout?.minLightness ?? 52);
        const maxLight = isAutomatic ? 85 : (CONFIG.particleCallout?.maxLightness ?? 65);

        const h = Math.floor(Math.random() * 360);
        const s = minSat + Math.floor(Math.random() * (maxSat - minSat + 1));
        const l = minLight + Math.floor(Math.random() * (maxLight - minLight + 1));
        const color = `hsl(${h}, ${s}%, ${l}%)`;

        const duration = CONFIG.particleCallout?.durationFrames ?? 150;

        pt.callout = {
          word: randomWord,
          timer: duration,
          maxTimer: duration,
          fadeAlpha: 0,
          dirX,
          dirY,
          isHovered: isAutomatic ? false : true,
          isClosing: false,
          elbowX: cornerX,
          elbowY: cornerY,
          color,
        };
      } else if (!isAutomatic) {
        pt.callout.isHovered = true;
        pt.callout.isClosing = false;
        pt.callout.timer = CONFIG.particleCallout?.durationFrames ?? 150;
      }
    };

    const checkPointerNearParticles = (clientX: number, clientY: number, isExplicitClick = false) => {
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;
      pointerPos.current = { x: mouseX, y: mouseY, active: true };

      // Only allow triggering callouts if visitor hasn't scrolled down yet
      const progress = (window as any).__SECRETOFGAMES_SCROLL_PROGRESS || 0;
      if (progress > 0.02) return;

      const hitRadius = 45; // Generous hit radius for easy hover & touch
      let closestPt: Particle | null = null;
      let closestDist = Infinity;

      for (const pt of particles) {
        const dx = mouseX - pt.x;
        const dy = mouseY - pt.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= hitRadius) {
          if (dist < closestDist) {
            closestDist = dist;
            closestPt = pt;
          }
          if (!isExplicitClick) {
            triggerCalloutOnParticle(pt);
          }
        } else if (pt.callout) {
          pt.callout.isHovered = false;
        }
      }

      if (isExplicitClick && closestPt) {
        triggerCalloutOnParticle(closestPt, true);
      }
    };

    const handlePointerMove = (e: PointerEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as PointerEvent).clientX;
        clientY = (e as PointerEvent).clientY;
      } else {
        return;
      }

      targetPos.current = {
        x: clientX / window.innerWidth,
        y: clientY / window.innerHeight,
      };

      checkPointerNearParticles(clientX, clientY, false);
    };

    const handlePointerDown = (e: PointerEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as PointerEvent).clientX;
        clientY = (e as PointerEvent).clientY;
      } else {
        return;
      }
      checkPointerNearParticles(clientX, clientY, true);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handlePointerDown, { passive: true });

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
    let lastAutoActivationTime = performance.now();
    let lastScrollTime = performance.now();
    
    // Scroll hint state
    let scrollHint = { active: false, startTime: 0 };
    
    const fpsInterval = 1000 / 30; // 30fps for smooth performance

    const animate = (now: number) => {
      animationFrame = requestAnimationFrame(animate);

      const elapsed = now - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = now - (elapsed % fpsInterval);

      // Automatic activation logic - maintain 1-3 active call-outs
      const activeCallouts = particles.filter(p => p.callout && p.callout.fadeAlpha > 0);
      if (now - lastAutoActivationTime >= 2000) {
        if (activeCallouts.length < 3) {
          const availableParticles = particles.filter(p => !p.callout);
          if (availableParticles.length > 0) {
            const pt = availableParticles[Math.floor(Math.random() * availableParticles.length)];
            triggerCalloutOnParticle(pt, false, true);
          }
        }
        lastAutoActivationTime = now;
      }
      
      // Scroll hint logic
      const progress = (window as any).__SECRETOFGAMES_SCROLL_PROGRESS || 0;
      if (progress > 0.02) {
        lastScrollTime = now;
      } else if (now - lastScrollTime >= 5000 && !scrollHint.active) {
        scrollHint = { active: true, startTime: now };
      }

      time += 32 * CONFIG.layer0.orbitSpeed;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * CONFIG.layer0.transitionSpeed * 2;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * CONFIG.layer0.transitionSpeed * 2;

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
          const scrollTop = (window as any).__SECRETOFGAMES_SCROLL_TOP || 0;
          const blindsMaxScroll = (window as any).__SECRETOFGAMES_BLINDS_MAX_SCROLL || (window.innerHeight * 1.5);
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

            // Callout hover tracking & fade lifecycle
            if (p.callout) {
              const co = p.callout;
              
              // Deactivate if near right edge
              if (p.x > canvas.width - 50) {
                co.isClosing = true;
              }

              if (pointerPos.current.active && progress <= 0.02) {
                const dx = pointerPos.current.x - p.x;
                const dy = pointerPos.current.y - p.y;
                if (Math.sqrt(dx * dx + dy * dy) <= 50) {
                  co.isHovered = true;
                  co.timer = co.maxTimer; // Stay visible while tracking
                } else {
                  co.isHovered = false;
                }
              } else {
                co.isHovered = false;
              }

              if (progress > 0.02) {
                co.isClosing = true;
              }

              if (!co.isHovered) {
                co.timer -= 1;
              }

              if (co.timer <= 0 || co.isClosing) {
                co.fadeAlpha = Math.max(0, co.fadeAlpha - 0.08);
                if (co.fadeAlpha <= 0) {
                  p.callout = undefined;
                }
              } else {
                co.fadeAlpha = Math.min(1, co.fadeAlpha + 0.12);
              }

              // Update springy elbow positions for rubber-band tracking!
              if (p.callout) {
                const boxSize = CONFIG.particleCallout?.boxSize ?? 18;
                const halfBox = boxSize / 2;
                const cornerX = co.dirX === 1 ? p.x + halfBox : p.x - halfBox;
                const cornerY = co.dirY === 1 ? p.y + halfBox : p.y - halfBox;

                const diagonalX = CONFIG.particleCallout?.diagonalLengthX ?? 32;
                const diagonalY = CONFIG.particleCallout?.diagonalLengthY ?? 24;
                const targetElbowX = cornerX + co.dirX * diagonalX;
                const targetElbowY = cornerY + co.dirY * diagonalY;

                if (co.elbowX === undefined) co.elbowX = cornerX;
                if (co.elbowY === undefined) co.elbowY = cornerY;

                // Physics spring / ease: small value makes it trail nicely like a rubber band!
                const easeSpeed = CONFIG.particleCallout?.springEase ?? 0.08; 
                co.elbowX += (targetElbowX - co.elbowX) * easeSpeed;
                co.elbowY += (targetElbowY - co.elbowY) * easeSpeed;
              }
            }

            const particleAlpha = Math.min(1, p.alpha * 0.9);
            const currentSize = p.size * (1 + progress * 0.5);

            // Draw particle glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, currentSize * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${(particleAlpha * 0.25).toFixed(2)})`;
            ctx.fill();

            // Draw particle core
            ctx.beginPath();
            ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particleAlpha.toFixed(2)})`;
            ctx.fill();

            // Render callout graphic if active
            if (p.callout && p.callout.fadeAlpha > 0) {
              const co = p.callout;
              ctx.save();
              ctx.globalAlpha = co.fadeAlpha * (1 - progress * 2);

              const boxSize = 18;
              const halfBox = boxSize / 2;

              // 1. Framing box around particle - follows particle PRECISELY (p.x, p.y)
              ctx.strokeStyle = co.color;
              ctx.lineWidth = 1.25;
              ctx.strokeRect(p.x - halfBox, p.y - halfBox, boxSize, boxSize);

              // 2. Leader line geometry using springy elbow coordinates!
              const cornerX = co.dirX === 1 ? p.x + halfBox : p.x - halfBox;
              const cornerY = co.dirY === 1 ? p.y + halfBox : p.y - halfBox;

              const elbowX = co.elbowX !== undefined ? co.elbowX : cornerX;
              const elbowY = co.elbowY !== undefined ? co.elbowY : cornerY;

              ctx.font = '600 13.5px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
              const textMetrics = ctx.measureText(co.word);
              const textWidth = textMetrics.width;
              const underlinePadding = 6;
              const endLineX = elbowX + co.dirX * (textWidth + underlinePadding * 2);

              // Draw leader line path (connecting from precisely attached corner to trailing elbow)
              ctx.beginPath();
              ctx.moveTo(cornerX, cornerY);
              ctx.lineTo(elbowX, elbowY);
              ctx.lineTo(endLineX, elbowY);
              ctx.strokeStyle = co.color;
              ctx.lineWidth = 1.15;
              ctx.stroke();

              // Draw callout word text resting on or under trailing line
              ctx.fillStyle = co.color;
              ctx.textBaseline = co.dirY === -1 ? 'bottom' : 'top';
              ctx.textAlign = co.dirX === 1 ? 'left' : 'right';

              const textX = co.dirX === 1 ? elbowX + 2 : elbowX - 2;
              const textY = co.dirY === -1 ? elbowY - 3.5 : elbowY + 3.5;

              ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
              ctx.shadowBlur = 4;
              ctx.fillText(co.word, textX, textY);

              ctx.restore();
            }
          }

          ctx.restore();
        }
      }

      // Draw "S C R O L L    D O W N" Sequential Scroll Hint
      if (scrollHint.active) {
        const elapsed = now - scrollHint.startTime;
        const totalAnimationDuration = 5200; // Complete cycle: sequential in, hold, fade out

        if (elapsed > totalAnimationDuration) {
          scrollHint.active = false;
          lastScrollTime = now; // Reset timer to ensure full pause before retriggering
        } else {
          ctx.save();
          // Font matching the design system
          ctx.font = '700 13px "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
          ctx.shadowBlur = 4;

          // "S C R O L L    D O W N" (S_C_R_O_L_L____D_O_W_N)
          // 1 space between letters, 4 spaces between words
          const letterSpacing = 16;
          const letterItems = [
            { char: 'S', offset: -6 * letterSpacing, delay: 0 },
            { char: 'C', offset: -5 * letterSpacing, delay: 100 },
            { char: 'R', offset: -4 * letterSpacing, delay: 200 },
            { char: 'O', offset: -3 * letterSpacing, delay: 300 },
            { char: 'L', offset: -2 * letterSpacing, delay: 400 },
            { char: 'L', offset: -1 * letterSpacing, delay: 500 },
            // Gap = 4 * letterSpacing (from -16 to +48)
            { char: 'D', offset: 3 * letterSpacing, delay: 680 },
            { char: 'O', offset: 4 * letterSpacing, delay: 780 },
            { char: 'W', offset: 5 * letterSpacing, delay: 880 },
            { char: 'N', offset: 6 * letterSpacing, delay: 980 },
          ];

          // Compute Y coordinate to position cleanly above the animated chevron
          const isDesktop = canvas.width >= 768;
          const isTablet = canvas.width >= 640 && canvas.width < 768;
          const chevronTopOffset = isDesktop ? 228 : isTablet ? 208 : 185;
          const textY = canvas.height - chevronTopOffset;
          const centerX = canvas.width / 2;

          for (let i = 0; i < letterItems.length; i++) {
            const item = letterItems[i];
            const charElapsed = elapsed - item.delay;
            let alpha = 0;

            if (charElapsed > 0 && charElapsed < 250) {
              // Smooth entry fade in
              alpha = charElapsed / 250;
            } else if (charElapsed >= 250 && charElapsed < 3200) {
              // Steady hold
              alpha = 1;
            } else if (charElapsed >= 3200 && charElapsed < 4200) {
              // Smooth exit fade out
              alpha = Math.max(0, 1 - (charElapsed - 3200) / 1000);
            }

            if (alpha > 0.005) {
              ctx.fillStyle = `rgba(0, 0, 0, ${alpha.toFixed(3)})`;
              ctx.fillText(item.char, centerX + item.offset, textY);
            }
          }

          ctx.restore();
        }
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerDown);
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

