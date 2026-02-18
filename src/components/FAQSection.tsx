'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageCircle } from 'lucide-react';

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'How do I start investing in stocks?',
            answer: 'To start investing, open a Demat count with a registered broker. Complete KYC, add funds, and you are ready to trade.',
        },
        {
            question: 'What is the minimum amount required?',
            answer: 'There is no fixed minimum. You can start with the price of a single share. SIPs in mutual funds can start from ₹500.',
        },
        {
            question: 'Are there any hidden charges?',
            answer: 'No. We believe in transparency. All brokerage, taxes, and other charges are clearly displayed before you place an order.',
        },
        {
            question: 'Is my data secure?',
            answer: 'Yes, we use bank-grade encryption and follow strict data privacy regulations to ensure your personal and financial data is safe.',
        },
    ];

    return (
        <section id="faq" className="py-24 px-4 bg-black">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-400">Everything you need to know about the platform.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-white/10 last:border-0">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full py-6 flex items-center justify-between text-left hover:text-emerald-400 transition-colors group"
                            >
                                <span className={`text-lg font-medium ${openIndex === index ? 'text-emerald-400' : 'text-white'}`}>
                                    {faq.question}
                                </span>
                                <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180 text-emerald-400' : 'text-gray-500 group-hover:text-emerald-400'}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                                <p className="text-gray-400 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <div className="inline-flex flex-col items-center">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white mb-4">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-white font-bold mb-2">Still have questions?</h3>
                        <p className="text-gray-400 text-sm mb-6">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                        <Link
                            href="/contact"
                            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            Get in touch
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
