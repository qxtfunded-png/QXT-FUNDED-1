import React, { useState } from 'react';
import { PLANS } from '../data/config';
import PlanCard from '../components/PlanCard';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AccountPlans = () => {
  const navigate = useNavigate();
  const [activeModel, setActiveModel] = useState<'challenge' | 'instant'>('challenge');

  const challengePlans = PLANS.filter(p => p.type === 'challenge');
  const instantPlans = PLANS.filter(p => p.type === 'instant');

  return (
    <div className="pt-16 sm:pt-24 pb-8 sm:pb-12 px-4 max-w-7xl mx-auto relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="text-center mb-8 sm:mb-12 relative z-10">
        <h1 className="text-xl sm:text-3xl md:text-5xl font-black text-white mb-2 sm:mb-4 tracking-tight uppercase">
          Select Your <span className="text-emerald-400">Trading Model</span>
        </h1>
        
        {/* Side-by-Side Toggle */}
        <div className="flex items-center justify-center space-x-4 sm:space-x-8 mt-6 sm:mt-10">
          <button 
            onClick={() => setActiveModel('challenge')}
            className={`group flex items-center space-x-2 sm:space-x-3 transition-all duration-500 ${activeModel === 'challenge' ? 'opacity-100 scale-105 sm:scale-110' : 'opacity-20 hover:opacity-40 scale-95'}`}
          >
            <Shield size={20} className={activeModel === 'challenge' ? 'text-blue-400' : 'text-gray-400'} />
            <span className={`text-xl sm:text-4xl font-black uppercase tracking-tighter ${activeModel === 'challenge' ? 'text-white' : 'text-gray-500'}`}>Challenge</span>
          </button>
          
          <div className="text-xl sm:text-6xl font-black text-white/5 select-none italic">||</div>
          
          <button 
            onClick={() => setActiveModel('instant')}
            className={`group flex items-center space-x-2 sm:space-x-3 transition-all duration-500 ${activeModel === 'instant' ? 'opacity-100 scale-105 sm:scale-110' : 'opacity-20 hover:opacity-40 scale-95'}`}
          >
            <span className={`text-xl sm:text-4xl font-black uppercase tracking-tighter ${activeModel === 'instant' ? 'text-white' : 'text-gray-500'}`}>Instant</span>
            <Zap size={20} className={activeModel === 'instant' ? 'text-emerald-400' : 'text-gray-400'} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeModel}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10"
        >
          {(activeModel === 'challenge' ? challengePlans : instantPlans).map((plan) => (
            <PlanCard 
              key={plan.id} 
              plan={plan} 
              onSelect={() => navigate('/checkout')}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Comparison Table */}
      <div className="mt-12 sm:mt-20 overflow-x-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Plan Comparison</h2>
          <p className="text-gray-400 text-xs sm:text-sm">Detailed breakdown of all available models.</p>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-4 px-4 text-gray-400 font-medium uppercase text-[10px]">Account Size</th>
              <th className="py-4 px-4 text-gray-400 font-medium uppercase text-[10px]">Type</th>
              <th className="py-4 px-4 text-gray-400 font-medium uppercase text-[10px]">Price</th>
              <th className="py-4 px-4 text-gray-400 font-medium uppercase text-[10px]">Target</th>
              <th className="py-4 px-4 text-gray-400 font-medium uppercase text-[10px]">Daily Loss</th>
              <th className="py-4 px-4 text-gray-400 font-medium uppercase text-[10px]">Payout</th>
              <th className="py-4 px-4 text-gray-400 font-medium uppercase text-[10px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {PLANS.map((plan) => (
              <tr key={plan.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="py-4 px-4 text-white font-bold text-sm">${plan.size.toLocaleString()}</td>
                <td className="py-4 px-4">
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    plan.type === 'challenge' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {plan.type}
                  </span>
                </td>
                <td className="py-4 px-4 text-white font-semibold text-sm">${plan.price}</td>
                <td className="py-4 px-4 text-gray-400 text-sm">{plan.target ? `$${plan.target}` : 'N/A'}</td>
                <td className="py-4 px-4 text-red-400 font-medium text-sm">${plan.dailyLossLimit}</td>
                <td className="py-4 px-4 text-white text-sm">{plan.payoutRatio}</td>
                <td className="py-4 px-4">
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountPlans;
