'use client';

import { useState, useEffect } from 'react';
import { PieChart, Shield, TrendingUp, ArrowRight, Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MutualFundsSection() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchResults = async () => {
            if (searchQuery.length < 3) {
                setSearchResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`https://api.mfapi.in/mf/search?q=${searchQuery}`);
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data.slice(0, 5)); // Limit to top 5
                }
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(fetchResults, 500); // 500ms debounce
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const [featuredFunds, setFeaturedFunds] = useState<any[]>([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                // Fetching specific popular schemes to display as featured
                // 125497: HDFC Balanced Advantage
                // 120503: Axis Bluechip
                // 120150: SBI Small Cap (checking valid code, user provided examples so using similar)
                // Using: 125497 (User provided), 119598 (SBI Small Cap Direct), 120503 (Axis Bluechip Direct)
                const codes = ['125497', '119598', '120503'];

                const promises = codes.map(code => fetch(`https://api.mfapi.in/mf/${code}`).then(res => res.json()));
                const results = await Promise.all(promises);

                const mappedFunds = results.map(item => {
                    if (!item.meta) return null;

                    // Calculate 1 Year Return (Approx 250 days ago)
                    const currentNav = parseFloat(item.data[0].nav);
                    // Find entry closest to 1 year ago
                    const oneYearAgo = item.data[240] ? parseFloat(item.data[240].nav) : parseFloat(item.data[item.data.length - 1].nav);
                    const returns = ((currentNav - oneYearAgo) / oneYearAgo * 100).toFixed(1) + '%';

                    return {
                        code: item.meta.scheme_code,
                        name: item.meta.scheme_name.replace(' - Direct Plan - Growth', '').replace(' Fund', ''), // Clean up name
                        category: item.meta.scheme_category,
                        rating: 5, // Mock rating as API doesn't provide
                        min: '₹500',
                        returns: returns,
                        nav: currentNav.toFixed(2)
                    };
                }).filter(Boolean);

                setFeaturedFunds(mappedFunds);
            } catch (error) {
                console.error('Error fetching featured funds:', error);
                // Fallback to hardcoded if API fails
                setFeaturedFunds([
                    { name: 'HDFC Equity Growth', category: 'Large Cap', rating: 5, min: '₹500', returns: '15.2%', code: '100119' },
                    { name: 'ICICI Balanced Advantage', category: 'Hybrid', rating: 4, min: '₹1,000', returns: '12.8%', code: '100120' },
                    { name: 'SBI Small Cap', category: 'Small Cap', rating: 5, min: '₹500', returns: '24.5%', code: '125497' }
                ]);
            }
        };

        fetchFeatured();
    }, []);

    const funds = featuredFunds.length > 0 ? featuredFunds : [];

    return (
        <section id="mutual-funds" className="py-24 px-4 bg-black/50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Smart Mutual Fund Investing</h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Diversify your portfolio with professionally managed funds. Choose from over 2,500+ direct mutual funds with 0% commission.
                        </p>

                        {/* Search Implementation */}
                        <div className="relative mb-8 max-w-md">
                            <div className="relative flex items-center">
                                <Search className="absolute left-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search mutual funds (e.g., HDFC, Axis)..."
                                    className="w-full bg-white/10 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {isLoading && <Loader2 className="absolute right-3 w-5 h-5 text-emerald-500 animate-spin" />}
                            </div>

                            {searchResults.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
                                    {searchResults.map((result) => (
                                        <Link
                                            key={result.schemeCode}
                                            href={`/mutual-funds/${result.schemeCode}`}
                                            className="block px-4 py-3 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors"
                                        >
                                            <div className="text-sm text-white font-medium truncate">{result.schemeName}</div>
                                            <div className="text-xs text-gray-500">Code: {result.schemeCode}</div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

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

                        <div className="flex gap-4 mt-8">
                            <Link
                                href="/mutual-funds"
                                className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors inline-block"
                            >
                                Explore All Funds
                            </Link>
                            <Link
                                href="/sip-calculator"
                                className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors inline-block border border-white/10"
                            >
                                SIP Calculator
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {funds.map((fund, index) => (
                            <Link
                                key={index}
                                href={`/mutual-funds/${fund.code}`}
                                className="glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer block text-left"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">{fund.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-300">{fund.category}</span>
                                            <span className="text-xs text-gray-500">Min: {fund.min || '₹500'}</span>
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
