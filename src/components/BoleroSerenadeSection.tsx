import React, { useState } from 'react';
import { Play, Pause, Heart, Disc } from 'lucide-react';
import { BOLERO_STANZAS } from '../data/loveLetterData';

interface BoleroSerenadeSectionProps {
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onTriggerHeartBurst: (e: React.MouseEvent) => void;
  coverPhotoUrl?: string;
}

export const BoleroSerenadeSection: React.FC<BoleroSerenadeSectionProps> = ({
  isPlayingMusic,
  onToggleMusic,
  onTriggerHeartBurst,
  coverPhotoUrl,
}) => {
  const [revealedStanzas, setRevealedStanzas] = useState<Record<string, boolean>>({
    'stanza-1': true,
    'stanza-2': true,
    'stanza-3': true,
    'stanza-4': true,
  });
  const [coverImgError, setCoverImgError] = useState(false);

  React.useEffect(() => {
    setCoverImgError(false);
  }, [coverPhotoUrl]);

  const toggleStanza = (id: string, e: React.MouseEvent) => {
    onTriggerHeartBurst(e);
    setRevealedStanzas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="space-y-6 pb-8">
      {/* Vinyl Turntable Hero Card */}
      <div className="relative rounded-3xl bg-[#210C12] border border-[#FDA4AF]/20 overflow-hidden shadow-xl">
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gradient-to-br from-[#3A101D] via-[#210C12] to-[#120609]">
          {coverPhotoUrl && !coverImgError && (
            <img
              src={coverPhotoUrl}
              alt="Nuestra canción Contigo"
              onError={() => setCoverImgError(true)}
              className="h-full w-full object-cover object-[center_35%] opacity-60"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#210C12] via-[#210C12]/60 to-transparent" />

          {/* Spinning Vinyl Record Graphic */}
          <div className="absolute inset-0 flex items-center justify-between px-6">
            <div className="max-w-[210px] sm:max-w-xs">
              <p className="text-xs text-[#FBBF24] font-semibold tracking-wide">
                Nuestra Canción de Fondo
              </p>
              <h2
                className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#FFF8F6] mt-1 leading-tight drop-shadow"
                style={{ textWrap: 'balance' }}
              >
                Contigo — Tanta Dulzura
              </h2>
              <p className="mt-1 text-xs text-[#FDA4AF]/95">
                Bolero Romántico · Dedicado a ti
              </p>
            </div>

            {/* Tactile Spinning Vinyl Button */}
            <button
              type="button"
              onClick={onToggleMusic}
              aria-label={isPlayingMusic ? 'Pausar canción' : 'Reproducir canción'}
              className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#18181B] via-[#09090B] to-[#27272A] border-2 border-[#FDA4AF]/40 shadow-2xl cursor-pointer active:scale-95 transition-transform"
            >
              <div
                className={`absolute inset-1.5 rounded-full border border-[#FFF8F6]/15 flex items-center justify-center overflow-hidden ${
                  isPlayingMusic ? 'animate-spin-slow' : ''
                }`}
              >
                {coverPhotoUrl && !coverImgError ? (
                  <img
                    src={coverPhotoUrl}
                    alt="Centro del vinilo"
                    onError={() => setCoverImgError(true)}
                    className="h-11 w-11 rounded-full object-cover border border-[#FBBF24]/60"
                  />
                ) : (
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#E11D48] to-[#881337] flex items-center justify-center border border-[#FBBF24]/60">
                    <Disc className="h-5 w-5 text-[#FFF8F6]" />
                  </div>
                )}
              </div>
              <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#120609]/80 text-[#FFF8F6] backdrop-blur-xs">
                {isPlayingMusic ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
              </span>
            </button>
          </div>
        </div>

        {/* Clean Play/Pause Bar */}
        <div className="px-5 pb-5 pt-3 flex items-center justify-between gap-3 border-t border-[#FDA4AF]/10">
          <button
            type="button"
            onClick={onToggleMusic}
            className="flex min-h-[44px] items-center gap-2 rounded-xl bg-[#E11D48] px-5 py-2 text-xs font-semibold text-[#FFF8F6] hover:bg-[#BE123C] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            {isPlayingMusic ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span>{isPlayingMusic ? 'Pausar Nuestra Canción' : 'Escuchar Nuestra Canción'}</span>
          </button>

          <span className="font-serif-display italic text-sm text-[#FDA4AF]/85">
            «Las horas más felices de mi amor fueron contigo...»
          </span>
        </div>
      </div>

      {/* Interactive Lyrics Stanzas */}
      <div className="space-y-3.5">
        <div className="px-1">
          <h3 className="font-serif-display text-2xl font-semibold text-[#FFF8F6]">
            Cada verso me recuerda a cuando estábamos juntos
          </h3>
          <p className="text-xs text-[#FDA4AF]/80 mt-0.5">
            Toca cualquier estrofa para lanzar corazones y recordar lo que vivimos
          </p>
        </div>

        {BOLERO_STANZAS.map((stanza, index) => {
          const isOpen = !!revealedStanzas[stanza.id];
          return (
            <div
              key={stanza.id}
              onClick={(e) => toggleStanza(stanza.id, e)}
              className="rounded-2xl bg-[#210C12] border border-[#FDA4AF]/15 p-5 transition-all duration-300 hover:border-[#E11D48]/40 cursor-pointer select-none"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs text-[#FDA4AF]/75 font-mono-tabular">
                  <span>Estrofa 0{index + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-sans font-medium text-[#FFF8F6]">{stanza.title}</span>
                </div>
                <span className="text-xs font-medium text-[#E11D48] whitespace-nowrap">
                  {isOpen ? 'Ocultar nota' : 'Ver significado'}
                </span>
              </div>

              <div className="mt-3 space-y-1 border-l-2 border-[#E11D48] pl-4 py-1">
                {stanza.lines.map((line, i) => (
                  <p
                    key={i}
                    className="font-serif-display italic text-xl sm:text-2xl text-[#FFF8F6] leading-snug"
                  >
                    «{line}»
                  </p>
                ))}
              </div>

              {isOpen && (
                <div className="mt-4 pt-3 border-t border-[#FDA4AF]/10 flex items-start gap-3">
                  <Heart className="h-4 w-4 text-[#E11D48] fill-[#E11D48] shrink-0 mt-1" />
                  <p className="text-sm text-[#FDA4AF]/95 leading-relaxed">{stanza.reflection}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
