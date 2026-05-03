import React, { useState, useEffect } from 'react';
import {
    Search,
    Download,
    Filter,
    Package,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Calendar,
    ChevronRight,
    SearchX,
    FileText,
    History as HistoryIcon
} from 'lucide-react';
import api from '../../services/api';

export default function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get('/verify/history');
                if (response.data.success) {
                    setHistory(response.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch history:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const filteredHistory = history.filter(h =>
        h.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.batchId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusPill = (status) => {
        switch (status) {
            case 'Authentic':
                return (
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100/50">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Verified Authentic</span>
                    </div>
                );
            case 'Counterfeit':
                return (
                    <div className="flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-600 rounded-full border border-rose-100/50">
                        <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Counterfeit Risk</span>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full border border-amber-100/50">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full uppercase tracking-widest">Nearing Expiration</div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Warning</span>
                    </div>
                );
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-gray-100">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100">
                            <HistoryIcon className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Verification History</h1>
                    </div>
                    <p className="text-gray-500 font-medium max-w-2xl leading-relaxed">
                        Review and track the authenticity status of all previously scanned medications. Consult your provider immediately if any risk alerts are detected.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by medicine or batch..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full lg:w-80 pl-11 pr-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-sm font-bold"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="p-3.5 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all hover:shadow-md text-gray-500">
                            <Download className="w-5 h-5" />
                        </button>
                        <button className="p-3.5 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all hover:shadow-md text-gray-500">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Stats / Tabs */}
            <div className="flex items-center gap-8 overflow-x-auto pb-2 scrollbar-hide">
                {[
                    { label: "All Scans", count: filteredHistory.length, active: true },
                    { label: "Verified", count: filteredHistory.filter(h => h.status === 'Authentic').length, active: false },
                    { label: "Alerts", count: filteredHistory.filter(h => h.status === 'Counterfeit').length, active: false, color: "text-rose-500" }
                ].map((tab, i) => (
                    <button key={i} className={`flex items-center gap-2 pb-4 border-b-2 transition-all whitespace-nowrap ${tab.active ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
                        <span className={`text-sm font-black uppercase tracking-[0.1em] ${tab.color || ''}`}>{tab.label}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${tab.active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-28 bg-gray-50/50 rounded-3xl animate-pulse border border-gray-100"></div>
                    ))}
                </div>
            ) : filteredHistory.length === 0 ? (
                <div className="bg-white p-24 text-center rounded-[2.5rem] border-2 border-dashed border-gray-100 flex flex-col items-center space-y-6">
                    <div className="p-6 bg-gray-50 rounded-full">
                        <SearchX className="w-12 h-12 text-gray-200" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-gray-900 font-black text-xl">No scans found</h3>
                        <p className="text-gray-400 font-medium max-w-sm mx-auto text-sm">We couldn't find any verification records matching your search criteria.</p>
                    </div>
                    <button onClick={() => setSearchTerm('')} className="text-sm font-black text-blue-600 uppercase tracking-widest hover:underline">Clear Filters</button>
                </div>
            ) : (
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-blue-50/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Medicine Name & Batch</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Verification Date</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredHistory.map((row) => (
                                    <tr key={row._id} className="hover:bg-blue-50/30 transition-all group cursor-pointer">
                                        <td className="px-8 py-7">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                                    <Package className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="font-black text-gray-900 leading-tight group-hover:text-blue-700 transition-colors">{row.medicineName}</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Batch:</span>
                                                        <span className="text-xs font-mono font-bold text-gray-600">{row.batchId}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-7">
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                                    <Calendar className="w-3 h-3 text-gray-400" />
                                                    {new Date(row.scanDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-5">{new Date(row.scanDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} EST</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-7">
                                            {getStatusPill(row.status)}
                                        </td>
                                        <td className="px-8 py-7 text-right">
                                            <button className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:gap-3 transition-all">
                                                View Details <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Placeholder */}
                    <div className="px-8 py-6 border-t border-gray-50 flex items-center justify-between">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing 1 to {filteredHistory.length} of {filteredHistory.length} entries</p>
                        <div className="flex gap-2">
                            <button disabled className="px-4 py-2 rounded-xl border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-300 disabled:opacity-50">Prev</button>
                            <button disabled className="px-4 py-2 rounded-xl bg-blue-600 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-100">Next</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Warning Footer */}
            <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-amber-700 leading-relaxed">
                    <span className="font-bold">Important:</span> This history log is a secondary reference. Always check the physical integrity of packaging and consult a healthcare professional if you suspect a medication has been tampered with or contains counterfeits.
                </p>
            </div>
        </div>
    );
}
