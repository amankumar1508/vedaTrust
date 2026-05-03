import React, { useState, useEffect } from 'react';
import {
    User,
    Shield,
    Bell,
    Palette,
    Lock,
    LogOut,
    Check,
    Sun,
    Moon,
    Monitor,
    Save,
    ChevronRight,
    Camera
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Settings() {
    const { user, updateUser, logout } = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem('vt_theme') || 'light');
    const [notifications, setNotifications] = useState({
        verification: true,
        expiry: true,
        updates: false
    });

    const [profileData, setProfileData] = useState({
        name: user?.name || user?.fullName || '',
        email: user?.email || '',
        id: 'NP-84728104',
        profileImage: user?.profileImage || null
    });

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || user.fullName || '',
                email: user.email || '',
                id: 'NP-84728104',
                profileImage: user.profileImage || null
            });
        }
    }, [user]);

    const handleSaveProfile = () => {
        updateUser({ 
            name: profileData.name, 
            email: profileData.email,
            profileImage: profileData.profileImage 
        });
        alert('Profile updated successfully!');
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData(prev => ({ ...prev, profileImage: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('vt_theme', newTheme);
        
        const root = document.documentElement;
        if (newTheme === 'dark') {
            root.classList.add('dark');
        } else if (newTheme === 'light') {
            root.classList.remove('dark');
        } else {
            // System preference
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (isDark) root.classList.add('dark');
            else root.classList.remove('dark');
        }
    };

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-10 transition-colors duration-300">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Settings</h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">Manage your account preferences, security configurations, and notifications.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left & Middle Column (Main Settings) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Account Preferences */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-600" />
                            <h2 className="font-bold text-gray-800 dark:text-white">Account Preferences</h2>
                        </div>
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-slate-800 border-4 border-white dark:border-slate-700 shadow-md overflow-hidden">
                                        <img
                                            src={profileData.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.name || 'User'}`}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <input 
                                        type="file" 
                                        id="profile-upload" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                    <label 
                                        htmlFor="profile-upload"
                                        className="absolute bottom-0 right-0 p-1.5 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors border-2 border-white dark:border-slate-700 cursor-pointer"
                                    >
                                        <Camera className="w-3.5 h-3.5" />
                                    </label>
                                </div>

                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Full Name</label>
                                        <input
                                            type="text"
                                            value={profileData.name}
                                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 outline-none transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Professional ID / NPI</label>
                                        <input
                                            type="text"
                                            value={profileData.id}
                                            readOnly
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 outline-none text-sm"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-1.5">
                                        <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Email Address</label>
                                        <input
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 outline-none transition-all text-sm"
                                        />
                                    </div>
                                    <div className="md:col-span-2 flex justify-end pt-2">
                                        <button
                                            onClick={handleSaveProfile}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg text-sm flex items-center gap-2 transition-all shadow-md"
                                        >
                                            <Save className="w-4 h-4" />
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security & Privacy */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-blue-600" />
                            <h2 className="font-bold text-gray-800 dark:text-white">Security & Privacy</h2>
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-slate-800">
                            <div className="p-6 flex items-center justify-between">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Two-Factor Authentication (2FA)</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Add an extra layer of security to your account.</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded text-[10px] font-bold">Enabled</span>
                                    <button className="text-xs font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">Configure</button>
                                </div>
                            </div>

                            <div className="p-6 flex items-center justify-between">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Password</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Last changed 45 days ago.</p>
                                </div>
                                <button className="text-xs font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
                                    <Lock className="w-3.5 h-3.5" />
                                    Update Password
                                </button>
                            </div>

                            <div className="p-6 bg-rose-50/30 dark:bg-rose-900/10 flex items-center justify-between">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-rose-700 dark:text-rose-400">Danger Zone</h4>
                                    <p className="text-xs text-rose-600/70 dark:text-rose-500/50">End your current session securely.</p>
                                </div>
                                <button className="text-xs font-bold text-rose-700 border border-rose-200 dark:border-rose-900/50 px-4 py-2 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/20 transition-colors flex items-center gap-2 bg-white dark:bg-slate-900">
                                    <LogOut className="w-3.5 h-3.5" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (Preference Panels) */}
                <div className="space-y-8">

                    {/* Appearance */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex items-center gap-2">
                            <Palette className="w-4 h-4 text-blue-600" />
                            <h2 className="font-bold text-gray-800 dark:text-white">Appearance</h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Customize your interface theme.</p>
                            <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-xl">
                                <button
                                    onClick={() => handleThemeChange('light')}
                                    className={`flex flex-col items-center gap-2 py-3 rounded-lg transition-all ${theme === 'light' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
                                >
                                    <Sun className="w-4 h-4" />
                                    <span className="text-[10px] font-bold">Light</span>
                                </button>
                                <button
                                    onClick={() => handleThemeChange('dark')}
                                    className={`flex flex-col items-center gap-2 py-3 rounded-lg transition-all ${theme === 'dark' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
                                >
                                    <Moon className="w-4 h-4" />
                                    <span className="text-[10px] font-bold">Dark</span>
                                </button>
                                <button
                                    onClick={() => handleThemeChange('system')}
                                    className={`flex flex-col items-center gap-2 py-3 rounded-lg transition-all ${theme === 'system' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
                                >
                                    <Monitor className="w-4 h-4" />
                                    <span className="text-[10px] font-bold">System</span>
                                </button>
                            </div>

                            <div className="pt-4 h-32 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-100 dark:border-slate-800 flex items-center justify-center relative overflow-hidden">
                                <div className="w-24 h-12 bg-white dark:bg-slate-700 rounded shadow-md border border-gray-100 dark:border-slate-600 flex items-center px-2 gap-2">
                                    <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/50"></div>
                                    <div className="flex-1 space-y-1">
                                        <div className="w-full h-1.5 bg-gray-100 dark:bg-slate-600 rounded"></div>
                                        <div className="w-1/2 h-1 bg-gray-50 dark:bg-slate-500 rounded"></div>
                                    </div>
                                </div>
                                <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-50">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notification Settings */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex items-center gap-2">
                            <Bell className="w-4 h-4 text-blue-600" />
                            <h2 className="font-bold text-gray-800 dark:text-white">Notification Settings</h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">Verification Alerts</h4>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed italic">Receive immediate updates when a scan returns a counterfeit flag.</p>
                                </div>
                                <button
                                    onClick={() => toggleNotification('verification')}
                                    className={`w-10 h-5 rounded-full transition-colors relative flex items-center px-1 shrink-0 ${notifications.verification ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-700'}`}
                                >
                                    <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform ${notifications.verification ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                </button>
                            </div>

                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">Batch Expiry Warnings</h4>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed italic">Weekly digest of medicines approaching expiration in your inventory.</p>
                                </div>
                                <button
                                    onClick={() => toggleNotification('expiry')}
                                    className={`w-10 h-5 rounded-full transition-colors relative flex items-center px-1 shrink-0 ${notifications.expiry ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-700'}`}
                                >
                                    <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform ${notifications.expiry ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                </button>
                            </div>

                            <div className="flex items-start justify-between gap-4 border-t border-gray-50 dark:border-slate-800 pt-4 opacity-70">
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">System Updates</h4>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed italic">News about Vedatrust protocol upgrades and maintenance.</p>
                                </div>
                                <button
                                    onClick={() => toggleNotification('updates')}
                                    className={`w-10 h-5 rounded-full transition-colors relative flex items-center px-1 shrink-0 ${notifications.updates ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-700'}`}
                                >
                                    <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform ${notifications.updates ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
