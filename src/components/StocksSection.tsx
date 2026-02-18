'use client';

import { BarChart3, TrendingUp, Shield, Zap, ArrowRight, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface StockItem {
    ticker: string;
    price: string;
    change_amount: string;
    change_percentage: string;
    volume: string;
}

interface StocksSectionProps {
    data?: {
        gainers: StockItem[];
        losers: StockItem[];
    };
}

export default function StocksSection({ data }: StocksSectionProps) {
    const topGainers = data?.gainers || [];
    const topLosers = data?.losers || [];
    const [activeTab, setActiveTab] = useState<'gainers' | 'losers'>('gainers');

    const features = [
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: 'Real-Time Analytics',
            description: 'Get live market data and insights directly from NSE & BSE.',
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: 'Expert Insights',
            description: 'Curated recommendations from top SEBI registered analysts.',
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: 'Secure Trading',
            description: 'Bank-grade security encryption for all your transactions.',
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: 'Lightning Fast',
            description: 'Zero-latency execution infrastructure for rapid trading.',
        },
    ];

    const displayStocks = activeTab === 'gainers' ? topGainers : topLosers;

    // Fallback data if API fails or returns empty
    const fallbackData = activeTab === 'gainers'
        ? [
            { ticker: 'RELIANCE', price: '2584.50', change_amount: '+61.20', change_percentage: '2.45%' },
            { ticker: 'TCS', price: '3842.20', change_amount: '+46.50', change_percentage: '1.23%' }
        ]
        : [
            { ticker: 'WIPRO', price: '450.25', change_amount: '-8.20', change_percentage: '-1.79%' },
            { ticker: 'TECHM', price: '1120.45', change_amount: '-15.55', change_percentage: '-1.37%' }
        ];

    const stocksToShow = displayStocks.length > 0 ? displayStocks : fallbackData;

    return (
        <section id="stocks" className="py-24 px-4 bg-black/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Invest in <span className="text-gradient">Top Stocks</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Build your portfolio with the most reliable companies in India.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {features.map((feature, index) => (
                        <div key={index} className="glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="glass-panel rounded-2xl p-8 max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                        <div className="flex gap-6">
                            <button
                                onClick={() => setActiveTab('gainers')}
                                className={`text-xl font-bold transition-colors ${activeTab === 'gainers' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                Top Gainers
                            </button>
                            <button
                                onClick={() => setActiveTab('losers')}
                                className={`text-xl font-bold transition-colors ${activeTab === 'losers' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                Top Losers
                            </button>
                        </div>
                        <Link
                            href="/stocks"
                            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                        >
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stocksToShow.map((stock, index) => {
                            const isPositive = !stock.change_percentage.includes('-');
                            return (
                                <Link
                                    key={index}
                                    href={`/stocks/${stock.ticker}`}
                                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:text-white group-hover:bg-emerald-500 transition-colors">
                                            {stock.ticker.substring(0, 1)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">{stock.ticker}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-white text-sm">₹{stock.price}</div>
                                        <div className={`text-xs font-medium flex items-center justify-end gap-1 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                            {stock.change_percentage}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
