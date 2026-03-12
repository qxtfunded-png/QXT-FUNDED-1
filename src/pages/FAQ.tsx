import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import AccordionItem from '../components/AccordionItem';
import { FAQ_DATA } from '../data/faq';
import { HelpCircle, Mail } from 'lucide-react';
import { SUPPORT_EMAIL } from '../data/config';

const FAQ = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-24 sm:pt-32 pb-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Frequently Asked Questions</h1>
        <p className="text-gray-400 text-base sm:text-lg">Find answers to common questions about our prop trading evaluation platform.</p>
      </div>

      <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 md:p-12">
        <div className="space-y-2">
          {FAQ_DATA.map((faq, i) => (
            <AccordionItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

      <div className="mt-20 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-10 text-center">
        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <HelpCircle size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Our support team is ready to help you with any specific queries you might have.
        </p>
        <a 
          href={`mailto:${SUPPORT_EMAIL}`}
          className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20"
        >
          <Mail size={20} />
          <span>Contact Support</span>
        </a>
      </div>
    </div>
  );
};

export default FAQ;
