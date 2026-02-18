import { fetchStockData, fetchMarketNews, fetchTopGainersLosers, fetchCommoditySpot, fetchCommodityHistory, fetchRetailSales } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IntradayWidget from '@/components/IntradayWidget';
import StocksSection from '@/components/StocksSection';
import MutualFundsSection from '@/components/MutualFundsSection';
import SIPSection from '@/components/SIPSection';
import CommoditiesSection from '@/components/CommoditiesSection';
import RetailSalesSection from '@/components/RetailSalesSection';
import StockEventsSection from '@/components/StockEventsSection';
import NewsSection from '@/components/NewsSection';
import FAQSection from '@/components/FAQSection';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ShareMarket - Your Gateway to Smart Investing | Stock Market, IPO, Mutual Funds',
  description: 'Discover real-time stock market data, trending IPOs, top mutual funds, and expert investment insights. Start your wealth creation journey with ShareMarket today.',
  keywords: [
    'share market',
    'stock market India',
    'intraday trading',
    'IPO investment',
    'mutual funds',
    'stock market news',
    'NSE BSE stocks',
    'investment platform'
  ],
  openGraph: {
    title: 'ShareMarket - Your Gateway to Smart Investing',
    description: 'Real-time stock market data, IPOs, mutual funds, and expert insights for smart investing.',
    type: 'website',
    url: 'https://sharemarket.com',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ShareMarket Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShareMarket - Your Gateway to Smart Investing',
    description: 'Real-time stock market data, IPOs, mutual funds, and expert insights.',
    images: ['/og-image.jpg'],
  },
};

export default async function Home() {
  const stockData = await fetchStockData('RELIANCE.BSE');
  const newsData = await fetchMarketNews();
  const topMovers = await fetchTopGainersLosers();
  const goldSpot = await fetchCommoditySpot('GOLD');
  const silverSpot = await fetchCommoditySpot('SILVER');
  const goldHistory = await fetchCommodityHistory('GOLD');
  const silverHistory = await fetchCommodityHistory('SILVER');
  const retailSales = await fetchRetailSales();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'ShareMarket',
    description: 'Complete stock market investment platform offering stocks, IPOs, and mutual funds.',
    url: 'https://sharemarket.com',
    serviceType: ['Stock Trading', 'IPO Investment', 'Mutual Funds'],
    areaServed: 'IN',
    offers: {
      '@type': 'Offer',
      description: 'Stock market trading and investment services',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
        <Navbar />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black -z-10" />

            <div className="max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                India's Most Trusted Platform
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                Smart Investing for the <br />
                <span className="text-gradient">Modern Era</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Experience the future of trading with real-time data, advanced analytics, and zero brokerage on equity delivery.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/signup"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  Start Investing Free
                </Link>
                <Link
                  href="#intraday"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white/5 text-white font-semibold rounded-lg border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                  Explore Markets
                </Link>
              </div>

              <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-white/5 mt-16">
                {[
                  { label: 'Active Users', value: '10M+' },
                  { label: 'Daily Trades', value: '50L+' },
                  { label: 'AUM', value: '₹50K Cr' },
                  { label: 'Support', value: '24/7' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Main Sections */}
          <IntradayWidget stockData={stockData} />
          <StocksSection data={topMovers} />
          <MutualFundsSection />
          <SIPSection />
          <CommoditiesSection
            goldSpot={goldSpot}
            silverSpot={silverSpot}
            goldHistory={goldHistory}
            silverHistory={silverHistory}
          />
          <RetailSalesSection data={retailSales} />
          <StockEventsSection />
          <NewsSection news={newsData} />
          <FAQSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
