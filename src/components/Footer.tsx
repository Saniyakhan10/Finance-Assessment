import Link from 'next/link';
import { TrendingUp, Twitter, Linkedin, Facebook, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black py-16 px-4 mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="space-y-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-emerald-500" />
                        </div>
                        <span className="text-xl font-bold text-white">ShareMarket</span>
                    </Link>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Empowering investors with real-time data and expert analysis.
                    </p>
                    <div className="flex gap-4">
                        {[Twitter, Linkedin, Facebook].map((Icon, i) => (
                            <a key={i} href="#" className="p-2 text-gray-400 hover:text-white transition-colors">
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-6">Platform</h3>
                    <ul className="space-y-4 text-sm text-gray-500">
                        {['Markets', 'IPO', 'Mutual Funds', 'Analytics'].map((item) => (
                            <li key={item}>
                                <Link href="#" className="hover:text-emerald-400 transition-colors">
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-6">Support</h3>
                    <ul className="space-y-4 text-sm text-gray-500">
                        {['Help Center', 'Terms of Service', 'Privacy Policy', 'Contact'].map((item) => (
                            <li key={item}>
                                <Link
                                    href={item === 'Contact' ? '/contact' : '#'}
                                    className="hover:text-emerald-400 transition-colors"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-6">Newsletter</h3>
                    <div className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                        />
                        <button className="bg-emerald-600 text-white font-semibold rounded-lg px-4 py-3 text-sm hover:bg-emerald-500 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-gray-600 text-sm">
                    © 2026 ShareMarket Inc. All rights reserved.
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span>Made with</span>
                    <Heart className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                    <span>in India</span>
                </div>
            </div>
        </footer>
    );
}
