import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import {
  Heart,
  Music,
  Volume2,
  VolumeX,
  Image as ImageIcon,
  Sparkles,
  BookOpen,
  X,
} from 'lucide-react';
import {
  INITIAL_MEMORIES,
  ORIGINAL_BOLERO_MP3,
  MemoryCardData,
} from './data/loveLetterData';
import { FloatingHeartsCanvas, HeartBurstPoint } from './components/FloatingHeartsCanvas';
import { EnvelopeCoverModal } from './components/EnvelopeCoverModal';
import { InteractiveMemoryCard } from './components/InteractiveMemoryCard';
import { BoleroSerenadeSection } from './components/BoleroSerenadeSection';
import { FinalHeartfeltSpeech } from './components/FinalHeartfeltSpeech';

type ActiveSectionTab = 'carta' | 'recuerdos' | 'cancion' | 'final';

export default function App() {
  const [isLetterOpened, setIsLetterOpened] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveSectionTab>('carta');
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [userPausedMusic, setUserPausedMusic] = useState<boolean>(() => {
    try {
      return localStorage.getItem('carta_music_paused') === 'true';
    } catch {
      return false;
    }
  });
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [revealedMemories, setRevealedMemories] = useState<Record<string, boolean>>({
    'mem-1': true,
    'mem-2': true,
    'mem-3': true,
    'mem-4': true,
    'mem-5': true,
    'mem-6': true,
    'mem-7': true,
    'mem-8': true,
    'mem-9': true,
    'mem-10': true,
  });
  const [lightboxData, setLightboxData] = useState<{
    memory: MemoryCardData;
    imageUrl: string;
  } | null>(null);
  const [burstPoint, setBurstPoint] = useState<HeartBurstPoint | null>(null);
  const [loveCounter, setLoveCounter] = useState<number>(100);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const formatAudioTime = (secs: number) => {
    if (!secs || !Number.isFinite(secs)) return '0:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const triggerHeartBurst = (e: React.MouseEvent) => {
    setBurstPoint({
      x: e.clientX || window.innerWidth / 2,
      y: e.clientY || window.innerHeight / 2,
      id: Date.now() + Math.random(),
    });
    setLoveCounter((prev) => prev + 1);
  };

  const startMusicPlayback = (forcePlay = false) => {
    if (userPausedMusic && !forcePlay) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.9;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlayingMusic(true);
          setUserPausedMusic(false);
          try {
            localStorage.setItem('carta_music_paused', 'false');
          } catch {}
        })
        .catch(() => {
          if (!audio.src.endsWith('/contigo.mp3')) {
            audio.src = '/contigo.mp3';
            audio
              .play()
              .then(() => {
                setIsPlayingMusic(true);
                setUserPausedMusic(false);
                try {
                  localStorage.setItem('carta_music_paused', 'false');
                } catch {}
              })
              .catch(() => {});
          }
        });
    }
  };

  const pauseMusicPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlayingMusic(false);
    setUserPausedMusic(true);
    try {
      localStorage.setItem('carta_music_paused', 'true');
    } catch {}
  };

  const toggleMusicPlayback = () => {
    if (isPlayingMusic) {
      pauseMusicPlayback();
    } else {
      startMusicPlayback(true);
    }
  };

  const handleSeekAudio = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio || !audioDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = clickX / rect.width;
    const newTime = percentage * audioDuration;
    audio.currentTime = newTime;
    setAudioCurrentTime(newTime);
  };

  useEffect(() => {
    if (!isLetterOpened || !mainContentRef.current) return;
    gsap.fromTo(
      mainContentRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, isLetterOpened]);

  const handleRevealMemory = (id: string, e: React.MouseEvent) => {
    triggerHeartBurst(e);
    setRevealedMemories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSpeechActiveChange = (isActive: boolean) => {
    if (!audioRef.current) return;
    gsap.to(audioRef.current, {
      volume: isActive ? 0.2 : 0.9,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const heroPhotoUrl = INITIAL_MEMORIES[0].defaultImageUrl;

  return (
    <div className="min-h-screen bg-[#120609] text-[#FFF8F6] relative selection:bg-[#E11D48]/30">
      {/* Native HTML5 Audio Player bound to bundled MP3 + /contigo.mp3 fallback */}
      <audio
        ref={audioRef}
        src={ORIGINAL_BOLERO_MP3 || '/contigo.mp3'}
        preload="auto"
        loop
        playsInline
        onPlay={() => setIsPlayingMusic(true)}
        onPause={() => setIsPlayingMusic(false)}
        onTimeUpdate={(e) => setAudioCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
      />

      {/* GSAP Ambient & Interactive Burst Hearts */}
      <FloatingHeartsCanvas burstPoint={burstPoint} />

      {/* Initial 3D Wax-Sealed Envelope Modal */}
      {!isLetterOpened && (
        <EnvelopeCoverModal
          onStartMusic={() => startMusicPlayback(false)}
          onOpenLetter={() => {
            setIsLetterOpened(true);
            startMusicPlayback(false);
          }}
          heroPhotoUrl={heroPhotoUrl}
        />
      )}

      {/* Top Navigation Bar — Clean 3-Zone Contract */}
      <header className="sticky top-0 z-30 h-14 bg-[#120609]/90 backdrop-blur-md border-b border-[#FDA4AF]/15 px-3.5 sm:px-6 flex items-center justify-between gap-2">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#carta"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('carta');
          }}
          className="font-serif-display text-lg sm:text-xl font-semibold tracking-tight text-[#FFF8F6] whitespace-nowrap shrink-0"
        >
          Para Ti, Mi Amor
        </a>

        {/* Zone 2: Clean text navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#FDA4AF]/80">
          <button
            type="button"
            onClick={() => setActiveTab('carta')}
            className={`hover:text-[#FFF8F6] transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'carta'
                ? 'text-[#FFF8F6] underline underline-offset-4 decoration-[#E11D48]'
                : ''
            }`}
          >
            Carta
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('recuerdos')}
            className={`hover:text-[#FFF8F6] transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'recuerdos'
                ? 'text-[#FFF8F6] underline underline-offset-4 decoration-[#E11D48]'
                : ''
            }`}
          >
            Lo Felices Que Éramos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cancion')}
            className={`hover:text-[#FFF8F6] transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'cancion'
                ? 'text-[#FFF8F6] underline underline-offset-4 decoration-[#E11D48]'
                : ''
            }`}
          >
            Nuestra Canción
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('final')}
            className={`hover:text-[#FFF8F6] transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'final'
                ? 'text-[#FFF8F6] underline underline-offset-4 decoration-[#E11D48]'
                : ''
            }`}
          >
            Dedicatoria Final
          </button>
        </nav>

        {/* Zone 3: Compact Spotify-Style Audio Player Button & Track Progress */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleMusicPlayback}
            aria-label={isPlayingMusic ? 'Pausar música de fondo' : 'Reproducir música de fondo'}
            className={`group relative flex min-h-[40px] items-center gap-2.5 rounded-2xl border px-3 py-1.5 text-left transition-all active:scale-95 cursor-pointer overflow-hidden ${
              isPlayingMusic
                ? 'bg-[#250C14]/95 border-[#E11D48]/50 text-[#FFF8F6] shadow-md shadow-[#E11D48]/15'
                : 'bg-[#1D0910]/90 border-[#FDA4AF]/20 text-[#FDA4AF] hover:border-[#E11D48]/40 hover:text-[#FFF8F6]'
            }`}
          >
            {/* Play/Pause Icon Badge */}
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                isPlayingMusic
                  ? 'bg-[#E11D48] text-[#FFF8F6]'
                  : 'bg-[#31111B] text-[#FDA4AF] group-hover:bg-[#E11D48] group-hover:text-[#FFF8F6]'
              }`}
            >
              {isPlayingMusic ? (
                <Volume2 className="h-3.5 w-3.5" />
              ) : (
                <VolumeX className="h-3.5 w-3.5" />
              )}
            </span>

            {/* Song Info + Interactive Spotify-like Progress Bar */}
            <span className="flex flex-col justify-center min-w-[128px] sm:min-w-[155px]">
              <span className="flex items-center justify-between gap-2 text-[11px] font-semibold leading-none">
                <span className="truncate text-[#FFF8F6]">
                  {isPlayingMusic ? 'Contigo' : 'En pausa'}
                </span>
                <span className="font-mono-tabular text-[10px] text-[#FDA4AF]/80 shrink-0">
                  {formatAudioTime(audioCurrentTime)} / {formatAudioTime(audioDuration)}
                </span>
              </span>

              {/* Clickable / Seekable Progress Track */}
              <div
                onClick={handleSeekAudio}
                title="Toca la barra para adelantar o retroceder la canción"
                className="mt-1.5 h-1.5 w-full rounded-full bg-[#3A121E] overflow-hidden relative flex items-center cursor-pointer"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#E11D48] to-[#FBBF24] transition-all duration-150"
                  style={{
                    width: `${
                      audioDuration > 0
                        ? Math.min(100, (audioCurrentTime / audioDuration) * 100)
                        : 0
                    }%`,
                  }}
                />
              </div>
            </span>

            {/* Subtle Equalizer Bars when playing */}
            {isPlayingMusic && (
              <span className="hidden sm:flex items-end gap-0.5 h-3 ml-0.5" aria-hidden="true">
                <span className="w-0.5 h-2 bg-[#E11D48] rounded-full animate-pulse" />
                <span className="w-0.5 h-3 bg-[#FBBF24] rounded-full animate-bounce" />
                <span className="w-0.5 h-1.5 bg-[#E11D48] rounded-full animate-pulse" />
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Responsive Container — Mobile-first iPhone focus */}
      <main
        ref={mainContentRef}
        className="relative z-20 mx-auto w-full max-w-[440px] md:max-w-3xl px-4 pt-5 pb-24"
      >
        {/* TAB 1: CARTA DE APERTURA + RECUERDOS */}
        {activeTab === 'carta' && (
          <div className="space-y-7">
            {/* Hero Intimate Letter Card featuring original IMG-20240930-WA0017.jpg */}
            <section className="relative rounded-3xl bg-[#210C12] border border-[#FDA4AF]/20 overflow-hidden shadow-2xl">
              <div className="relative h-96 sm:h-[440px] w-full overflow-hidden bg-[#18080D]">
                <img
                  src={heroPhotoUrl}
                  alt="Nosotros frente al espejo"
                  className="h-full w-full object-cover object-[center_35%]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#210C12] via-[#210C12]/35 to-transparent" />

                <div className="absolute bottom-4 left-5 right-5">
                  <div className="flex items-center gap-2 text-xs text-[#FBBF24] font-mono-tabular">
                    <span>Para el Amor de Mi Vida</span>
                    <span aria-hidden="true">·</span>
                    <span>{loveCounter} Latidos</span>
                  </div>
                  <h1
                    className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#FFF8F6] mt-1 leading-tight drop-shadow"
                    style={{ textWrap: 'balance' }}
                  >
                    Las horas más felices de mi amor fueron contigo
                  </h1>
                </div>
              </div>

              {/* Opening Letter Prose */}
              <div className="p-6 space-y-4">
                <p className="font-serif-display italic text-xl sm:text-2xl text-[#FDA4AF] leading-snug">
                  «Tus besos se llegaron a recrear aquí en mi boca, llenando de ilusión y de pasión mi vida loca...»
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={triggerHeartBurst}
                    className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#31111B] border border-[#FDA4AF]/20 px-4 py-3 text-xs font-medium text-[#FDA4AF] hover:text-[#FFF8F6] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Heart className="h-4 w-4 fill-[#E11D48] text-[#E11D48]" />
                    <span>Toca para Lanzar Corazones</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Main Heartfelt Letter Body */}
            <section
              onClick={triggerHeartBurst}
              className="relative rounded-3xl bg-[#210C12] border border-[#FDA4AF]/20 p-6 sm:p-8 shadow-2xl space-y-6 cursor-pointer"
            >
              <div className="flex items-center justify-between border-b border-[#FDA4AF]/15 pb-4">
                <div>
                  <p className="text-xs font-medium text-[#FBBF24] tracking-wide">
                    Desde el Fondo de Mi Corazón
                  </p>
                  <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#FFF8F6] mt-0.5">
                    Lo que realmente siento por ti
                  </h2>
                </div>
                <Heart className="h-5 w-5 text-[#E11D48] fill-[#E11D48] shrink-0" />
              </div>

              <div className="space-y-5 text-base sm:text-[17px] text-[#FFF8F6]/95 leading-relaxed">
                <p>
                  Creo que la única razón por la que me estoy aferrando tanto a ti es porque, en el fondo, realmente quiero que te quedes en mi vida. Porque te amo, te quiero muchísimo y, de verdad, quiero compartir mi vida contigo.
                </p>

                <p>
                  Y no es porque sea un migajero, ni porque sea un arrastrado, ni porque no sepa cuándo soltar. Es simplemente porque eres la única persona que ha logrado entrar así en mi corazón, y me encanta lo que siento cuando estás en él.
                </p>

                <p>
                  Por eso soy tan insistente, por eso quiero estar siempre ahí y por eso me cuesta tanto soltar. No quiero obligarte a quedarte ni quiero que estés conmigo por lástima. Solo quiero que te quedes porque, si depende de mí, yo todavía te elegiría una y otra vez.
                </p>

                <div className="pt-2 border-l-2 border-[#E11D48] pl-4 py-1">
                  <p className="font-serif-display italic text-2xl sm:text-3xl font-semibold text-[#FBBF24] leading-snug">
                    Simplemente quiero compartir mi vida contigo. Eso es todo.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#FDA4AF]/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerHeartBurst(e);
                    setActiveTab('recuerdos');
                  }}
                  className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#E11D48] px-5 py-3.5 text-sm font-semibold text-[#FFF8F6] shadow-lg shadow-[#E11D48]/25 hover:bg-[#BE123C] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Recordar Lo Felices Que Éramos Juntos</span>
                </button>
              </div>
            </section>

            {/* Decorative Romantic Quote Finale */}
            <section className="rounded-3xl bg-gradient-to-br from-[#2B0E18] to-[#1A080E] border border-[#E11D48]/35 p-6 text-center space-y-4 shadow-xl">
              <p className="text-xs font-medium text-[#FBBF24]">
                El Cierre de Esta Carta
              </p>
              <h3
                className="font-serif-display italic text-2xl sm:text-3xl text-[#FFF8F6]"
                style={{ textWrap: 'balance' }}
              >
                «Simplemente con esfuerzo hago lo que mejor sé hacer para la persona que más amo...»
              </h3>
              <div className="pt-2 flex items-center justify-center gap-3 text-[#E11D48]/80" aria-hidden="true">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#FDA4AF]/40" />
                <Heart className="h-3.5 w-3.5 fill-[#E11D48] text-[#E11D48]" />
                <Heart className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24]" />
                <Heart className="h-3.5 w-3.5 fill-[#E11D48] text-[#E11D48]" />
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#FDA4AF]/40" />
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: FOTOS PARA RECORDAR LO FELICES QUE ÉRAMOS JUNTOS */}
        {activeTab === 'recuerdos' && (
          <div className="space-y-6">
            <div className="px-1">
              <p className="text-xs font-medium text-[#FBBF24]">
                Nuestra Historia Juntos
              </p>
              <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#FFF8F6] mt-0.5">
                Fotos para recordar lo felices que éramos juntos
              </h1>
              <p className="text-xs text-[#FDA4AF]/80 mt-1">
                Toca cualquier fotografía para verla en pantalla completa o lanzar corazones
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {INITIAL_MEMORIES.map((memory) => (
                <InteractiveMemoryCard
                  key={memory.id}
                  memory={memory}
                  imageUrl={memory.defaultImageUrl}
                  isRevealed={!!revealedMemories[memory.id]}
                  onReveal={handleRevealMemory}
                  onOpenLightbox={(mem, url) => setLightboxData({ memory: mem, imageUrl: url })}
                />
              ))}
            </div>

            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={() => setActiveTab('cancion')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#E11D48] px-6 py-3 text-sm font-semibold text-[#FFF8F6] shadow-lg shadow-[#E11D48]/25 hover:bg-[#BE123C] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <Music className="h-4 w-4" />
                <span>Continuar a Nuestra Canción</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: SERENATA INTERACTIVA DEL BOLERO */}
        {activeTab === 'cancion' && (
          <div className="space-y-6">
            <BoleroSerenadeSection
              isPlayingMusic={isPlayingMusic}
              onToggleMusic={toggleMusicPlayback}
              onTriggerHeartBurst={triggerHeartBurst}
              coverPhotoUrl={INITIAL_MEMORIES[4].defaultImageUrl}
            />

            <div className="text-center pb-4">
              <button
                type="button"
                onClick={() => setActiveTab('final')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#E11D48] px-6 py-3 text-sm font-semibold text-[#FFF8F6] shadow-lg shadow-[#E11D48]/25 hover:bg-[#BE123C] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <Heart className="h-4 w-4 fill-[#FFF8F6]" />
                <span>Leer Mi Confesión Final Para Ti</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: SECCIONES REVELABLES + MENSAJE FINAL HABLADO */}
        {activeTab === 'final' && (
          <FinalHeartfeltSpeech
            onTriggerHeartBurst={triggerHeartBurst}
            bannerPhotoUrl={INITIAL_MEMORIES[9].defaultImageUrl}
            onSpeechActiveChange={handleSpeechActiveChange}
          />
        )}
      </main>

      {/* Fullscreen Lightbox Modal */}
      {lightboxData && (
        <div
          onClick={() => setLightboxData(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#120609]/95 backdrop-blur-lg p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl bg-[#210C12] border border-[#FDA4AF]/20 overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#FDA4AF]/15">
              <div className="text-xs text-[#FDA4AF] font-mono-tabular">
                <span>Foto {lightboxData.memory.chapterNumber}</span>
                <span className="mx-1.5">·</span>
                <span>{lightboxData.memory.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxData(null)}
                aria-label="Cerrar vista completa"
                className="flex min-h-[44px] min-w-[44px] -my-2 -mr-2 items-center justify-center rounded-xl text-[#FDA4AF] hover:text-[#FFF8F6] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={lightboxData.imageUrl}
                alt={lightboxData.memory.title}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            <div className="p-5 space-y-2">
              <p className="font-serif-display italic text-lg text-[#FBBF24]">
                {lightboxData.memory.lyricVerse}
              </p>
              <p className="text-sm text-[#FFF8F6]/90 leading-relaxed">
                {lightboxData.memory.secretNote}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* iPhone Thumb-Zone Fixed Bottom Tab Bar */}
      <nav
        aria-label="Navegación de la carta"
        className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-[#120609]/90 backdrop-blur-md border-t border-[#FDA4AF]/15 grid grid-cols-4 items-center px-2"
      >
        <button
          type="button"
          onClick={() => setActiveTab('carta')}
          className={`flex min-h-[44px] flex-col items-center justify-center transition-colors cursor-pointer ${
            activeTab === 'carta' ? 'text-[#E11D48]' : 'text-[#FDA4AF]/70 hover:text-[#FFF8F6]'
          }`}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
            Carta
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('recuerdos')}
          className={`flex min-h-[44px] flex-col items-center justify-center transition-colors cursor-pointer ${
            activeTab === 'recuerdos'
              ? 'text-[#E11D48]'
              : 'text-[#FDA4AF]/70 hover:text-[#FFF8F6]'
          }`}
        >
          <ImageIcon className="h-5 w-5" />
          <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
            Fotos
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cancion')}
          className={`flex min-h-[44px] flex-col items-center justify-center transition-colors cursor-pointer ${
            activeTab === 'cancion'
              ? 'text-[#E11D48]'
              : 'text-[#FDA4AF]/70 hover:text-[#FFF8F6]'
          }`}
        >
          <Music className="h-5 w-5" />
          <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
            Canción
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('final')}
          className={`flex min-h-[44px] flex-col items-center justify-center transition-colors cursor-pointer ${
            activeTab === 'final' ? 'text-[#E11D48]' : 'text-[#FDA4AF]/70 hover:text-[#FFF8F6]'
          }`}
        >
          <Heart className={`h-5 w-5 ${activeTab === 'final' ? 'fill-[#E11D48]' : ''}`} />
          <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
            Mi Voz
          </span>
        </button>
      </nav>
    </div>
  );
}
