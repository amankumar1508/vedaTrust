import React from 'react';
import { 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    ShieldCheck, 
    Smartphone, 
    Monitor,
    Edit3,
    Shield,
    Fingerprint,
    ChevronRight,
    CheckCircle2,
    AlertCircle,
    X
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Profile() {
    const { user } = useAuth();

    const linkedDevices = [
        { id: 1, name: 'MacBook Pro 14"', location: 'San Francisco, CA', status: 'CURRENT', icon: <Monitor className="w-5 h-5" /> },
        { id: 2, name: 'iPhone 13 Pro', location: 'San Francisco, CA', status: 'active 2h ago', icon: <Smartphone className="w-5 h-5" /> }
    ];

    const recentVerifications = [
        { id: 1, name: 'Amoxicillin 500mg', batch: 'BX-77291', date: 'Oct 24, 2023', status: 'Authentic' },
        { id: 2, name: 'Lisinopril 20mg', batch: 'LS-9920A', date: 'Oct 22, 2023', status: 'Authentic' },
        { id: 3, name: 'Atorvastatin 40mg', batch: 'AT-1002X', date: 'Oct 18, 2023', status: 'Flagged' }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-10 pb-20 transition-colors duration-300">
            <div className="space-y-2">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Profile Settings</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Manage your personal information, security preferences, and view verification history.</p>
            </div>

            {/* Profile Header Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-blue-50/50 dark:shadow-none p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-48 h-48 bg-blue-50 dark:bg-blue-900/10 rounded-full opacity-40 blur-3xl"></div>
                
                <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-slate-800 border-4 border-white dark:border-slate-700 shadow-lg overflow-hidden">
                        <img 
                            src={user?.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Sarah'}`} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 text-white rounded-full shadow-lg border-2 border-white dark:border-slate-700 hover:bg-blue-700 transition-all">
                        <Edit3 className="w-3.5 h-3.5" />
                    </button>
                </div>

                <div className="flex-1 text-center md:text-left space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{user?.name || 'Dr. Sarah Jenkins'}</h2>
                        <span className="w-fit px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 mx-auto md:mx-0">
                            <ShieldCheck className="w-3 h-3" /> Verified Healthcare Provider
                        </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">{user?.email || 'sarah.jenkins@example.com'}</p>
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-8 rounded-2xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-100 dark:shadow-none">
                    Edit Profile
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Personal Information */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm p-10 space-y-10">
                    <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-600" /> Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Full Name</p>
                            <p className="font-bold text-gray-800 dark:text-gray-200">{user?.name || 'Dr. Sarah Jenkins'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Contact Number</p>
                            <p className="font-bold text-gray-800 dark:text-gray-200">+1 (555) 123-4567</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Professional ID</p>
                            <p className="font-bold text-gray-800 dark:text-gray-200">MED-8892-CA</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Institution</p>
                            <p className="font-bold text-gray-800 dark:text-gray-200">Pacific Medical Center</p>
                        </div>
                        <div className="md:col-span-2 space-y-1">
                            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Registered Address</p>
                            <p className="font-bold text-gray-800 dark:text-gray-200 leading-relaxed italic">1240 Bay Street, Suite 400<br/>San Francisco, CA 94123</p>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm p-10 space-y-10">
                    <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" /> Security
                    </h3>

                    <div className="space-y-8">
                        <div className="flex items-center justify-between group cursor-pointer">
                            <div className="space-y-1">
                                <p className="text-sm font-black text-gray-900 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Password</p>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500">Updated 3 months ago</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all" />
                        </div>

                        <div className="flex items-center justify-between group cursor-pointer">
                            <div className="space-y-1">
                                <p className="text-sm font-black text-gray-900 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Two-Factor Auth</p>
                                <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Enabled
                                </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all" />
                        </div>

                        <div className="flex items-center justify-between group cursor-pointer opacity-50">
                            <div className="space-y-1">
                                <p className="text-sm font-black text-gray-900 dark:text-gray-200">Biometric Login</p>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500">Face ID disabled</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                        </div>
                    </div>
                </div>

                {/* Linked Devices */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm p-10 space-y-10">
                    <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-blue-600" /> Linked Devices
                    </h3>

                    <div className="space-y-4">
                        {linkedDevices.map((device) => (
                            <div key={device.id} className="p-4 bg-gray-50/50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 flex items-center gap-4 relative group hover:bg-white dark:hover:bg-slate-800 transition-all hover:shadow-md">
                                <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {device.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs font-black text-gray-800 dark:text-gray-200">{device.name}</p>
                                        {device.status === 'CURRENT' && (
                                            <span className="text-[8px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded uppercase tracking-widest">CURRENT</span>
                                        )}
                                    </div>
                                    <p className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-0.5">{device.location} • {device.status}</p>
                                </div>
                                {device.status !== 'CURRENT' && (
                                    <button className="text-gray-300 dark:text-gray-600 hover:text-rose-500 transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Verifications */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm p-10 space-y-10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                            <Fingerprint className="w-5 h-5 text-blue-600" /> Recent Verifications
                        </h3>
                        <button className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                            View All <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-50 dark:border-slate-800">
                                    <th className="text-left py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Medication</th>
                                    <th className="text-left py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Batch No.</th>
                                    <th className="text-left py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Date Scanned</th>
                                    <th className="text-right py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                                {recentVerifications.map((v) => (
                                    <tr key={v.id} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gray-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500">
                                                    <AlertCircle className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{v.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 font-mono text-xs text-gray-500 dark:text-gray-400">{v.batch}</td>
                                        <td className="py-5 text-xs font-bold text-gray-400 dark:text-gray-500">{v.date}</td>
                                        <td className="py-5 text-right">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${v.status === 'Authentic' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'}`}>
                                                {v.status === 'Authentic' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                                {v.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
