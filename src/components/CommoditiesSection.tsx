'use client';

import { TrendingUp, TrendingDown, RefreshCcw, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CommoditiesSectionProps {
    goldSpot: any;
    goldHistory: any[];
    silverSpot: any;
    silverHistory: any[];
}

export default function CommoditiesSection({ goldSpot, goldHistory, silverSpot, silverHistory }: CommoditiesSectionProps) {
    const commodities = [
        {
            name: 'Gold',
            symbol: 'GOLD',
            spot: goldSpot,
            history: goldHistory,
            color: '#FCD34D' // Yellow/Gold
        },
        {
            name: 'Silver',
            symbol: 'SILVER',
            spot: silverSpot,
            history: silverHistory,
            color: '#9CA3AF' // Gray/Silver
        }
    ];

    return (
        <section id="commodities" className="py-24 px-4 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Commodities Spot</h2>
                        <p className="text-gray-400">Live prices for Gold and Silver.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {commodities.map((item) => {
                        const change = parseFloat(item.spot.change);
                        const isPositive = change >= 0;

                        return (
                            <div key={item.symbol} className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/5">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-4 rounded-xl flex items-center justify-center`} style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                                            <DollarSign className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                                    {isPositive ? '+' : ''}{item.spot.change_percent}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-white">${item.spot.price}</div>
                                        <div className={`flex items-center justify-end gap-1 text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                            {isPositive ? '+' : ''}{change}
                                        </div>
                                    </div>
                                </div>

                                {/* Chart Area */}
                                <div className="h-[200px] w-full mt-8">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={item.history}>
                                            <defs>
                                                <linearGradient id={`color${item.symbol}`} x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={item.color} stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor={item.color} stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                            <XAxis
                                                dataKey="date"
                                                hide
                                            />
                                            <YAxis
                                                hide
                                                domain={['auto', 'auto']}
                                            />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                                labelStyle={{ color: '#999', marginBottom: '4px' }}
                                                formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Price']}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="value"
                                                stroke={item.color}
                                                strokeWidth={2}
                                                fillOpacity={1}
                                                fill={`url(#color${item.symbol})`}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
