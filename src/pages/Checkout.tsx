import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  CreditCard, 
  Shield, 
  Zap,
  Globe, 
  Mail, 
  Copy, 
  QrCode, 
  Clock, 
  Upload,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { PLANS, WALLETS, BROKERS, PAYMENT_LOGOS, Plan } from '../data/config';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import PlanCard from '../components/PlanCard';

const Checkout = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState<{
    type: 'challenge' | 'instant' | null;
    plan: Plan | null;
    broker: string | null;
    details: { name: string; email: string; country: string; address: string; notes: string };
    paymentMethod: 'usdt_bep20' | 'usdt_trc20' | 'usdt_erc20' | null;
    paymentProof: File | null;
  }>({
    type: null,
    plan: null,
    broker: null,
    details: { name: user?.name || '', email: user?.email || '', country: '', address: '', notes: '' },
    paymentMethod: null,
    paymentProof: null
  });

  const [timer, setTimer] = useState(300); // 5 minutes
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let interval: any;
    if (step === 6 && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const filteredPlans = PLANS.filter(p => p.type === selection.type);

  return (
    <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= s ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-gray-500'
              }`}>
                {step > s ? <Check size={16} /> : s}
              </div>
              {s < 7 && (
                <div className={`w-4 sm:w-12 h-1 mx-2 rounded-full ${
                  step > s ? 'bg-emerald-500' : 'bg-zinc-800'
                }`} />
              )}
            </div>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-white text-center">
          {step === 1 && t.checkout.step1}
          {step === 2 && t.checkout.step2}
          {step === 3 && t.checkout.step3}
          {step === 4 && t.checkout.step4}
          {step === 5 && t.checkout.step5}
          {step === 6 && t.checkout.step6}
          {step === 7 && t.checkout.step7}
        </h1>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="min-h-[400px]"
        >
          {/* STEP 1: ACCOUNT TYPE */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  id: 'challenge', 
                  title: t.common.challenge, 
                  icon: <Shield size={40} />, 
                  desc: 'Two-phase evaluation with lower entry cost.',
                  color: 'blue'
                },
                { 
                  id: 'instant', 
                  title: t.common.instant, 
                  icon: <Zap size={40} />, 
                  desc: 'Direct funding. No evaluation phase required.',
                  color: 'emerald'
                }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelection({ ...selection, type: type.id as any, plan: null });
                    nextStep();
                  }}
                  className={`relative p-8 sm:p-10 rounded-[3rem] border text-left transition-all group overflow-hidden ${
                    selection.type === type.id 
                      ? `bg-${type.color}-500/10 border-${type.color}-500 shadow-2xl shadow-${type.color}-500/20` 
                      : 'bg-zinc-900/40 border-white/5 hover:border-white/20 backdrop-blur-md'
                  }`}
                >
                  <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-10 transition-all group-hover:opacity-20 bg-${type.color}-500`} />
                  
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 ${
                    selection.type === type.id 
                      ? `bg-${type.color}-500 text-white shadow-lg shadow-${type.color}-500/30` 
                      : `bg-white/5 text-${type.color}-400`
                  }`}>
                    {type.icon}
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">{type.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">{type.desc}</p>
                  
                  <div className="mt-8 flex items-center text-white font-bold text-sm">
                    Select Model <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* STEP 2: SELECT PLAN */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map((plan) => (
                  <PlanCard 
                    key={plan.id} 
                    plan={plan} 
                    isSelected={selection.plan?.id === plan.id}
                    onSelect={(p) => {
                      setSelection({ ...selection, plan: p });
                      nextStep();
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between">
                <button onClick={prevStep} className="px-8 py-3 rounded-xl bg-white/5 text-white font-bold border border-white/10">{t.common.previous}</button>
                <button 
                  disabled={!selection.plan}
                  onClick={nextStep} 
                  className="px-8 py-3 rounded-xl bg-emerald-500 disabled:opacity-50 text-white font-bold shadow-lg shadow-emerald-500/20"
                >
                  {t.common.next}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: BROKER PREFERENCE */}
          {step === 3 && (
            <div className="space-y-10">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {BROKERS.map((broker) => (
                  <button
                    key={broker.id}
                    onClick={() => {
                      setSelection({ ...selection, broker: broker.id });
                      nextStep();
                    }}
                    className={`relative p-6 sm:p-8 rounded-[2rem] border transition-all flex flex-col items-center text-center group overflow-hidden ${
                      selection.broker === broker.id 
                        ? 'bg-emerald-500/10 border-emerald-500 shadow-2xl shadow-emerald-500/20' 
                        : 'bg-zinc-900/40 border-white/5 hover:border-white/20 backdrop-blur-md'
                    }`}
                  >
                    <div className="absolute -right-8 -top-8 w-20 h-20 rounded-full blur-2xl opacity-5 bg-emerald-500" />
                    
                    <div 
                      className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-3xl font-black transition-transform group-hover:scale-110 shadow-inner"
                      style={{ 
                        backgroundColor: `${broker.color}15`, 
                        color: broker.color,
                        border: `1px solid ${broker.color}30`
                      }}
                    >
                      {broker.initial}
                    </div>
                    <span className="text-white font-black text-xs sm:text-sm tracking-tight">{broker.name}</span>
                    <span className="text-gray-500 text-[8px] font-bold uppercase tracking-widest mt-1">Verified</span>
                    
                    {selection.broker === broker.id && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-center justify-center space-x-3">
                <Shield className="text-blue-400/40" size={20} />
                <p className="text-[10px] text-blue-400/80 font-bold uppercase tracking-widest text-center">{t.checkout.brokerNote}</p>
              </div>
              <div className="flex justify-between items-center pt-4">
                <button onClick={prevStep} className="flex items-center space-x-2 text-gray-400 hover:text-white font-black uppercase tracking-widest text-[10px] transition-colors">
                  <ChevronLeft size={16} />
                  <span>{t.common.previous}</span>
                </button>
                <button 
                  disabled={!selection.broker}
                  onClick={nextStep} 
                  className="px-8 py-3 rounded-xl bg-emerald-500 disabled:opacity-50 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all"
                >
                  {t.common.next}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: USER DETAILS */}
          {step === 4 && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Full Name</label>
                  <input 
                    type="text" 
                    value={selection.details.name}
                    onChange={(e) => setSelection({ ...selection, details: { ...selection.details, name: e.target.value } })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-emerald-500" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Gmail Address</label>
                  <input 
                    type="email" 
                    value={selection.details.email}
                    onChange={(e) => setSelection({ ...selection, details: { ...selection.details, email: e.target.value } })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-emerald-500" 
                    placeholder="your@gmail.com" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Country</label>
                  <input 
                    type="text" 
                    value={selection.details.country}
                    onChange={(e) => setSelection({ ...selection, details: { ...selection.details, country: e.target.value } })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-emerald-500" 
                    placeholder="United States" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Address</label>
                  <input 
                    type="text" 
                    value={selection.details.address}
                    onChange={(e) => setSelection({ ...selection, details: { ...selection.details, address: e.target.value } })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-emerald-500" 
                    placeholder="123 Street, City" 
                  />
                </div>
              </div>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start space-x-3">
                <Mail className="text-emerald-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-sm text-emerald-400 leading-relaxed">{t.checkout.gmailNote}</p>
              </div>
              <div className="flex justify-between pt-6">
                <button onClick={prevStep} className="px-8 py-3 rounded-xl bg-white/5 text-white font-bold border border-white/10">{t.common.previous}</button>
                <button 
                  disabled={!selection.details.name || !selection.details.email || !selection.details.country}
                  onClick={nextStep} 
                  className="px-8 py-3 rounded-xl bg-emerald-500 disabled:opacity-50 text-white font-bold shadow-lg shadow-emerald-500/20"
                >
                  {t.common.next}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: PAYMENT METHOD */}
          {step === 5 && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { id: 'usdt_bep20', name: 'USDT BEP20', network: 'BNB Smart Chain', logo: PAYMENT_LOGOS.bep20 },
                  { id: 'usdt_trc20', name: 'USDT TRC20', network: 'Tron Network', logo: PAYMENT_LOGOS.trc20 },
                  { id: 'usdt_erc20', name: 'USDT ERC20', network: 'Ethereum', logo: PAYMENT_LOGOS.erc20 }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => {
                      setSelection({ ...selection, paymentMethod: method.id as any });
                      nextStep();
                    }}
                    className={`relative p-10 rounded-[3rem] border text-center transition-all group overflow-hidden ${
                      selection.paymentMethod === method.id 
                        ? 'bg-emerald-500/10 border-emerald-500 shadow-2xl shadow-emerald-500/20' 
                        : 'bg-zinc-900/40 border-white/5 hover:border-white/20 backdrop-blur-md'
                    }`}
                  >
                    <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-5 bg-emerald-500" />
                    
                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8 p-5 transition-transform group-hover:scale-110">
                      <img src={method.logo} alt={method.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{method.name}</h3>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{method.network}</p>
                    
                    {selection.paymentMethod === method.id && (
                      <div className="absolute top-6 right-6 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <Check size={18} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex justify-between items-center pt-4">
                <button onClick={prevStep} className="flex items-center space-x-2 text-gray-400 hover:text-white font-black uppercase tracking-widest text-xs transition-colors">
                  <ChevronLeft size={18} />
                  <span>{t.common.previous}</span>
                </button>
                <button 
                  disabled={!selection.paymentMethod}
                  onClick={nextStep} 
                  className="px-10 py-4 rounded-2xl bg-emerald-500 disabled:opacity-50 text-white font-black text-sm shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all"
                >
                  {t.common.next}
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: PAYMENT SCREEN */}
          {step === 6 && selection.paymentMethod && (
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/20">
                  <motion.div 
                    initial={{ width: '100%' }}
                    animate={{ width: 0 }}
                    transition={{ duration: 300, ease: 'linear' }}
                    className="h-full bg-emerald-500"
                  />
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-emerald-400 mb-6 font-mono text-xl">
                  <Clock size={24} />
                  <span>{formatTime(timer)}</span>
                </div>

                <div className="mb-8 p-4 bg-white rounded-2xl inline-block shadow-2xl shadow-emerald-500/10">
                  <QRCodeSVG value={WALLETS[selection.paymentMethod]} size={180} />
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-gray-400 text-sm">Send exactly <span className="text-white font-bold">${selection.plan?.price} USDT</span> to the address below:</p>
                  <div className="flex items-center bg-black/50 border border-white/10 rounded-xl p-4 group">
                    <code className="flex-1 text-emerald-400 text-xs sm:text-sm font-mono break-all text-left">
                      {WALLETS[selection.paymentMethod]}
                    </code>
                    <button 
                      onClick={() => handleCopy(WALLETS[selection.paymentMethod])}
                      className="ml-4 p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {copied ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-4 text-left">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Upload Payment Proof</label>
                  <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-emerald-500/50 transition-all cursor-pointer group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setSelection({ ...selection, paymentProof: e.target.files?.[0] || null })}
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                    />
                    <div className="flex flex-col items-center">
                      <Upload className="text-gray-500 group-hover:text-emerald-400 mb-4 transition-colors" size={40} />
                      <p className="text-sm text-gray-400">{selection.paymentProof ? selection.paymentProof.name : t.checkout.paymentProof}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={prevStep} className="px-8 py-3 rounded-xl bg-white/5 text-white font-bold border border-white/10">{t.common.previous}</button>
                <button 
                  disabled={!selection.paymentProof}
                  onClick={nextStep} 
                  className="px-8 py-3 rounded-xl bg-emerald-500 disabled:opacity-50 text-white font-bold shadow-lg shadow-emerald-500/20"
                >
                  {t.checkout.iHavePaid}
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: CONFIRMATION */}
          {step === 7 && (
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/40"
              >
                <CheckCircle2 size={48} className="text-white" />
              </motion.div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">Payment Submitted!</h2>
                <p className="text-gray-400 leading-relaxed max-w-md mx-auto">
                  Your payment proof has been submitted. Admin verification typically takes <span className="text-emerald-400 font-bold">up to 1 hour</span>. A confirmation email will be delivered to <span className="text-emerald-400 font-bold">{selection.details.email}</span> once approved.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="p-6 bg-zinc-900/50 border border-white/10 rounded-2xl">
                  <h4 className="text-white font-bold mb-2 flex items-center space-x-2">
                    <Clock size={18} className="text-blue-400" />
                    <span>Next Steps</span>
                  </h4>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>• Admin approval (within 1 hour)</li>
                    <li>• Credentials sent to Gmail</li>
                    <li>• Track status in Dashboard</li>
                  </ul>
                </div>
                <div className="p-6 bg-zinc-900/50 border border-white/10 rounded-2xl">
                  <h4 className="text-white font-bold mb-2 flex items-center space-x-2">
                    <AlertCircle size={18} className="text-yellow-400" />
                    <span>Important</span>
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Check your Spam folder if you don't see our email within 12 hours.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/20"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
