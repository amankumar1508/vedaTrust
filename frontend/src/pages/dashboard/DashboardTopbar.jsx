import React from 'react';
import { Bell, Settings, User, Search, QrCode } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function DashboardTopbar() {
    const location = useLocation();
    const { user } = useAuth();

    const tabs = [
        { name: 'Verify', path: '/dashboard/verify' },
        { name: 'Pharmacies', path: '/dashboard/locator' },
        { name: 'Prescriptions', path: '/dashboard/prescriptions' },
        { name: 'History', path: '/dashboard/history' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-10 z-10 w-full transition-all duration-500 sticky top-0">
            {/* Navigation Tabs - DESIGN MATCH */}
            <nav className="flex items-center h-full gap-8">
                {tabs.map((tab) => (
                    <Link
                        key={tab.path}
                        to={tab.path}
                        className={`relative h-full flex items-center px-1 text-sm font-bold tracking-tight transition-all ${isActive(tab.path)
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                            }`}
                    >
                        {tab.name}
                        {isActive(tab.path) && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-in fade-in slide-in-from-bottom-1 duration-300"></div>
                        )}
                    </Link>
                ))}
            </nav>

            <div className="flex items-center gap-6">
                {/* Scan Button - Matching Mockup */}
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100 dark:shadow-none hover:bg-blue-700 transition-all group">
                    <QrCode className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Scan QR</span>
                </button>

                <div className="flex items-center gap-2 ml-2">
                    <Link to="/dashboard/notifications" className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <Bell className="w-5 h-5 flex-shrink-0" />
                    </Link>
                    <Link to="/dashboard/settings" className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <Settings className="w-5 h-5 flex-shrink-0" />
                    </Link>
                    <Link to="/dashboard/profile" className="ml-2 w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-800 overflow-hidden cursor-pointer hover:border-blue-200 transition-all">
                        <img
                            src={user?.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Sarah'}`}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}
