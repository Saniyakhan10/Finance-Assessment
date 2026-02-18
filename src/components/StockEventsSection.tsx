'use client';

import { Calendar, Building2, Trophy, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StockEventsSection() {
    const events = [
        {
            company: 'Reliance Industries',
            type: 'Quarterly Results',
            date: '20 Feb',
            time: '04:00 PM',
            icon: <Building2 className="w-5 h-5" />
        },
        {
            company: 'TCS',
            type: 'Dividend',
            date: '25 Feb',
            time: '10:00 AM',
            icon: <Trophy className="w-5 h-5" />
        },
        {
            company: 'HDFC Bank',
            type: 'AGM',
            date: '28 Feb',
            time: '11:30 AM',
            icon: <Building2 className="w-5 h-5" />
        },
    ];

    return (
        <section id="events" className="py-24 px-4 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Corporate Events</h2>
                        <p className="text-gray-400">Track earnings, dividends, and board meetings.</p>
                    </div>
                </div>

                <div className="glass-panel rounded-2xl p-8">
                    <div className="space-y-4">
                        {events.map((event, index) => (
                            <Link
                                key={index}
                                href="/events"
                                className="flex flex-col md:flex-row items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-pointer group block"
                            >
                                <div className="flex items-center gap-6 w-full md:w-auto">
                                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
                                        {event.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">{event.company}</h3>
                                        <p className="text-sm text-gray-500">{event.type}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white transition-all">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 text-center pt-8 border-t border-white/5">
                        <Link
                            href="/events"
                            className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-2"
                        >
                            View Full Calendar <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
