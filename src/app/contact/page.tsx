'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setSubmitted(true);
        }, 2000);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
                <div className="glass-panel p-8 rounded-2xl border border-white/10 text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-6">
                        <Send className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                    <p className="text-gray-400 mb-8">Thanks for reaching out. Our team will get back to you within 24 hours.</p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors w-full"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-black to-black -z-10" />

            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Helper Content */}
                <div className="hidden lg:block space-y-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    <h1 className="text-5xl font-bold text-white leading-tight">
                        Let's Start a <br />
                        <span className="text-gradient">Conversation</span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Have questions about our platform or need assistance? We're here to help you on your investment journey.
                    </p>

                    <div className="space-y-6 pt-8 text-gray-400 border-t border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-emerald-500">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-white font-medium">Email Us</div>
                                <div className="text-sm">support@sharemarket.com</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-emerald-500">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-white font-medium">Call Us</div>
                                <div className="text-sm">+91 22 1234 5678</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-emerald-500">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-white font-medium">Visit Us</div>
                                <div className="text-sm">Bandra Kurla Complex, Mumbai</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="glass-panel p-8 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl">
                    <div className="lg:hidden mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back
                        </Link>
                        <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">First Name</label>
                                <input
                                    type="text"
                                    placeholder="John"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Message</label>
                            <textarea
                                placeholder="How can we help you?"
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold py-3 rounded-lg hover:from-emerald-400 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
