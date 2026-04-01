import React from 'react';
import { Mail, MessageSquare, Clock, ShieldCheck, HelpCircle } from 'lucide-react';
import { SUPPORT_EMAIL } from '../data/config';

const Support = () => {
  return (
    <div className="pt-16 sm:pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">Support Center</h1>
        <p className="text-gray-400 text-sm sm:text-base">We're here to help you succeed in your trading journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl text-center">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Mail className="text-emerald-400" size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Email Support</h3>
          <p className="text-gray-400 text-xs mb-4">Direct assistance for account and payment issues.</p>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-emerald-400 text-sm font-bold hover:underline">{SUPPORT_EMAIL}</a>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl text-center">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Clock className="text-blue-400" size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Response Time</h3>
          <p className="text-gray-400 text-xs mb-4">Our team typically responds within 1-6 hours during business days.</p>
          <span className="text-blue-400 text-sm font-bold">Fast & Reliable</span>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl text-center">
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="text-purple-400" size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Verification</h3>
          <p className="text-gray-400 text-xs mb-4">Secure payment and account verification process.</p>
          <span className="text-purple-400 text-sm font-bold">Safe & Secure</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">How can we help?</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="mt-1 p-1.5 bg-white/5 rounded-lg"><HelpCircle size={18} className="text-emerald-400" /></div>
              <div>
                <h4 className="text-white text-sm font-bold mb-0.5">Account Delivery</h4>
                <p className="text-gray-400 text-xs leading-relaxed">Account details are sent to your Gmail after payment verification. Check your spam folder if not received.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1 p-1.5 bg-white/5 rounded-lg"><MessageSquare size={18} className="text-blue-400" /></div>
              <div>
                <h4 className="text-white text-sm font-bold mb-0.5">Trading Rules</h4>
                <p className="text-gray-400 text-xs leading-relaxed">Each plan has specific rules. You can find them on your dashboard or the plans page.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Send a Message</h3>
          <form className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Name" className="bg-black/50 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white outline-none focus:border-emerald-500" />
              <input type="email" placeholder="Gmail" className="bg-black/50 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white outline-none focus:border-emerald-500" />
            </div>
            <input type="text" placeholder="Subject" className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white outline-none focus:border-emerald-500" />
            <textarea placeholder="Message" rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white outline-none focus:border-emerald-500 resize-none"></textarea>
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-bold transition-all shadow-lg shadow-emerald-500/20 text-sm">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
