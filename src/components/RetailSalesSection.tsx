'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingBag, TrendingUp, TrendingDown } from 'lucide-react';
import { RetailSalesData } from '@/types';

interface RetailSalesSectionProps {
    data: RetailSalesData;
}

export default function RetailSalesSection({ data }: RetailSalesSectionProps) {
    if (!data || !data.data) return null;

    const chartData = data.data.map(item => ({
        date: new Date(item.date).toLocaleDateString(undefined, { month: 'short', year: '2-digit' }),
        value: parseInt(item.value),
        originalDate: item.date
    }));

    // Calculate Trend
    const lastValue = chartData[chartData.length - 1].value;
    const prevValue = chartData[chartData.length - 2].value;
    const change = lastValue - prevValue;
    const changePercent = (change / prevValue) * 100;
    const isPositive = change >= 0;

    return (
        <section className="py-24 px-4 bg-black/50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <ShoppingBag className="w-8 h-8 text-emerald-500" />
                            Retail Sales
                        </h2>
                        <p className="text-gray-400">
                            {data.name} ({data.interval} - {data.unit})
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">Latest Reading</div>
                        <div className="text-3xl font-bold text-white">
                            ${(lastValue / 1000).toFixed(2)}B
                        </div>
                        <div className={`flex items-center justify-end gap-2 text-sm font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            <span>{change > 0 ? '+' : ''}{changePercent.toFixed(2)}%</span>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-xl border border-white/5 h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                            <XAxis
                                dataKey="date"
                                stroke="#666"
                                tick={{ fill: '#666', fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#666"
                                tick={{ fill: '#666', fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}B`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                labelStyle={{ color: '#999', marginBottom: '4px' }}
                                formatter={(value: any) => [`$${(Number(value) / 1000).toFixed(2)}B`, 'Sales']}
                            />
                            <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}
