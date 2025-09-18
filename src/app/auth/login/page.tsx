import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '登录 | Tattoo Ideas Generator',
  description: '登录您的账户，探索更多纹身创意和个性化服务。',
};

export default function LoginPage() {
  return <LoginForm />;
} 