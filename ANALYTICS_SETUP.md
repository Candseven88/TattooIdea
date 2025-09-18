# Analytics Setup Guide

This guide explains how to set up and configure analytics tools for the Tattoo Design App.

## Installed Analytics Tools

### 1. Vercel Analytics
- **Status**: ✅ Installed and configured
- **Package**: `@vercel/analytics`
- **Configuration**: Automatically enabled when deployed to Vercel
- **Features**: 
  - Page views tracking
  - Performance monitoring
  - Real-time analytics

### 2. Google Analytics 4 (GA4)
- **Status**: ✅ Installed and configured
- **ID**: `G-QDS90RBNXH`
- **Configuration**: Set in `.env.local`
- **Features**:
  - User behavior tracking
  - Conversion tracking
  - Custom events
  - Audience insights

### 3. Microsoft Clarity
- **Status**: ✅ Installed and configured
- **ID**: `skqhvo6kml`
- **Configuration**: Set in `.env.local`
- **Features**:
  - Session recordings
  - Heatmaps
  - User interaction analysis
  - Performance insights

## Configuration

### Environment Variables

Add the following variables to your `.env.local` file:

```bash
# Analytics Configuration
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-QDS90RBNXH
NEXT_PUBLIC_MICROSOFT_CLARITY_ID=skqhvo6kml
```

### Production Deployment

For production deployment on Vercel, add these environment variables in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the following variables:
   - `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` = `G-QDS90RBNXH`
   - `NEXT_PUBLIC_MICROSOFT_CLARITY_ID` = `skqhvo6kml`

## Usage

### Automatic Tracking

All analytics tools are automatically loaded and start tracking when the app loads. The `Analytics` component is included in the root layout.

### Manual Event Tracking

You can manually track custom events:

```typescript
// Google Analytics
if (typeof window !== 'undefined' && (window as any).gtag) {
  (window as any).gtag('event', 'custom_event', {
    event_category: 'user_action',
    event_label: 'button_click',
    value: 1
  });
}

// Microsoft Clarity
if (typeof window !== 'undefined' && (window as any).clarity) {
  (window as any).clarity('set', 'custom_property', 'value');
}
```

### Testing

Use the `AnalyticsTest` component to verify that all analytics tools are working:

```typescript
import AnalyticsTest from '@/components/AnalyticsTest';

// Add to any page for testing
<AnalyticsTest />
```

## Dashboard Access

### Google Analytics
- **URL**: https://analytics.google.com/
- **Account**: Use the GA4 property with ID `G-QDS90RBNXH`
- **Features**: Real-time reports, audience insights, conversion tracking

### Microsoft Clarity
- **URL**: https://clarity.microsoft.com/
- **Project**: Use the project with ID `skqhvo6kml`
- **Features**: Session recordings, heatmaps, performance insights

### Vercel Analytics
- **URL**: Available in your Vercel project dashboard
- **Features**: Page views, performance metrics, real-time analytics

## Privacy Considerations

### GDPR Compliance
- All analytics tools respect user privacy settings
- Consider implementing a cookie consent banner
- Users can opt-out of tracking through browser settings

### Data Retention
- Google Analytics: 26 months by default (configurable)
- Microsoft Clarity: 12 months by default
- Vercel Analytics: 30 days by default

## Troubleshooting

### Analytics Not Loading
1. Check that environment variables are set correctly
2. Verify that the Analytics component is included in the layout
3. Check browser console for any errors
4. Ensure the domain is allowed in analytics tool settings

### Events Not Tracking
1. Verify that the analytics scripts are loaded
2. Check browser console for JavaScript errors
3. Ensure events are being sent after the analytics tools are initialized
4. Test with the AnalyticsTest component

## Performance Impact

The analytics tools are loaded asynchronously and have minimal impact on page load performance:
- Google Analytics: ~15KB
- Microsoft Clarity: ~20KB
- Vercel Analytics: ~5KB

Total additional load: ~40KB (minimal impact on modern connections) 