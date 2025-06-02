'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * @class LoginFormData
 * @description Clase para manejar los datos del formulario de login
 */
class LoginFormData {
    constructor() {
        this.email = '';
        this.password = '';
        this.rememberMe = false;
    }

    updateEmail(email) {
        this.email = email;
    }

    updatePassword(password) {
        this.password = password;
    }

    toggleRememberMe() {
        this.rememberMe = !this.rememberMe;
    }

    validate() {
        const errors = {};
        
        if (!this.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(this.email)) {
            errors.email = 'Email is not valid';
        }
        
        if (!this.password) {
            errors.password = 'Password is required';
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
}

/**
 * @class LoginFormUI
 * @description Clase para manejar la interfaz del formulario de login
 */
class LoginFormUI {
    constructor() {
        this.formData = new LoginFormData();
        this.errors = {};
        this.showPassword = false;
        this.loading = false;
    }

    setFormData(newData) {
        this.formData = newData;
    }

    setErrors(newErrors) {
        this.errors = newErrors;
    }

    setShowPassword(value) {
        this.showPassword = value;
    }

    setLoading(value) {
        this.loading = value;
    }

    handleChange(e) {
        const { name, value, type, checked } = e.target;

        const newFormData = new LoginFormData();
        newFormData.email = this.formData.email;
        newFormData.password = this.formData.password;
        newFormData.rememberMe = this.formData.rememberMe;

        if (name === 'email') {
            newFormData.updateEmail(value);
        } else if (name === 'password') {
            newFormData.updatePassword(value);
        } else if (name === 'rememberMe') {
            newFormData.toggleRememberMe();
        }

        this.setFormData(newFormData);

        if (this.errors[name]) {
            const newErrors = { ...this.errors };
            delete newErrors[name];
            this.setErrors(newErrors);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const validation = this.formData.validate();
        if (!validation.isValid) {
            this.setErrors(validation.errors);
            return;
        }
        
        this.setLoading(true);
        
        try {
            // Simulación de login exitoso
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '/dashboard';
        } catch (error) {
            console.error(error);
            this.setErrors({ form: 'An error occurred. Please try again.' });
        } finally {
            this.setLoading(false);
        }
    }
}

/**
 * @function LoginForm
 * @description Componente que muestra el formulario de inicio de sesión
 */
export default function LoginForm() {
    const [ui] = useState(new LoginFormUI());
    const [formData, setFormData] = useState(ui.formData);
    const [errors, setErrors] = useState(ui.errors);
    const [showPassword, setShowPassword] = useState(ui.showPassword);
    const [loading, setLoading] = useState(ui.loading);

    const handleChange = (e) => {
        ui.handleChange(e);
        setFormData(ui.formData);
        setErrors(ui.errors);
    };

    const handleSubmit = async (e) => {
        await ui.handleSubmit(e);
        setFormData(ui.formData);
        setErrors(ui.errors);
        setLoading(ui.loading);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {errors.form && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {errors.form}
                </div>
            )}
            
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                    placeholder="you@email.com"
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
            </div>
            
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="********"
                    />
                    <button 
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <ellipse cx="12" cy="12" rx="8" ry="5" />
                              <circle cx="12" cy="12" r="2" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <ellipse cx="12" cy="12" rx="8" ry="5" />
                              <circle cx="12" cy="12" r="2" />
                              <line x1="4" y1="20" x2="20" y2="4" />
                            </svg>
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
            </div>
            <div className="flex items-center justify-between">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-green-500 text-sm hover:underline">
                    Forgot your password?
                </Link>
            </div>
            <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                disabled={loading}
            >
                {loading ? 'Signing In...' : 'Sign In'}
            </button>
            <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="mx-4 text-gray-400 text-sm">Or continue with</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>
            <div className="flex gap-3 justify-center">
                <button type="button" className="bg-white hover:bg-gray-100 border border-gray-300 rounded-lg p-3 flex items-center gap-2 w-full justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.09 1.53 7.49 2.81l5.54-5.39C33.64 4.09 29.28 2 24 2 14.82 2 6.98 7.98 3.69 16.09l6.91 5.36C12.13 15.09 17.61 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.21-.42-4.73H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.18 5.59C43.98 37.09 46.1 31.27 46.1 24.5z"/><path fill="#FBBC05" d="M10.6 28.14a14.5 14.5 0 010-8.28l-6.91-5.36A23.97 23.97 0 002 24c0 3.77.9 7.34 2.49 10.5l7.11-6.36z"/><path fill="#EA4335" d="M24 44c6.48 0 11.92-2.14 15.9-5.84l-7.18-5.59c-2.01 1.35-4.59 2.13-8.72 2.13-6.39 0-11.87-5.59-13.4-12.77l-7.11 6.36C6.98 40.02 14.82 46 24 46z"/></g></svg>
                    <span className="text-gray-700 font-medium">Google</span>
                </button>
                <button type="button" className="bg-white hover:bg-gray-100 border border-gray-300 rounded-lg p-3 flex items-center gap-2 w-full justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#1877F3" d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.408 24 22.674V1.326C24 .592 23.405 0 22.675 0"/></svg>
                    <span className="text-gray-700 font-medium">Facebook</span>
                </button>
            </div>
            <div className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/sign-up" className="text-green-600 font-semibold hover:underline">
                    Sign up
                </Link>
            </div>
            <div className="text-xs text-gray-400 text-center mt-4">
                By signing in, you agree to our{' '}
                <Link href="/terms" className="text-green-600 hover:underline">Terms of Service</Link> and{' '}
                <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>.
            </div>
        </form>
    );
} 