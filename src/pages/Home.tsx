import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Shield, Zap, TrendingUp, Globe, CreditCard, Headphones, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import PlanCard from '../components/PlanCard';
import AccordionItem from '../components/AccordionItem';
import { PLANS, Plan } from '../data/config';
import { FAQ_DATA } from '../data/faq';

const Home = () => {
  const { t } = useLanguage();
  const [hasAccepted, setHasAccepted] = React.useState(false);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 4000);
  };

  const navigate = useNavigate();
  const [activeModel, setActiveModel] = React.useState<'challenge' | 'instant'>('challenge');

  const handlePlanSelect = (plan: Plan) => {
    const selection = {
      type: plan.type,
      plan: plan,
      broker: null,
      details: { name: '', email: '', country: '', address: '', notes: '' },
      paymentMethod: null
    };
    localStorage.setItem('checkout_selection', JSON.stringify(selection));
    localStorage.setItem('checkout_step', '3'); // Skip to broker selection or similar
    navigate('/checkout');
  };

  const featuredPlans = PLANS.filter(p => p.type === activeModel && (p.size === 10000 || p.size === 50000));

  const valueProps = [
    { icon: <Zap className="text-emerald-400" />, title: "Fast Onboarding", desc: "Get your credentials delivered quickly after verification." },
    { icon: <Shield className="text-blue-400" />, title: "Multiple Models", desc: "Choose between Instant and Challenge accounts." },
    { icon: <TrendingUp className="text-emerald-400" />, title: "Clear Rules", desc: "Transparent trading rules with no hidden traps." },
    { icon: <Globe className="text-blue-400" />, title: "Global Access", desc: "Trade from anywhere in the world with crypto payments." },
    { icon: <CreditCard className="text-emerald-400" />, title: "Crypto Payments", desc: "Secure and fast payments via USDT BEP20, TRC20, ERC20." },
    { icon: <Headphones className="text-blue-400" />, title: "Responsive Support", desc: "Dedicated support team at qxtfunded@gmail.com." },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:min-h-[70vh] flex items-center pt-6 sm:pt-10 overflow-hidden bg-zinc-950">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full mb-4 sm:mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 text-[8px] sm:text-[10px] font-black uppercase tracking-widest">Active Funding</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[0.9] mb-4 sm:mb-6 tracking-tighter">
                TRADE WITH <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">OUR CAPITAL.</span>
              </h1>
              
              <p className="text-gray-400 text-sm sm:text-lg mb-6 sm:mb-8 max-w-xl leading-relaxed font-medium">
                Get funded up to <span className="text-white font-bold">$100,000</span> and keep up to <span className="text-emerald-400 font-bold">93%</span> of the profits. No hidden rules, just pure trading.
              </p>

              <div className="mb-10">
                {!isVerified ? (
                  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl max-w-xs backdrop-blur-xl">
                    <label className="flex items-center space-x-4 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={hasAccepted}
                          onChange={(e) => {
                            setHasAccepted(e.target.checked);
                            if (e.target.checked) handleVerify();
                          }}
                          className="sr-only"
                          disabled={isVerifying}
                        />
                        <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${hasAccepted ? 'bg-emerald-500 border-emerald-500' : 'border-white/20 bg-white/5 group-hover:border-white/40'}`}>
                          {hasAccepted && !isVerifying && <Check size={14} className="text-white" />}
                          {isVerifying && (
                            <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full"
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-white font-black uppercase tracking-widest">
                          {isVerifying ? 'Verifying Passkey...' : 'Verify Passkey to Trade'}
                        </span>
                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                          {isVerifying ? 'Securing Connection...' : 'Click to grant access'}
                        </span>
                      </div>
                    </label>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6"
                  >
                    <Link 
                      to="/plans" 
                      className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-emerald-500 text-white rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all flex items-center justify-center"
                    >
                      Get Funded Now <ArrowRight size={18} className="ml-2" />
                    </Link>
                    <Link 
                      to="/how-it-works" 
                      className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-white/10 transition-all text-center"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                )}
              </div>

              <div className="mt-8 sm:mt-12 flex items-center space-x-6 sm:space-x-8 opacity-50">
                <div className="flex flex-col">
                  <span className="text-white font-black text-xl sm:text-2xl tracking-tight">$2.4M+</span>
                  <span className="text-gray-500 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">Total Payouts</span>
                </div>
                <div className="w-px h-8 sm:h-10 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-white font-black text-xl sm:text-2xl tracking-tight">15k+</span>
                  <span className="text-gray-500 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">Active Traders</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 bg-zinc-900/40 border border-white/5 p-8 rounded-[3rem] backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="text-gray-500 text-[8px] font-bold uppercase tracking-widest">Trading Dashboard</div>
                </div>
                <div className="space-y-4">
                  <div className="h-24 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 flex items-end justify-between">
                    <div className="space-y-1">
                      <div className="text-emerald-400 text-[8px] font-bold uppercase tracking-widest">Equity Curve</div>
                      <div className="text-white font-black text-2xl">+$12,450.00</div>
                    </div>
                    <div className="flex items-end space-x-1 h-full">
                      {[40, 60, 45, 70, 55, 85, 65, 95].map((h, i) => (
                        <div key={i} className="w-2 bg-emerald-500/40 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                      <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Win Rate</div>
                      <div className="text-white font-black text-xl">74.2%</div>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                      <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Profit Factor</div>
                      <div className="text-white font-black text-xl">2.84</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl -z-10 rounded-[4rem]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-8 sm:py-16 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {valueProps.map((prop, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4 sm:p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/30 transition-all group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  {prop.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">{prop.title}</h3>
                <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed">{prop.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">How It Works</h2>
            <p className="text-gray-400 text-xs sm:text-sm">Your journey to becoming a funded trader in 4 simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Choose Account", desc: "Select between Challenge or Instant models based on your strategy." },
              { step: "02", title: "Broker Preference", desc: "Select your preferred broker (Quotex, Pocket Option, etc) during checkout." },
              { step: "03", title: "Complete Payment", desc: "Pay securely via Crypto and upload your payment proof for verification." },
              { step: "04", title: "Gmail Delivery", desc: "Receive your account ID and trading password in your Gmail within 1 hour." },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-3xl sm:text-5xl font-black text-white/5 absolute -top-4 -left-1 sm:-top-6 sm:-left-2 z-0">{item.step}</div>
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-[10px] sm:text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plans */}
      <section className="py-8 sm:py-16 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-4xl font-black text-white mb-2 sm:mb-3 tracking-tight uppercase">POPULAR <span className="text-emerald-400">PLANS</span></h2>
            
            {/* Side-by-Side Toggle */}
            <div className="flex items-center justify-center space-x-4 sm:space-x-6 mt-4 sm:mt-6">
              <button 
                onClick={() => setActiveModel('challenge')}
                className={`group flex items-center space-x-2 transition-all ${activeModel === 'challenge' ? 'opacity-100' : 'opacity-20 hover:opacity-40'}`}
              >
                <Shield size={14} className={activeModel === 'challenge' ? 'text-blue-400' : 'text-gray-400'} />
                <span className={`text-base sm:text-xl font-black uppercase tracking-tighter ${activeModel === 'challenge' ? 'text-white' : 'text-gray-500'}`}>Challenge</span>
              </button>
              
              <div className="text-lg sm:text-2xl font-black text-white/5 select-none italic">||</div>
              
              <button 
                onClick={() => setActiveModel('instant')}
                className={`group flex items-center space-x-2 transition-all ${activeModel === 'instant' ? 'opacity-100' : 'opacity-20 hover:opacity-40'}`}
              >
                <span className={`text-base sm:text-xl font-black uppercase tracking-tighter ${activeModel === 'instant' ? 'text-white' : 'text-gray-500'}`}>Instant</span>
                <Zap size={14} className={activeModel === 'instant' ? 'text-emerald-400' : 'text-gray-400'} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {PLANS.filter(p => p.type === activeModel && (p.size === 10000 || p.size === 20000 || p.size === 50000 || p.size === 100000)).map((plan) => (
              <PlanCard key={plan.id} plan={plan} onSelect={handlePlanSelect} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/plans" className="text-emerald-400 hover:text-emerald-300 font-bold text-sm flex items-center justify-center group">
              View All Plans <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-8 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-xs sm:text-sm">Everything you need to know about QXT Funded.</p>
          </div>
          <div className="space-y-1">
            {FAQ_DATA.slice(0, 5).map((faq, i) => (
              <AccordionItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <div className="mt-6 sm:mt-10 text-center">
            <Link to="/faq" className="bg-white/5 hover:bg-white/10 text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl font-bold text-[10px] sm:text-sm transition-all border border-white/10">
              View All FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-16 bg-emerald-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-4xl font-black text-black mb-3 sm:mb-4 uppercase tracking-tighter">Ready to Start Trading?</h2>
          <p className="text-black/70 text-sm sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto font-medium">
            Join thousands of traders who are already using QXT Funded to access professional capital.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-black text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-black text-xs sm:text-lg hover:scale-105 transition-transform shadow-2xl uppercase tracking-widest"
          >
            GET FUNDED NOW
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
