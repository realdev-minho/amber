"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How quickly will my order be dispatched and delivered?",
    answer: "Orders are processed through our primary hubs within 12 hours. Express delivery across major metropolitan centers (Lagos, Abuja, Port Harcourt) arrives within 24 to 48 hours. Standard regional delivery typically takes 2 to 4 business days with end-to-end SMS & WhatsApp tracking.",
  },
  {
    question: "How does Amber guarantee authenticity on every product?",
    answer: "We bypass gray-market wholesalers. Every brand, atelier, and craftsman on Amber undergoes strict multi-tier verification before cataloging. All luxury items include verifiable provenance tags and serial validation.",
  },
  {
    question: "What payment methods are supported at checkout?",
    answer: "We support instant debit/credit cards (Mastercard, Visa, Verve), direct automated bank transfers, and Google Pay. All transactions use multi-factor authentication with immediate electronic receipt generation.",
  },
  {
    question: "What is the return and refund policy?",
    answer: "Amber offers a seamless 14-day return policy for unopened and pristine goods. If an item arrives damaged or differs from its editorial specification, our concierge team arranges an immediate pickup and full refund.",
  },
  {
    question: "Can I shop directly on my phone with the mobile APK?",
    answer: "Yes! While our website offers full brand stories and editorial features, our Android APK and mobile app launch you straight into the marketplace catalog so you can browse, filter, and checkout in seconds.",
  },
  {
    question: "Do I need an account to place an order?",
    answer: "Yes, authentic email or Google verification is required before checkout. This protects your transaction, saves your delivery preferences, and allows you to view lifetime purchase histories and real-time tracking.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF8A00]" /> Common Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FBF8F5] tracking-tight">
            Frequently Asked <span className="text-gradient-amber">Questions</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9E948C]">
            Everything you need to know about shopping, shipping, and security on Amber.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl glass-panel border border-white/8 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors hover:bg-white/[0.02]"
                >
                  <span className="text-sm sm:text-base font-semibold text-[#FBF8F5]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-stone-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-[#FF8A00] bg-[#FF8A00]/10" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-[#9E948C] leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
