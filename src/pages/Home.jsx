import React from 'react';
import { useNavigate } from 'react-router-dom';
import SelectionCard from '../components/SelectionCard';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { BonelessFishIllustration, TroutIllustration, ButterGarlicIllustration, MasalaTroutIllustration, JapaneseFriesIllustration, CutletIllustration } from '../components/FoodIllustrations';
import MarketingSection from '../components/MarketingSection';

const Home = () => {
    const navigate = useNavigate();

    const handleSelect = (item) => {
        navigate('/location', { state: { selectedItem: item } });
    };

    return (
        <div className="min-h-screen bg-fins-dark relative overflow-hidden flex flex-col items-center justify-start pt-12 md:pt-16 p-4 selection:bg-fins-gold/30">

            {/* Background Animation */}
            <BackgroundAnimation />

            {/* Main Content Container */}
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-12 md:gap-16 relative z-10">

                {/* Logo Section - Top Centered */}
                <div className="flex flex-col items-center justify-center hover:scale-105 transition-transform duration-500 cursor-default">
                    <img
                        src="/logo.jpg"
                        alt="Fins Srinagar"
                        className="w-48 h-48 md:w-56 md:h-56 rounded-full shadow-2xl shadow-fins-gold/10 border-4 border-white/10 object-cover"
                    />
                </div>

                {/* Cards Container */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-4">
                    <SelectionCard
                        title="Boneless Fish + Fries"
                        price="₹290.00"
                        Illustration={BonelessFishIllustration}
                        onClick={() => handleSelect({ title: 'Boneless Fish + Fries', price: '₹290.00' })}
                    />
                    <SelectionCard
                        title="Trout + Fries"
                        price="₹290.00"
                        Illustration={TroutIllustration}
                        onClick={() => handleSelect({ title: 'Trout + Fries', price: '₹290.00' })}
                    />
                    <SelectionCard
                        title="Butter Garlic Fish"
                        price="₹290.00"
                        Illustration={ButterGarlicIllustration}
                        onClick={() => handleSelect({ title: 'Butter Garlic Fish', price: '₹290.00' })}
                    />
                    <SelectionCard
                        title="Masala Trout Fish"
                        price="₹290.00"
                        Illustration={MasalaTroutIllustration}
                        onClick={() => handleSelect({ title: 'Masala Trout Fish', price: '₹290.00' })}
                    />
                    <SelectionCard
                        title="Japanese Fries"
                        price="₹290.00"
                        Illustration={JapaneseFriesIllustration}
                        onClick={() => handleSelect({ title: 'Japanese Fries', price: '₹290.00' })}
                    />
                    <SelectionCard
                        title="Fish Cutlet / Nuggets"
                        price="₹290.00"
                        Illustration={CutletIllustration}
                        onClick={() => handleSelect({ title: 'Fish Cutlet / Nuggets', price: '₹290.00' })}
                    />
                </div>

                {/* Marketing Section */}
                <MarketingSection />

                {/* Footer/Tagline */}
                {/*
                <div className="w-full flex justify-center opacity-60">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-potato font-light tracking-[0.2em] text-xs md:text-sm uppercase text-center">
                        <span>Crisp Batter</span>
                        <span className="hidden md:inline">•</span>
                        <span>Flaky Fish</span>
                        <span className="hidden md:inline">•</span>
                        <span>Perfect Chips</span>
                    </div>
                </div>
                */}

            </div>
        </div>
    );
};

export default Home;
