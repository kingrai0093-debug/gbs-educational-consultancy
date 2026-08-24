import React from "react";
import { useAudioVoice } from "../context/AudioVoiceContext";
import { Volume2, Play } from "lucide-react";

export const UnmuteOverlay: React.FC = () => {
  const { showUnmuteOverlay, unmuteAndPlay, currentTrack } = useAudioVoice();

  if (!showUnmuteOverlay) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        unmuteAndPlay();
      }}
    >
      <div className="flex flex-col items-center gap-6 p-10 rounded-3xl bg-gradient-to-br from-red-700/90 to-red-900/90 shadow-2xl shadow-red-600/30 border border-red-500/40 max-w-sm mx-4 text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-red-400/30 animate-ping" />
          <div className="relative w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/30">
            <Play className="h-10 w-10 text-white ml-1" fill="white" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            GBS Welcome Audio
          </h2>
          <p className="text-white/80 text-sm">
            {currentTrack.gender === "male" ? "Senior Counselor" : "Admissions Officer"} — {currentTrack.name}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            unmuteAndPlay();
          }}
          className="flex items-center gap-3 px-8 py-4 bg-white text-red-700 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform active:scale-95"
        >
          <Volume2 className="h-6 w-6" />
          Play Audio
        </button>

        <p className="text-white/50 text-xs">
          Tap anywhere to hear the welcome message
        </p>
      </div>
    </div>
  );
};
