import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Shield, Info, HelpCircle, FileText } from 'lucide-react';
import { SUPPORT_EMAIL } from '../data/config';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-12 sm:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-4 inline-block">
              QXT FUNDED
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              QXT Funded is an independent prop trading evaluation and account access platform. 
              We empower traders worldwide with professional capital and premium trading environments.
            </p>
            <div className="mt-6 flex items-center space-x-2 text-gray-300">
              <Mail size={18} className="text-emerald-400" />
              <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-emerald-400 transition-colors">
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Info size={18} className="text-emerald-400" />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/plans" className="text-gray-400 hover:text-white transition-colors">Account Plans</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors">Support</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Shield size={18} className="text-emerald-400" />
              <span>Legal</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/risk" className="text-gray-400 hover:text-white transition-colors">Risk Disclosure</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8">
          <div className="bg-zinc-900/50 rounded-xl p-6 mb-8 border border-white/5">
            <p className="text-xs text-gray-500 leading-relaxed text-center">
              <span className="text-gray-300 font-semibold">DISCLAIMER:</span> QXT Funded is an independent service provider. 
              We are NOT officially affiliated, endorsed, or partnered with Quotex, Pocket Option, Olymp Trade, or IQ Option. 
              Trading involves significant risk. Our evaluation models are for educational and performance assessment purposes. 
              Past performance does not guarantee future results. Users must ensure they comply with local regulations.
            </p>
          </div>
          <p className="text-center text-gray-600 text-xs">
            © {new Date().getFullYear()} QXT Funded. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
