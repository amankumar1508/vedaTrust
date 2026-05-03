import React, { useState, useEffect } from 'react';
import {
    FileUp,
    Calendar,
    User,
    Stethoscope,
    MessageSquare,
    ShieldCheck,
    X,
    UploadCloud,
    FileText,
    CheckCircle2,
    Clock,
    AlertCircle,
    ChevronRight,
    Search,
    Download,
    Hash,
    MoreVertical,
    FileCheck2,
    History,
    Info,
    ArrowUpRight
} from 'lucide-react';
import api from '../../services/api';

const getFullUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    // Remove 'uploads\' or 'uploads/' prefix if it exists to avoid double prefixing
    const cleanPath = path.replace(/\\/g, '/').replace(/^uploads\//, '');
    return `http://localhost:5000/uploads/${cleanPath}`;
};

export default function Prescriptions() {
    const [view, setView] = useState('upload'); // upload, list
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        patientName: '',
        doctorName: '',
        dateOfIssue: '',
        notes: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [activePrescription, setActivePrescription] = useState(null);

    useEffect(() => {
        if (view === 'list') {
            fetchPrescriptions();
        }
    }, [view]);

    const fetchPrescriptions = async () => {
        setLoading(true);
        try {
            const response = await api.get('/prescriptions');
            if (response.data.success) {
                setPrescriptions(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch prescriptions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            const data = new FormData();
            data.append('patientName', formData.patientName);
            data.append('doctorName', formData.doctorName);
            data.append('dateOfIssue', formData.dateOfIssue);
            data.append('notes', formData.notes);
            if (selectedFile) data.append('prescription', selectedFile);

            const response = await api.post('/prescriptions', data);
            if (response.data.success) {
                setView('list');
                resetForm();
                alert("Prescription uploaded successfully and is now pending verification.");
            }
        } catch (error) {
            console.error('Upload failed:', error);
            const errorMsg = error.response?.data?.error || "Upload failed. Please ensure the file is an image or PDF and all fields are filled.";
            alert(errorMsg);
        } finally {
            setUploading(false);
        }
    };

    const resetForm = () => {
        setFormData({ patientName: '', doctorName: '', dateOfIssue: '', notes: '' });
        setSelectedFile(null);
    };

    const StatusPill = ({ status }) => {
        const styles = {
            Verified: "bg-emerald-50 text-emerald-600 border-emerald-100",
            Pending: "bg-amber-50 text-amber-600 border-amber-100",
            Rejected: "bg-rose-50 text-rose-600 border-rose-100"
        };
        const icon = {
            Verified: <CheckCircle2 className="w-3 h-3" />,
            Pending: <Clock className="w-3 h-3 animate-spin" />,
            Rejected: <AlertCircle className="w-3 h-3" />
        };
        return (
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${styles[status]}`}>
                {icon[status]} {status}
            </div>
        );
    };

    const DigitalRxCard = ({ rx, onClose }) => (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-[#fcfcfc] rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-300 border border-white">
                <div className="relative p-10 space-y-8">
                    {/* Security Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-35deg]">
                        <ShieldCheck className="w-96 h-96" />
                    </div>

                    <div className="flex justify-between items-start relative">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                    <FileCheck2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Digital Prescription</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Verified by VedaTrust</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-6 pt-4 relative">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Patient Name</p>
                                <p className="font-bold text-gray-900">{rx.patientName}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</p>
                                <StatusPill status={rx.status} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Doctor / Clinic</p>
                                <p className="font-bold text-gray-900">{rx.doctorName}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Validation ID</p>
                                <p className="font-mono text-[10px] font-bold text-blue-600">VT-{rx._id.substring(0, 8).toUpperCase()}</p>
                            </div>
                        </div>

                        <div className="p-6 bg-white rounded-3xl border border-gray-100 space-y-4">
                            <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                <Search className="w-4 h-4 text-blue-500" /> Clinical Notes
                            </h4>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed italic">
                                "{rx.notes || "No additional instructions provided. Prescription verified for standard pharmaceutical fulfillment."}"
                            </p>
                        </div>
                    </div>

                    <div className="pt-6 flex gap-4 relative">
                        <button 
                            onClick={() => {
                                if (rx.imageUrl) {
                                    // In a real app, this would trigger a PDF generation or download
                                    // For now, we open the image in a new tab
                                    window.open(getFullUrl(rx.imageUrl), '_blank');
                                } else {
                                    alert("Prescription document not available.");
                                }
                            }}
                            className="flex-1 bg-blue-600 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                        >
                            <Download className="w-4 h-4" /> Download PDF
                        </button>
                        <button className="flex-1 bg-white border border-gray-100 text-gray-600 font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Share Chain-ID
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-10 py-6">
            {/* Nav Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-gray-100">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100">
                            <FileUp className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Prescriptions</h1>
                    </div>
                    <p className="text-gray-500 font-medium max-w-2xl leading-relaxed">
                        Securely manage and validate your medical prescriptions through VedaTrust's cryptographic verification engine.
                    </p>
                </div>

                <div className="flex bg-gray-50 p-1.5 rounded-[1.25rem] border border-gray-200/50">
                    <button
                        onClick={() => setView('upload')}
                        className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${view === 'upload' ? 'bg-white text-blue-600 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Upload Center
                    </button>
                    <button
                        onClick={() => setView('list')}
                        className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${view === 'list' ? 'bg-white text-blue-600 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        My Records
                    </button>
                </div>
            </div>

            {view === 'upload' ? (
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-10">
                    {/* Upload Zone */}
                    <div className="xl:col-span-3">
                        <div className="bg-white rounded-[2.5rem] border-4 border-dashed border-gray-50 p-12 min-h-[500px] flex flex-col items-center justify-center group hover:border-blue-100 transition-all relative overflow-hidden bg-gradient-to-br from-white to-gray-50/30">
                            {!selectedFile ? (
                                <>
                                    <div className="w-24 h-24 bg-blue-50 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500">
                                        <UploadCloud className="w-10 h-10 text-blue-600 group-hover:text-white" />
                                    </div>
                                    <div className="text-center space-y-3">
                                        <h3 className="text-xl font-black text-gray-900 tracking-tight">Drag and drop your prescription</h3>
                                        <p className="text-sm font-medium text-gray-400 max-w-xs mx-auto">Upload a clear photo or PDF of your official prescription for validation.</p>
                                    </div>
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => setSelectedFile(e.target.files[0])}
                                    />
                                </>
                            ) : (
                                <div className="text-center space-y-8 animate-in fade-in zoom-in duration-300">
                                    <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto border-4 border-white shadow-xl shadow-emerald-50">
                                        <FileCheck2 className="w-10 h-10 text-emerald-600" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-gray-900 tracking-tight">{selectedFile.name}</h3>
                                        <div className="flex items-center justify-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                                            <ShieldCheck className="w-4 h-4" /> Securely Attached
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedFile(null)}
                                        className="px-6 py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-gray-200"
                                    >
                                        Change File
                                    </button>
                                </div>
                            )}
                            <ShieldCheck className="absolute -bottom-16 -right-16 w-64 h-64 text-blue-50/20 rotate-12" />
                        </div>
                    </div>

                    {/* Metadata Form */}
                    <div className="xl:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-blue-50/20 p-10 space-y-10">
                            <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                <Info className="w-5 h-5 text-blue-600" /> Prescription Details
                            </h2>

                            <form className="space-y-8" onSubmit={handleUpload}>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Patient Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="Legal name on prescription"
                                                value={formData.patientName}
                                                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                                                className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-8 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-sm font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Prescribing Doctor</label>
                                        <div className="relative">
                                            <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="Doctor or medical facility"
                                                value={formData.doctorName}
                                                onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                                                className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-8 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-sm font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Date of Issue</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="date"
                                                required
                                                value={formData.dateOfIssue}
                                                onChange={(e) => setFormData({ ...formData, dateOfIssue: e.target.value })}
                                                className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-8 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-sm font-bold"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={uploading || !selectedFile}
                                    className="w-full bg-blue-600 disabled:opacity-50 text-white font-black py-5 rounded-[1.5rem] text-sm uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                                >
                                    {uploading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>Submit for Validation <ArrowUpRight className="w-5 h-5" /></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <History className="w-5 h-5 text-gray-400" />
                            <h2 className="text-xl font-black text-gray-900 tracking-tight">Active Medical Record</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sort:</span>
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest cursor-pointer">Most Recent</span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-48 bg-gray-50 rounded-[2.5rem] animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {prescriptions.map((rx) => (
                                <div
                                    key={rx._id}
                                    onClick={() => setActivePrescription(rx)}
                                    className="bg-white rounded-[2.5rem] border border-gray-100 p-8 space-y-6 hover:shadow-2xl hover:shadow-blue-50/50 transition-all group cursor-pointer relative overflow-hidden"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <StatusPill status={rx.status} />
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-lg font-black text-gray-900 group-hover:text-blue-700 transition-colors">{rx.doctorName}</h3>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                            <User className="w-3.5 h-3.5" /> {rx.patientName}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                                            <Calendar className="w-3.5 h-3.5" /> {new Date(rx.uploadedAt).toLocaleDateString()}
                                        </div>
                                        <div className="text-blue-600 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
                                            <ChevronRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activePrescription && (
                <DigitalRxCard rx={activePrescription} onClose={() => setActivePrescription(null)} />
            )}
        </div>
    );
}
