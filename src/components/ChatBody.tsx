import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Bot, User, Calendar, Clock, Stethoscope } from 'lucide-react';
import { Message } from '../types';

interface ChatBodyProps {
  messages: Message[];
  isLoading: boolean;
  onSendPrompt: (promptText: string) => void;
}

const QUICK_REPLIES = [
  {
    label: 'Book Appointment',
    prompt: 'Mujhe appointment chahiye',
    icon: Calendar,
  },
  {
    label: 'Clinic Timings',
    prompt: 'Mujhe clinic ke timings bata dein',
    icon: Clock,
  },
  {
    label: 'Child Specialist',
    prompt: 'Mere bachay ke liye doctor chahiye',
    icon: Stethoscope,
  },
];

export const ChatBody: React.FC<ChatBodyProps> = ({
  messages,
  isLoading,
  onSendPrompt,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Helper to format text with simple line breaks and strong tags
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Simple bold formatting replacement for **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 md:px-6 py-6 md:py-8 flex flex-col relative custom-scrollbar z-10 min-h-[500px]"
    >
      {/* Welcome / Hero State (Shown when no messages or as top hero) */}
      <AnimatePresence>
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="my-auto py-8 flex flex-col items-center text-center max-w-lg mx-auto"
          >
            {/* Animated 3D Floating Icon */}
            <motion.div
              animate={{
                y: [-8, 8, -8],
                rotateX: [0, 5, 0, -5, 0],
                rotateY: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative mb-6 group cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#3D81E3] to-[#00d2ff] blur-lg opacity-40 group-hover:opacity-70 transition-opacity" />
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-b from-white/15 to-white/5 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white shadow-2xl shadow-brand/20">
                <Plus className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-[0_0_10px_rgba(61,129,227,0.8)]" />
              </div>
            </motion.div>

            {/* Heading */}
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              How can we help you?
            </h2>

            {/* Subtext */}
            <p className="text-white/50 text-sm max-w-md my-3.5 leading-relaxed font-normal">
              Main aapko doctor select karne, availability check karne aur appointment book karne mein help kar sakta hoon.
            </p>

            {/* Quick Reply Pill Buttons */}
            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              {QUICK_REPLIES.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => onSendPrompt(item.prompt)}
                    className="liquid-glass hover:scale-105 active:scale-95 transition-all duration-200 text-sm px-5 py-2.5 rounded-full text-white/90 hover:text-white border border-white/10 hover:border-white/25 hover:bg-white/10 flex items-center gap-2 shadow-lg shadow-black/30 group cursor-pointer"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#00d2ff] group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Feed */}
      <div className="flex flex-col gap-4 w-full">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-end gap-2 w-full ${
                isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#3D81E3] to-[#00d2ff] flex items-center justify-center text-white text-[11px] font-bold shrink-0 mb-1 shadow-md">
                  LM
                </div>
              )}

              <div
                className={`text-sm leading-relaxed px-5 py-3.5 max-w-[85%] md:max-w-[78%] break-words transition-all ${
                  isUser
                    ? 'bg-[#3D81E3] text-white rounded-2xl rounded-br-sm shadow-lg shadow-[#3D81E3]/20 border border-blue-400/20 self-end'
                    : 'liquid-glass text-white/95 rounded-2xl rounded-bl-sm border border-white/10 shadow-xl'
                }`}
              >
                {renderFormattedText(msg.text)}

                <div
                  className={`text-[10px] mt-1.5 opacity-40 font-mono flex items-center gap-1 ${
                    isUser ? 'justify-end text-white' : 'justify-start text-white/70'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0 mb-1">
                  <User className="w-3.5 h-3.5 text-white/80" />
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Loading State: 3 Bouncing Dots inside Liquid Glass Bubble */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex items-end gap-2 justify-start w-full my-1"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#3D81E3] to-[#00d2ff] flex items-center justify-center text-white text-[11px] font-bold shrink-0 mb-1 shadow-md">
                LM
              </div>

              <div className="liquid-glass rounded-2xl rounded-bl-sm px-5 py-4 border border-white/10 flex items-center gap-1.5 shadow-xl">
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 rounded-full bg-[#00d2ff]"
                />
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                  className="w-2 h-2 rounded-full bg-[#3D81E3]"
                />
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                  className="w-2 h-2 rounded-full bg-white/70"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>
    </div>
  );
};
