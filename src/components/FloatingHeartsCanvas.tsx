import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface HeartBurstPoint {
  x: number;
  y: number;
  id: number;
}

interface FloatingHeartsCanvasProps {
  burstPoint: HeartBurstPoint | null;
}

export const FloatingHeartsCanvas: React.FC<FloatingHeartsCanvasProps> = ({ burstPoint }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Ambient floating hearts using GSAP
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const heartCount = 16;
    const hearts: HTMLDivElement[] = [];

    const createHeartElement = (size: number, opacity: number, color: string) => {
      const el = document.createElement('div');
      el.className = 'pointer-events-none fixed select-none will-change-transform';
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.opacity = `${opacity}`;
      el.innerHTML = `<svg viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
      return el;
    };

    const colors = ['#E11D48', '#FB7185', '#FDA4AF', '#F59E0B', '#9F1239'];

    for (let i = 0; i < heartCount; i++) {
      const size = gsap.utils.random(10, 24);
      const opacity = gsap.utils.random(0.12, 0.36);
      const color = colors[i % colors.length];
      const heart = createHeartElement(size, opacity, color);
      container.appendChild(heart);
      hearts.push(heart);

      const startX = gsap.utils.random(0, window.innerWidth);
      const startY = gsap.utils.random(0, window.innerHeight);

      gsap.set(heart, {
        x: startX,
        y: startY,
        rotation: gsap.utils.random(-25, 25),
        scale: gsap.utils.random(0.7, 1.25),
      });

      gsap.to(heart, {
        y: -80,
        x: `+=${gsap.utils.random(-70, 70)}`,
        rotation: gsap.utils.random(-45, 45),
        duration: gsap.utils.random(9, 18),
        repeat: -1,
        ease: 'none',
        delay: gsap.utils.random(0, 6),
        onRepeat: () => {
          gsap.set(heart, {
            y: window.innerHeight + 50,
            x: gsap.utils.random(10, window.innerWidth - 10),
          });
        },
      });
    }

    return () => {
      hearts.forEach((h) => {
        gsap.killTweensOf(h);
        h.remove();
      });
    };
  }, []);

  // Interactive tap heart burst with GSAP physics (rises above the button/element)
  useEffect(() => {
    if (!burstPoint || !containerRef.current) return;
    const container = containerRef.current;

    const particleCount = 16;
    const colors = ['#E11D48', '#FB7185', '#FBBF24', '#FFF1F2', '#F43F5E'];

    for (let i = 0; i < particleCount; i++) {
      const el = document.createElement('div');
      const size = gsap.utils.random(16, 28);
      const color = colors[i % colors.length];
      el.className = 'pointer-events-none fixed z-[9999] select-none will-change-transform drop-shadow-md';
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.innerHTML = `<svg viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
      container.appendChild(el);

      const spreadX = gsap.utils.random(-110, 110);
      const riseY = gsap.utils.random(-180, -70);
      const targetX = burstPoint.x + spreadX;
      const targetY = burstPoint.y + riseY;

      gsap.fromTo(
        el,
        {
          x: burstPoint.x - size / 2,
          y: burstPoint.y - size / 2,
          scale: 0.3,
          opacity: 1,
          rotation: gsap.utils.random(-20, 20),
        },
        {
          x: targetX,
          y: targetY,
          scale: gsap.utils.random(1.0, 1.55),
          opacity: 0,
          rotation: gsap.utils.random(-65, 65),
          duration: gsap.utils.random(1.0, 1.6),
          ease: 'power3.out',
          onComplete: () => {
            el.remove();
          },
        }
      );
    }
  }, [burstPoint]);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true" />;
};
