import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { Heart, Music } from 'lucide-react';

interface EnvelopeCoverModalProps {
  onOpenLetter: () => void;
  onStartMusic: () => void;
  heroPhotoUrl?: string;
}

export const EnvelopeCoverModal: React.FC<EnvelopeCoverModalProps> = ({
  onOpenLetter,
  onStartMusic,
  heroPhotoUrl,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const letterSheetRef = useRef<HTMLDivElement>(null);
  const sealButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [bgError, setBgError] = useState(false);

  const handleSealClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    onStartMusic();

    const tl = gsap.timeline({
      onComplete: () => {
        onOpenLetter();
      },
    });

    tl.to(sealButtonRef.current, {
      scale: 1.25,
      duration: 0.22,
      ease: 'power2.out',
    })
      .to(sealButtonRef.current, {
        scale: 0,
        opacity: 0,
        rotation: 25,
        duration: 0.35,
        ease: 'back.in(1.7)',
      })
      .to(
        flapRef.current,
        {
          rotateX: 180,
          duration: 0.6,
          ease: 'power3.inOut',
        },
        '-=0.1'
      )
      .set(flapRef.current, { zIndex: 1 })
      .set(letterSheetRef.current, { zIndex: 5 })
      .to(
        letterSheetRef.current,
        {
          y: -105,
          scale: 1.03,
          duration: 0.75,
          ease: 'power3.out',
        },
        '-=0.15'
      )
      .to(
        envelopeRef.current,
        {
          scale: 1.12,
          opacity: 0,
          duration: 0.55,
          ease: 'power2.inOut',
        },
        '+=0.15'
      )
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
        },
        '-=0.35'
      );
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between px-5 py-8 overflow-y-auto bg-[#120609]"
    >
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {heroPhotoUrl && !bgError && (
          <img
            src={heroPhotoUrl}
            alt="Fondo de nuestra carta"
            onError={() => setBgError(true)}
            className="h-full w-full object-cover opacity-35 scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A070D]/90 via-[#120609]/85 to-[#120609]" />
      </div>

      {/* Top quiet dedication header */}
      <div className="relative z-10 text-center pt-2">
        <p className="text-xs tracking-widest text-[#FDA4AF]/90 font-medium">
          Para La Mujer Que Más Amo · Nuestra Carta Digital
        </p>
      </div>

      {/* Center Interactive 3D Envelope */}
      <div className="relative z-10 my-auto flex w-full max-w-[390px] flex-col items-center">
        <div className="mb-6 text-center">
          <h1
            className="font-serif-display text-4xl sm:text-5xl font-semibold text-[#FFF8F6] tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            Las horas más felices de mi amor fueron contigo
          </h1>
          <p className="mt-2.5 text-sm text-[#FDA4AF]/90 max-w-xs mx-auto leading-relaxed">
            Sube el volumen de tu iPhone y toca el sello de corazón para abrir tu carta.
          </p>
        </div>

        {/* Envelope Container */}
        <div
          ref={envelopeRef}
          className="perspective-1000 relative w-full max-w-[340px] h-[230px] mt-3 select-none"
        >
          {/* Envelope Back Wall */}
          <div className="absolute inset-0 rounded-2xl bg-[#2B0D16] border border-[#FDA4AF]/20 shadow-2xl shadow-black/80" />

          {/* Inner Parchment Letter Sheet */}
          <div
            ref={letterSheetRef}
            className="absolute left-4 right-4 top-3 bottom-3 z-[5] rounded-xl bg-gradient-to-b from-[#FFF8F6] to-[#FCE7F3] p-4 text-[#1F0910] shadow-lg flex flex-col justify-between transition-transform"
          >
            <div className="flex items-center justify-between border-b border-[#9F1239]/15 pb-2">
              <span className="font-serif-display italic text-sm text-[#9F1239] font-semibold">
                Para la dueña de mi vida...
              </span>
              <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-[#E11D48]" />
            </div>
            <p className="font-serif-display italic text-base leading-snug text-[#3A101D] my-auto">
              «Tus besos se llegaron a recrear aquí en mi boca, llenando de ilusión y de pasión mi vida loca...»
            </p>
            <div className="text-[11px] text-[#881337]/80 flex items-center justify-between">
              <span>Con todo mi esfuerzo y amor</span>
              <span className="font-mono-tabular">Siempre tuyo</span>
            </div>
          </div>

          {/* Envelope Front Pocket Fold */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden z-10"
            style={{
              background:
                'linear-gradient(135deg, #421220 0%, #2D0C16 50%, #210910 100%)',
              clipPath: 'polygon(0 0, 50% 48%, 100% 0, 100% 100%, 0 100%)',
            }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-[#FDA4AF]/20 z-10" />

          {/* Envelope Top Flap */}
          <div
            ref={flapRef}
            className="pointer-events-none absolute top-0 left-0 right-0 h-[130px] origin-top z-20 preserve-3d"
            style={{
              background: 'linear-gradient(180deg, #4C1524 0%, #360E19 100%)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
          />

          {/* Interactive Crimson Wax Seal Button */}
          <div className="absolute inset-0 z-30 flex items-center justify-center pt-4">
            <button
              ref={sealButtonRef}
              type="button"
              onClick={handleSealClick}
              aria-label="Abrir carta de amor y reproducir música"
              className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#F43F5E] via-[#E11D48] to-[#881337] text-[#FFF8F6] shadow-[0_0_35px_rgba(225,29,72,0.65)] border-2 border-[#FDA4AF]/40 active:scale-95 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FDA4AF]"
            >
              <span className="flex h-14 w-14 flex-col items-center justify-center rounded-full border border-[#FFF8F6]/30 bg-[#9F1239]/40 shadow-inner">
                <Heart className="h-6 w-6 fill-[#FFF8F6] text-[#FFF8F6] transition-transform duration-300 group-hover:scale-110" />
                <span className="mt-0.5 text-[9px] font-semibold tracking-wider">ABRIR</span>
              </span>
              <span className="pointer-events-none absolute -inset-2 rounded-full border border-[#E11D48]/50 animate-ping opacity-40" />
            </button>
          </div>
        </div>
      </div>

      {/* Quiet Romantic Footer */}
      <div className="relative z-10 text-center pb-2">
        <p className="font-serif-display italic text-base text-[#FDA4AF]/80">
          Hecho con todo el esfuerzo y el amor de mi corazón para ti
        </p>
      </div>
    </div>
  );
};
