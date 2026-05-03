import React from 'react';
import { 
    Bell, 
    AlertTriangle, 
    Calendar, 
    CheckCircle2, 
    Info,
    Check
} from 'lucide-react';

export default function Notifications() {
    const notifications = [
        {
            id: 1,
            type: 'alert',
            title: 'Counterfeit Medicine Detected',
            message: 'CRITICAL ALERT: Batch #A892B of Paracetamol failed cryptographic verification at Pharmacy Central. Do not consume. Please contact support immediately.',
            time: 'Just now',
            isUnread: true,
            icon: <AlertTriangle className="w-5 h-5 text-rose-500" />,
            bgColor: 'bg-rose-50 dark:bg-rose-950/30'
        },
        {
            id: 2,
            type: 'warning',
            title: 'Prescription Expiring Soon',
            message: 'Your verified prescription for Amoxicillin 500mg expires in 3 days. Please renew your prescription to ensure uninterrupted treatment.',
            time: '2 hours ago',
            isUnread: true,
            icon: <Calendar className="w-5 h-5 text-amber-500" />,
            bgColor: 'bg-amber-50 dark:bg-amber-950/30'
        },
        {
            id: 3,
            type: 'success',
            title: 'Verification Successful',
            message: 'Batch #B104C of Lisinopril 10mg has been successfully verified as authentic on the blockchain network.',
            time: 'Yesterday, 4:30 PM',
            isUnread: false,
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
            bgColor: 'bg-emerald-50 dark:bg-emerald-950/30'
        },
        {
            id: 4,
            type: 'info',
            title: 'System Maintenance Scheduled',
            message: 'Vedatrust platform will undergo scheduled maintenance on Sunday, Oct 29 at 02:00 AM EST. Verification services may be briefly interrupted.',
            time: 'Oct 24, 2023',
            isUnread: false,
            icon: <Info className="w-5 h-5 text-blue-500" />,
            bgColor: 'bg-blue-50 dark:bg-blue-950/30'
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10 transition-colors duration-300">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Notifications</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium italic">Stay updated on your verifications, alerts, and system status.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-xs font-black uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                    <Check className="w-3.5 h-3.5" /> Mark all as read
                </button>
            </div>

            <div className="space-y-4">
                {notifications.map((notif) => (
                    <div 
                        key={notif.id}
                        className={`group relative flex gap-6 p-6 rounded-[2rem] border transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer ${notif.isUnread ? 'bg-white dark:bg-slate-900 border-blue-100 dark:border-blue-900 shadow-md shadow-blue-50/50' : 'bg-gray-50/30 dark:bg-slate-900/40 border-gray-100 dark:border-slate-800'}`}
                    >
                        {notif.isUnread && (
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                        
                        <div className={`w-14 h-14 rounded-2xl ${notif.bgColor} flex items-center justify-center shrink-0 shadow-inner`}>
                            {notif.icon}
                        </div>

                        <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-start">
                                <h3 className="font-black text-gray-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{notif.title}</h3>
                                <span className="text-[10px] font-black text-rose-500 dark:text-rose-400 uppercase tracking-widest">{notif.time}</span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                {notif.message}
                            </p>
                            <div className="pt-2 flex gap-3">
                                {notif.type === 'alert' && (
                                    <button className="px-4 py-2 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-colors">View Details</button>
                                )}
                                {notif.type === 'warning' && (
                                    <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">Renew Prescription</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center pt-6">
                <button className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] hover:tracking-[0.3em] transition-all flex items-center gap-2 mx-auto">
                    Load Older Notifications <Bell className="w-3 h-3 rotate-12" />
                </button>
            </div>
        </div>
    );
}
