import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import AccordionItem from '../components/AccordionItem';
import { FAQ_DATA } from '../data/faq';
import { HelpCircle, Mail } from 'lucide-react';
import { SUPPORT_EMAIL } from '../data/config';

const FAQ = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-16 sm:pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-400 text-sm sm:text-base">Find answers to common questions about our prop trading evaluation platform.</p>
      </div>

      <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 md:p-8">
        <div className="space-y-1">
          {FAQ_DATA.map((faq, i) => (
            <AccordionItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

      <div className="mt-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
          <HelpCircle size={24} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Still have questions?</h2>
        <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
          Our support team is ready to help you with any specific queries you might have.
        </p>
        <a 
          href={`mailto:${SUPPORT_EMAIL}`}
          className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-emerald-500/20 text-sm"
        >
          <Mail size={18} />
          <span>Contact Support</span>
        </a>
      </div>
    </div>
  );
};

export default FAQ;
