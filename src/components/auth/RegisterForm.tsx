"use client";

import React, { useState } from 'react';
import { registerWithEmail, signInWithGoogle, signOut } from '@/lib/services/authService';
import { RegisterFormData } from '@/lib/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    displayName: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setVerificationEmailSent(false);
    setRegistrationComplete(false);

    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { email, password, displayName } = formData;
      const result = await registerWithEmail(email, password, displayName);

      if (result.error) {
        setError(result.error);
      } else {
        // Ensure user is signed out after registration
        await signOut();
        
        // Show verification email sent message
        setVerificationEmailSent(true);
        setRegistrationComplete(true);
        // Clear form
        setFormData({
          email: '',
          password: '',
          displayName: '',
          confirmPassword: '',
        });
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed, please try again';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);

    try {
      const result = await signInWithGoogle();

      if (result.error) {
        setError(result.error);
      } else {
        // Redirect to home page after successful login with Google
        router.push('/');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Google login failed, please try again';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Navigate to login page
  const goToSignIn = () => {
    router.push('/auth/login');
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white/5 backdrop-blur-lg rounded-lg shadow-xl border border-primary/20">
      <h2 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600">
        Create Account
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-md text-sm">
          {error}
        </div>
      )}

      {verificationEmailSent && (
        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 text-green-500 rounded-md text-sm">
          <p className="font-medium">Registration successful!</p>
          <p>A verification email has been sent to your email address. Please check your inbox and verify your email before signing in.</p>
        </div>
      )}

      {!registrationComplete && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-black mb-1">
              Username
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              required
              value={formData.displayName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-black"
              placeholder="Your username"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-black"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-black"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-black"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 hover:opacity-90 text-white font-medium rounded-md transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      )}

      {registrationComplete ? (
        <div className="mt-6">
          <button 
            onClick={goToSignIn}
            className="w-full block text-center py-2 px-4 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-md transition-all duration-300"
          >
            Go to Sign In
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-2 px-4 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition-all duration-300 disabled:opacity-50"
              >
                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary hover:text-primary/80 font-medium">
              Sign In
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default RegisterForm; 