import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackgroundAnimation from '../components/BackgroundAnimation';
import {
    BonelessFishIllustration,
    TroutIllustration,
    ButterGarlicIllustration,
    MasalaTroutIllustration,
    JapaneseFriesIllustration,
    CutletIllustration
} from '../components/FoodIllustrations';
import config from '../config';

// Menu data - ideally this would be in a shared config
const MENU_ITEMS = [
    { title: 'Boneless Fish + Fries', price: 290, Illustration: BonelessFishIllustration },
    { title: 'Trout + Fries', price: 290, Illustration: TroutIllustration },
    { title: 'Butter Garlic Fish', price: 290, Illustration: ButterGarlicIllustration },
    { title: 'Masala Trout Fish', price: 290, Illustration: MasalaTroutIllustration },
    { title: 'Japanese Fries', price: 290, Illustration: JapaneseFriesIllustration },
    { title: 'Fish Cutlet / Nuggets', price: 290, Illustration: CutletIllustration },
];

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialItem = location.state?.selectedItem;
    // Location data from the verification page
    const verifiedLocation = location.state?.coordinates;
    const phoneNumber = location.state?.phoneNumber;

    const [cart, setCart] = useState([]);
    const [mashPotatoCount, setMashPotatoCount] = useState(0);
    const [status, setStatus] = useState('idle'); // idle, sending, error
    const [errorMessage, setErrorMessage] = useState('');

    const MASH_POTATO_PRICE = 150;

    useEffect(() => {
        if (initialItem) {
            setCart([{
                ...initialItem,
                price: 290, // Enforce current pricing
                quantity: 1
            }]);
        }
    }, [initialItem]);

    const addToCart = (item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.title === item.title);
            if (existingItem) {
                // Increment Quantity
                return prevCart.map(cartItem =>
                    cartItem.title === item.title
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // Add New Item
                return [...prevCart, { ...item, price: 290, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (title) => {
        setCart(prevCart => {
            return prevCart.map(cartItem => {
                if (cartItem.title === title) {
                    return { ...cartItem, quantity: Math.max(0, cartItem.quantity - 1) };
                }
                return cartItem;
            }).filter(item => item.quantity > 0);
        });
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + (mashPotatoCount * MASH_POTATO_PRICE);

    const handleCheckout = async () => {
        setErrorMessage('');

        if (!phoneNumber) {
            setErrorMessage('Phone number missing. Please verify location again.');
            return;
        }

        setStatus('sending');

        try {
            const response = await fetch(`${config.API_URL}/api/send-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cart,
                    mashPotatoCount,
                    total,
                    userPhone: phoneNumber,
                    location: verifiedLocation
                })
            });

            const data = await response.json();
            console.log('API Response:', data); // DEBUG: Log full response

            if (data.success) {
                // Navigate to Success Page instead of inline rendering
                navigate('/order-success', { state: { phoneNumber } });
            } else {
                setStatus('error');
                setErrorMessage(data.message || 'Failed to place order.');
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
            setErrorMessage('Network error. Please try again or call us.');
        }
    };

    return (
        <div className="min-h-screen bg-fins-dark relative overflow-hidden flex flex-col items-center justify-start pt-8 pb-20 px-4">
            <BackgroundAnimation />

            <div className="w-full max-w-4xl relative z-10 flex flex-col gap-8">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
                        Complete Your Order
                    </h1>
                    <p className="text-potato/80 font-light">
                        Verified Location. Ready for Prep.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Cart & Add-ons */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Current Order */}
                        <div className="bg-fins-green/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-fins-gold">●</span> Your Order
                            </h2>

                            {cart.length === 0 ? (
                                <p className="text-white/40 italic">Your cart is empty.</p>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div key={item.title} className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5 group hover:border-fins-gold/30 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div>
                                                    <h3 className="font-bold text-white">{item.title}</h3>
                                                    <p className="text-fins-gold text-sm">₹{item.price.toFixed(2)}</p>
                                                </div>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3 bg-fins-dark/30 rounded-lg p-1 border border-white/10">
                                                <button
                                                    onClick={() => removeFromCart(item.title)}
                                                    className="w-8 h-8 flex items-center justify-center text-white hover:text-red-400 transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="text-white font-bold w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="w-8 h-8 flex items-center justify-center text-white hover:text-fins-gold transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Mash Potato Special Section */}
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-fins-gold flex items-center justify-center text-fins-dark font-bold text-xl">
                                            M
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg">Signature Mash Potato</h3>
                                            <p className="text-potato/60 text-sm">Creamy, buttery goodness.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-fins-gold font-bold">₹{MASH_POTATO_PRICE}</p>
                                        <div className="flex items-center bg-fins-dark/50 rounded-lg border border-white/10">
                                            <button
                                                onClick={() => setMashPotatoCount(Math.max(0, mashPotatoCount - 1))}
                                                className="w-8 h-8 flex items-center justify-center text-white hover:text-fins-gold"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center text-white font-medium">{mashPotatoCount}</span>
                                            <button
                                                onClick={() => setMashPotatoCount(mashPotatoCount + 1)}
                                                className="w-8 h-8 flex items-center justify-center text-white hover:text-fins-gold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add More Items Grid */}
                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">Add More to Order</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {MENU_ITEMS.map((item) => (
                                    <div
                                        key={item.title}
                                        onClick={() => addToCart(item)}
                                        className="cursor-pointer bg-fins-green/20 hover:bg-fins-green/40 border border-white/5 hover:border-fins-gold/50 rounded-xl p-4 transition-all duration-300 flex items-center gap-4 group"
                                    >
                                        <div className="w-16 h-12 relative">
                                            <item.Illustration className="w-full h-full drop-shadow-lg group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-white font-medium text-sm group-hover:text-fins-gold transition-colors">{item.title}</h4>
                                            <p className="text-white/60 text-xs">₹{item.price}</p>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-fins-gold group-hover:bg-fins-gold group-hover:text-fins-dark transition-colors">
                                            +
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Total & Checkout */}
                    <div className="lg:col-span-1">
                        <div className="bg-fins-green/60 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl sticky top-8">
                            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 text-sm">
                                <div className="flex justify-between text-potato/80">
                                    <span>Items Total</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-potato/80">
                                    <span>Delivery (Verified)</span>
                                    <span className="text-green-400">Free</span>
                                </div>
                                <div className="h-px bg-white/10 w-full my-4" />
                                <div className="flex justify-between text-white font-bold text-lg">
                                    <span>Total Amount</span>
                                    <span className="text-fins-gold">₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Error Message */}
                            {errorMessage && (
                                <div className="mb-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm text-center">
                                    {errorMessage}
                                </div>
                            )}

                            <button
                                className={`
                                    w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 shadow-lg 
                                    ${status === 'sending'
                                        ? 'bg-white/10 text-white cursor-wait'
                                        : 'bg-fins-gold text-fins-dark hover:bg-white hover:scale-105 shadow-fins-gold/20'
                                    }
                                `}
                                onClick={handleCheckout}
                                disabled={status === 'sending'}
                            >
                                {status === 'sending' ? 'Placing Order...' : 'Checkout'}
                            </button>

                            <p className="text-center text-white/30 text-xs mt-4">
                                Secure payments powered by Fins
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
