import React from 'react';
import { Mail, MessageSquare, Clock, ShieldCheck, HelpCircle } from 'lucide-react';
import { SUPPORT_EMAIL } from '../data/config';

const Support = () => {
  return (
    <div className="pt-24 sm:pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Support Center</h1>
        <p className="text-gray-400 text-base sm:text-lg">We're here to help you succeed in your trading journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-3xl text-center">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="text-emerald-400" size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Email Support</h3>
          <p className="text-gray-400 text-sm mb-6">Direct assistance for account and payment issues.</p>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-emerald-400 font-bold hover:underline">{SUPPORT_EMAIL}</a>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-3xl text-center">
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Clock className="text-blue-400" size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Response Time</h3>
          <p className="text-gray-400 text-sm mb-6">Our team typically responds within 1-6 hours during business days.</p>
          <span className="text-blue-400 font-bold">Fast & Reliable</span>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-3xl text-center">
          <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="text-purple-400" size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Verification</h3>
          <p className="text-gray-400 text-sm mb-6">Secure payment and account verification process.</p>
          <span className="text-purple-400 font-bold">Safe & Secure</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-white">How can we help?</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="mt-1 p-2 bg-white/5 rounded-lg"><HelpCircle size={20} className="text-emerald-400" /></div>
              <div>
                <h4 className="text-white font-bold mb-1">Account Delivery</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Account details are sent to your Gmail after payment verification. Check your spam folder if not received.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="mt-1 p-2 bg-white/5 rounded-lg"><MessageSquare size={20} className="text-blue-400" /></div>
              <div>
                <h4 className="text-white font-bold mb-1">Trading Rules</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Each plan has specific rules. You can find them on your dashboard or the plans page.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-white/10 p-8 rounded-3xl">
          <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-emerald-500" />
              <input type="email" placeholder="Gmail" className="bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-emerald-500" />
            </div>
            <input type="text" placeholder="Subject" className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-emerald-500" />
            <textarea placeholder="Message" rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-emerald-500 resize-none"></textarea>
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
