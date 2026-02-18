'use client';

import { TrendingUp, TrendingDown, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { NewsData } from '@/types';

interface NewsSectionProps {
    news?: NewsData[];
}

export default function NewsSection({ news = [] }: NewsSectionProps) {
    const displayNews = news.length > 0 ? news : [
        {
            title: 'Sensex Crosses 85k Mark',
            summary: 'Indian markets hit fresh all-time high driven by banking and IT stocks rally.',
            time: '2h ago',
            sentiment: 'positive',
            source: 'MarketWatch',
            url: '#'
        },
        {
            title: 'RBI Monetary Policy Update',
            summary: 'Central bank maintains status quo on repo rates for the third consecutive time.',
            time: '4h ago',
            sentiment: 'neutral',
            source: 'Economic Times',
            url: '#'
        },
        {
            title: 'Oil Prices Volatility Continues',
            summary: 'Brent crude fluctuates as OPEC+ announces new production cuts.',
            time: '6h ago',
            sentiment: 'negative',
            source: 'Bloomberg',
            url: '#'
        },
    ] as NewsData[];

    return (
        <section id="news" className="py-24 px-4 bg-black/50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Market News</h2>
                        <p className="text-gray-400">Latest updates moving the markets today.</p>
                    </div>
                    <a
                        href="https://www.moneycontrol.com/news/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                    >
                        View All News <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {displayNews.map((item: NewsData, index: number) => (
                        <Link
                            key={index}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.source}</span>
                                {item.sentiment === 'positive' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                                {item.sentiment === 'negative' && <TrendingDown className="w-4 h-4 text-red-500" />}
                            </div>

                            <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2">
                                {item.title}
                            </h3>

                            <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-grow line-clamp-3">
                                {item.summary}
                            </p>

                            <div className="flex items-center gap-2 text-xs text-gray-600 mt-auto pt-4 border-t border-white/5">
                                <Clock className="w-3 h-3" />
                                <span>{item.time}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
