import { fetchMutualFundsList } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, PieChart, TrendingUp, Shield, Plus, ArrowRight, Filter } from 'lucide-react';
import AllMutualFundsList from '@/components/AllMutualFundsList';
import SIPCalculator from '@/components/SIPCalculator';

export default async function MutualFundsPage() {
    const initialFunds = await fetchMutualFundsList(50); // Fetch top 50 initial list

    const featuredFunds = [
        {
            id: 'hdfc-equity-growth',
            name: 'HDFC Equity Growth Fund',
            category: 'Large Cap',
            risk: 'High',
            rating: 5,
            minSip: '500',
            returns1Y: '15.2%',
            returns3Y: '18.5%',
            returns5Y: '14.2%',
            nav: '124.50',
            fundSize: '24,000 Cr'
        },
        {
            id: 'icici-balanced-advantage',
            name: 'ICICI Balanced Advantage Fund',
            category: 'Hybrid',
            risk: 'Moderate',
            rating: 4,
            minSip: '1,000',
            returns1Y: '12.8%',
            returns3Y: '11.2%',
            returns5Y: '10.5%',
            nav: '58.20',
            fundSize: '45,000 Cr'
        },
        {
            id: 'sbi-small-cap',
            name: 'SBI Small Cap Fund',
            category: 'Small Cap',
            risk: 'Very High',
            rating: 5,
            minSip: '500',
            returns1Y: '24.5%',
            returns3Y: '28.1%',
            returns5Y: '22.4%',
            nav: '145.80',
            fundSize: '18,500 Cr'
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
            <Navbar />

            <main className="pt-32 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>

                    <header className="mb-12 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Invest in <span className="text-gradient">Mutual Funds</span></h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            Choose from top-rated funds handpicked by experts. Start your SIP journey today.
                        </p>
                    </header>

                    {/* Featured Funds */}
                    <h2 className="text-2xl font-bold text-white mb-6">Featured Funds</h2>
                    <div className="grid grid-cols-1 gap-4 mb-16">
                        {featuredFunds.map((fund) => (
                            <div key={fund.id} className="glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors group border border-white/5">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{fund.name}</h3>
                                            <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded text-xs font-bold text-emerald-500 md:hidden">
                                                {fund.rating} ★
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4">
                                            <span className="bg-white/5 px-2 py-1 rounded">{fund.category}</span>
                                            <span>•</span>
                                            <span>Risk: <span className={fund.risk === 'Very High' ? 'text-red-400' : 'text-yellow-400'}>{fund.risk}</span></span>
                                            <span>•</span>
                                            <span>Fund Size: {fund.fundSize}</span>
                                        </div>
                                        <div className="hidden md:flex items-center gap-1 text-yellow-500 text-sm">
                                            {Array(fund.rating).fill(0).map((_, i) => <span key={i}>★</span>)}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-8 md:gap-12 text-center md:text-left border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
                                        <div>
                                            <div className="text-gray-500 text-xs uppercase mb-1">1Y Returns</div>
                                            <div className="text-lg font-bold text-emerald-400">{fund.returns1Y}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-500 text-xs uppercase mb-1">3Y Returns</div>
                                            <div className="text-lg font-bold text-white">{fund.returns3Y}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-500 text-xs uppercase mb-1">NAV</div>
                                            <div className="text-lg font-bold text-white">₹{fund.nav}</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 min-w-[140px]">
                                        <button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                                            Invest Now
                                        </button>
                                        <button className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors border border-white/10">
                                            SIP
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* All Funds List */}
                    <AllMutualFundsList initialFunds={initialFunds} />

                    {/* SIP Calculator Section */}
                    <div id="sip-calculator" className="mt-24">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-white mb-6 text-center">SIP Calculator</h2>
                            <p className="text-gray-400 text-center mb-12">
                                Plan your financial future with our advanced SIP calculator.
                            </p>
                            <SIPCalculator />
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
