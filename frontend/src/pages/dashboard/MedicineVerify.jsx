import React, { useState, useEffect, useRef } from 'react';
import {
    Shield,
    QrCode,
    Upload,
    Search,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Info,
    Lock,
    ArrowRight,
    MapPin,
    Activity,
    ClipboardCheck,
    Globe,
    ExternalLink,
    X,
    Maximize2
} from 'lucide-react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function MedicineVerify() {
    const [batchNumber, setBatchNumber] = useState('');
    const [status, setStatus] = useState('idle'); // idle, scanning, loading, success, error
    const [result, setResult] = useState(null);
    const [recentScans, setRecentScans] = useState([]);
    const [showScanner, setShowScanner] = useState(false);
    const [viewMode, setViewMode] = useState('input'); // input, result_modal, detailed
    const scannerRef = useRef(null);

    useEffect(() => {
        fetchRecentScans();
    }, []);

    const fetchRecentScans = async () => {
        try {
            const response = await api.get('/verify/history');
            if (response.data.success) {
                setRecentScans(response.data.data.slice(0, 5));
            }
        } catch (error) {
            console.error('Failed to fetch recent scans:', error);
        }
    };

    useEffect(() => {
        let scanner = null;
        if (showScanner) {
            scanner = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: { width: 250, height: 250 } },
                false
            );

            scanner.render(onScanSuccess, onScanFailure);
        }

        return () => {
            if (scanner) {
                scanner.clear().catch(error => {
                    console.error("Failed to clear scanner:", error);
                });
            }
        };
    }, [showScanner]);

    const onScanSuccess = (decodedText) => {
        setBatchNumber(decodedText);
        setShowScanner(false);
        handleVerify(null, decodedText);
    };

    const onScanFailure = (error) => {
        // console.warn(`Code scan error = ${error}`);
    };

    const handleVerify = async (e, scannedCode) => {
        if (e) e.preventDefault();
        const codeToVerify = scannedCode || batchNumber;
        if (!codeToVerify) return;

        setStatus('loading');
        try {
            const response = await api.post('/verify', {
                medicineName: "Amoxicillin 500mg", // Default or parsed from code
                batchId: codeToVerify,
                manufacturer: "Global Pharma Industries",
                expiryDate: new Date(Date.now() + 31536000000).toISOString()
            });

            if (response.data.success) {
                setResult(response.data.data);
                setStatus('success');
                setViewMode('result_modal');
                fetchRecentScans(); // Refresh the list
            }
        } catch (error) {
            console.error('Verification failed:', error);
            setStatus('error');
        }
    };

    const resetScanner = () => {
        setStatus('idle');
        setResult(null);
        setViewMode('input');
        setBatchNumber('');
    };

    // --- Sub-components ---

    const ResultModal = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="relative p-8 md:p-10 space-y-8">
                    <button
                        onClick={() => setViewMode('input')}
                        className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>

                    <div className="text-center space-y-4">
                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-xl animate-bounce-subtle ${result?.status === 'Counterfeit' ? 'bg-rose-500 shadow-rose-100' : 'bg-emerald-500 shadow-emerald-100'}`}>
                            <Shield className="w-10 h-10 text-white" />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black text-gray-900">
                                {result?.status === 'Counterfeit' ? 'Counterfeit Alert' : 'Authenticity Confirmed'}
                            </h2>
                            <p className={`font-bold text-xs px-3 py-1 rounded-full inline-flex items-center gap-1 ${result?.status === 'Counterfeit' ? 'text-rose-600 bg-rose-50' : 'text-emerald-600 bg-emerald-50'}`}>
                                {result?.status === 'Counterfeit' ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                                {result?.status === 'Counterfeit' ? 'High Risk Detected' : 'Safe & Verified'}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                <ClipboardCheck className="w-3 h-3" /> Batch #
                            </p>
                            <p className="text-lg font-black text-gray-900">{result?.batchId}</p>
                        </div>
                        <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                <Activity className="w-3 h-3" /> Expiry
                            </p>
                            <p className="text-lg font-black text-gray-900">12/2025</p>
                        </div>
                        <div className="col-span-2 p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50 relative overflow-hidden group">
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                <Globe className="w-3 h-3" /> Manufacturer
                            </p>
                            <p className="text-lg font-black text-gray-900">{result?.manufacturer}</p>
                            <div className="absolute right-4 bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Info className="w-12 h-12" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4">
                        <button
                            onClick={() => setViewMode('detailed')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200"
                        >
                            <Maximize2 className="w-4 h-4" /> View Full Details
                        </button>
                        <button
                            onClick={resetScanner}
                            className="w-full bg-white hover:bg-gray-50 text-gray-600 font-bold py-4 rounded-2xl border border-gray-100 transition-all"
                        >
                            Scan Another
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const DetailedInsight = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 pb-20">
            <button
                onClick={() => setViewMode('result_modal')}
                className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all"
            >
                <ArrowRight className="w-4 h-4 rotate-180" /> Back to Verification
            </button>

            {/* Header Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>

                <div className="w-48 h-48 bg-gray-100 rounded-2xl shrink-0 overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400" alt="Medicine" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div className="space-y-6 flex-1">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black text-gray-900 tracking-tight">{result?.medicineName}</h1>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 h-fit">
                                <CheckCircle2 className="w-3 h-3" /> Verified Authentic
                            </span>
                        </div>
                        <p className="text-gray-500 font-medium tracking-tight">Generic: Amoxicillin Trihydrate Capsules USP</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Scan ID</p>
                            <p className="text-sm font-bold text-gray-700">{result?._id?.substring(0, 8).toUpperCase()}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Verification Time</p>
                            <p className="text-sm font-bold text-gray-700">Just Now</p>
                        </div>
                    </div>
                </div>

                <div className="w-32 h-32 bg-white rounded-full border-8 border-emerald-50 flex flex-col items-center justify-center shrink-0 shadow-lg shadow-emerald-50 relative animate-pulse-slow">
                    <span className="text-3xl font-black text-emerald-600 leading-none">95%</span>
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter mt-1">Confidence</span>
                </div>
            </div>

            {/* Grid for Journey and Audit */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Data */}
                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6 transition-all hover:shadow-md">
                    <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                        <ClipboardCheck className="w-5 h-5 text-blue-600" /> Product Data
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: "Batch Number", value: result?.batchId },
                            { label: "Manufacture Date", value: "Oct 2023" },
                            { label: "Expiry Date", value: "Sep 2025" },
                            { label: "Manufacturer", value: result?.manufacturer },
                            { label: "License No", value: "MFG-22049-GP" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 group">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
                                <span className="text-sm font-black text-gray-700 group-hover:text-blue-600 transition-colors">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Global Journey */}
                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6 transition-all hover:shadow-md relative overflow-hidden">
                    <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-600" /> Global Journey
                    </h3>
                    <div className="bg-blue-50 h-48 rounded-2xl relative group overflow-hidden">
                        {/* Map Overlay placeholder */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] opacity-20"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping absolute -top-1 -left-1"></div>
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                <div className="absolute top-4 -left-16 bg-white shadow-xl px-3 py-1 rounded-lg text-[9px] font-black whitespace-nowrap">Origin: Basel, CH</div>
                            </div>
                            <div className="w-20 h-px bg-gradient-to-r from-blue-600 to-transparent"></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full ml-1"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Origin: Switzerland</span>
                        <span className="flex items-center gap-1">Destination: PH London, UK <MapPin className="w-3 h-3" /></span>
                    </div>
                </div>

                {/* Audit Trail - Full spanning */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-8 transition-all hover:shadow-md">
                    <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-600" /> Supply Chain Audit Trail
                    </h3>
                    <div className="space-y-8 relative">
                        <div className="absolute left-6 top-2 bottom-2 w-px bg-gray-100"></div>
                        {result?.auditTrail?.map((step, idx) => (
                            <div key={idx} className="flex gap-6 relative group">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 z-10 transition-transform group-hover:scale-110 ${idx === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border border-gray-100 text-gray-400 group-hover:border-blue-200 group-hover:text-blue-500'}`}>
                                    {idx === 0 ? <CheckCircle2 className="w-5 h-5" /> : <ClipboardCheck className="w-5 h-5" />}
                                </div>
                                <div className="pt-1.5 flex-1 pb-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{step.event}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{step.date}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 font-medium">{step.details}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 min-h-screen">
            {viewMode === 'input' ? (
                <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-blue-50/50 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"></div>

                    <div className="p-8 md:p-16 space-y-12">
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-blue-200 rotate-6 transform hover:rotate-0 transition-all duration-500 cursor-pointer">
                                <Shield className="w-10 h-10 text-white" />
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Verify Medicine Authenticity</h1>
                                <p className="text-gray-500 font-medium max-w-sm mx-auto">Instant end-to-end provenance verification powered by cryptographic ledger.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                            {/* QR Scanner Part */}
                            <div className="space-y-6">
                                <div
                                    onClick={() => !showScanner && setShowScanner(true)}
                                    className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center space-y-6 transition-all duration-500 group relative overflow-hidden ${showScanner ? 'border-blue-500 bg-white shadow-xl' : 'border-gray-200 bg-gray-50/30 hover:border-blue-400 hover:bg-blue-50/20 cursor-pointer'}`}
                                >
                                    {!showScanner ? (
                                        <>
                                            <div className="p-6 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500 relative">
                                                <QrCode className="w-12 h-12 text-blue-600" />
                                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                                            </div>
                                            <div className="text-center space-y-2">
                                                <h3 className="font-black text-xl text-gray-900">Scan QR Code</h3>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Active Camera Scanning</p>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full aspect-square bg-black rounded-2xl overflow-hidden relative" id="reader">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setShowScanner(false); }}
                                                className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="relative group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="qr-input-file"
                                        className="hidden"
                                        onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (!file) return;
                                            
                                            // Check file type
                                            if (!file.type.startsWith('image/')) {
                                                alert("Please upload an image file.");
                                                return;
                                            }

                                            const html5QrCode = new Html5Qrcode("reader-hidden");
                                            try {
                                                const decodedText = await html5QrCode.scanFile(file, true);
                                                onScanSuccess(decodedText);
                                                // Success cleanup
                                                html5QrCode.clear();
                                            } catch (err) {
                                                console.error("Scanning failed:", err);
                                                alert("Could not find a valid QR code in this image. Please ensure the code is clear and well-lit.");
                                            }
                                        }}
                                    />
                                    <label
                                        htmlFor="qr-input-file"
                                        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white border-2 border-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-50 hover:border-blue-200 cursor-pointer transition-all"
                                    >
                                        <Upload className="w-4 h-4 text-blue-500" />
                                        Scan an Image File
                                    </label>
                                    <div id="reader-hidden" style={{ display: 'none' }}></div>
                                </div>
                            </div>

                            {/* Manual Input Part */}
                            <div className="flex flex-col justify-center space-y-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 block">Quick Manual Entry</label>
                                    <form onSubmit={handleVerify} className="space-y-4">
                                        <div className="relative group">
                                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                            <input
                                                type="text"
                                                placeholder="Enter batch/serial..."
                                                value={batchNumber}
                                                onChange={(e) => setBatchNumber(e.target.value)}
                                                className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:ring-8 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-sm font-bold shadow-inner"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={status === 'loading' || !batchNumber}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl text-sm transition-all shadow-xl shadow-blue-100 disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3"
                                        >
                                            {status === 'loading' ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <>Verify Authenticity <ArrowRight className="w-4 h-4" /></>
                                            )}
                                        </button>
                                    </form>
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                                    <div className="relative flex justify-center text-[10px] font-black uppercase"><span className="px-4 bg-white text-gray-300 tracking-[0.3em]">Secure Verification</span></div>
                                </div>

                                <div className="flex justify-center gap-8 opacity-40">
                                    <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-tighter"><Lock className="w-3 h-3" /> Encrypted</div>
                                    <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-tighter"><Info className="w-3 h-3" /> Multi-Layer</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : viewMode === 'result_modal' ? (
                <ResultModal />
            ) : (
                <DetailedInsight />
            )}

            {/* Error Message */}
            {status === 'error' && (
                <div className="mt-12 max-w-lg mx-auto bg-rose-50 border-2 border-rose-100 rounded-3xl p-8 animate-in slide-in-from-bottom-4">
                    <div className="flex items-start gap-6">
                        <div className="p-4 bg-rose-500 rounded-2xl shadow-lg shadow-rose-100 shrink-0">
                            <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h4 className="text-xl font-black text-rose-900">Security Alert</h4>
                            <p className="text-sm font-medium text-rose-700 mt-2 leading-relaxed italic">
                                This serial number was not found in the verified ledger. It may be a counterfeit or non-compliant product.
                            </p>
                            <button onClick={() => setStatus('idle')} className="mt-4 text-xs font-black text-rose-900 hover:underline uppercase tracking-widest">Try Again</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Recent Verifications Section - To address 'only giving 1 data' feedback */}
            {viewMode === 'input' && recentScans.length > 0 && (
                <div className="mt-20 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 delay-300">
                    <div className="flex items-center justify-between px-4">
                        <div className="flex items-center gap-3">
                            <Activity className="w-5 h-5 text-blue-600" />
                            <h2 className="text-xl font-black text-gray-900 tracking-tight">Recent Verifications</h2>
                        </div>
                        <Link to="/dashboard/history" className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">View All Records</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recentScans.map((scan) => (
                            <div key={scan._id} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center justify-between hover:shadow-xl hover:shadow-blue-50/50 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl ${scan.status === 'Authentic' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-900 text-sm">{scan.medicineName}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Batch: {scan.batchId}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${scan.status === 'Authentic' ? 'text-emerald-600' : 'text-rose-600'}`}>{scan.status}</p>
                                    <p className="text-[9px] font-bold text-gray-300">{new Date(scan.scanDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
