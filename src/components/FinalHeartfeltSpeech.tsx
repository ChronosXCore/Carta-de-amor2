import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  CheckCircle2,
  Lock,
  Unlock,
  Pause,
  RotateCcw,
} from 'lucide-react';
import {
  SECRET_CAPSULES,
  FINAL_SPEECH_PARAGRAPHS,
} from '../data/loveLetterData';

interface FinalHeartfeltSpeechProps {
  onTriggerHeartBurst: (e: React.MouseEvent) => void;
  bannerPhotoUrl?: string;
  onSpeechActiveChange?: (isActive: boolean) => void;
}

export const FinalHeartfeltSpeech: React.FC<FinalHeartfeltSpeechProps> = ({
  onTriggerHeartBurst,
  bannerPhotoUrl,
}) => {
  const [unlockedCapsules, setUnlockedCapsules] = useState<Record<string, boolean>>({
    'cap-1': true,
  });
  const [activeParagraphIndex, setActiveParagraphIndex] = useState<number>(
    FINAL_SPEECH_PARAGRAPHS.length - 1
  );
  const [isAutoSpeaking, setIsAutoSpeaking] = useState<boolean>(false);
  const [currentlyReadingIdx, setCurrentlyReadingIdx] = useState<number | null>(null);
  const [sentEternalHeart, setSentEternalHeart] = useState<boolean>(false);
  const [bannerImgError, setBannerImgError] = useState<boolean>(false);

  const speechContainerRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef = useRef<number | null>(null);
  const isMountedRef = useRef<boolean>(true);
  const autoSpeakingRef = useRef<boolean>(false);

  useEffect(() => {
    setBannerImgError(false);
  }, [bannerPhotoUrl]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const clearStepTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopAllSpeechAndAnimation = useCallback(() => {
    clearStepTimer();
    autoSpeakingRef.current = false;
    setIsAutoSpeaking(false);
    setCurrentlyReadingIdx(null);
  }, [clearStepTimer]);

  const animateParagraphCard = (idx: number) => {
    const el = paragraphRefs.current[idx];
    if (!el) return;
    gsap.fromTo(
      el,
      { scale: 0.98, y: 10, opacity: 0.45 },
      { scale: 1, y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }
    );
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const runParagraphStep = useCallback(
    (idx: number) => {
      if (!isMountedRef.current) return;
      clearStepTimer();

      setActiveParagraphIndex(idx);
      setCurrentlyReadingIdx(idx);
      animateParagraphCard(idx);

      const text = FINAL_SPEECH_PARAGRAPHS[idx];
      const estimatedDurationMs = Math.min(9500, Math.max(4800, text.length * 46));

      const advanceToNext = () => {
        if (!isMountedRef.current || !autoSpeakingRef.current) return;
        if (idx < FINAL_SPEECH_PARAGRAPHS.length - 1) {
          runParagraphStep(idx + 1);
        } else {
          autoSpeakingRef.current = false;
          setIsAutoSpeaking(false);
          setCurrentlyReadingIdx(null);
        }
      };

      timerRef.current = window.setTimeout(advanceToNext, estimatedDurationMs);
    },
    [clearStepTimer]
  );

  const startIntimateSpeechFlow = (e: React.MouseEvent, startIdx = 0) => {
    onTriggerHeartBurst(e);
    clearStepTimer();

    autoSpeakingRef.current = true;
    setIsAutoSpeaking(true);

    runParagraphStep(startIdx);
  };

  const handleParagraphClick = (idx: number, e: React.MouseEvent) => {
    onTriggerHeartBurst(e);
    if (isAutoSpeaking) {
      startIntimateSpeechFlow(e, idx);
    } else {
      setActiveParagraphIndex(Math.max(activeParagraphIndex, idx));
      setCurrentlyReadingIdx(idx);
      animateParagraphCard(idx);
    }
  };

  const handleUnlockAllCapsules = (e: React.MouseEvent) => {
    onTriggerHeartBurst(e);
    const allUnlocked: Record<string, boolean> = {};
    SECRET_CAPSULES.forEach((c) => {
      allUnlocked[c.id] = true;
    });
    setUnlockedCapsules(allUnlocked);
  };

  const handleToggleCapsule = (id: string, e: React.MouseEvent) => {
    onTriggerHeartBurst(e);
    setUnlockedCapsules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleGrandFinaleCelebration = (e: React.MouseEvent) => {
    onTriggerHeartBurst(e);
    setSentEternalHeart(true);

    confetti({
      particleCount: 95,
      spread: 85,
      origin: { y: 0.65 },
      colors: ['#E11D48', '#FB7185', '#FBBF24', '#FFF1F2'],
    });
  };

  const unlockedCount = SECRET_CAPSULES.filter((c) => unlockedCapsules[c.id]).length;

  return (
    <section className="space-y-8 pb-12">
      {/* Part 1: Interactive Secret Promises */}
      <div className="space-y-3.5">
        <div className="px-1 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-[#FBBF24] tracking-wide">
              Cápsulas Interactivas ({unlockedCount}/{SECRET_CAPSULES.length})
            </p>
            <h2
              className="font-serif-display text-3xl font-semibold text-[#FFF8F6] mt-0.5"
              style={{ textWrap: 'balance' }}
            >
              Secretos que guardé para cuando me leas
            </h2>
            <p className="text-xs text-[#FDA4AF]/80 mt-1">
              Toca cada tarjeta para desbloquear lo que guardo en el corazón
            </p>
          </div>

          {unlockedCount < SECRET_CAPSULES.length && (
            <button
              type="button"
              onClick={handleUnlockAllCapsules}
              className="shrink-0 rounded-xl bg-[#31111B] border border-[#FDA4AF]/20 px-3 py-2 text-xs font-medium text-[#FDA4AF] hover:bg-[#E11D48] hover:text-[#FFF8F6] transition-colors cursor-pointer whitespace-nowrap"
            >
              Abrir todas
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {SECRET_CAPSULES.map((cap) => {
            const isUnlocked = !!unlockedCapsules[cap.id];
            return (
              <div
                key={cap.id}
                onClick={(e) => handleToggleCapsule(cap.id, e)}
                className={`rounded-2xl border p-5 transition-all duration-300 cursor-pointer select-none ${
                  isUnlocked
                    ? 'bg-[#250D15] border-[#E11D48]/45 shadow-lg shadow-[#E11D48]/10'
                    : 'bg-[#1C0A10] border-[#FDA4AF]/15 hover:border-[#FDA4AF]/35'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-[#FDA4AF]/80 font-mono-tabular">
                    <span>Secreto {cap.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{cap.heartCount} latidos</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#E11D48]">
                    {isUnlocked ? (
                      <>
                        <Unlock className="h-3.5 w-3.5" />
                        <span>Revelado</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-3.5 w-3.5" />
                        <span>Toca para abrir</span>
                      </>
                    )}
                  </div>
                </div>

                <h3 className="mt-2 font-serif-display text-2xl font-semibold text-[#FFF8F6]">
                  {isUnlocked ? cap.hiddenTitle : cap.promptTitle}
                </h3>

                {isUnlocked && (
                  <p className="mt-2.5 text-sm sm:text-[15px] text-[#FDA4AF]/95 leading-relaxed">
                    {cap.hiddenMessage}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Finalizando Hablando — Intimate Spoken Dedication ("Mi Voz") */}
      <div
        ref={speechContainerRef}
        className="relative rounded-3xl bg-[#210C12] border border-[#E11D48]/35 overflow-hidden shadow-2xl"
      >
        {/* Couple Banner Photo (Photo 10 by the pool) */}
        <div className="relative h-[420px] sm:h-[500px] w-full overflow-hidden bg-gradient-to-br from-[#3A101D] via-[#210C12] to-[#120609]">
          {bannerPhotoUrl && !bannerImgError && (
            <img
              src={bannerPhotoUrl}
              alt="Nuestra última foto juntos en la piscina"
              onError={() => setBannerImgError(true)}
              className="h-full w-full object-cover object-[center_45%] opacity-85"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#210C12] via-[#210C12]/45 to-transparent" />

          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-[#FBBF24]">
                Mi Voz · De Mí Para Ti
              </p>
              <h2
                className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#FFF8F6] mt-0.5 leading-tight drop-shadow"
                style={{ textWrap: 'balance' }}
              >
                Hablándote desde el corazón
              </h2>
            </div>

            {/* Live Audio Equalizer Indicator when Speaking */}
            {isAutoSpeaking && (
              <div className="flex items-center gap-1 rounded-full bg-[#120609]/80 border border-[#E11D48]/50 px-3 py-1.5 backdrop-blur-md">
                <span className="h-2.5 w-1 rounded-full bg-[#E11D48] animate-pulse" />
                <span className="h-4 w-1 rounded-full bg-[#FBBF24] animate-bounce" />
                <span className="h-3 w-1 rounded-full bg-[#E11D48] animate-pulse" />
                <span className="ml-1.5 text-[11px] font-mono-tabular text-[#FFF8F6]">
                  { currentlyReadingIdx !== null ? `${currentlyReadingIdx + 1}/${FINAL_SPEECH_PARAGRAPHS.length}` : '' }
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Step-by-Step Controls */}
        <div className="px-5 pt-4 pb-4 border-b border-[#FDA4AF]/15 bg-[#1A080D]/60 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Step-by-step animated reading */}
            <button
              type="button"
              onClick={(e) => {
                if (isAutoSpeaking) {
                  stopAllSpeechAndAnimation();
                  setActiveParagraphIndex(FINAL_SPEECH_PARAGRAPHS.length - 1);
                } else {
                  startIntimateSpeechFlow(e, 0);
                }
              }}
              className={`flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all active:scale-95 cursor-pointer whitespace-nowrap ${
                isAutoSpeaking
                  ? 'bg-[#FBBF24] text-[#120609] shadow-md shadow-[#FBBF24]/20'
                  : 'bg-[#E11D48] text-[#FFF8F6] hover:bg-[#BE123C]'
              }`}
            >
              {isAutoSpeaking ? (
                <>
                  <Pause className="h-3.5 w-3.5" />
                  <span>Pausar Lectura Guiada</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Leer Paso a Paso</span>
                </>
              )}
            </button>
          </div>

          {/* Show All / Reset Button when in step-by-step mode */}
          {isAutoSpeaking && (
            <button
              type="button"
              onClick={() => {
                stopAllSpeechAndAnimation();
                setActiveParagraphIndex(FINAL_SPEECH_PARAGRAPHS.length - 1);
              }}
              className="flex min-h-[40px] items-center gap-1.5 rounded-xl bg-[#2B0E17] px-3 py-1.5 text-xs text-[#FDA4AF] hover:text-[#FFF8F6] cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Ver Todo</span>
            </button>
          )}
        </div>

        {/* Spoken Letter Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-[#FDA4AF]/75 px-1">
            Toca cualquier párrafo para resaltarlo y lanzar corazones:
          </p>

          {FINAL_SPEECH_PARAGRAPHS.map((paragraph, idx) => {
            const isVisible = idx <= activeParagraphIndex || !isAutoSpeaking;
            const isCurrentSpoken =
              (isAutoSpeaking && idx === activeParagraphIndex) ||
              currentlyReadingIdx === idx;

            return (
              <div
                key={idx}
                ref={(el) => {
                  paragraphRefs.current[idx] = el;
                }}
                onClick={(e) => handleParagraphClick(idx, e)}
                className={`transition-all duration-500 rounded-2xl p-4 sm:p-5 cursor-pointer select-none ${
                  isCurrentSpoken
                    ? 'bg-[#38141F] border-2 border-[#E11D48] shadow-lg shadow-[#E11D48]/15'
                    : isVisible
                    ? 'bg-[#18080D]/75 border border-[#FDA4AF]/15 hover:border-[#FDA4AF]/35 opacity-100'
                    : 'bg-[#15070B]/40 border border-transparent opacity-25 blur-[1px]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono-tabular text-[#FDA4AF]/60">
                    Parte 0{idx + 1}
                  </span>
                  {isCurrentSpoken && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#FBBF24]">
                      <Heart className="h-3 w-3 fill-[#E11D48] text-[#E11D48]" />
                      <span>Leyendo...</span>
                    </span>
                  )}
                </div>

                <p
                  className={`${
                    idx === 3 || idx === 4
                      ? 'font-serif-display italic text-xl sm:text-2xl text-[#FFF8F6] font-semibold'
                      : 'text-sm sm:text-base text-[#FFF8F6]/95'
                  } leading-relaxed`}
                >
                  {paragraph}
                </p>
              </div>
            );
          })}

          {/* Signature & Interactive Heart Finale */}
          <div className="pt-5 border-t border-[#FDA4AF]/15 flex flex-col items-center text-center space-y-4">
            <div>
              <p className="font-serif-display italic text-2xl text-[#FBBF24]">
                Con todo el esfuerzo de mis manos y todo el amor de mi alma,
              </p>
              <p className="mt-1 text-xs text-[#FDA4AF]/80 font-mono-tabular">
                Siempre tuyo · Hoy y en cada vida
              </p>
            </div>

            <button
              type="button"
              onClick={handleGrandFinaleCelebration}
              className="flex min-h-[52px] w-full max-w-xs items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#E11D48] via-[#F43F5E] to-[#E11D48] px-6 py-3.5 text-sm font-semibold text-[#FFF8F6] shadow-xl shadow-[#E11D48]/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <Heart className="h-5 w-5 fill-[#FFF8F6] animate-bounce" />
              <span>
                {sentEternalHeart
                  ? '¡Te Amo Infinitamente! (Toca otra vez)'
                  : 'Toca si te gustó tu carta digital'}
              </span>
            </button>

            {sentEternalHeart && (
              <div className="flex items-center gap-2 text-xs text-[#FBBF24]">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Tu sonrisa al leer esto es mi mejor recompensa.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
