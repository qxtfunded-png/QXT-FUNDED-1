import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  CreditCard, 
  History, 
  Settings, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Mail,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORT_EMAIL } from '../data/config';

const Dashboard = () => {
  const { user } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  // Mock purchased accounts - Start with empty array as per user request
  const [accounts, setAccounts] = useState<any[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Under Review': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Active': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
    }
  };

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
            {t.dashboard.welcome}, {user?.name || 'Trader'}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">Manage your prop trading accounts and track delivery status.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white hover:bg-white/10 transition-all flex items-center space-x-2"
          >
            <span>{language === 'en' ? 'اردو' : 'English'}</span>
          </button>
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-sm text-emerald-400 font-bold">
            Status: Verified
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Accounts List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <LayoutDashboard size={20} className="text-emerald-400" />
            <span>{t.dashboard.myAccounts}</span>
          </h2>

          {accounts.length > 0 ? accounts.map((acc) => (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">${acc.size.toLocaleString()} {acc.type}</h3>
                    <p className="text-xs text-gray-500">Submitted on {acc.submissionDate}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(acc.status)}`}>
                  {acc.status}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-3 bg-black/30 rounded-xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase mb-1">Broker</p>
                  <p className="text-sm text-white font-semibold">{acc.broker}</p>
                </div>
                <div className="p-3 bg-black/30 rounded-xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase mb-1">Price Paid</p>
                  <p className="text-sm text-white font-semibold">${acc.price}</p>
                </div>
                <div className="p-3 bg-black/30 rounded-xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase mb-1">Gmail</p>
                  <p className="text-sm text-white font-semibold truncate">{acc.gmail}</p>
                </div>
                <div className="p-3 bg-black/30 rounded-xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase mb-1">ID</p>
                  <p className="text-sm text-white font-semibold">#QXT-{acc.id}92</p>
                </div>
              </div>

              <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl mb-6">
                <div className="flex items-center space-x-2 text-blue-400 mb-2">
                  <FileText size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">{t.dashboard.rules}</span>
                </div>
                <p className="text-sm text-gray-300">{acc.rules}</p>
              </div>

              {acc.status === 'Delivered' ? (
                <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 size={20} className="text-emerald-400" />
                    <span className="text-sm text-emerald-400 font-medium">Credentials sent to your Gmail</span>
                  </div>
                  <button className="text-xs text-white bg-emerald-500 px-3 py-1 rounded-lg font-bold hover:bg-emerald-600 transition-colors">
                    View Details
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Delivery Progress</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-400 italic flex items-center">
                    <Clock size={12} className="mr-1" /> {t.dashboard.deliveryNote}
                  </p>
                </div>
              )}
            </motion.div>
          )) : (
            <div className="bg-zinc-900/30 border border-dashed border-white/10 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                <CreditCard size={32} />
              </div>
              <h3 className="text-white font-bold mb-2">No active accounts</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
                If you recently purchased an account, please wait <span className="text-emerald-400 font-bold">up to 1 hour</span> for admin approval.
              </p>
              <Link to="/plans" className="inline-flex items-center space-x-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all">
                <span>Browse Plans</span>
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* Support Widget */}
          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <HelpCircle size={20} className="text-emerald-400" />
              <span>Need Help?</span>
            </h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Our support team is available to assist you with account delivery, payment verification, or trading rules.
            </p>
            <div className="space-y-3">
              <a 
                href={`mailto:${SUPPORT_EMAIL}`}
                className="w-full flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl text-sm font-bold transition-all border border-white/10"
              >
                <Mail size={18} />
                <span>Email Support</span>
              </a>
              <button className="w-full flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/20">
                <span>Open Support Ticket</span>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all text-sm flex items-center justify-between group">
                <span>Purchase New Account</span>
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-full text-left p-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all text-sm flex items-center justify-between group">
                <span>View Trading Rules</span>
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-full text-left p-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all text-sm flex items-center justify-between group">
                <span>Payment History</span>
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
            <div className="flex items-center space-x-2 text-blue-400 mb-3">
              <AlertCircle size={20} />
              <span className="font-bold text-sm uppercase">Security Tip</span>
            </div>
            <p className="text-xs text-blue-400/80 leading-relaxed">
              Never share your account credentials with anyone. QXT Funded staff will never ask for your broker password. 
              Always change your password after initial delivery for maximum security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
