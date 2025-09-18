"use client";

import React, { useState } from 'react';
import { resetPassword } from '@/lib/services/authService';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await resetPassword(email);
      if (result.success) {
        setResetEmailSent(true);
      } else {
        setError(result.error || 'Failed to send password reset email');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send password reset email';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white/5 backdrop-blur-lg rounded-lg shadow-xl border border-primary/20">
      <h2 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600">
        Reset Password
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-md text-sm">
          {error}
        </div>
      )}

      {resetEmailSent ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-500 rounded-md">
            <p className="font-medium">Password reset email sent!</p>
            <p className="text-sm mt-1">
              We&apos;ve sent an email to <span className="font-medium">{email}</span> with instructions to reset your password.
            </p>
          </div>
          <Link 
            href="/auth/login"
            className="w-full block text-center py-2 px-4 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-md transition-all duration-300"
          >
            Return to Sign In
          </Link>
        </div>
      ) : (
        <>
          <p className="text-gray-400 mb-6 text-sm">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-black"
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 hover:opacity-90 text-white font-medium rounded-md transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div className="text-center mt-4">
              <Link href="/auth/login" className="text-sm text-primary hover:text-primary/80">
                Back to Sign In
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
} 