import { fetchMutualFundDetails } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MutualFundChart from '@/components/MutualFundChart';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, Info, Calendar } from 'lucide-react';

export default async function MutualFundDetailsPage({ params }: { params: Promise<{ schemeCode: string }> }) {
    const { schemeCode } = await params;
    const fundData = await fetchMutualFundDetails(schemeCode);

    if (!fundData || !fundData.meta) {
        return (
            <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <h1 className="text-2xl font-bold mb-4">Mutual Fund Not Found</h1>
                    <Link href="/" className="px-6 py-2 bg-emerald-500 text-black font-semibold rounded-lg hover:bg-emerald-400">
                        Go Home
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const { meta, data } = fundData;
    const currentNav = parseFloat(data[0]?.nav || '0');
    const prevNav = parseFloat(data[1]?.nav || '0');
    const change = currentNav - prevNav;
    const changePercent = (change / prevNav) * 100;
    const isPositive = change >= 0;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
            <Navbar />

            <main className="pt-32 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Funds
                        </Link>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{meta.scheme_name}</h1>
                                <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                                    <span className="bg-white/10 px-3 py-1 rounded-full text-white">{meta.scheme_category}</span>
                                    <span className="flex items-center gap-1"><Info className="w-4 h-4" /> {meta.fund_house}</span>
                                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Code: {meta.scheme_code}</span>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-sm text-gray-500 mb-1">Current NAV ({data[0]?.date})</div>
                                <div className="text-4xl font-bold text-white">₹{currentNav.toFixed(4)}</div>
                                <div className={`flex items-center justify-end gap-2 text-lg font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                                    <span>{change > 0 ? '+' : ''}{change.toFixed(4)} ({changePercent.toFixed(2)}%)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="glass-panel p-6 rounded-2xl mb-12 border border-white/10 bg-black/50">
                        <h2 className="text-xl font-bold text-white mb-6">NAV History (1 Year)</h2>
                        <MutualFundChart data={data} />
                    </div>

                    {/* Scheme Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="glass-panel p-6 rounded-xl border border-white/5">
                            <h3 className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Fund House</h3>
                            <div className="text-lg font-semibold text-white">{meta.fund_house}</div>
                        </div>
                        <div className="glass-panel p-6 rounded-xl border border-white/5">
                            <h3 className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Scheme Type</h3>
                            <div className="text-lg font-semibold text-white">{meta.scheme_type}</div>
                        </div>
                        <div className="glass-panel p-6 rounded-xl border border-white/5">
                            <h3 className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Scheme Category</h3>
                            <div className="text-lg font-semibold text-white">{meta.scheme_category}</div>
                        </div>
                        <div className="glass-panel p-6 rounded-xl border border-white/5">
                            <h3 className="text-gray-400 text-sm mb-1 uppercase tracking-wider">ISIN Growth</h3>
                            <div className="text-lg font-semibold text-white">{meta.isin_growth || 'N/A'}</div>
                        </div>
                        <div className="glass-panel p-6 rounded-xl border border-white/5">
                            <h3 className="text-gray-400 text-sm mb-1 uppercase tracking-wider">ISIN Reinvestment</h3>
                            <div className="text-lg font-semibold text-white">{meta.isin_div_reinvestment || 'N/A'}</div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
