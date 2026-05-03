import React from 'react';
import {
    ShieldCheck,
    Plus,
    LayoutDashboard,
    QrCode,
    FileText,
    MapPin,
    History,
    Bell,
    Settings,
    HelpCircle,
    LogOut
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Medicine Verification', icon: QrCode, path: '/dashboard/verify' },
    { name: 'My Prescriptions', icon: FileText, path: '/dashboard/prescriptions' },
    { name: 'Pharmacy Locator', icon: MapPin, path: '/dashboard/locator' },
    { name: 'Verification History', icon: History, path: '/dashboard/history' },
    { name: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
];

export default function DashboardSidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('vedatrust_currentUser');
        navigate('/');
    };

    return (
        <div className="w-80 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col py-10 z-20 transition-all duration-500">
            {/* Brand */}
            <div className="flex items-center gap-3 px-10 mb-12">
                <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100 dark:shadow-none">
                    <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">Vedatrust</span>
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Medicine Integrity</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 w-full px-6 overflow-y-auto scrollbar-hide">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

                        return (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all text-xs font-black uppercase tracking-widest
                                    ${isActive
                                            ? 'bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400'
                                            : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-600 dark:hover:text-slate-300'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-300 dark:text-slate-700'}`} />
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom Actions */}
            <div className="px-6 space-y-6 pt-6 mt-auto">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-100 dark:shadow-none group">
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="text-[10px] uppercase tracking-widest">New Verification</span>
                </button>

                <div className="space-y-1 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Link to="#" className="flex items-center gap-4 px-5 py-4 rounded-xl text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-600 dark:hover:text-slate-300 transition-all text-[10px] font-black uppercase tracking-widest">
                        <HelpCircle className="w-5 h-5 flex-shrink-0 text-slate-300 dark:text-slate-700" />
                        Help Center
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-red-500 transition-all text-[10px] font-black uppercase tracking-widest">
                        <LogOut className="w-5 h-5 flex-shrink-0 text-slate-300 dark:text-slate-700" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
