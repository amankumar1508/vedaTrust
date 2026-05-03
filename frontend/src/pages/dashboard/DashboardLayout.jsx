import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardTopbar from './DashboardTopbar';

export default function DashboardLayout() {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
            <DashboardSidebar />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <DashboardTopbar />

                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="min-h-full flex flex-col">
                        <div className="flex-1">
                            <Outlet />
                        </div>

                        <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 pb-12">
                            <div className="text-slate-400 dark:text-slate-500 text-xs font-medium">
                                © 2024 Vedatrust Healthcare. All rights reserved.
                            </div>
                            <div className="flex gap-6">
                                {['Terms of Service', 'Privacy Policy', 'Contact Support', 'Security Protocol'].map(link => (
                                    <a key={link} href="#" className="text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-medium transition-colors">
                                        {link}
                                    </a>
                                ))}
                            </div>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
}
