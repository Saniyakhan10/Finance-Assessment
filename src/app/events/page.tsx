'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Calendar, Building2, Trophy, Clock, ArrowRight, User, FileText, Megaphone } from 'lucide-react';
import { useState } from 'react';

export default function EventsPage() {
    const [filter, setFilter] = useState('All');

    const events = [
        {
            id: 1,
            company: 'Reliance Industries',
            type: 'Quarterly Results',
            date: '2026-02-20',
            time: '04:00 PM',
            location: 'Mumbai',
            description: 'Q4 2025 Financial Results Announcement',
            icon: <Building2 className="w-5 h-5" />,
            category: 'Results'
        },
        {
            id: 2,
            company: 'TCS',
            type: 'Dividend',
            date: '2026-02-25',
            time: '10:00 AM',
            location: 'Online',
            description: 'Interim Dividend of ₹10 per share',
            icon: <Trophy className="w-5 h-5" />,
            category: 'Dividends'
        },
        {
            id: 3,
            company: 'HDFC Bank',
            type: 'AGM',
            date: '2026-02-28',
            time: '11:30 AM',
            location: 'Mumbai/Video Conf',
            description: 'Annual General Meeting for FY 2025-26',
            icon: <User className="w-5 h-5" />,
            category: 'Meetings'
        },
        {
            id: 4,
            company: 'Infosys',
            type: 'Press Conference',
            date: '2026-03-05',
            time: '02:00 PM',
            location: 'Bengaluru',
            description: 'Strategic Partnership Announcement',
            icon: <Megaphone className="w-5 h-5" />,
            category: 'Press'
        },
        {
            id: 5,
            company: 'Tata Motors',
            type: 'Product Launch',
            date: '2026-03-10',
            time: '11:00 AM',
            location: 'New Delhi',
            description: 'Unveiling of new EV lineup',
            icon: <FileText className="w-5 h-5" />,
            category: 'Product'
        },
        {
            id: 6,
            company: 'Wipro',
            type: 'Board Meeting',
            date: '2026-03-12',
            time: '09:00 AM',
            location: 'Bengaluru',
            description: 'Discussion on Share Buyback',
            icon: <Building2 className="w-5 h-5" />,
            category: 'Meetings'
        }
    ];

    const filteredEvents = filter === 'All' ? events : events.filter(e => e.category === filter);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <Link href="/#events" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>

                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Corporate <span className="text-gradient">Calendar</span></h1>
                            <p className="text-gray-400">Stay updated with upcoming earnings, dividends, and events.</p>
                        </div>

                        <div className="flex gap-2 bg-white/5 p-1 rounded-lg overflow-x-auto max-w-full">
                            {['All', 'Results', 'Dividends', 'Meetings'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === f ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
                        {filteredEvents.length > 0 ? (
                            <div className="divide-y divide-white/5">
                                {filteredEvents.map((event) => (
                                    <div key={event.id} className="p-6 hover:bg-white/5 transition-colors group">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                                    {event.icon}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-bold text-white text-lg">{event.company}</h3>
                                                        <span className="px-2 py-0.5 rounded text-xs bg-white/10 text-gray-400 border border-white/5">
                                                            {event.type}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-400 text-sm mb-2">{event.description}</p>

                                                </div>
                                            </div>

                                            <div className="flex flex-row md:flex-col gap-4 md:gap-1 text-sm text-gray-400 min-w-[140px] md:text-right">
                                                <div className="flex items-center md:justify-end gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="text-white font-medium">{event.date}</span>
                                                </div>
                                                <div className="flex items-center md:justify-end gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{event.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center text-gray-500">
                                No events found for this category.
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
