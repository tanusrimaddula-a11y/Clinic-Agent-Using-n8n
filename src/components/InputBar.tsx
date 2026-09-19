import React, { useState, KeyboardEvent, useRef } from 'react';
import { Send, ChevronRight } from 'lucide-react';

interface InputBarProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const InputBar: React.FC<InputBarProps> = ({
  onSendMessage,
  isLoading,
}) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim() || isLoading) return;

    onSendMessage(text.trim());
    setText('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 bg-black/60 backdrop-blur-xl border-t border-white/10 rounded-b-none md:rounded-b-3xl px-4 md:px-6 py-4 flex items-center gap-3 z-20 shrink-0"
    >
      {/* Rounded Input Field */}
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Apna message likhein..."
        disabled={isLoading}
        className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#3D81E3]/80 focus:ring-2 focus:ring-[#3D81E3]/30 transition-all duration-200 disabled:opacity-50"
        autoComplete="off"
      />

      {/* Circular Send Button */}
      <button
        type="submit"
        disabled={!text.trim() || isLoading}
        className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/90 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none shrink-0 shadow-lg shadow-white/10 group cursor-pointer"
        aria-label="Send Message"
      >
        <ChevronRight className="w-6 h-6 text-black group-hover:translate-x-0.5 transition-transform" />
      </button>
    </form>
  );
};
