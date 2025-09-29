import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, Sparkles, CheckCircle, Cpu, Monitor } from 'lucide-react';

interface DevModeOverlayProps {
  isVisible: boolean;
  onContinue: () => void;
}

export const DevModeOverlay: React.FC<DevModeOverlayProps> = ({ isVisible, onContinue }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Note: Body scroll is controlled by TerminalInterface when terminal mode is active

  const steps = [
    { text: 'Initializing Developer Mode...', icon: <Cpu size={20} />, delay: 0 },
    { text: 'Loading Terminal Interface...', icon: <Terminal size={20} />, delay: 300 },
    { text: 'Configuring Command System...', icon: <Code2 size={20} />, delay: 600 },
    { text: 'Activating Theme Engine...', icon: <Monitor size={20} />, delay: 900 },
    { text: 'Enabling File System...', icon: <Sparkles size={20} />, delay: 1200 },
    { text: 'Developer Mode Activated!', icon: <CheckCircle size={20} />, delay: 1500 },
  ];

  useEffect(() => {
    if (!isVisible) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    steps.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setCurrentStep(index + 1);
        
        if (index === steps.length - 1) {
          setTimeout(() => {
            setShowSuccess(true);
            setTimeout(onContinue, 800); // Auto-continue after success
          }, 400);
        }
      }, step.delay);
      
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [isVisible, onContinue]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.3 } }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] bg-gradient-to-br from-black via-gray-900 to-black flex flex-col"
        >
          {/* Fast loading bar at top */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 origin-left"
          />

          {/* Main content */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden">
            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-12 gap-4 h-full">
                {[...Array(48)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.02, duration: 0.3 }}
                    className="bg-green-400 rounded-sm"
                  />
                ))}
              </div>
            </div>

            <div className="text-center space-y-8 z-10">
              {/* Main title with sick animation */}
              <motion.div
                initial={{ scale: 0, rotateY: -90 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="space-y-4"
              >
                <motion.h1 
                  className="text-8xl font-black bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
                  initial={{ letterSpacing: '-0.5em' }}
                  animate={{ letterSpacing: '0em' }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  DEV MODE
                </motion.h1>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-2 bg-gradient-to-r from-green-400 to-purple-400 rounded-full mx-auto w-64"
                />
              </motion.div>

              {/* Steps loading */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="space-y-4 max-w-md mx-auto"
              >
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ 
                      x: currentStep > index ? 0 : -50,
                      opacity: currentStep > index ? 1 : 0.3
                    }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                      currentStep > index 
                        ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                        : 'bg-gray-800/50 border-gray-700/50 text-gray-500'
                    }`}
                  >
                    <motion.div
                      animate={{ 
                        rotate: currentStep > index ? 360 : 0,
                        scale: currentStep > index ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.icon}
                    </motion.div>
                    <span className="font-mono text-sm">{step.text}</span>
                    {currentStep > index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <CheckCircle size={16} className="text-green-400" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Success animation */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="space-y-4"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle size={32} className="text-black" />
                    </motion.div>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-bold text-green-400"
                    >
                      Ready to hack!
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Particle effects */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    y: -10,
                    x: Math.random() * window.innerWidth,
                    opacity: 0
                  }}
                  animate={{ 
                    y: window.innerHeight + 10,
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute w-1 h-4 bg-gradient-to-b from-green-400 to-transparent rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
