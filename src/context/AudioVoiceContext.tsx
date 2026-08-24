import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

export type AudioTrackId = "audio1" | "audio2";

export interface AudioTrack {
  id: AudioTrackId;
  name: string;
  speaker: string;
  role: string;
  gender: "male" | "female";
  src: string;
  durationSec: number;
  badge: string;
}

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: "audio1",
    name: "Audio 1 (Senior Counselor)",
    speaker: "Senior Counselor (Male Voice)",
    role: "Seoul University Admissions Specialist",
    gender: "male",
    src: "/audio/voice1.mp3",
    durationSec: 18,
    badge: "Senior Counselor (Male)",
  },
  {
    id: "audio2",
    name: "Audio 2 (Admissions Officer)",
    speaker: "Admissions Officer (Female Voice)",
    role: "Visa & Scholarship Coordinator",
    gender: "female",
    src: "/audio/voice2.mp3",
    durationSec: 18,
    badge: "Admissions Officer (Female)",
  },
];

export const TRANSCRIPT = {
  nepali: "GBS International Educational Consultancy मा हजुरलाई हार्दिक स्वागत छ। दक्षिण कोरियामा पढ्ने तपाईंको सपना, हाम्रो जिम्मेवारी।",
  korean: "GBS 국제 교육 컨설팅에 오신 것을 진심으로 환영합니다. 한국 유학의 꿈, 저희가 현실로 만들어 드립니다.",
  english: "Warm welcome to GBS International Educational Consultancy. Your dream of studying in South Korea is our responsibility.",
};

interface AudioVoiceContextType {
  currentTrackIndex: number;
  currentTrack: AudioTrack;
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  showUnmuteOverlay: boolean;
  togglePlayPause: () => Promise<void>;
  playTrack: (index: number) => Promise<void>;
  switchTrack: (index: number) => Promise<void>;
  replayTrack: () => Promise<void>;
  toggleMute: () => void;
  unmuteAndPlay: () => Promise<void>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  transcript: typeof TRANSCRIPT;
  allTracks: AudioTrack[];
}

const AudioVoiceContext = createContext<AudioVoiceContextType | undefined>(undefined);

export const AudioVoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(18);
  const [showUnmuteOverlay, setShowUnmuteOverlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userPausedRef = useRef(false);

  const currentTrack = AUDIO_TRACKS[currentTrackIndex];

  const safePlay = useCallback(async (forceMuted = false): Promise<boolean> => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      if (forceMuted) audio.muted = true;
      audio.src = currentTrack.src;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
        return true;
      }
      return false;
    } catch {
      setIsPlaying(false);
      return false;
    }
  }, [currentTrack.src]);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    let isMounted = true;

    const startPlayback = async () => {
      if (!isMounted) return;

      // Try audible play first
      const ok = await safePlay(false);
      if (ok && isMounted) {
        setShowUnmuteOverlay(false);
        return;
      }

      // If blocked, play muted (always allowed)
      const mutedOk = await safePlay(true);
      if (isMounted) {
        if (mutedOk) {
          audioEl.muted = true;
          setIsMuted(true);
        }
        // Show overlay so user can tap to hear
        setShowUnmuteOverlay(true);
      }
    };

    startPlayback();

    let attempts = 0;
    const watchdog = setInterval(async () => {
      if (!isMounted) { clearInterval(watchdog); return; }
      const a = audioRef.current;
      if (!a || (!a.paused && !isMuted) || userPausedRef.current) { clearInterval(watchdog); return; }
      if (a.readyState < 2) return;
      attempts++;
      await startPlayback();
      if (attempts > 20) clearInterval(watchdog);
    }, 500);

    return () => {
      isMounted = false;
      clearInterval(watchdog);
    };
  }, [safePlay, currentTrack.src]);

  const unmuteAndPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    setIsMuted(false);
    setShowUnmuteOverlay(false);
    if (audio.paused) {
      await safePlay(false);
    }
  }, [safePlay]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const cur = audioRef.current.currentTime;
      const dur = audioRef.current.duration || 18;
      setCurrentTime(cur);
      setDuration(dur);
      setProgress(dur > 0 ? (cur / dur) * 100 : 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(100);
  };

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      userPausedRef.current = true;
    } else {
      userPausedRef.current = false;
      if (progress >= 99 || audio.ended) audio.currentTime = 0;
      await safePlay(false);
    }
  };

  const playTrack = async (index: number) => {
    if (index === currentTrackIndex) {
      if (!isPlaying) await safePlay(false);
      return;
    }
  };

  const switchTrack = async (index: number) => {
    if (index === currentTrackIndex) {
      await togglePlayPause();
      return;
    }
  };

  const replayTrack = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setProgress(0);
    setCurrentTime(0);
    await safePlay(false);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) setShowUnmuteOverlay(false);
  };

  return (
    <AudioVoiceContext.Provider
      value={{
        currentTrackIndex,
        currentTrack,
        isPlaying,
        isMuted,
        progress,
        currentTime,
        duration,
        showUnmuteOverlay,
        togglePlayPause,
        playTrack,
        switchTrack,
        replayTrack,
        toggleMute,
        unmuteAndPlay,
        audioRef,
        transcript: TRANSCRIPT,
        allTracks: AUDIO_TRACKS,
      }}
    >
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        preload="auto"
        playsInline
      >
        <source src={currentTrack.src} type="audio/mpeg" />
      </audio>

      {children}
    </AudioVoiceContext.Provider>
  );
};

export const useAudioVoice = () => {
  const context = useContext(AudioVoiceContext);
  if (!context) {
    throw new Error("useAudioVoice must be used within an AudioVoiceProvider");
  }
  return context;
};
