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
  const navigate = useNavigate();
  const [activeModel, setActiveModel] = React.useState<'challenge' | 'instant' | 'instant-elite'>('challenge');

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
      {/* Hero Section - Split Layout Style */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#050505]">
        {/* Live Ticker */}
        <div className="absolute top-0 left-0 w-full bg-zinc-900/50 border-b border-white/5 backdrop-blur-md z-20 py-2 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {[
              { pair: 'EUR/USD', price: '1.0842', change: '+0.12%' },
              { pair: 'GBP/USD', price: '1.2654', change: '-0.05%' },
              { pair: 'USD/JPY', price: '149.82', change: '+0.24%' },
              { pair: 'XAU/USD', price: '2024.15', change: '+0.45%' },
              { pair: 'BTC/USD', price: '64,245.10', change: '+1.12%' },
              { pair: 'ETH/USD', price: '3,452.80', change: '+0.85%' },
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-4 px-8 border-r border-white/5">
                <span className="text-white font-black text-[10px] uppercase tracking-widest">{item.pair}</span>
                <span className="text-zinc-400 font-mono text-[10px]">{item.price}</span>
                <span className={`text-[10px] font-bold ${item.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {item.change}
                </span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              { pair: 'EUR/USD', price: '1.0842', change: '+0.12%' },
              { pair: 'GBP/USD', price: '1.2654', change: '-0.05%' },
              { pair: 'USD/JPY', price: '149.82', change: '+0.24%' },
              { pair: 'XAU/USD', price: '2024.15', change: '+0.45%' },
              { pair: 'BTC/USD', price: '64,245.10', change: '+1.12%' },
              { pair: 'ETH/USD', price: '3,452.80', change: '+0.85%' },
            ].map((item, i) => (
              <div key={`dup-${i}`} className="flex items-center space-x-4 px-8 border-r border-white/5">
                <span className="text-white font-black text-[10px] uppercase tracking-widest">{item.pair}</span>
                <span className="text-zinc-400 font-mono text-[10px]">{item.price}</span>
                <span className={`text-[10px] font-bold ${item.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <div className="inline-flex items-center space-x-3 bg-emerald-500/5 border border-emerald-500/10 px-4 py-2 rounded-full mb-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-[#050505] bg-zinc-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Trader" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">Trusted by 15,000+ Traders</span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.85] mb-8 tracking-tighter">
                THE FUTURE OF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">PROP TRADING.</span>
              </h1>
              
              <p className="text-zinc-400 text-lg sm:text-xl mb-12 max-w-xl leading-relaxed font-medium">
                Unlock professional capital up to <span className="text-white font-bold">$1,000,000</span>. 
                Keep up to <span className="text-emerald-400 font-bold">95%</span> of your profits with zero hidden traps.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link 
                  to="/plans" 
                  className="w-full sm:w-auto px-10 py-5 bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)] hover:scale-105 transition-all flex items-center justify-center group"
                >
                  Start Trading Now 
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/how-it-works" 
                  className="w-full sm:w-auto px-10 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all text-center"
                >
                  View Models
                </Link>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-8">
                <div>
                  <div className="text-white font-black text-2xl tracking-tight">$2.4M+</div>
                  <div className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mt-1">Paid Out</div>
                </div>
                <div>
                  <div className="text-white font-black text-2xl tracking-tight">24h</div>
                  <div className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mt-1">Avg. Payout</div>
                </div>
                <div>
                  <div className="text-white font-black text-2xl tracking-tight">93%</div>
                  <div className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mt-1">Success Rate</div>
                </div>
              </div>

              {/* Trustpilot-style Badge */}
              <div className="mt-12 flex items-center space-x-3 bg-zinc-900/50 border border-white/5 p-3 rounded-2xl w-fit">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-4 h-4 bg-emerald-500 flex items-center justify-center rounded-sm">
                      <Check size={10} className="text-white" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-black text-[10px] uppercase tracking-widest">Excellent 4.8/5</span>
                  <span className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest leading-none mt-0.5">Based on 1,200+ Reviews</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative hidden lg:block perspective-1000"
            >
              <div className="relative z-10 bg-zinc-900/40 border border-white/5 p-10 rounded-[3rem] backdrop-blur-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] transform hover:rotate-y-[-5deg] transition-transform duration-700">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                      <TrendingUp className="text-emerald-400" size={24} />
                    </div>
                    <div>
                      <div className="text-white font-black text-lg">Live Performance</div>
                      <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Real-time Data Feed</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest animate-pulse">Live</span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-black/40 border border-white/5 rounded-3xl p-6">
                    <div className="flex items-end justify-between mb-4">
                      <div className="space-y-1">
                        <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Account Equity</div>
                        <div className="text-white font-black text-4xl tracking-tighter">$112,450.00</div>
                      </div>
                      <div className="text-emerald-400 font-bold text-sm flex items-center">
                        <TrendingUp size={14} className="mr-1" /> +12.4%
                      </div>
                    </div>
                    <div className="flex items-end space-x-1.5 h-24">
                      {[30, 45, 35, 60, 50, 80, 65, 90, 75, 100].map((h, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          className="flex-1 bg-gradient-to-t from-emerald-500/20 to-emerald-500/60 rounded-t-lg" 
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/5 p-6 rounded-3xl hover:bg-white/10 transition-colors">
                      <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Profit Factor</div>
                      <div className="text-white font-black text-2xl tracking-tight">3.12</div>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-6 rounded-3xl hover:bg-white/10 transition-colors">
                      <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Win Rate</div>
                      <div className="text-white font-black text-2xl tracking-tight">78.5%</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -z-10" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-zinc-900/30 border border-white/5 hover:border-emerald-500/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  {React.cloneElement(prop.icon as React.ReactElement, { size: 80 })}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                  {prop.icon}
                </div>
                <h3 className="text-xl font-black text-white mb-3 relative z-10 uppercase tracking-tight">{prop.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed relative z-10 font-medium">{prop.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tighter uppercase">The Path to <span className="text-emerald-400">Funding</span></h2>
              <p className="text-zinc-500 text-lg font-medium">Your journey to becoming a professional funded trader in four streamlined steps.</p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-white/5 mx-12 mb-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { step: "01", title: "Select Model", desc: "Choose between Challenge, Instant, or Elite models based on your trading style." },
              { step: "02", title: "Configure Account", desc: "Pick your preferred broker and account size during the secure checkout." },
              { step: "03", title: "Secure Payment", desc: "Complete your purchase via crypto. Fast, anonymous, and globally accessible." },
              { step: "04", title: "Instant Delivery", desc: "Receive your credentials via Gmail within 60 minutes and start trading." },
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="text-6xl font-black text-white/5 mb-6 group-hover:text-emerald-500/10 transition-colors">{item.step}</div>
                <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plans */}
      <section className="py-24 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(16,185,129,0.02),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tighter uppercase">
              CHOOSE YOUR <span className="text-emerald-400">FUNDING</span>
            </h2>
            
            {/* Professional Toggle */}
            <div className="inline-flex p-1.5 bg-zinc-900/50 border border-white/5 rounded-2xl backdrop-blur-xl">
              {[
                { id: 'challenge', label: 'Challenge', icon: <Shield size={14} /> },
                { id: 'instant', label: 'Instant', icon: <Zap size={14} /> },
                { id: 'instant-elite', label: 'Elite', icon: <TrendingUp size={14} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveModel(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                    activeModel === tab.id 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {PLANS.filter(p => p.type === activeModel).map((plan) => (
                <motion.div
                  key={plan.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <PlanCard plan={plan} onSelect={handlePlanSelect} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-16 text-center">
            <Link to="/plans" className="inline-flex items-center space-x-2 text-zinc-500 hover:text-emerald-400 font-black text-xs uppercase tracking-[0.2em] transition-colors group">
              <span>Explore All Funding Options</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
