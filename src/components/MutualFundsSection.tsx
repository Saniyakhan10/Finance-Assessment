'use client';

import { PieChart, Shield, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MutualFundsSection() {
    const funds = [
        {
            name: 'HDFC Equity Growth',
            category: 'Large Cap',
            rating: 5,
            min: '₹500',
            returns: '15.2%'
        },
        {
            name: 'ICICI Balanced Advantage',
            category: 'Hybrid',
            rating: 4,
            min: '₹1,000',
            returns: '12.8%'
        },
        {
            name: 'SBI Small Cap Fund',
            category: 'Small Cap',
            rating: 5,
            min: '₹500',
            returns: '24.5%'
        },
    ];

    return (
        <section id="mutual-funds" className="py-24 px-4 bg-black/50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Smart Mutual Fund Investing</h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Diversify your portfolio with professionally managed funds. Choose from over 2,500+ direct mutual funds with 0% commission.
                        </p>

                        <div className="space-y-6">
                            {[
                                { icon: <PieChart className="w-5 h-5" />, title: 'Portfolio Diversification', desc: 'Reduce risk by spreading investments' },
                                { icon: <Shield className="w-5 h-5" />, title: 'Expert Management', desc: 'Funds managed by seasoned professionals' },
                                { icon: <TrendingUp className="w-5 h-5" />, title: 'SIP Flexibility', desc: 'Start small with just ₹500/month' },
                            ].map((feature, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">{feature.title}</h3>
                                        <p className="text-sm text-gray-500">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/mutual-funds"
                            className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors inline-block"
                        >
                            Explore All Funds
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {funds.map((fund, index) => (
                            <Link
                                key={index}
                                href="/mutual-funds" // Ideally to /mutual-funds/[id] if we had dynamic IDs, but listing page is fine for now
                                className="glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer block text-left"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">{fund.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-300">{fund.category}</span>
                                            <span className="text-xs text-gray-500">Min: {fund.min}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-emerald-400">{fund.returns}</div>
                                        <div className="text-xs text-gray-500">1Y Returns</div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        <Link
                            href="/mutual-funds"
                            className="p-6 rounded-xl border border-dashed border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-colors cursor-pointer group block"
                        >
                            <span className="flex items-center gap-2 font-medium">
                                View 2000+ More Funds <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
