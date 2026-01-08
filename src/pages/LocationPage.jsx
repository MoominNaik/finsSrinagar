import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackgroundAnimation from '../components/BackgroundAnimation';

const STORE_COORDS = { lat: 34.0711, lng: 74.8463 }; // Sonwar
const MAX_RADIUS_KM = 5;

const LocationPage = () => {
    const navigate = useNavigate();
    const locationState = useLocation().state;
    const selectedItem = locationState?.selectedItem;

    const [status, setStatus] = useState('idle'); // idle, loading, success, error, out-of-zone
    const [coordinates, setCoordinates] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [distance, setDistance] = useState(null);
    const [isManual, setIsManual] = useState(false);
    const [manualAddress, setManualAddress] = useState('');

    // Haversine Formula to calculate distance in km
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const handleGetLocation = (retry = true) => {
        if (!phoneNumber || phoneNumber.length < 10) {
            setErrorMessage('Please enter a valid 10-digit phone number.');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');
        setDistance(null);

        if (!navigator.geolocation) {
            setStatus('error');
            setErrorMessage('Geolocation is not supported by your browser.');
            return;
        }

        const options = {
            enableHighAccuracy: retry,
            timeout: 20000,
            maximumAge: retry ? 0 : Infinity // Accept cached position on retry
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                // Calculate Distance
                const dist = calculateDistance(
                    STORE_COORDS.lat,
                    STORE_COORDS.lng,
                    userLat,
                    userLng
                );

                setDistance(dist.toFixed(2));
                setCoordinates({ lat: userLat, lng: userLng });

                // Radius Check
                if (dist <= MAX_RADIUS_KM) {
                    setStatus('success');
                } else {
                    setStatus('out-of-zone');
                }
            },
            (error) => {
                console.warn(`Geolocation error (${retry ? 'High' : 'Low'} Accuracy):`, error);

                if (retry) {
                    // Retry with low accuracy
                    handleGetLocation(false);
                    return;
                }

                setStatus('error');
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setErrorMessage('Location permission denied.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                    case error.TIMEOUT:
                        setErrorMessage('Unable to determine location. Please ensure GPS is on.');
                        break;
                    default:
                        setErrorMessage('An unknown error occurred.');
                }
            },
            options
        );
    };

    const handleManualCheck = async (e) => {
        e.preventDefault();
        if (!manualAddress.trim()) return;

        setStatus('loading');
        setErrorMessage('');
        setDistance(null);

        try {
            // Geocoding using OpenStreetMap (Nominatim)
            // Appending 'Srinagar, Kashmir' to ensure better results locally
            const query = `${manualAddress}, Srinagar, Kashmir`;
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
            const data = await response.json();

            if (!data || data.length === 0) {
                setStatus('error');
                setErrorMessage('Address not found. Please try a more specific landmark.');
                return;
            }

            const location = data[0];
            const userLat = parseFloat(location.lat);
            const userLng = parseFloat(location.lon);

            // Calculate Distance
            const dist = calculateDistance(
                STORE_COORDS.lat,
                STORE_COORDS.lng,
                userLat,
                userLng
            );

            setDistance(dist.toFixed(2));
            setCoordinates({ lat: userLat, lng: userLng });

            // Radius Check
            if (dist <= MAX_RADIUS_KM) {
                setStatus('success');
            } else {
                setStatus('out-of-zone');
            }

        } catch (error) {
            console.error('Geocoding error:', error);
            setStatus('error');
            setErrorMessage('Could not verify address. Please check your internet connection.');
        }
    };

    const handleNext = () => {
        // Navigate to checkout with the verified data
        navigate('/checkout', {
            state: {
                selectedItem,
                coordinates,
                distance,
                phoneNumber,
                address: manualAddress || 'GPS Location'
            }
        });
    };

    return (
        <div className="min-h-screen bg-fins-dark relative overflow-hidden flex flex-col items-center justify-center p-4">
            <BackgroundAnimation />

            <div className="w-full max-w-md bg-fins-green/60 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl relative z-10 flex flex-col items-center text-center gap-6 animate-pulse-border">

                {/* Icon Area */}
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-2 transition-colors duration-500
                    ${status === 'out-of-zone' ? 'bg-red-500/10' : 'bg-fins-gold/10'}
                `}>
                    {status === 'out-of-zone' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-fins-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    )}
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
                        {status === 'out-of-zone' ? 'Out of Delivery Area' : 'Delivery Location'}
                    </h2>
                    <p className="text-potato/80 font-light">
                        {status === 'out-of-zone'
                            ? `You are ${distance}km away. We only deliver within ${MAX_RADIUS_KM}km of Sonwar.`
                            : `We need your GPS location to ensure perfect delivery of your ${selectedItem?.title || 'order'}.`
                        }
                    </p>
                </div>

                {/* Info Box */}
                {selectedItem && (
                    <div className="w-full bg-fins-dark/30 rounded-lg p-4 border border-white/5 flex items-center justify-between">
                        <span className="text-potato/60 text-sm uppercase tracking-wider">Order</span>
                        <span className="text-fins-gold font-medium">{selectedItem.title}</span>
                    </div>
                )}

                {/* Error/Out of Zone Message */}
                {(status === 'error' || status === 'out-of-zone') && (
                    <div className="w-full space-y-4 animate-fade-in">
                        <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20 w-full">
                            {status === 'out-of-zone' ? 'Location too far.' : errorMessage}
                        </div>
                        {/* Strict Mode: Manual Entry Removed */}
                        <div className="text-white/40 text-xs italic">
                            Strict Strict Policy: GPS verification required.
                        </div>
                        {/* Retry Button */}
                        <button
                            onClick={() => handleGetLocation(true)}
                            className="w-full py-4 rounded-full bg-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/20 transition-all duration-300"
                        >
                            Retry GPS
                        </button>
                    </div>
                )}

                {/* Main Action Button area */}
                {status !== 'success' && status !== 'out-of-zone' && (
                    <div className="w-full space-y-4">
                        <input
                            type="tel"
                            placeholder="Enter 10-digit Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                            className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white text-center font-bold tracking-wider placeholder-white/30 focus:outline-none focus:border-fins-gold transition-colors"
                        />

                        <button
                            onClick={() => handleGetLocation(true)}
                            disabled={status === 'loading'}
                            className={`
                                w-full py-4 rounded-full text-fins-dark font-bold uppercase tracking-widest transition-all duration-300
                                ${status === 'loading'
                                    ? 'bg-potato/50 cursor-wait'
                                    : 'bg-fins-gold hover:bg-white hover:scale-105 shadow-lg shadow-fins-gold/20'
                                }
                            `}
                        >
                            {status === 'loading' ? 'Locating...' : 'Verify Location'}
                        </button>
                    </div>
                )}

                {/* Manual Address Toggle */}
                {status !== 'success' && (
                    <div className="w-full">
                        {!isManual ? (
                            <button
                                onClick={() => setIsManual(true)}
                                className="text-white/60 text-sm hover:text-fins-gold underline decoration-fins-gold/30 mt-4"
                            >
                                Or enter address manually
                            </button>
                        ) : (
                            <form onSubmit={handleManualCheck} className="flex flex-col gap-3 mt-4 animate-fade-in">
                                <input
                                    type="text"
                                    value={manualAddress}
                                    onChange={(e) => setManualAddress(e.target.value)}
                                    placeholder="Enter Area / Landmark (e.g. Rajbagh)"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-fins-gold"
                                    autoFocus
                                />
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsManual(false)}
                                        className="flex-1 py-3 rounded-lg bg-white/5 text-white/60 text-sm hover:bg-white/10"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="flex-1 py-3 rounded-lg bg-fins-gold text-fins-dark font-bold text-sm uppercase hover:bg-white transition-colors"
                                    >
                                        {status === 'loading' ? 'Checking...' : 'Check'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                )}

                {/* Success State */}
                {status === 'success' && (
                    <div className="w-full space-y-4 animate-fade-in">
                        <div className="text-green-400 bg-green-400/10 p-3 rounded-lg border border-green-400/20 w-full flex flex-col items-center justify-center gap-1">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="font-bold">Location Verified</span>
                            </div>
                            <span className="text-xs opacity-80">{distance}km from Sonwar</span>
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-full py-4 rounded-full bg-white text-fins-dark font-bold uppercase tracking-widest hover:bg-fins-gold hover:scale-105 transition-all duration-300 shadow-xl"
                        >
                            Proceed to Order
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default LocationPage;
