import React from 'react';
import { Settings, RefreshCw, Sparkles } from 'lucide-react';

interface HeaderBarProps {
  onOpenSettings?: () => void;
  onResetSession?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  onOpenSettings,
  onResetSession,
}) => {
  return (
    <header className="rounded-t-none md:rounded-t-3xl bg-black/60 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center relative z-20 shrink-0 select-none">
      {/* Left: Avatar + Clinic Name + Subtitle */}
      <div className="flex items-center gap-3.5">
        {/* Avatar Bubble LM */}
        <div className="relative">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#3D81E3] to-[#00d2ff] flex items-center justify-center text-white font-bold text-base shadow-lg shadow-[#3D81E3]/25 ring-2 ring-white/10">
            LM
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-black flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-75" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-lg text-white tracking-tight leading-tight">
              Lotus Medicals
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-[#3D81E3]/20 text-[#00d2ff] border border-[#00d2ff]/30 px-2 py-0.5 rounded-full">
              <Sparkles className="w-2.5 h-2.5" /> AI
            </span>
          </div>
          <p className="text-white/50 text-xs font-normal">
            AI Appointment Receptionist
          </p>
        </div>
      </div>

      {/* Right: Status & Actions */}
      <div className="flex items-center gap-4">
        {/* Online Status Badge */}
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-white/70 text-sm font-medium">Online</span>
        </div>

        {/* Quick action buttons if provided */}
        {onResetSession && (
          <button
            onClick={onResetSession}
            title="Reset conversation"
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}

        {onOpenSettings && (
          <button
            onClick={onOpenSettings}
            title="Webhook settings"
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 active:scale-95"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
