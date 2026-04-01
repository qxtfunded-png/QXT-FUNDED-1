import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleVerify = () => {
    if (!email || hasChecked) return;
    setHasChecked(true);
    setIsVerifying(true);
    setTimeout(() => {
      login(email, 'Trader');
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-zinc-900/50 border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl relative z-10"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-white mb-1 uppercase tracking-tighter">Welcome Back</h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Login to your dashboard</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="GMAIL ADDRESS"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-xs font-bold uppercase tracking-widest outline-none focus:border-emerald-500 transition-all"
            />
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <label className={`flex items-center justify-center space-x-3 cursor-pointer group ${!email ? 'opacity-30 cursor-not-allowed' : ''}`}>
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={hasChecked}
                  onChange={handleVerify}
                  className="sr-only"
                  disabled={isVerifying || !email}
                />
                <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${hasChecked ? 'bg-emerald-500 border-emerald-500' : 'border-white/20 bg-white/5 group-hover:border-white/40'}`}>
                  {hasChecked && !isVerifying && <Check size={12} className="text-white" />}
                  {isVerifying && (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full"
                    />
                  )}
                </div>
              </div>
              <span className="text-[11px] text-gray-400 font-black uppercase tracking-widest">
                {isVerifying ? 'Verifying Passkey...' : 'Verify Passkey'}
              </span>
            </label>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 font-semibold">
              Sign up now
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <p className="text-xs text-blue-400 text-center leading-relaxed">
            <span className="font-bold">Note:</span> Passkey authentication is for QXT Funded platform only. 
            It is not for your broker account login.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
