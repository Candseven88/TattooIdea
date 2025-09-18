import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '注册 | Tattoo Ideas Generator',
  description: '创建您的账户，探索更多纹身创意和个性化服务。',
};

export default function RegisterPage() {
  return <RegisterForm />;
} 