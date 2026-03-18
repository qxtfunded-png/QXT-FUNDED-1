import React from 'react';
import { motion } from 'motion/react';
import { Check, Shield, Zap, TrendingUp } from 'lucide-react';
import { Plan } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

interface PlanCardProps {
  plan: Plan;
  onSelect?: (plan: Plan) => void;
  isSelected?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect, isSelected }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className={`relative p-4 sm:p-6 rounded-[1.5rem] border transition-all cursor-pointer group overflow-hidden ${
        isSelected 
          ? 'bg-emerald-500/10 border-emerald-500 shadow-2xl shadow-emerald-500/20' 
          : 'bg-zinc-900/40 border-white/5 hover:border-emerald-500/40 backdrop-blur-md'
      }`}
      onClick={() => onSelect?.(plan)}
    >
      {/* Decorative background element */}
      <div className={`absolute -right-10 -top-10 w-24 h-24 rounded-full blur-3xl opacity-10 transition-all group-hover:opacity-20 ${
        plan.type === 'challenge' ? 'bg-blue-500' : plan.type === 'instant-elite' ? 'bg-purple-500' : 'bg-emerald-500'
      }`} />

      {plan.type === 'challenge' && (
        <div className="absolute top-3 right-3 bg-blue-500/10 text-blue-400 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-blue-500/20">
          {t.common.challenge}
        </div>
      )}
      {plan.type === 'instant' && (
        <div className="absolute top-3 right-3 bg-emerald-500/10 text-emerald-400 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-emerald-500/20">
          {t.common.instant}
        </div>
      )}
      {plan.type === 'instant-elite' && (
        <div className="absolute top-3 right-3 bg-purple-500/10 text-purple-400 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-purple-500/20">
          ELITE
        </div>
      )}

      <div className="mb-6">
        <div className="text-gray-500 text-[9px] font-bold uppercase tracking-widest mb-1">Account Size</div>
        <h3 className={`text-2xl sm:text-3xl font-black tracking-tight ${plan.type === 'instant-elite' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500' : 'text-white'}`}>
          ${plan.size.toLocaleString()}
        </h3>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">Price</span>
          <span className="text-white font-black text-base">${plan.price}</span>
        </div>
        <div className="h-px bg-white/5" />
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">Daily Loss</span>
          <span className="text-red-400 font-bold text-xs">${plan.dailyLossLimit.toLocaleString()}</span>
        </div>
        {plan.target && (
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">Profit Target</span>
            <span className="text-emerald-400 font-bold text-xs">${plan.target.toLocaleString()}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">Withdrawal</span>
          <span className="text-white font-bold text-xs">
            {plan.withdrawalDays === 0 ? 'INSTANT' : `${plan.withdrawalDays} Days`}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">Payout</span>
          <span className="text-white font-bold text-xs">{plan.payoutRatio}</span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(plan);
        }}
        className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
          isSelected 
            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
            : 'bg-white/5 text-white hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20'
        }`}
      >
        {isSelected ? t.common.select : t.common.buyNow}
      </button>
    </motion.div>
  );
};

export default PlanCard;
