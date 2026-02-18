import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TrendingUp, TrendingDown, Activity, Shield, Zap, BookOpen } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Futures & Options (F&O) Trading | ShareMarket',
    description: 'Trade Futures and Options with advanced tools, real-time data, and expert strategies. Learn F&O trading with comprehensive guides and market insights.',
    keywords: ['futures', 'options', 'F&O trading', 'derivatives', 'stock options', 'futures trading India'],
    openGraph: {
        title: 'F&O Trading Platform - ShareMarket',
        description: 'Advanced Futures & Options trading with expert strategies and tools.',
    },
};

export default function FOPage() {
    const features = [
        {
            icon: <Activity className="w-8 h-8" />,
            title: 'Real-time Market Data',
            description: 'Live F&O prices, Greeks, and market depth for informed trading decisions.',
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: 'Lightning Fast Execution',
            description: 'Execute your F&O trades in milliseconds with our advanced trading engine.',
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Risk Management Tools',
            description: 'Advanced risk calculators, margin requirements, and hedging strategies.',
        },
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: 'Learning Resources',
            description: 'Comprehensive guides, webinars, and expert insights to master F&O trading.',
        },
    ];

    const popularContracts = [
        { name: 'NIFTY 50', type: 'Future', price: '21,850.00', change: '+125.50', changePercent: '+0.58%', positive: true },
        { name: 'BANKNIFTY', type: 'Future', price: '47,320.00', change: '+287.30', changePercent: '+0.61%', positive: true },
        { name: 'RELIANCE', type: 'Call Option', strike: '2600', price: '45.50', change: '-2.30', changePercent: '-4.81%', positive: false },
        { name: 'TCS', type: 'Put Option', strike: '3800', price: '38.75', change: '+5.20', changePercent: '+15.52%', positive: true },
    ];

    const strategies = [
        {
            name: 'Bull Call Spread',
            description: 'Limited risk strategy for moderately bullish outlook',
            difficulty: 'Intermediate',
            color: 'from-green-500 to-emerald-600',
        },
        {
            name: 'Bear Put Spread',
            description: 'Limited risk strategy for moderately bearish outlook',
            difficulty: 'Intermediate',
            color: 'from-red-500 to-pink-600',
        },
        {
            name: 'Iron Condor',
            description: 'Neutral strategy for range-bound markets',
            difficulty: 'Advanced',
            color: 'from-purple-500 to-indigo-600',
        },
        {
            name: 'Covered Call',
            description: 'Generate income from existing stock holdings',
            difficulty: 'Beginner',
            color: 'from-blue-500 to-cyan-600',
        },
    ];

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-black mb-6">
                            Futures & <span className="gradient-text">Options</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                            Trade derivatives with advanced tools, real-time analytics, and expert strategies
                        </p>
                        <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all">
                            Start F&O Trading
                        </button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {features.map((feature, index) => (
                            <div key={index} className="glass rounded-xl p-6 hover:scale-105 transition-transform">
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Contracts */}
            <section className="py-20 bg-gradient-to-b from-transparent to-blue-500/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold mb-12 text-center">
                        Popular <span className="gradient-text">F&O Contracts</span>
                    </h2>

                    <div className="glass rounded-2xl p-8">
                        <div className="space-y-4">
                            {popularContracts.map((contract, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold">
                                            {contract.name.substring(0, 2)}
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">{contract.name}</p>
                                            <p className="text-gray-400 text-sm">
                                                {contract.type}
                                                {contract.strike && ` | Strike: ${contract.strike}`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-semibold text-lg">₹{contract.price}</p>
                                        <div className="flex items-center justify-end space-x-2">
                                            {contract.positive ? (
                                                <TrendingUp className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <TrendingDown className="w-4 h-4 text-red-500" />
                                            )}
                                            <p className={`text-sm font-medium ${contract.positive ? 'text-green-500' : 'text-red-500'}`}>
                                                {contract.change} ({contract.changePercent})
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Trading Strategies */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold mb-4 text-center">
                        Popular Trading <span className="gradient-text">Strategies</span>
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        Learn and implement proven F&O strategies for different market conditions
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {strategies.map((strategy, index) => (
                            <div
                                key={index}
                                className="glass rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer"
                            >
                                <div className={`w-full h-32 bg-gradient-to-br ${strategy.color} rounded-lg mb-4 flex items-center justify-center`}>
                                    <Activity className="w-12 h-12 text-white" />
                                </div>
                                <div className="mb-3">
                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full text-xs font-semibold">
                                        {strategy.difficulty}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{strategy.name}</h3>
                                <p className="text-gray-400 text-sm">{strategy.description}</p>
                                <button className="w-full mt-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500/10 transition-colors">
                                    Learn This Strategy
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Risk Warning */}
            <section className="py-16 bg-gradient-to-r from-red-500/10 to-orange-500/10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass rounded-xl p-8 border-l-4 border-red-500">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                            <Shield className="w-6 h-6 mr-3 text-red-500" />
                            Important Risk Disclosure
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                            Futures and Options trading involves substantial risk and is not suitable for all investors.
                            The possibility exists that you could sustain a loss of some or all of your initial investment.
                            You should only invest money that you can afford to lose. Before trading F&O, carefully consider
                            your financial situation and consult with a financial advisor if necessary.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
