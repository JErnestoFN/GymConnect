'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

function SignUpForm() {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', agree: false });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
        setErrors({ ...errors, [name]: undefined });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        let errs = {};
        if (!form.firstName) errs.firstName = 'First name is required';
        if (!form.lastName) errs.lastName = 'Last name is required';
        if (!form.email) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email is not valid';
        if (!form.password) errs.password = 'Password is required';
        else if (form.password.length < 8 || !/[0-9]/.test(form.password) || !/[^A-Za-z0-9]/.test(form.password)) errs.password = 'Password must be at least 8 characters, include a number and a special character';
        if (!form.agree) errs.agree = 'You must agree to the terms';
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setLoading(true);
        setTimeout(() => { setLoading(false); window.location.href = '/dashboard'; }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input id="firstName" name="firstName" type="text" value={form.firstName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`} placeholder="John" />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input id="lastName" name="lastName" type="text" value={form.lastName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`} placeholder="Doe" />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`} placeholder="your@email.com" />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                    <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`} placeholder="********" />
                    <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.94 17.94A10.05 10.05 0 0012 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1l22 22" />
                            </svg>
                        )}
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Must be at least 8 characters including a number and a special character</p>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
            <div className="flex items-center">
                <input id="agree" name="agree" type="checkbox" checked={form.agree} onChange={handleChange} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                <label htmlFor="agree" className="ml-2 text-sm text-gray-700">
                    I agree to the <Link href="/terms" className="text-green-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>
                </label>
            </div>
            {errors.agree && <p className="mt-1 text-sm text-red-600">{errors.agree}</p>}
            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2" disabled={loading}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            <div className="text-center text-sm text-gray-600">Already have an account? <Link href="/login" className="text-green-600 font-semibold hover:underline">Sign in</Link></div>
        </form>
    );
}

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-white to-green-50">
            <div className="flex flex-col items-center pt-10">
                <Image src="/logo-gymconnect.svg" alt="GymConnect Logo" width={48} height={48} />
                <h1 className="mt-2 text-2xl font-bold text-green-600">GymConnect</h1>
            </div>
            <div className="flex flex-col items-center flex-1 justify-center">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mt-6">
                    <h2 className="text-3xl font-extrabold text-center mb-2">Create Account</h2>
                    <p className="text-center text-gray-500 mb-6">Join GymConnect and start tracking your fitness journey</p>
                    <SignUpForm />
                </div>
            </div>
            <div className="text-center text-sm text-gray-500 mb-4">
                By creating an account, you agree to our <Link href="/terms" className="text-green-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>.
            </div>
            <footer className="text-center text-xs text-gray-400 pb-4">© 2025 GymConnect. All rights reserved.</footer>
        </div>
    );
} 