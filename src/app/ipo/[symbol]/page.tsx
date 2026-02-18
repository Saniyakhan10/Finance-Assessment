import { fetchIPOCalendar } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Calendar, DollarSign, Building2, ExternalLink } from 'lucide-react';

export default async function IPODetailsPage({ params }: { params: { symbol: string } }) {
    const symbol = decodeURIComponent(params.symbol);

    // Since Alpha Vantage IPO API doesn't have a "detail" endpoint (it's a calendar),
    // we fetch the calendar and find the item locally.
    const ipoData = await fetchIPOCalendar();
    const ipo = ipoData.find(item => item.name === symbol || item.symbol === symbol);

    if (!ipo) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">IPO Details Not Found</h1>
                <Link href="/#ipo" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to IPOs
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <Link href="/#ipo" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to IPOs
                    </Link>

                    <div className="glass-panel p-8 rounded-2xl border border-white/10 bg-black/50">
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{ipo.name}</h1>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <span className="px-3 py-1 rounded bg-white/10 text-sm font-medium">{ipo.exchange}</span>
                                    <span>{ipo.symbol || 'Symbol N/A'}</span>
                                </div>
                            </div>
                            {/* No status logic duplicated here, just kept simple */}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm mb-1">IPO Date</div>
                                        <div className="text-xl font-semibold">{ipo.ipoDate}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500">
                                        <DollarSign className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm mb-1">Price Range</div>
                                        <div className="text-xl font-semibold">₹{ipo.priceRangeLow} - ₹{ipo.priceRangeHigh}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm mb-1">Exchange</div>
                                        <div className="text-xl font-semibold">{ipo.exchange}</div>
                                    </div>
                                </div>

                                {/* Placeholder for Subscription Data if available in future APIs */}
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <h3 className="text-lg font-medium mb-2">About IPO</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        This is an upcoming Initial Public Offering on the {ipo.exchange}.
                                        Detailed prospectus and subscription data is usually available on the exchange website.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/10 flex justify-end">
                            <a
                                href={`https://www.google.com/search?q=${ipo.name} IPO RHP`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors"
                            >
                                Check Grey Market Premium <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
