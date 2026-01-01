import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackgroundAnimation from '../components/BackgroundAnimation';

const SuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const phoneNumber = location.state?.phoneNumber;

    return (
        <div className="min-h-screen bg-fins-dark relative overflow-hidden flex flex-col items-center justify-center p-4 text-center">
            <BackgroundAnimation />

            <div className="relative z-10 flex flex-col items-center animate-fade-in-up">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>

                <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight">
                    Order Received!
                </h1>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-md w-full mb-8">
                    <p className="text-white/80 text-lg mb-6 leading-relaxed">
                        Thank you for your order. We have received your details and will begin preparation shortly.
                    </p>

                    {phoneNumber && (
                        <div className="bg-fins-green/30 rounded-xl p-4 mb-4 border border-white/5">
                            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">We will contact you at</p>
                            <p className="text-fins-gold font-bold text-xl tracking-widest">{phoneNumber}</p>
                        </div>
                    )}

                    <p className="text-white/40 text-sm">
                        Verified Location Delivery
                    </p>
                </div>

                <button
                    onClick={() => navigate('/')}
                    className="px-10 py-4 bg-fins-gold text-fins-dark font-bold uppercase tracking-widest rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl shadow-fins-gold/20"
                >
                    Return Home
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;
