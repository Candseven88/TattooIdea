"use client";

import React, { useState } from 'react';
import { signInWithEmail, signInWithGoogle, resendVerificationEmail } from '@/lib/services/authService';
import { LoginFormData } from '@/lib/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from 'firebase/auth';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [unverifiedUser, setUnverifiedUser] = useState<User | null>(null);
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setVerificationEmailSent(false);

    try {
      const { email, password } = formData;
      const result = await signInWithEmail(email, password, true); // true = require verification

      if (result.error) {
        setError(result.error);
        
        // If this is an unverified email error, store the user for resending verification
        if (result.emailVerified === false && result.user) {
          setUnverifiedUser(result.user);
        } else {
          setUnverifiedUser(null);
        }
      } else {
        // Redirect to home page after successful login
        router.push('/');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed, please try again';
      setError(errorMessage);
      setUnverifiedUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!unverifiedUser) return;
    
    setLoading(true);
    try {
      const result = await resendVerificationEmail(unverifiedUser);
      if (result.success) {
        setVerificationEmailSent(true);
      } else {
        setError(result.error || 'Failed to send verification email');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send verification email';
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
        // Redirect to home page after successful login
        router.push('/');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Google login failed, please try again';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white/5 backdrop-blur-lg rounded-lg shadow-xl border border-primary/20">
      <h2 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600">
        Sign In
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-md text-sm">
          {error}
          {unverifiedUser && (
            <button 
              onClick={handleResendVerification}
              className="ml-2 underline hover:text-red-700 font-medium"
              disabled={loading || verificationEmailSent}
            >
              Resend verification email
            </button>
          )}
        </div>
      )}

      {verificationEmailSent && (
        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 text-green-500 rounded-md text-sm">
          Verification email sent! Please check your inbox.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
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

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 hover:opacity-90 text-white font-medium rounded-md transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

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
        Don&apos;t have an account?{' '}
        <Link href="/auth/register" className="text-primary hover:text-primary/80 font-medium">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm; 