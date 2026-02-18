import { fetchStockData, fetchCompanyOverview } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, Building2, Globe, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default async function StockDetailsPage({ params }: { params: { symbol: string } }) {
    // Decode the symbol because it might contain URL-encoded characters (like %3A for :)
    const symbol = decodeURIComponent(params.symbol);
    const apiSymbol = symbol.includes(':') ? symbol.split(':')[0] : symbol; // Strip :NSE if present for API if needed, though Alpha Vantage usually takes just ticker or ticker.exchange

    const stockData = await fetchStockData(apiSymbol);
    const companyOverview = await fetchCompanyOverview(apiSymbol);

    if (!stockData || stockData.length === 0) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Stock Data Not Found</h1>
                <Link href="/" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </div>
        );
    }

    const latest = stockData[stockData.length - 1];
    const previous = stockData[stockData.length - 2];
    const change = latest.close - previous.close;
    const changePercent = (change / previous.close) * 100;
    const isPositive = change >= 0;

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link href="/#stocks" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Stocks
                    </Link>

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-4xl font-bold">{companyOverview?.Name || symbol}</h1>
                                <span className="px-3 py-1 rounded bg-white/10 text-sm font-medium text-gray-300">
                                    {companyOverview?.Exchange || 'NSE'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Building2 className="w-4 h-4" />
                                <span>{companyOverview?.Sector || 'Sector N/A'}</span>
                                <span>•</span>
                                <span>{companyOverview?.Industry || 'Industry N/A'}</span>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-5xl font-bold mb-2">₹{latest.close.toLocaleString()}</div>
                            <div className={`flex items-center justify-end gap-2 text-xl font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                                {isPositive ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                                {change > 0 ? '+' : ''}{change.toFixed(2)} ({Math.abs(changePercent).toFixed(2)}%)
                            </div>
                            <div className="text-sm text-gray-500 mt-1">As of {latest.date}</div>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="glass-panel p-6 rounded-2xl mb-12 border border-white/10 bg-black/50">
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stockData}>
                                    <defs>
                                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={isPositive ? '#10B981' : '#EF4444'} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={isPositive ? '#10B981' : '#EF4444'} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#666"
                                        tick={{ fill: '#666', fontSize: 12 }}
                                        tickLine={false}
                                        axisLine={false}
                                        minTickGap={30}
                                    />
                                    <YAxis
                                        stroke="#666"
                                        tick={{ fill: '#666', fontSize: 12 }}
                                        tickLine={false}
                                        axisLine={false}
                                        domain={['auto', 'auto']}
                                        tickFormatter={(val) => `₹${val}`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                        labelStyle={{ color: '#999', marginBottom: '4px' }}
                                        formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Price']}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="close"
                                        stroke={isPositive ? '#10B981' : '#EF4444'}
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorPrice)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: 'Market Cap', value: companyOverview?.MarketCapitalization ? '₹' + (parseInt(companyOverview.MarketCapitalization) / 10000000).toLocaleString() + ' Cr' : 'N/A', icon: DollarSign },
                            { label: 'P/E Ratio', value: companyOverview?.PERatio || 'N/A', icon: TrendingUp },
                            { label: '52 Week High', value: '₹' + (companyOverview?.['52WeekHigh'] || 'N/A'), icon: TrendingUp },
                            { label: '52 Week Low', value: '₹' + (companyOverview?.['52WeekLow'] || 'N/A'), icon: TrendingDown },
                        ].map((stat, i) => (
                            <div key={i} className="glass-panel p-6 rounded-xl border border-white/5 bg-white/5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                        <stat.icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-gray-400 text-sm">{stat.label}</span>
                                </div>
                                <div className="text-xl font-bold mt-1 pl-11">{stat.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Company Description */}
                    {companyOverview?.Description && (
                        <div className="glass-panel p-8 rounded-2xl border border-white/10 mb-12">
                            <h2 className="text-2xl font-bold mb-4">About {companyOverview.Name}</h2>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                {companyOverview.Description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-white/5">
                                <div>
                                    <div className="text-gray-500 text-sm mb-1">Headquarters</div>
                                    <div className="font-semibold">{companyOverview.Address || 'N/A'}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-sm mb-1">Fiscal Year End</div>
                                    <div className="font-semibold">{companyOverview.FiscalYearEnd || 'N/A'}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-sm mb-1">Latest Quarter</div>
                                    <div className="font-semibold">{companyOverview.LatestQuarter || 'N/A'}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
