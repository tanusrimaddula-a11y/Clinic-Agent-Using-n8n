import React from 'react';
import { motion } from 'motion/react';

export const GlobalBackground: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0a0f]"
      aria-hidden="true"
    >
      {/* 1. Subtle Looping 3D Gradient Mesh Animation */}
      <div className="absolute inset-0 opacity-35 filter blur-[120px]">
        {/* Blob 1 - Brand Blue */}
        <motion.div
          className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-[#3D81E3]"
          animate={{
            x: ['0%', '15%', '-10%', '0%'],
            y: ['0%', '20%', '10%', '0%'],
            scale: [1, 1.25, 0.9, 1],
            rotate: [0, 90, 180, 360],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        {/* Blob 2 - Teal Accent */}
        <motion.div
          className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] max-w-[750px] max-h-[750px] rounded-full bg-[#00d2ff]"
          animate={{
            x: ['0%', '-20%', '10%', '0%'],
            y: ['0%', '-15%', '-25%', '0%'],
            scale: [1, 1.15, 1.3, 1],
            rotate: [360, 270, 90, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        {/* Blob 3 - Center Floating Hybrid Glow */}
        <motion.div
          className="absolute top-[30%] left-[25%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-gradient-to-r from-[#3D81E3] to-[#00d2ff]"
          animate={{
            x: ['-10%', '15%', '-5%', '-10%'],
            y: ['15%', '-10%', '10%', '15%'],
            scale: [0.9, 1.2, 1, 0.9],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* 2. Faint Animated Grid & Depth Particles Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <motion.div 
          className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(61,129,227,0.08)_0%,transparent_70%)]"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      {/* 3. Soft Vignette Radial-Gradient Overlay at Edges */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(10,10,15,0.75)_80%,#0a0a0f_100%)]" 
      />
    </div>
  );
};
