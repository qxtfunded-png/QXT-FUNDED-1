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
    <div className="pt-20 sm:pt-32 pb-12 sm:pb-20 px-4 max-w-7xl mx-auto relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="text-center mb-10 sm:mb-16 relative z-10">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-3 sm:mb-6 tracking-tight uppercase">
          Select Your <span className="text-emerald-400">Trading Model</span>
        </h1>
        
        {/* Side-by-Side Toggle */}
        <div className="flex items-center justify-center space-x-4 sm:space-x-12 mt-8 sm:mt-12">
          <button 
            onClick={() => setActiveModel('challenge')}
            className={`group flex items-center space-x-2 sm:space-x-3 transition-all duration-500 ${activeModel === 'challenge' ? 'opacity-100 scale-105 sm:scale-110' : 'opacity-20 hover:opacity-40 scale-95'}`}
          >
            <Shield size={24} className={activeModel === 'challenge' ? 'text-blue-400' : 'text-gray-400'} />
            <span className={`text-2xl sm:text-5xl font-black uppercase tracking-tighter ${activeModel === 'challenge' ? 'text-white' : 'text-gray-500'}`}>Challenge</span>
          </button>
          
          <div className="text-2xl sm:text-7xl font-black text-white/5 select-none italic">||</div>
          
          <button 
            onClick={() => setActiveModel('instant')}
            className={`group flex items-center space-x-2 sm:space-x-3 transition-all duration-500 ${activeModel === 'instant' ? 'opacity-100 scale-105 sm:scale-110' : 'opacity-20 hover:opacity-40 scale-95'}`}
          >
            <span className={`text-2xl sm:text-5xl font-black uppercase tracking-tighter ${activeModel === 'instant' ? 'text-white' : 'text-gray-500'}`}>Instant</span>
            <Zap size={24} className={activeModel === 'instant' ? 'text-emerald-400' : 'text-gray-400'} />
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
      <div className="mt-20 sm:mt-32 overflow-x-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Plan Comparison</h2>
          <p className="text-gray-400 text-sm sm:text-base">Detailed breakdown of all available models.</p>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-6 px-4 text-gray-400 font-medium uppercase text-xs">Account Size</th>
              <th className="py-6 px-4 text-gray-400 font-medium uppercase text-xs">Type</th>
              <th className="py-6 px-4 text-gray-400 font-medium uppercase text-xs">Price</th>
              <th className="py-6 px-4 text-gray-400 font-medium uppercase text-xs">Target</th>
              <th className="py-6 px-4 text-gray-400 font-medium uppercase text-xs">Daily Loss</th>
              <th className="py-6 px-4 text-gray-400 font-medium uppercase text-xs">Payout</th>
              <th className="py-6 px-4 text-gray-400 font-medium uppercase text-xs">Action</th>
            </tr>
          </thead>
          <tbody>
            {PLANS.map((plan) => (
              <tr key={plan.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="py-6 px-4 text-white font-bold">${plan.size.toLocaleString()}</td>
                <td className="py-6 px-4">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                    plan.type === 'challenge' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {plan.type}
                  </span>
                </td>
                <td className="py-6 px-4 text-white font-semibold">${plan.price}</td>
                <td className="py-6 px-4 text-gray-400">{plan.target ? `$${plan.target}` : 'N/A'}</td>
                <td className="py-6 px-4 text-red-400 font-medium">${plan.dailyLossLimit}</td>
                <td className="py-6 px-4 text-white">{plan.payoutRatio}</td>
                <td className="py-6 px-4">
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
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
