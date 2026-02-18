'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parse } from 'date-fns';

interface MutualFundChartProps {
    data: { date: string; nav: string }[];
}

export default function MutualFundChart({ data }: MutualFundChartProps) {
    if (!data || data.length === 0) return null;

    // Parse data for Recharts
    // API Date format is "31-12-2023" (DD-MM-YYYY)
    const chartData = data.slice(0, 365).map(item => { // Last 1 year generally
        try {
            const [day, month, year] = item.date.split('-');
            // Create date object: month is 0-indexed in JS Date? No, standard Date(year, monthIndex, day)
            // But let's just make ISO string YYYY-MM-DD
            return {
                date: `${year}-${month}-${day}`,
                originalDate: item.date,
                nav: parseFloat(item.nav)
            };
        } catch (e) {
            return null;
        }
    }).filter(item => item !== null).reverse();

    // Calculate change
    const firstVal = chartData[0]?.nav || 0;
    const lastVal = chartData[chartData.length - 1]?.nav || 0;
    const isPositive = lastVal >= firstVal;

    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorNav" x1="0" y1="0" x2="0" y2="1">
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
                        tickFormatter={(str) => {
                            const d = new Date(str);
                            return d.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
                        }}
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
                        formatter={(value: number | undefined) => value !== undefined ? [`₹${value.toFixed(4)}`, 'NAV'] : ['', 'NAV']}
                        labelFormatter={(label) => {
                            const d = new Date(label);
                            return d.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="nav"
                        stroke={isPositive ? '#10B981' : '#EF4444'}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorNav)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
