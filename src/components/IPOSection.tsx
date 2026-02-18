'use client';

import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { IPOCalendarItem } from '@/types';
import Link from 'next/link';

interface IPOSectionProps {
    ipoData?: IPOCalendarItem[];
}

export default function IPOSection({ ipoData = [] }: IPOSectionProps) {
    const defaultIPOs = [
        {
            symbol: 'TECH',
            name: 'TechCorp India',
            ipoDate: '2026-02-25',
            priceRangeLow: '850',
            priceRangeHigh: '920',
            exchange: 'NSE'
        },
        {
            symbol: 'GREEN',
            name: 'GreenEnergy Ltd',
            ipoDate: '2026-02-15',
            priceRangeLow: '450',
            priceRangeHigh: '500',
            exchange: 'BSE'
        },
        {
            symbol: 'FIN',
            name: 'FinTech Solutions',
            ipoDate: '2026-02-05',
            priceRangeLow: '1200',
            priceRangeHigh: '1350',
            exchange: 'NSE'
        },
    ];

    const displayIPOs = ipoData.length > 0 ? ipoData : defaultIPOs;

    return (
        <section id="ipo" className="py-24 px-4 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Upcoming IPOs</h2>
                        <p className="text-gray-400">Invest in the future market leaders.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {displayIPOs.map((ipo, index) => {
                        const today = new Date();
                        const ipoDate = new Date(ipo.ipoDate);
                        let status = 'closed';
                        if (ipoDate > today) status = 'upcoming';
                        // Simple logic: if within last 3 days, consider it open for subscription for demo purposes
                        const diffTime = Math.abs(today.getTime() - ipoDate.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        if (diffDays <= 3 && ipoDate <= today) status = 'open';

                        return (
                            <div key={index} className="glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center font-bold text-lg text-white">
                                        {ipo.name ? ipo.name.substring(0, 2).toUpperCase() : 'IP'}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${status === 'open'
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        : status === 'upcoming'
                                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            : 'bg-white/5 text-gray-400 border-white/10'
                                        }`}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-4 line-clamp-1" title={ipo.name}>{ipo.name}</h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Price Band</span>
                                        <span className="text-white font-medium">₹{ipo.priceRangeLow} - ₹{ipo.priceRangeHigh}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Date</span>
                                        <span className="text-white font-medium">{ipo.ipoDate}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Exchange</span>
                                        <span className="text-emerald-400 font-medium">{ipo.exchange}</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/ipo/${encodeURIComponent(ipo.name || '')}`}
                                    className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 group-hover:text-emerald-400"
                                >
                                    View Details <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
