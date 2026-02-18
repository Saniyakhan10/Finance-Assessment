'use client';

import SIPCalculator from '@/components/SIPCalculator';
import { Calculator } from 'lucide-react';

export default function SIPSection() {
    return (
        <section id="sip-calculator" className="py-24 px-4 bg-black border-t border-b border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center justify-center p-3 rounded-xl bg-emerald-500/10 text-emerald-400 mb-6">
                        <Calculator className="w-6 h-6" />
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">SIP Calculator</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Plan for your financial goals with our advanced SIP calculator.
                        Search for a mutual fund to see projections based on its <span className="text-emerald-400 font-semibold">real historical performance</span>.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <SIPCalculator />
                </div>
            </div>
        </section>
    );
}
