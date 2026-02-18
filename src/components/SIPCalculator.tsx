'use client';

import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Search, Loader2 } from 'lucide-react';

interface SIPCalculatorProps {
    // No props needed for now
}

export default function SIPCalculator() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedFund, setSelectedFund] = useState<any>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [isCalculatingReturns, setIsCalculatingReturns] = useState(false);

    // Inputs
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [investmentPeriod, setInvestmentPeriod] = useState(5); // years
    const [expectedReturn, setExpectedReturn] = useState(12); // %

    // Results
    const [investedAmount, setInvestedAmount] = useState(0);
    const [estReturns, setEstReturns] = useState(0);
    const [totalValue, setTotalValue] = useState(0);

    // Search Effect
    useEffect(() => {
        const fetchResults = async () => {
            if (searchQuery.length < 3) {
                setSearchResults([]);
                return;
            }

            setIsSearching(true);
            try {
                const response = await fetch(`https://api.mfapi.in/mf/search?q=${searchQuery}`);
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data.slice(0, 5));
                }
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsSearching(false);
            }
        };

        const timer = setTimeout(fetchResults, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Select Fund Handler: Fetch historical data to estimate real returns
    const handleSelectFund = async (fund: any) => {
        setSearchQuery('');
        setSearchResults([]);
        setIsCalculatingReturns(true);

        try {
            const response = await fetch(`https://api.mfapi.in/mf/${fund.schemeCode}`);
            const data = await response.json();

            if (data.status === "SUCCESS" && data.data && data.data.length > 0) {
                const history = data.data;
                const currentNav = parseFloat(history[0].nav);

                // Calculate 1 Year Return (approx 252 trading days, or simply 1 year back)
                // Let's try to find approx 1 year ago (365 days)
                // Since data is sorted descending (newest first)

                // Find date 1 year ago
                const oneYearBackIndex = history.findIndex((item: any) => {
                    const d = item.date.split('-'); // DD-MM-YYYY
                    const date = new Date(`${d[2]}-${d[1]}-${d[0]}`);
                    const today = new Date();
                    const diffTime = Math.abs(today.getTime() - date.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays >= 365;
                });

                let annualReturn = 12; // Default fallback

                if (oneYearBackIndex !== -1) {
                    const oldNav = parseFloat(history[oneYearBackIndex].nav);
                    const absoluteReturn = ((currentNav - oldNav) / oldNav) * 100;
                    annualReturn = parseFloat(absoluteReturn.toFixed(2));
                }

                setSelectedFund({
                    ...fund,
                    realReturn: annualReturn,
                    meta: data.meta
                });
                setExpectedReturn(annualReturn > 0 ? annualReturn : 12); // Use calculated return
            }

        } catch (error) {
            console.error('Error fetching fund details:', error);
        } finally {
            setIsCalculatingReturns(false);
        }
    };

    // Calculate SIP
    // Formula: M * ({[1 + i]^n - 1} / i) * (1 + i)
    // M = Monthly Investment
    // i = Periodic Interest Rate (Annual Rate / 12 / 100)
    // n = Total payments (Years * 12)
    useEffect(() => {
        const calculateSIP = () => {
            const i = expectedReturn / 12 / 100;
            const n = investmentPeriod * 12;

            const totalInvested = monthlyInvestment * n;

            // Future Value
            let fv = 0;
            if (expectedReturn === 0) {
                fv = totalInvested;
            } else {
                fv = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
            }

            const estRet = fv - totalInvested;

            setInvestedAmount(Math.round(totalInvested));
            setEstReturns(Math.round(estRet));
            setTotalValue(Math.round(fv));
        };

        calculateSIP();
    }, [monthlyInvestment, investmentPeriod, expectedReturn]);

    // Simple projection data for chart
    const chartData = Array.from({ length: investmentPeriod + 1 }, (_, year) => {
        const months = year * 12;
        const invested = monthlyInvestment * months;
        let value = 0;
        if (year > 0) {
            const i = expectedReturn / 12 / 100;
            const n = months;
            if (expectedReturn === 0) value = invested;
            else value = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        }

        return {
            year: `Year ${year}`,
            invested: Math.round(invested),
            value: Math.round(value)
        };
    });

    const pieData = [
        { name: 'Invested Amount', value: investedAmount, color: '#9CA3AF' },
        { name: 'Est. Returns', value: estReturns, color: '#10B981' },
    ];

    return (
        <div className="w-full glass-panel p-6 md:p-8 rounded-2xl border border-white/10 bg-black/50">
            <h2 className="text-2xl font-bold text-white mb-6">SIP Calculator</h2>

            {/* Search Fund */}
            <div className="mb-8">
                <label className="block text-sm text-gray-400 mb-2">Select a Mutual Fund (Optional)</label>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search fund to get real returns..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {(isSearching || isCalculatingReturns) && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 animate-spin" />}

                    {searchResults.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-white/10 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                            {searchResults.map((result) => (
                                <button
                                    key={result.schemeCode}
                                    onClick={() => handleSelectFund(result)}
                                    className="w-full text-left px-4 py-3 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors"
                                >
                                    <div className="text-sm text-white font-medium truncate">{result.schemeName}</div>
                                    <div className="text-xs text-gray-500">Code: {result.schemeCode}</div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {selectedFund && (
                    <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex justify-between items-center animate-fade-in">
                        <div>
                            <div className="text-sm font-medium text-emerald-400">Selected Fund</div>
                            <div className="text-white text-sm">{selectedFund.schemeName}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-gray-400">1Y Return</div>
                            <div className="text-emerald-400 font-bold">{selectedFund.realReturn}%</div>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Inputs */}
                <div className="space-y-8">
                    {/* Monthly Investment */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-gray-300">Monthly Investment</label>
                            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">₹{monthlyInvestment.toLocaleString()}</span>
                        </div>
                        <input
                            type="range"
                            min="500"
                            max="100000"
                            step="500"
                            value={monthlyInvestment}
                            onChange={(e) => setMonthlyInvestment(parseInt(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>₹500</span>
                            <span>₹1L</span>
                        </div>
                    </div>

                    {/* Expected Return */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-gray-300">Expected Return Rate (p.a)</label>
                            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">{expectedReturn}%</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            step="0.1"
                            value={expectedReturn}
                            onChange={(e) => {
                                setExpectedReturn(parseFloat(e.target.value));
                                setSelectedFund(null); // Clear manual selection if user overrides
                            }}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1%</span>
                            <span>30%</span>
                        </div>
                    </div>

                    {/* Time Period */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-gray-300">Time Period</label>
                            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">{investmentPeriod} Years</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            step="1"
                            value={investmentPeriod}
                            onChange={(e) => setInvestmentPeriod(parseInt(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1 Yr</span>
                            <span>30 Yr</span>
                        </div>
                    </div>
                </div>

                {/* Results & Chart */}
                <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="text-gray-400 text-sm mb-1">Invested Amount</div>
                            <div className="text-xl font-bold text-white">₹{investedAmount.toLocaleString()}</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="text-gray-400 text-sm mb-1">Est. Returns</div>
                            <div className="text-xl font-bold text-emerald-400">₹{estReturns.toLocaleString()}</div>
                        </div>
                    </div>
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                        <div className="text-emerald-300 text-sm mb-1 uppercase tracking-wider font-semibold">Total Value</div>
                        <div className="text-3xl font-bold text-emerald-400">₹{totalValue.toLocaleString()}</div>
                    </div>

                    {/* Charts */}
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="year" hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                    formatter={(val: any) => `₹${Number(val).toLocaleString()}`}
                                    labelStyle={{ color: '#999' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#10B981" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                                <Area type="monotone" dataKey="invested" stroke="#6B7280" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
