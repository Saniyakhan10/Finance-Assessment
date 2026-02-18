'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Loader2, ArrowRight } from 'lucide-react';
import { MutualFundScheme } from '@/types';

interface AllMutualFundsListProps {
    initialFunds: MutualFundScheme[];
}

export default function AllMutualFundsList({ initialFunds }: AllMutualFundsListProps) {
    const [funds, setFunds] = useState<MutualFundScheme[]>(initialFunds);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Search effect using API
    useEffect(() => {
        const fetchResults = async () => {
            // If empty, show initial (or maybe fetch detailed list if initial is just top 100)
            // Actually, if query is empty, we show initialProps.
            if (!searchQuery) {
                setFunds(initialFunds);
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`https://api.mfapi.in/mf/search?q=${searchQuery}`);
                if (response.ok) {
                    const data = await response.json();
                    setFunds(data);
                }
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(fetchResults, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, initialFunds]);

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Explore All Schemes</h2>

            <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by scheme name or AMC..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {isLoading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 animate-spin" />}
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="p-4 font-semibold text-gray-400">Scheme Code</th>
                                <th className="p-4 font-semibold text-gray-400">Scheme Name</th>
                                <th className="p-4 font-semibold text-gray-400 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {funds.length > 0 ? (
                                funds.slice(0, 50).map((fund) => ( // Limit rendering to 50
                                    <tr key={fund.schemeCode} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-gray-400 font-mono text-sm">{fund.schemeCode}</td>
                                        <td className="p-4 text-white font-medium">{fund.schemeName}</td>
                                        <td className="p-4 text-right">
                                            <Link
                                                href={`/mutual-funds/${fund.schemeCode}`}
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500 hover:text-white transition-colors"
                                            >
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="p-8 text-center text-gray-500">
                                        No schemes found matching "{searchQuery}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-4 text-center text-xs text-gray-500">
                Showing top {Math.min(funds.length, 50)} results. Search to find specific schemes.
            </div>
        </div>
    );
}
