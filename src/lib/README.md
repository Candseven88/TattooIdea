# Firebase Authentication Setup

This project uses Firebase for authentication and Firestore for storing user data. Follow these steps to set up Firebase for this project:

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup steps
3. Give your project a name and continue with the setup

## 2. Set Up Firebase Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Enable the "Email/Password" provider
4. Enable the "Google" provider
5. Configure the OAuth consent screen if prompted

## 3. Create Firestore Database

1. Go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Start in production mode or test mode (you can change this later)
4. Choose a location for your database
5. Click "Enable"

## 4. Set Up Security Rules

Add these security rules to your Firestore database to secure your user data:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write only their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Add more rules for other collections as needed
  }
}
```

## 5. Get Your Firebase Configuration

1. Go to Project Settings (gear icon in the top left)
2. Scroll down to "Your apps" section
3. If you haven't added an app yet, click the web icon (</>) to add a web app
4. Register your app with a nickname
5. Copy the Firebase configuration object

## 6. Set Up Environment Variables

Create a `.env.local` file in the root of your project and add the following variables with your Firebase configuration:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

## 7. Restart Your Development Server

After setting up the environment variables, restart your development server for the changes to take effect.

## Additional Notes

- The `users` collection in Firestore will be automatically created when a user registers or signs in with Google
- Each user document will contain basic profile information and a timestamp
- You can extend the user document with additional fields as needed 