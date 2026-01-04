import { motion } from 'motion/react';
import logoImage from "figma:asset/6e2e8dd8fcb58456312b2b694ed1673ae42ff429.png";

export default function SplashScreen() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#1DBF73] to-[#0F8F55] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{ 
            y: [0, -8, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="bg-white rounded-3xl p-8 shadow-unified"
        >
          <img 
            src={logoImage}
            alt="NutriAdapt Logo"
            className="w-32 h-32 object-contain"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="text-white text-h1 mb-2">
            NutriAdapt
          </h1>
          <p className="text-white/90 text-body-1">
            Votre santé, adaptée à votre rythme.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}