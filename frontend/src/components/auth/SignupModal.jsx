import React from 'react';
import { ShieldCheck, Lock, Shield, Globe, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';

const signupSchema = Yup.object({
    fullName: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Full name is required'),
    email: Yup.string()
        .email('Enter a valid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

export default function SignupModal({ onClose, switchModal }) {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { fullName: '', email: '', password: '' },
        validationSchema: signupSchema,
        onSubmit: async (values, { setFieldError, setSubmitting }) => {
            try {
                const response = await api.post('/auth/signup', values);

                if (response.data.success) {
                    localStorage.setItem('vedatrust_token', response.data.token);
                    localStorage.setItem('vedatrust_currentUser', JSON.stringify(response.data.user));
                    onClose();
                    navigate('/dashboard');
                }
            } catch (error) {
                const message = error.response?.data?.error || 'Registration failed. Try again.';
                setFieldError('email', message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const field = (name) => ({
        id: name,
        name,
        value: formik.values[name],
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
    });

    const fieldClass = (name) =>
        `w-full px-4 py-3 rounded-md border bg-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 transition-all shadow-sm ${formik.touched[name] && formik.errors[name]
            ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
            : 'border-gray-200 focus:ring-[#0b5de5]/20 focus:border-[#0b5de5]'
        }`;

    const FieldError = ({ name }) =>
        formik.touched[name] && formik.errors[name]
            ? <p className="text-red-500 text-[11px] mt-1">{formik.errors[name]}</p>
            : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm p-4 w-full h-full">
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 min-h-[600px]"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-gray-100 transition-colors">✕</button>

                {/* Left Side */}
                <div className="hidden lg:flex flex-col w-2/5 bg-[#EEF2FC] p-10 justify-center relative">
                    <div className="flex items-center space-x-2 mb-10">
                        <ShieldCheck className="w-6 h-6 text-[#0b5de5]" fill="#0b5de5" stroke="white" strokeWidth={1.5} />
                        <span className="text-[17px] font-bold text-slate-900 tracking-tight">Vedatrust</span>
                    </div>

                    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-4 tracking-tight">Your health,<br />our trust.</h2>
                    <p className="text-slate-600 text-[13px] mb-12 leading-relaxed pr-6">Join a secure ecosystem designed for safe medicine verification.</p>

                    <div className="space-y-8">
                        <div className="flex gap-4 items-start">
                            <div className="w-[34px] h-[34px] rounded-md bg-[#DFE7FA] flex items-center justify-center shrink-0 mt-0.5">
                                <Lock className="w-4 h-4 text-[#0b5de5]" fill="#0b5de5" />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-slate-900 mb-1">End-to-End Encryption</h4>
                                <p className="text-[12px] text-slate-500 leading-relaxed max-w-[200px]">Your data is secured with industry-leading cryptographic protocols.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="w-[34px] h-[34px] rounded-md bg-[#DFE7FA] flex items-center justify-center shrink-0 mt-0.5">
                                <Activity className="w-4 h-4 text-[#0b5de5]" />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-slate-900 mb-1">Regulatory Compliance</h4>
                                <p className="text-[12px] text-slate-500 leading-relaxed max-w-[200px]">Built to meet and exceed global healthcare data standards.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="w-[34px] h-[34px] rounded-md bg-[#DFE7FA] flex items-center justify-center shrink-0 mt-0.5">
                                <Globe className="w-4 h-4 text-[#0b5de5]" />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-slate-900 mb-1">Global Network</h4>
                                <p className="text-[12px] text-slate-500 leading-relaxed max-w-[200px]">Access verified medicine data from pharmacies worldwide.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side (Form) */}
                <div className="flex-1 p-10 lg:pl-16 flex flex-col justify-center bg-white relative">
                    <h2 className="text-[26px] font-bold text-slate-900 mb-2 tracking-tight">Create Account</h2>
                    <p className="text-[13px] text-slate-500 mb-8 font-medium">Secure access to medicine verification.</p>

                    <form className="space-y-4 w-full max-w-[360px]" onSubmit={formik.handleSubmit} noValidate>

                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-700 tracking-wide">Full Name</label>
                            <input
                                {...field('fullName')}
                                type="text"
                                placeholder="e.g. Rahul Sharma"
                                className={fieldClass('fullName')}
                            />
                            <FieldError name="fullName" />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-700 tracking-wide">Email Address</label>
                            <input
                                {...field('email')}
                                type="email"
                                placeholder="you@example.com"
                                className={fieldClass('email')}
                            />
                            <FieldError name="email" />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-700 tracking-wide">Password</label>
                            <input
                                {...field('password')}
                                type="password"
                                placeholder="••••••••"
                                className={`${fieldClass('password')} tracking-widest`}
                            />
                            <FieldError name="password" />
                        </div>

                        <div className="pt-2 pb-1">
                            <div className="w-full bg-[#f8fbff] text-slate-700 text-[11px] font-medium py-3 rounded flex items-center justify-center space-x-2 border border-blue-50/50">
                                <Shield className="w-3.5 h-3.5 text-[#10B981]" fill="#10B981" strokeWidth={1} />
                                <span>Join 10k+ verified users</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="w-full bg-[#035ce9] hover:bg-blue-800 disabled:opacity-60 text-white font-semibold text-[13px] py-3.5 rounded-md transition-colors shadow-md mt-1"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-8 flex justify-start w-full max-w-[360px]">
                        <p className="text-[12px] text-slate-500 font-medium">
                            Already have an account?{' '}
                            <button type="button" onClick={() => switchModal('login')} className="text-[#035ce9] font-bold hover:underline ml-1">Login</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
