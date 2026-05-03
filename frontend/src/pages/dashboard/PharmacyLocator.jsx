import React, { useState, useEffect } from 'react';
import {
    Search,
    MapPin,
    Star,
    BadgeCheck,
    Navigation,
    ChevronRight,
    Map as MapIcon,
    Locate,
    Navigation2
} from 'lucide-react';

// Use more accurate coordinates for the mock pharmacies
const MOCK_PHARMACIES = [
    {
        _id: '1',
        name: 'Apex Health...',
        licenseId: '#PH-33302-NY',
        rating: '4.9',
        address: '1245 Broadway, NY',
        lat: 40.748817,
        lng: -73.985428,
        image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=600&auto=format&fit=crop',
        isVerified: true
    },
    {
        _id: '2',
        name: 'CarePlus...',
        licenseId: '#PH-44211-CA',
        rating: '4.7',
        address: '980 Market St, SF',
        lat: 37.7833,
        lng: -122.4167,
        image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=600&auto=format&fit=crop',
        isVerified: true
    },
    {
        _id: '3',
        name: 'Metro Medical Hub',
        licenseId: '#PH-77543-IL',
        rating: '4.8',
        address: '500 N Michigan Ave, Chicago',
        lat: 41.881832,
        lng: -87.623177,
        image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=600&auto=format&fit=crop',
        isVerified: true
    },
    {
        _id: '4',
        name: 'Neighborhood Rx',
        licenseId: 'Pending Verification',
        rating: '4.2',
        address: 'Harrod\'s, London',
        lat: 51.4994,
        lng: -0.1632,
        image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=600&auto=format&fit=crop',
        isVerified: false
    }
];

// Utility to calculate distance in km using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(1);
};

export default function PharmacyLocator() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterVerified, setFilterVerified] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [locating, setLocating] = useState(false);

    const handleGetLocation = () => {
        setLocating(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    setLocating(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setLocating(false);
                    alert("Could not get your location. Please check browser permissions.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            setLocating(false);
        }
    };

    const sortedPharmacies = [...MOCK_PHARMACIES].map(p => {
        if (userLocation) {
            return { ...p, distance: calculateDistance(userLocation.lat, userLocation.lng, p.lat, p.lng) };
        }
        return p;
    }).sort((a, b) => {
        if (userLocation) return parseFloat(a.distance) - parseFloat(b.distance);
        return 0;
    });

    const filteredPharmacies = sortedPharmacies.filter(p => {
        const matchesSearch = (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.address || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = !filterVerified || p.isVerified;
        return matchesSearch && matchesFilter;
    });

    const PharmacyCard = ({ pharmacy }) => (
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden group hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 flex flex-col h-full">
            <div className="relative h-48 overflow-hidden bg-gray-50 border-b border-gray-50">
                <img
                    src={pharmacy.image}
                    alt={pharmacy.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <div className={`${pharmacy.isVerified ? 'bg-[#10B981]' : 'bg-amber-500'} text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg`}>
                        <BadgeCheck className="w-3 h-3" /> {pharmacy.isVerified ? 'Validated' : 'Pending'}
                    </div>
                    {pharmacy.distance && (
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                            <Navigation2 className="w-3 h-3 fill-current" /> {pharmacy.distance} km
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight tracking-tight">{pharmacy.name}</h3>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${pharmacy.isVerified ? 'text-blue-600' : 'text-gray-400 italic'}`}>
                            {pharmacy.isVerified ? `Lic: ${pharmacy.licenseId}` : pharmacy.licenseId}
                        </p>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] font-black text-gray-900">{pharmacy.rating}</span>
                    </div>
                </div>

                <div className="flex items-start gap-2 text-gray-400">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium leading-relaxed">{pharmacy.address}</p>
                </div>

                <div className="pt-4 mt-auto">
                    <button className="w-full py-3 bg-white border border-gray-100 rounded-xl text-gray-900 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm group/btn">
                        <Navigation className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /> Directions
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Pharmacy Locator</h1>
                <p className="text-gray-500 max-w-2xl leading-relaxed font-medium">
                    Find verified and trusted pharmacies in our network to securely fill your authenticated prescriptions.
                </p>
            </div>

            <div className="bg-white p-2 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1 relative w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                    <input
                        type="text"
                        placeholder="Search pharmacies by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-16 pr-8 py-5 rounded-2xl bg-gray-50/50 border-none focus:ring-0 outline-none text-sm font-bold text-gray-900 transition-all placeholder:text-gray-300"
                    />
                </div>

                <div className="flex items-center gap-4 px-4 w-full md:w-auto">
                    <button
                        onClick={handleGetLocation}
                        disabled={locating}
                        className={`flex items-center gap-3 px-6 py-5 rounded-2xl border transition-all ${userLocation ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-gray-50/50 border-transparent hover:border-gray-100 text-gray-500'}`}
                    >
                        <Locate className={`w-5 h-5 ${locating ? 'animate-spin' : ''}`} />
                        <span className="text-sm font-bold whitespace-nowrap">
                            {userLocation ? 'Location Active' : locating ? 'Searching...' : 'Near Me'}
                        </span>
                        {!userLocation && <ChevronRight className="w-4 h-4 text-gray-300" />}
                    </button>

                    <div className="h-10 w-px bg-gray-100 mx-2 hidden md:block"></div>

                    <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Verified Only</span>
                        <button
                            onClick={() => setFilterVerified(!filterVerified)}
                            className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${filterVerified ? 'bg-blue-600' : 'bg-gray-200'}`}
                        >
                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${filterVerified ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPharmacies.length === 0 ? (
                    <div className="col-span-full py-20 text-center space-y-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                            <Locate className="w-10 h-10 text-gray-300" />
                        </div>
                        <p className="text-sm font-black text-gray-400 uppercase tracking-widest">No nodes found in vicinity</p>
                    </div>
                ) : (
                    filteredPharmacies.map(pharmacy => (
                        <PharmacyCard key={pharmacy._id} pharmacy={pharmacy} />
                    ))
                )}
            </div>
        </div>
    );
}
