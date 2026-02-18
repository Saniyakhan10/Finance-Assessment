import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SIPCalculator from '@/components/SIPCalculator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SIPCalculatorPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
            <Navbar />

            <main className="pt-32 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link href="/mutual-funds" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Mutual Funds
                    </Link>

                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-bold mb-4">SIP Calculator</h1>
                        <p className="text-gray-400 mb-8">
                            Calculate the future value of your Systematic Investment Plan (SIP) investments.
                            You can also search for a mutual fund to see projections based on its historical performance.
                        </p>

                        <SIPCalculator />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
