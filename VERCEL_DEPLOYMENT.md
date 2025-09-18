# Vercel Deployment Guide

This guide explains how to deploy the Tattoo Design App to Vercel with all the necessary configurations.

## Prerequisites

1. A Vercel account
2. Your project pushed to GitHub
3. Firebase project configured
4. ZhipuAI API key

## Step 1: Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository and click "Deploy"

## Step 2: Configure Environment Variables

In your Vercel project settings, add the following environment variables:

### Firebase Configuration
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAKZdK_GYgvuG5__l22Tn1DoYghv_hCmJ0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tattooidea-bc1e6.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tattooidea-bc1e6
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tattooidea-bc1e6.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=564893746375
NEXT_PUBLIC_FIREBASE_APP_ID=1:564893746375:web:1732885192562226a12ae2
```

### ZhipuAI API Configuration
```
ZHIPUAI_API_KEY=f959aa78c3304b4a806d531a316be928.grpBgewiKpbyYbYmebar
NEXT_PUBLIC_API_ENABLED=true
```

### Analytics Configuration
```
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-QDS90RBNXH
NEXT_PUBLIC_MICROSOFT_CLARITY_ID=skqhvo6kml
```

### Firebase Admin Configuration (for server-side)
```
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"tattooidea-bc1e6","private_key_id":"fbba9abc40f6cca3fd0152ffca9ec0ce1704dbee","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDSrxAicNEYvzEl\nP4PpEqBW092eiugxDwM7pw6oL7L9Hkp71U0GXx/d8MNXLBlHgVdmzQOouJNLMiQL\nE0rT9RZadwk5pJgujLU8g3ETcHZ9ghduxmZ7fe8wHRxtz+HII2OE1/z2e0gKZJzx\nKPOUwxJ4WvWu0vmGhtISi903r0qZmsDQbQe6fjVGmANrEzDoQvy/kX8VahcQqUc5\nBS10RKV1m/mgTdlZccTlBohqIuAEASx1ZtGRTizcfS09jJkFDqV/HZGCB8pHzk2g\nBB1IrIYActTkkJasulBtxAiSskJk2BYNGrlye1isHi2rDGTRuEqECU2TepQAuZPI\n5dJs6WH9AgMBAAECggEACDJwexk5lsVljkXyMMDH7+jkAABL4rtrTEhb0nZcopV+\n9Ld1UjtO5u3a+SAe8asaG/FRDvZIy3hYHP2Iqpt9XagGT1xUjBxvDBDZzEBSvopa\nYAskafHvOvIprNTAO5mzjF5yRKLCSEk8Lp6BxPbGrVvDSvnWudcIAwRhvIIQ8c3t\n9k62ifv3scB17LrC8a6i5Oqs53ElMtLVSgx42oQrBOlvotqhg0CxzCImXL+9Cddi\nmkTKzccSKJ/RwLAZaOO/HJh+o85CGGKIOKX5ayAvMaN3Qj0sjS73F7wgV6AEx95O\ntEyskOv6PBE2Q1XtIJrDAv7Vc/s23/HnrB/Lfug0nwKBgQD5woqpLZMTMSbL4G8C\ni5yIjGFam/bvV/dccwAYtlrIqNxiaxzJ9gsexMWbDxuO4dpeY2ijozSrK7aphFa8\nmsBWOfZYbWjtCkc5qj3bqknfqXFYcwR/chrBNqFquN1wSav3OfQyOVBA3Q4tlsCr\nabADuhLagzAPvZstcNcfG5F5EwKBgQDX8pd4d4y0+oDLZJ8pFHSZKHjMh7OUjoqE\nGB6otsh1qmIQfmfbk9bbL/AXA7R+GqEc6wPpXhLR2yVafgpLfaaCgYyRjUbOyQkd\n+1f6dZz3T/7NaUmuaQoOA/5ZIt5eOVELCRfzT0S2YlYHWnjkAXx1qoDSIFaLpGkV\nq7FeKMuqrwKBgDGw+gOE1ME5wz1G7u8ztbYZL/lmFHA0MTvMiZVhGpjXt9lA9F5e\nPIInpiUekV4RI3AqGRSNkRoJPXNmqBcoNuIw8AlR41Fd/SPE8j+1FrOQM8PkRl3Q\n5u/QHbdtBmmjzroGZsZjTstI79w0JSs1gNaM+9lLxpErKSeWTsaapovPAoGAXGqO\nllibWAxouCK81qjRaYZfhDCDEw2ZjASCgnOPAIRFaYefTOJNLgqq9j54rQsabjTJ\nvMKszTC7IKoWH86LRwjILrZGWlLA2xrowOA6p8CNbD0l8kUzr2HYJS99+NcQruda\nX59J6b/Vz1nRqMpWCElKziJWx3Y6HrMWuhQ9bTMCgYEA006ue6WTKNxzuknMrO2K\n0iZOWngyMNgZUFLSi6vOoQpEpdihCD8a61wbMa+RMxkAiTUa0mP1vlE/W1VvCkJ4\nnrksw/puZ6ziWROvJBFVVZ2pXJc0aTgu6RFpdhRVXv3YyeqX7Wi6OCCt4TFStQvQ\n82rhaILUTXMZEVGjd8ss5Ms=\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-fbsvc@tattooidea-bc1e6.iam.gserviceaccount.com","client_id":"106943863435719756451","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40tattooidea-bc1e6.iam.gserviceaccount.com","universe_domain":"googleapis.com"}
```

## Step 3: Configure Build Settings

1. **Framework Preset**: Next.js
2. **Build Command**: `npm run build`
3. **Output Directory**: `.next`
4. **Install Command**: `npm install`

## Step 4: Domain Configuration

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain if needed
4. Configure DNS settings as instructed

## Step 5: Deploy

1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Check the deployment logs for any errors

## Troubleshooting

### Build Errors

If you encounter build errors:

1. **Firebase Configuration Error**: Ensure all Firebase environment variables are set correctly
2. **API Key Errors**: Verify that `ZHIPUAI_API_KEY` is set and valid
3. **Analytics Errors**: Check that analytics IDs are correct

### Runtime Errors

1. **Authentication Issues**: Verify Firebase configuration
2. **API Errors**: Check ZhipuAI API key and quota
3. **Analytics Not Working**: Verify environment variables are set

### Performance Issues

1. **Slow Loading**: Check image optimization settings
2. **API Timeouts**: Verify API endpoints are working
3. **Memory Issues**: Check build memory limits

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `ZHIPUAI_API_KEY` | ZhipuAI API key | Yes |
| `NEXT_PUBLIC_API_ENABLED` | Enable/disable API | Yes |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Google Analytics ID | No |
| `NEXT_PUBLIC_MICROSOFT_CLARITY_ID` | Microsoft Clarity ID | No |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Firebase admin key | Yes |

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test user authentication
- [ ] Test AI tattoo generation
- [ ] Verify analytics are working
- [ ] Check mobile responsiveness
- [ ] Test all user flows
- [ ] Monitor error logs
- [ ] Set up monitoring and alerts

## Support

If you encounter issues:

1. Check the Vercel deployment logs
2. Verify all environment variables are set
3. Test locally with the same environment variables
4. Check the browser console for client-side errors
5. Review the application logs in Vercel 