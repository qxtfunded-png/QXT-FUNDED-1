import React from 'react';
import { motion } from 'motion/react';
import { Settings, Clock, AlertCircle } from 'lucide-react';

const Maintenance: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full text-center relative z-10"
      >
        <div className="relative inline-block mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 bg-orange-500/10 rounded-3xl flex items-center justify-center border border-orange-500/20"
          >
            <Settings className="text-orange-500 w-12 h-12" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-2 -right-2 bg-white text-black p-2 rounded-xl shadow-xl"
          >
            <Clock size={20} />
          </motion.div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Website is <span className="text-orange-500">Updating</span>
        </h1>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-xl">
          <div className="flex items-center justify-center gap-3 text-orange-500 mb-4">
            <AlertCircle size={20} />
            <span className="font-bold uppercase tracking-widest text-sm">Maintenance Mode</span>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            We are currently performing scheduled maintenance to improve your trading experience. 
            <span className="block mt-2 font-semibold text-white">We will be back in 1 hour.</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-500 text-sm">Thank you for your patience.</p>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 bg-orange-500 rounded-full"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-white/5 rounded-full" />
      <div className="absolute bottom-10 right-10 w-64 h-64 border border-white/5 rounded-full" />
    </div>
  );
};

export default Maintenance;
