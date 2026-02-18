import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { fetchTopGainersLosers } from '@/lib/api';
import { ArrowLeft, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

export default async function StocksPage() {
    const { gainers, losers } = await fetchTopGainersLosers();

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>

                    <h1 className="text-4xl font-bold mb-2">Market <span className="text-gradient">Movers</span></h1>
                    <p className="text-gray-400 mb-12">Top performing and losing stocks in the market today.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Top Gainers */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Top Gainers</h2>
                            </div>

                            <div className="space-y-4">
                                {gainers.map((stock: any, index: number) => (
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
                                                <div className="text-xs text-gray-500">Vol: {stock.volume || 'N/A'}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold text-white text-sm">₹{stock.price}</div>
                                            <div className="text-xs font-medium flex items-center justify-end gap-1 text-emerald-400">
                                                <TrendingUp className="w-3 h-3" />
                                                {stock.change_percentage}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Top Losers */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                                    <TrendingDown className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Top Losers</h2>
                            </div>

                            <div className="space-y-4">
                                {losers.map((stock: any, index: number) => (
                                    <Link
                                        key={index}
                                        href={`/stocks/${stock.ticker}`}
                                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:text-white group-hover:bg-red-500 transition-colors">
                                                {stock.ticker.substring(0, 1)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-sm group-hover:text-red-400 transition-colors">{stock.ticker}</div>
                                                <div className="text-xs text-gray-500">Vol: {stock.volume || 'N/A'}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold text-white text-sm">₹{stock.price}</div>
                                            <div className="text-xs font-medium flex items-center justify-end gap-1 text-red-400">
                                                <TrendingDown className="w-3 h-3" />
                                                {stock.change_percentage}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
