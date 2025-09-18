'use client';

import { useEffect } from 'react';

interface WindowWithAnalytics extends Window {
  gtag?: (...args: unknown[]) => void;
  clarity?: (...args: unknown[]) => void;
}

export default function AnalyticsTest() {
  useEffect(() => {
    const windowWithAnalytics = window as WindowWithAnalytics;
    
    // 测试 Google Analytics
    if (typeof window !== 'undefined' && windowWithAnalytics.gtag) {
      windowWithAnalytics.gtag('event', 'page_view', {
        page_title: 'Analytics Test Page',
        page_location: window.location.href,
      });
      console.log('Google Analytics event sent');
    }

    // 测试 Microsoft Clarity
    if (typeof window !== 'undefined' && windowWithAnalytics.clarity) {
      windowWithAnalytics.clarity('set', 'test_event', 'analytics_test');
      console.log('Microsoft Clarity event sent');
    }

    // 测试 Vercel Analytics
    console.log('Vercel Analytics is enabled');
  }, []);

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 mb-2">
        Analytics Test Component
      </h3>
      <p className="text-green-700 text-sm">
        Check the browser console to see if analytics events are being sent.
      </p>
      <div className="mt-2 text-xs text-green-600">
        <p>• Google Analytics ID: {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'Not configured'}</p>
        <p>• Microsoft Clarity ID: {process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID || 'Not configured'}</p>
        <p>• Vercel Analytics: Enabled</p>
      </div>
    </div>
  );
} 