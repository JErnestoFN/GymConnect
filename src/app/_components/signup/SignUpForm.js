import { useState } from 'react';
import Link from 'next/link';

// POO: Clase para manejar los datos del formulario de registro
class SignUpFormData {
  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.acceptTerms = false;
  }
  updateFirstName(firstName) { this.firstName = firstName; }
  updateLastName(lastName) { this.lastName = lastName; }
  updateEmail(email) { this.email = email; }
  updatePassword(password) { this.password = password; }
  toggleAcceptTerms() { this.acceptTerms = !this.acceptTerms; }
  validate() {
    const errors = {};
    if (!this.firstName) errors.firstName = 'First name is required';
    if (!this.lastName) errors.lastName = 'Last name is required';
    if (!this.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(this.email)) errors.email = 'Email is invalid';
    if (!this.password) errors.password = 'Password is required';
    else if (this.password.length < 8) errors.password = 'Password must be at least 8 characters';
    else if (!/[A-Z]/.test(this.password)) errors.password = 'Password must contain at least one uppercase letter';
    else if (!/[0-9]/.test(this.password)) errors.password = 'Password must contain at least one number';
    else if (!/[^A-Za-z0-9]/.test(this.password)) errors.password = 'Password must contain at least one special character';
    if (!this.acceptTerms) errors.acceptTerms = 'You must accept the Terms of Service and Privacy Policy';
    return { isValid: Object.keys(errors).length === 0, errors };
  }
}

export default function SignUpForm() {
  const [formData, setFormData] = useState(new SignUpFormData());
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFormData = new SignUpFormData();
    newFormData.firstName = formData.firstName;
    newFormData.lastName = formData.lastName;
    newFormData.email = formData.email;
    newFormData.password = formData.password;
    newFormData.acceptTerms = formData.acceptTerms;
    if (name === 'firstName') newFormData.updateFirstName(value);
    else if (name === 'lastName') newFormData.updateLastName(value);
    else if (name === 'email') newFormData.updateEmail(value);
    else if (name === 'password') newFormData.updatePassword(value);
    else if (name === 'acceptTerms') newFormData.toggleAcceptTerms();
    setFormData(newFormData);
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = formData.validate();
    if (!validation.isValid) { setErrors(validation.errors); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); window.location.href = '/dashboard'; }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.form && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{errors.form}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`} placeholder="John" />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`} placeholder="Doe" />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`} placeholder="your@email.com" />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`} placeholder="********" />
          <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              // Ojo abierto Material
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              // Ojo cerrado Material
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M17.94 17.94A10.05 10.05 0 0112 19c-5.523 0-10-7-10-7a16.978 16.978 0 014.22-4.91" />
                <path d="M1 1l22 22" />
                <path d="M9.53 9.53A3 3 0 0115 12m-3 3a3 3 0 01-3-3" />
                <path d="M22.54 12.42A16.978 16.978 0 0012 5c-2.042 0-3.937.635-5.458 1.707" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Must be at least 8 characters including a number and a special character</p>
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>
      <div className="flex items-center">
        <input id="acceptTerms" name="acceptTerms" type="checkbox" checked={formData.acceptTerms} onChange={handleChange} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
        <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-700">
          I agree to the <Link href="/terms" className="text-green-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>
        </label>
      </div>
      {errors.acceptTerms && <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>}
      <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2" disabled={loading}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
      <div className="text-center text-sm text-gray-600">Already have an account? <Link href="/login" className="text-green-600 font-semibold hover:underline">Sign in</Link></div>
    </form>
  );
} 