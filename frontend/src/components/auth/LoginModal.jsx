import React from 'react';
import { Shield, Mail, Key, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';

const loginSchema = Yup.object({
    email: Yup.string()
        .email('Enter a valid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

export default function LoginModal({ onClose, switchModal }) {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: loginSchema,
        onSubmit: async (values, { setFieldError, setSubmitting }) => {
            try {
                const response = await api.post('/auth/login', values);

                if (response.data.success) {
                    localStorage.setItem('vedatrust_token', response.data.token);
                    localStorage.setItem('vedatrust_currentUser', JSON.stringify(response.data.user));
                    onClose();
                    navigate('/dashboard');
                }
            } catch (error) {
                const message = error.response?.data?.error || 'Invalid email or password';
                setFieldError('password', message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 backdrop-blur-md p-4 w-full h-full font-serif text-slate-800">
            <div
                className="bg-[#F8F9FA] rounded-2xl shadow-2xl w-full max-w-[420px] p-10 flex flex-col items-center relative animate-in fade-in zoom-in-95 duration-200 border border-white"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-100 transition-colors">✕</button>

                <div className="w-12 h-12 bg-[#E2E8F6] rounded-xl flex items-center justify-center mb-5 shadow-sm border border-blue-50">
                    <Shield className="w-6 h-6 text-[#171b35]" fill="#171b35" />
                </div>

                <h2 className="text-[28px] font-bold text-slate-900 mb-1 tracking-tight">Vedatrust</h2>
                <p className="text-[13px] text-slate-500 mb-8 tracking-wide">Secure access to your personal workspace</p>

                <form className="w-full space-y-5" onSubmit={formik.handleSubmit} noValidate>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-700 tracking-wider">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Mail className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="you@example.com"
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 transition-all shadow-sm font-sans
                                    ${formik.touched.email && formik.errors.email
                                        ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
                                        : 'border-gray-200 focus:ring-[#404ba6]/20 focus:border-[#404ba6]'
                                    }`}
                            />
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-[11px] font-sans mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-[11px] font-bold text-slate-700 tracking-wider">Password</label>
                            <button type="button" onClick={() => switchModal('forgot')} className="text-[11px] font-bold text-[#059669] hover:underline">
                                Forgot password?
                            </button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Key className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="••••••••"
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2 transition-all shadow-sm tracking-widest font-sans
                                    ${formik.touched.password && formik.errors.password
                                        ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
                                        : 'border-gray-200 focus:ring-[#404ba6]/20 focus:border-[#404ba6]'
                                    }`}
                            />
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-[11px] font-sans mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="w-full bg-[#404ba6] hover:bg-[#343d8a] disabled:opacity-60 text-white font-bold text-[13px] tracking-wide py-3.5 rounded-lg transition-colors shadow-md mt-4 flex items-center justify-center space-x-2"
                    >
                        <span>Sign In to Portal</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="mt-8 text-center pt-2">
                    <p className="text-[12px] text-slate-500">
                        Don't have an account?{' '}
                        <button type="button" onClick={() => switchModal('signup')} className="text-[#059669] font-bold hover:underline ml-1">
                            Sign Up
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
}
