import React, { useState } from 'react';
import gsap from 'gsap';
import { Heart, Maximize2, MessageSquareHeart } from 'lucide-react';
import { MemoryCardData } from '../data/loveLetterData';

interface InteractiveMemoryCardProps {
  memory: MemoryCardData;
  imageUrl: string;
  isRevealed: boolean;
  onReveal: (id: string, e: React.MouseEvent) => void;
  onOpenLightbox: (memory: MemoryCardData, imageUrl: string) => void;
}

export const InteractiveMemoryCard: React.FC<InteractiveMemoryCardProps> = ({
  memory,
  imageUrl,
  isRevealed,
  onReveal,
  onOpenLightbox,
}) => {
  const [likes, setLikes] = useState<number>(1);
  const [imageError, setImageError] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const secretPanelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  const handleToggleReveal = (e: React.MouseEvent) => {
    onReveal(memory.id, e);
    if (secretPanelRef.current) {
      gsap.fromTo(
        secretPanelRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
      );
    }
  };

  const handleHeartLove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => prev + 1);
    onReveal(memory.id, e);
  };

  return (
    <article
      ref={cardRef}
      className="group relative rounded-3xl bg-[#210C12] border border-[#FDA4AF]/20 overflow-hidden shadow-xl transition-all duration-300"
    >
      {/* Clean Unboxed Editorial Metadata Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-2 text-xs text-[#FDA4AF]/85 font-mono-tabular">
          <span className="font-semibold text-[#FFF8F6]">Foto {memory.chapterNumber}</span>
          <span aria-hidden="true">·</span>
          <span className="truncate max-w-[240px] sm:max-w-xs">{memory.dateLabel}</span>
        </div>
        <Heart className="h-3.5 w-3.5 text-[#E11D48] fill-[#E11D48]/60 shrink-0" />
      </div>

      {/* Photo Container — Zero Upload Buttons, Pure Romantic Frame */}
      <div
        onClick={handleToggleReveal}
        className={`relative w-full overflow-hidden cursor-pointer select-none ${
          memory.aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'
        } bg-[#18080D]`}
      >
        {!imageError ? (
          <img
            src={imageUrl}
            alt={memory.title}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#2B0D16] via-[#1C080E] to-[#120609] p-6 text-center">
            <Heart className="h-10 w-10 text-[#E11D48] fill-[#E11D48]/30 mb-3" />
            <p className="font-serif-display italic text-2xl text-[#FFF8F6]">
              {memory.lyricVerse}
            </p>
          </div>
        )}

        {/* Measured Bottom Gradient Scrim */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#120609] via-[#120609]/65 to-transparent" />

        {/* Fullscreen Lightbox Trigger */}
        {!imageError && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(memory, imageUrl);
            }}
            aria-label="Ver fotografía en pantalla completa"
            className="absolute top-3 right-3 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-2xl bg-[#120609]/70 text-[#FFF8F6] backdrop-blur-md border border-[#FDA4AF]/25 hover:bg-[#E11D48] transition-colors cursor-pointer"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        )}

        {/* Bottom Caption inside Photo Frame */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
          <div>
            <h3
              className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#FFF8F6] leading-tight drop-shadow"
              style={{ textWrap: 'balance' }}
            >
              {memory.title}
            </h3>
            <p className="mt-0.5 text-xs sm:text-sm text-[#FDA4AF]/95">{memory.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Expandable Secret Dedication Panel */}
      <div className="p-5 bg-[#210C12]">
        {isRevealed ? (
          <div ref={secretPanelRef} className="space-y-3">
            <p className="text-sm sm:text-[15px] leading-relaxed text-[#FFF8F6]/95">
              {memory.secretNote}
            </p>
            <div className="pt-2.5 border-t border-[#FDA4AF]/10 flex items-center justify-between gap-2">
              <p className="font-serif-display italic text-base sm:text-lg text-[#FBBF24]">
                {memory.lyricVerse}
              </p>
              <button
                type="button"
                onClick={handleHeartLove}
                className="flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-xl bg-[#31111B] px-3.5 py-2 text-xs font-medium text-[#FDA4AF] hover:bg-[#E11D48] hover:text-[#FFF8F6] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <Heart className="h-3.5 w-3.5 fill-[#E11D48] text-[#E11D48]" />
                <span className="font-mono-tabular">{likes} Te amo</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <span className="font-serif-display italic text-base sm:text-lg text-[#FBBF24] truncate">
              {memory.lyricVerse}
            </span>
            <button
              type="button"
              onClick={handleToggleReveal}
              className="flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-xl bg-[#E11D48] px-4 py-2 text-xs font-semibold text-[#FFF8F6] hover:bg-[#BE123C] active:scale-95 transition-colors cursor-pointer whitespace-nowrap shadow-md shadow-[#E11D48]/25"
            >
              <MessageSquareHeart className="h-3.5 w-3.5" />
              <span>Revelar Nota</span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
