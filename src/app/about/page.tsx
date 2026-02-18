import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, Users, Award, Heart, TrendingUp, Shield } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us - ShareMarket | Your Trusted Investment Partner',
    description: 'Learn about ShareMarket\'s mission to democratize investing in India. Trusted by millions for stock trading, IPOs, mutual funds, and financial education.',
    keywords: ['about sharemarket', 'investment platform India', 'stock trading company', 'financial services'],
};

export default function AboutPage() {
    const values = [
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Trust & Security',
            description: 'Your financial security is our top priority with bank-grade encryption and SEBI compliance.',
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'Customer First',
            description: 'We put our customers at the heart of everything we do, providing 24/7 support.',
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: 'Innovation',
            description: 'Continuously evolving our platform with cutting-edge technology and features.',
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: 'Financial Inclusion',
            description: 'Making investing accessible to everyone, regardless of their financial background.',
        },
    ];

    const team = [
        { name: 'Rajesh Kumar', role: 'CEO & Founder', image: '👨‍💼' },
        { name: 'Priya Sharma', role: 'Head of Technology', image: '👩‍💻' },
        { name: 'Amit Patel', role: 'Chief Investment Officer', image: '👨‍💼' },
        { name: 'Sneha Reddy', role: 'Head of Customer Success', image: '👩‍💼' },
    ];

    const stats = [
        { value: '10M+', label: 'Happy Investors' },
        { value: '₹50,000 Cr', label: 'Assets Under Management' },
        { value: '5+ Years', label: 'Market Experience' },
        { value: '99.9%', label: 'Platform Uptime' },
    ];

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-black mb-6">
                            About <span className="gradient-text">ShareMarket</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Empowering millions of Indians to achieve their financial goals through smart investing
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {stats.map((stat, index) => (
                            <div key={index} className="glass rounded-xl p-6 text-center">
                                <p className="text-4xl font-bold gradient-text mb-2">{stat.value}</p>
                                <p className="text-gray-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-gradient-to-b from-transparent to-blue-500/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="glass rounded-2xl p-8">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                                <Target className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                            <p className="text-gray-400 leading-relaxed">
                                To democratize investing in India by providing a simple, secure, and powerful platform
                                that enables everyone to grow their wealth. We believe that financial freedom should be
                                accessible to all, not just the privileged few.
                            </p>
                        </div>

                        <div className="glass rounded-2xl p-8">
                            <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                                <Award className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
                            <p className="text-gray-400 leading-relaxed">
                                To be India's most trusted and innovative investment platform, empowering 100 million
                                investors by 2030. We envision a future where every Indian has the knowledge, tools,
                                and confidence to build long-term wealth through smart investing.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold mb-4 text-center">
                        Our <span className="gradient-text">Core Values</span>
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        The principles that guide everything we do
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="glass rounded-xl p-6 hover:scale-105 transition-transform text-center"
                            >
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                                <p className="text-gray-400 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-20 bg-gradient-to-b from-blue-500/5 to-purple-500/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold mb-4 text-center">
                        Meet Our <span className="gradient-text">Leadership Team</span>
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        Experienced professionals dedicated to your financial success
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="glass rounded-xl p-6 text-center hover:scale-105 transition-transform"
                            >
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">
                                    {member.image}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-gray-400 text-sm">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join Us CTA */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass rounded-2xl p-12 text-center">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Join Millions of Smart Investors
                        </h2>
                        <p className="text-gray-400 text-lg mb-8">
                            Start your investment journey today with ShareMarket
                        </p>
                        <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all">
                            Get Started Free
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
