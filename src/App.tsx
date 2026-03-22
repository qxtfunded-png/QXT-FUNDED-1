import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';
import FAQ from './pages/FAQ';
import Support from './pages/Support';
import AccountPlans from './pages/AccountPlans';
import { Terms, Privacy, Risk } from './pages/Legal';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  useEffect(() => {
    // Request notification permission
    if ('Notification' in window) {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            sendNotification();
          }
        });
      }
    }

    const sendNotification = () => {
      if ('Notification' in window && Notification.permission === 'granted') {
        const notifications = [
          { title: "New Payout Processed!", body: "A trader just received $4,250. Start your challenge now!" },
          { title: "Limited Time Offer", body: "Get 10% off on all Challenge accounts today. Use code: FUNDED10" },
          { title: "Trading Tip", body: "Consistency is key. Check out our latest strategy guide in the support section." },
          { title: "Market Alert", body: "High volatility expected in EUR/USD. Manage your risk accordingly." }
        ];
        const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
        new Notification(randomNotif.title, {
          body: randomNotif.body,
          icon: '/favicon.ico'
        });
      }
    };

    // Set interval for every 15 minutes (15 * 60 * 1000 ms)
    const interval = setInterval(sendNotification, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30 selection:text-emerald-400">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/support" element={<Support />} />
                <Route path="/plans" element={<AccountPlans />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/risk" element={<Risk />} />
                
                <Route 
                  path="/dashboard" 
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/checkout" 
                  element={
                    <PrivateRoute>
                      <Checkout />
                    </PrivateRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
