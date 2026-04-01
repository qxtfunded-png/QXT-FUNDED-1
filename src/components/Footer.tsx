import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Shield, Info, HelpCircle, FileText, Lock, CheckCircle } from 'lucide-react';
import { SUPPORT_EMAIL } from '../data/config';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-8 sm:pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-3 inline-block">
              QXT FUNDED
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed max-w-md">
              QXT Funded is an independent prop trading evaluation and account access platform. 
              We empower traders worldwide with professional capital and premium trading environments.
            </p>
            <div className="mt-4 flex items-center space-x-2 text-gray-300">
              <Mail size={16} className="text-emerald-400" />
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-xs hover:text-emerald-400 transition-colors">
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3 flex items-center space-x-2">
              <Info size={16} className="text-emerald-400" />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link to="/plans" className="text-gray-400 hover:text-white transition-colors">Account Plans</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors">Support</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3 flex items-center space-x-2">
              <Shield size={16} className="text-emerald-400" />
              <span>Legal</span>
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/risk" className="text-gray-400 hover:text-white transition-colors">Risk Disclosure</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6">
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center space-x-2 text-gray-400">
              <Lock size={14} className="text-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest">SSL Secure Checkout</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <CheckCircle size={14} className="text-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Verified Merchant</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Shield size={14} className="text-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Fraud Protection</span>
            </div>
          </div>

          <div className="bg-zinc-900/50 rounded-lg p-4 mb-6 border border-white/5">
            <p className="text-[10px] text-gray-500 leading-relaxed text-center">
              <span className="text-gray-300 font-semibold">DISCLAIMER:</span> QXT Funded is an independent service provider. 
              We are NOT officially affiliated, endorsed, or partnered with Quotex, Pocket Option, Olymp Trade, or IQ Option. 
              Trading involves significant risk. Our evaluation models are for educational and performance assessment purposes. 
              Past performance does not guarantee future results. Users must ensure they comply with local regulations.
            </p>
          </div>
          <p className="text-center text-gray-600 text-[10px]">
            © {new Date().getFullYear()} QXT Funded. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
