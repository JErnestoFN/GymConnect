'use client';

import LoginForm from '../_components/login/LoginForm.js';
import Image from 'next/image';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8">
            <div className="mb-8 flex flex-col items-center">
                <Image src="/logo-gymconnect.svg" alt="GymConnect Logo" width={56} height={56} />
                <h1 className="mt-4 text-2xl font-bold text-green-600">GymConnect</h1>
            </div>
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-2">Welcome Back!</h2>
                <p className="text-center text-gray-500 mb-6">Sign in to continue your fitness journey</p>
                <LoginForm />
            </div>
        </div>
    );
} 