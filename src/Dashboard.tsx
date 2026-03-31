import React, { useEffect, useState } from 'react';
import { auth, db, handleFirestoreError, OperationType } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  History, 
  Activity,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
  BarChart3,
  Settings
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

interface TradingData {
  email: string;
  accountType: string;
  status: string;
  availableBalance: number;
  totalWithdrawals: number;
  initialCapital: number;
  todayPnL: number;
  lastUpdated: string;
}

const mockChartData = [
  { name: 'Mon', pnl: 120 },
  { name: 'Tue', pnl: -80 },
  { name: 'Wed', pnl: 250 },
  { name: 'Thu', pnl: 180 },
  { name: 'Fri', pnl: -150 },
  { name: 'Sat', pnl: 320 },
  { name: 'Sun', pnl: -234.02 },
];

const Dashboard: React.FC = () => {
  const [data, setData] = useState<TradingData | null>(null);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user?.email) return;

    const path = `user_trading_data/${user.email}`;
    const unsubscribe = onSnapshot(
      doc(db, 'user_trading_data', user.email),
      (snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.data() as TradingData);
        } else if (user.email === 'traderqx18@gmail.com') {
          // Fallback to the specific data requested if not in DB yet
          setData({
            email: 'traderqx18@gmail.com',
            accountType: 'Quotex',
            status: 'Active',
            availableBalance: 4765.98,
            totalWithdrawals: 1679.87,
            initialCapital: 5000,
            todayPnL: -234.02,
            lastUpdated: new Date().toISOString(),
          });
        }
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const totalPnL = data ? (data.availableBalance + data.totalWithdrawals) - data.initialCapital : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!data && user?.email !== 'traderqx18@gmail.com') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-6">
        <Activity className="w-16 h-16 text-gray-600 mb-4" />
        <h1 className="text-2xl font-bold mb-2">No Active Account</h1>
        <p className="text-gray-400 text-center max-w-md">
          Your account is currently being reviewed or you haven't linked a Quotex account yet.
        </p>
        <button 
          onClick={() => auth.signOut()}
          className="mt-6 px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 hidden lg:flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">QXT FUNDED</span>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" />
          <NavItem icon={<History size={20} />} label="History" />
          <NavItem icon={<Wallet size={20} />} label="Withdrawals" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <button 
            onClick={() => auth.signOut()}
            className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.displayName?.split(' ')[0] || 'Trader'}</h1>
            <p className="text-gray-400">Here's what's happening with your Quotex account today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Quotex: {data?.status}</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Available Balance" 
            value={`$${data?.availableBalance.toLocaleString()}`} 
            icon={<Wallet className="text-orange-500" />}
            trend="+2.4%"
            isPositive={true}
          />
          <StatCard 
            title="Today's PnL" 
            value={`$${data?.todayPnL.toLocaleString()}`} 
            icon={data?.todayPnL && data.todayPnL >= 0 ? <TrendingUp className="text-green-500" /> : <TrendingDown className="text-red-500" />}
            trend={data?.todayPnL && data.todayPnL >= 0 ? "+$120" : "-$234.02"}
            isPositive={data?.todayPnL ? data.todayPnL >= 0 : false}
          />
          <StatCard 
            title="Total Withdrawals" 
            value={`$${data?.totalWithdrawals.toLocaleString()}`} 
            icon={<ArrowDownRight className="text-blue-500" />}
          />
          <StatCard 
            title="Total PnL" 
            value={`$${totalPnL.toLocaleString()}`} 
            icon={<Activity className="text-purple-500" />}
            trend="+14.5%"
            isPositive={true}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Profit Performance</h2>
              <select className="bg-transparent border-none text-sm text-gray-400 focus:ring-0">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#ffffff40" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#ffffff40" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff10', borderRadius: '8px' }}
                    itemStyle={{ color: '#f97316' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pnl" 
                    stroke="#f97316" 
                    fillOpacity={1} 
                    fill="url(#colorPnl)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col">
            <h2 className="text-xl font-bold mb-6">Account Details</h2>
            <div className="space-y-6 flex-1">
              <DetailItem label="Account Type" value={data?.accountType || 'N/A'} />
              <DetailItem label="Account ID" value="QX-882910-B" />
              <DetailItem label="Initial Capital" value={`$${data?.initialCapital.toLocaleString()}`} />
              <DetailItem label="Leverage" value="1:100" />
              <DetailItem label="Server" value="Quotex-Live-04" />
            </div>
            <button className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors font-medium">
              View Full Report
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold mb-6">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-white/10">
                  <th className="pb-4 font-medium">Type</th>
                  <th className="pb-4 font-medium">Amount</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">Date</th>
                  <th className="pb-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <TransactionRow type="Withdrawal" amount="-$500.00" status="Completed" date="Mar 28, 2026" />
                <TransactionRow type="Withdrawal" amount="-$250.00" status="Completed" date="Mar 24, 2026" />
                <TransactionRow type="Profit Share" amount="+$1,240.50" status="Completed" date="Mar 20, 2026" />
                <TransactionRow type="Withdrawal" amount="-$929.87" status="Completed" date="Mar 15, 2026" />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${active ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const StatCard = ({ title, value, icon, trend, isPositive }: { title: string, value: string, icon: React.ReactNode, trend?: string, isPositive?: boolean }) => (
  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      {trend && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {trend}
        </span>
      )}
    </div>
    <p className="text-gray-400 text-sm mb-1">{title}</p>
    <h3 className="text-2xl font-bold">{value}</h3>
  </div>
);

const DetailItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-400">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const TransactionRow = ({ type, amount, status, date }: { type: string, amount: string, status: string, date: string }) => (
  <tr className="group hover:bg-white/5 transition-colors">
    <td className="py-4">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${type === 'Withdrawal' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'}`}>
          {type === 'Withdrawal' ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
        </div>
        <span className="font-medium">{type}</span>
      </div>
    </td>
    <td className={`py-4 font-medium ${amount.startsWith('+') ? 'text-green-500' : 'text-white'}`}>{amount}</td>
    <td className="py-4">
      <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full">{status}</span>
    </td>
    <td className="py-4 text-gray-400 text-sm">{date}</td>
    <td className="py-4 text-right">
      <button className="text-gray-400 hover:text-white transition-colors">Details</button>
    </td>
  </tr>
);

export default Dashboard;
