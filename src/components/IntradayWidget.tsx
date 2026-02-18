'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { StockData, CompanyOverview } from '@/types';

interface IntradayWidgetProps {
    stockData: StockData[];
    companyOverview?: CompanyOverview;
}

export default function IntradayWidget({ stockData, companyOverview }: IntradayWidgetProps) {
    if (!stockData || stockData.length === 0) return null;

    const latest = stockData[stockData.length - 1];
    const previous = stockData[stockData.length - 2];
    const change = latest.close - previous.close;
    const changePercent = (change / previous.close) * 100;
    const isPositive = change >= 0;

    const chartData = stockData.map(item => ({
        time: new Date(item.date).toLocaleDateString([], { month: 'short', day: 'numeric' }),
        price: item.close,
    }));

    // Use company overview data if available, otherwise fallback
    const symbol = companyOverview?.Symbol || 'RELIANCE';
    const name = companyOverview?.Name || 'Reliance Industries Ltd';
    const peRatio = companyOverview?.PERatio ? parseFloat(companyOverview.PERatio).toFixed(2) : '-';
    // Fix: ParseInt might fail if string contains 'B' or 'M' or is missing.
    // Simplifying MarketCap display.
    const marketCap = companyOverview?.MarketCapitalization ? (Number(companyOverview.MarketCapitalization) / 1000000000).toFixed(2) + 'B' : '-';

    return (
        <section id="intraday" className="py-24 px-4 bg-black/50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Market Overview</h2>
                        <p className="text-gray-400">Live feed from major Indian exchanges</p>
                    </div>
                </div>

                <div className="glass-panel rounded-2xl p-8 border border-white/5">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-8">
                        {/* Title and Price */}
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                <span className="font-bold text-2xl text-emerald-400">{symbol}</span>
                            </div>
                            <div>
                                <h3 className="text-sm text-gray-400 font-medium mb-1">{name}</h3>
                                <div className="text-4xl font-bold text-white mb-1">
                                    ₹{latest.close.toLocaleString()}
                                </div>
                                <div className={`flex items-center gap-2 font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {isPositive ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                                    <span>{change > 0 ? '+' : ''}{change.toFixed(2)} ({Math.abs(changePercent).toFixed(2)}%)</span>
                                </div>
                            </div>
                        </div>

                        {/* Usage Stats (OHLC + Fundamentals) */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-6 w-full lg:w-auto">
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Open</span>
                                <span className="text-white font-semibold text-lg">₹{latest.open.toLocaleString()}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">High</span>
                                <span className="text-white font-semibold text-lg">₹{latest.high.toLocaleString()}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Low</span>
                                <span className="text-white font-semibold text-lg">₹{latest.low.toLocaleString()}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Vol</span>
                                <span className="text-white font-semibold text-lg">{(latest.volume / 1000000).toFixed(2)}M</span>
                            </div>

                            {/* Additional Fundamental Data row - Only show if companyOverview exists */}
                            {companyOverview && (
                                <>
                                    <div className="hidden md:flex flex-col">
                                        <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">P/E Ratio</span>
                                        <span className="text-white font-semibold text-lg">{peRatio}</span>
                                    </div>
                                    <div className="hidden md:flex flex-col">
                                        <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Mkt Cap</span>
                                        <span className="text-white font-semibold text-lg">${marketCap}</span>
                                    </div>
                                    <div className="hidden md:flex flex-col">
                                        <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">52W High</span>
                                        <span className="text-white font-semibold text-lg">₹{parseFloat(companyOverview['52WeekHigh']).toLocaleString()}</span>
                                    </div>
                                    <div className="hidden md:flex flex-col">
                                        <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">52W Low</span>
                                        <span className="text-white font-semibold text-lg">₹{parseFloat(companyOverview['52WeekLow']).toLocaleString()}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="w-full h-[400px] mt-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0.2} />
                                        <stop offset="95%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                                <XAxis
                                    dataKey="time"
                                    stroke="#666"
                                    tick={{ fill: '#666', fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    domain={['auto', 'auto']}
                                    stroke="#666"
                                    tick={{ fill: '#666', fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `₹${value}`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="price"
                                    stroke={isPositive ? '#10b981' : '#ef4444'}
                                    strokeWidth={2}
                                    fill="url(#colorPrice)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </section>
    );
}
