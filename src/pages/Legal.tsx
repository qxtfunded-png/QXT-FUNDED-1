import React from 'react';

const LegalLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold text-white mb-12">{title}</h1>
    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 md:p-12 prose prose-invert max-w-none">
      {children}
    </div>
  </div>
);

export const Terms = () => (
  <LegalLayout title="Terms & Conditions">
    <div className="space-y-6 text-gray-400 leading-relaxed">
      <section>
        <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
        <p>By accessing and using QXT Funded, you agree to be bound by these Terms and Conditions. Our service provides trading evaluation and account access. We are an independent platform and not a broker.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-white mb-4">2. Independent Service Disclaimer</h2>
        <p>QXT Funded is an independent prop trading platform. We are NOT officially affiliated with, endorsed by, or partnered with Quotex, Pocket Option, Olymp Trade, or IQ Option. Any mention of these brokers is for user preference selection only.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-white mb-4">3. Account Delivery</h2>
        <p>Account details will be delivered to the Gmail address provided during checkout. It is the user's responsibility to provide a valid and accessible Gmail address. Delivery occurs after payment verification, which typically takes 1-6 hours.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-white mb-4">4. Refund Policy</h2>
        <p>Due to the digital nature of our services and the immediate allocation of resources, all sales are final. Refunds are only considered in cases of technical failure on our part to deliver the service.</p>
      </section>
    </div>
  </LegalLayout>
);

export const Privacy = () => (
  <LegalLayout title="Privacy Policy">
    <div className="space-y-6 text-gray-400 leading-relaxed">
      <section>
        <h2 className="text-xl font-bold text-white mb-4">1. Data Collection</h2>
        <p>We collect minimal data required to provide our services, including your name, Gmail address, and payment proof. We do not store your broker account passwords.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-white mb-4">2. Use of Information</h2>
        <p>Your Gmail address is used exclusively for account delivery, status updates, and support communications. We do not sell your data to third parties.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-white mb-4">3. Security</h2>
        <p>We use industry-standard encryption and secure protocols to protect your information. Payment proof images are stored securely and deleted after verification.</p>
      </section>
    </div>
  </LegalLayout>
);

export const Risk = () => (
  <LegalLayout title="Risk Disclosure">
    <div className="space-y-6 text-gray-400 leading-relaxed">
      <section>
        <h2 className="text-xl font-bold text-white mb-4">1. Trading Risk</h2>
        <p>Trading financial instruments involves significant risk of loss. Most retail traders lose money. You should only trade with capital you can afford to lose.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-white mb-4">2. No Financial Advice</h2>
        <p>QXT Funded does not provide financial advice. All content and services are for evaluation and educational purposes. Decisions made based on our platform are at your own risk.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-white mb-4">3. Platform Independence</h2>
        <p>We provide access to trading environments but are not responsible for the execution or performance of third-party brokers. Users must understand the risks associated with their chosen broker platform.</p>
      </section>
    </div>
  </LegalLayout>
);
