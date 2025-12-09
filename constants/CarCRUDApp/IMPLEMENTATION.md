# Vride Implementation Guide

## Complete Setup & Deployment

This guide provides step-by-step instructions for setting up, running, and deploying the Vride car search app.

---

## Table of Contents

1. [Environment Setup](#environment-setup)
2. [Firebase Configuration](#firebase-configuration)
3. [Project Installation](#project-installation)
4. [Running the App](#running-the-app)
5. [Feature Overview](#feature-overview)
6. [Deployment](#deployment)
7. [API Integration](#api-integration)

---

## Environment Setup

### System Requirements

| Requirement | Minimum | Recommended |
|------------|---------|-------------|
| Node.js | v14 | v16+ |
| npm | v6 | v8+ |
| RAM | 4GB | 8GB |
| Disk Space | 2GB | 5GB |

### Installation Steps

1. **Install Node.js**
   - Download from [nodejs.org](https://nodejs.org)
   - Choose LTS version
   - Verify installation: `node --version`

2. **Install Expo CLI**
   ```bash
   npm install -g expo-cli
   ```
   Verify: `expo --version`

3. **Install a code editor** (VS Code recommended)
   - Download from [code.visualstudio.com](https://code.visualstudio.com)

4. **Install Mobile Emulator** (Optional)
   - **iOS**: Xcode from App Store (macOS only)
   - **Android**: Android Studio with Android Emulator

---

## Firebase Configuration

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `vride`
4. Follow the wizard (disable Google Analytics if desired)
5. Click **"Create project"**

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **"Get started"**
3. Select **"Email/Password"** provider
4. Enable it
5. Click **"Save"**

### Step 3: Create Firestore Database

1. Go to **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select region (preferably closest to you)
5. Click **"Create"**

### Step 4: Get Firebase Config

1. Go to **Project Settings** (⚙️ icon)
2. Under "Your apps", click on the web app (or create one if needed)
3. Copy the config object:
   ```javascript
   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };
   ```

### Step 5: Set Security Rules (Important!)

In Firestore → Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read/write their own cars only
    match /cars/{document=**} {
      allow read, write: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         request.resource.data.userId == request.auth.uid);
    }
  }
}
```

Click **"Publish"**

---

## Project Installation

### Step 1: Navigate to Project

```bash
cd CarCRUDApp
```

### Step 2: Install Dependencies

```bash
npm install
```

Or with yarn:
```bash
yarn install
```

This installs:
- `react-native` - Core framework
- `expo` - Development platform
- `firebase` - Backend services
- `@react-navigation` - Navigation
- All other dependencies

### Step 3: Configure Firebase

1. Open `constants/firebase.ts`
2. Replace the placeholder firebaseConfig with your config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

3. Save the file

### Step 4: Verify Installation

```bash
npm start
```

You should see the Expo menu with options to run on different platforms.

---

## Running the App

### Development Server

```bash
npm start
```

You'll see:
```
To run your app, choose one of the following:

› Scan the QR code with Expo Go
› Press 'a' to open Android emulator
› Press 'i' to open iOS simulator
› Press 'w' to open web browser
```

### On Expo Go (Easiest)

1. Install **Expo Go** app on your phone (iOS or Android)
2. Scan the QR code shown in terminal
3. App loads on your phone in seconds
4. Live reload: Edit a file and see changes instantly

### On Android Emulator

```bash
npm run android
```

Or:
```bash
adb devices  # Verify emulator is running
npm run android
```

### On iOS Simulator (macOS only)

```bash
npm run ios
```

### On Web Browser

```bash
npm run web
```

Opens at `localhost:19006`

---

## Feature Overview

### 1. Authentication

**Location**: `app/login.tsx`, `app/signup.tsx`

**Features**:
- Email/password signup
- Email/password login
- Password validation (min 6 chars)
- Error messages
- Loading states

**Code Example**:
```typescript
const { signUp, signIn } = useAuth();
await signUp(email, password);
await signIn(email, password);
```

### 2. Car Management

**Location**: `app/home-screen.tsx`, `app/add-edit-car-modal.tsx`

**Operations**:
```typescript
// Add car
await addDoc(collection(db, 'cars'), {
  name, model, manufacturer, details, year, color,
  userId: user.uid,
  createdAt: new Date()
});

// Update car
await updateDoc(doc(db, 'cars', carId), { name, model, ... });

// Delete car
await deleteDoc(doc(db, 'cars', carId));

// Read cars
const q = query(
  collection(db, 'cars'),
  where('userId', '==', user.uid)
);
```

### 3. Search Functionality

**Location**: `app/home-screen.tsx`

**Implementation**:
```typescript
const filtered = cars.filter(car =>
  car.name.toLowerCase().includes(query) ||
  car.model.toLowerCase().includes(query) ||
  car.manufacturer.toLowerCase().includes(query)
);
```

**Features**:
- Real-time filtering
- Case-insensitive search
- Multi-field search (name, model, manufacturer)

### 4. Real-time Synchronization

Uses Firebase Firestore listeners:

```typescript
const unsubscribe = onSnapshot(
  query(collection(db, 'cars'), where('userId', '==', user.uid)),
  (snapshot) => {
    // Update UI with latest data
    setCars(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  }
);
```

---

## Deployment

### Web Deployment

#### Static Export for Hosting

1. Build for web:
   ```bash
   npm run web
   ```

2. Export:
   ```bash
   expo export --platform web
   ```

3. Upload `dist` folder to:
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static hosting

#### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### iOS Build

```bash
# Create local build
eas build --platform ios --local

# Or use Expo cloud build
eas build --platform ios
```

Requires:
- Apple Developer Account
- Xcode (10GB+)
- provisioning profiles

### Android Build

```bash
# Create local build
eas build --platform android --local

# Or use Expo cloud build
eas build --platform android
```

Requires:
- Android Studio
- JDK
- Generated keystore

---

## API Integration

### Firestore Collections

#### cars Collection

```
cars/
├── {carId: string}
│   ├── name: string (indexed)
│   ├── model: string (indexed)
│   ├── manufacturer: string (indexed)
│   ├── details: string
│   ├── year: number (indexed)
│   ├── color: string
│   ├── userId: string (indexed - for security)
│   └── createdAt: timestamp
```

**Indexes to Create** (if needed):

1. Collection: `cars`
   - Fields: `userId` (Ascending), `createdAt` (Descending)
   
2. Collection: `cars`
   - Fields: `userId` (Ascending), `name` (Ascending)

### Firebase SDK Functions Used

```typescript
// Authentication
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

// Firestore
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  doc
} from 'firebase/firestore';
```

### Error Handling

Common errors and solutions:

```typescript
try {
  await signUp(email, password);
} catch (error) {
  if (error.code === 'auth/email-already-in-use') {
    setError('Email already registered');
  } else if (error.code === 'auth/weak-password') {
    setError('Password too weak');
  } else {
    setError(error.message);
  }
}
```

---

## Advanced Configuration

### Environment Variables

For production, use Expo environment variables:

1. Create `.env` file (not in version control):
   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=...
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   ```

2. Use in code:
   ```typescript
   const firebaseConfig = {
     apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
     // ...
   };
   ```

### Custom Styling

Update color scheme in components:

```typescript
// Current primary color
const PRIMARY_COLOR = '#FF6B6B';

// Update in all StyleSheet definitions for custom theme
```

### Performance Optimization

1. **Pagination**: Limit initial cars load:
   ```typescript
   const q = query(
     collection(db, 'cars'),
     where('userId', '==', user.uid),
     limit(20)
   );
   ```

2. **Caching**: Implement React Query or SWR
3. **Images**: Add car images to Storage
4. **Lazy Loading**: Load cars as user scrolls

---

## Debugging

### Enable Debug Mode

```bash
# In metro bundler
npm start -- --reset-cache
```

### View Logs

```bash
# Remote debugging
expo diagnostics

# Check device logs (iOS)
xcrun simctl spawn booted log stream --predicate 'process=="Vride"'

# Check device logs (Android)
adb logcat
```

### Common Issues

1. **Metro bundler crashes**
   ```bash
   npm start -- --reset-cache
   ```

2. **Firebase credentials invalid**
   - Check `constants/firebase.ts`
   - Verify credentials in Firebase Console

3. **Emulator won't start**
   - Check Android Studio/Xcode installation
   - Sufficient disk space available

---

## Support & Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Firebase Docs](https://firebase.google.com/docs)
- [GitHub Issues](https://github.com/expo/expo/issues)

---

## Version Info

- **Vride Version**: 1.0.0
- **React Native**: 0.81.5
- **Expo**: ~54.0.27
- **Firebase**: ^11.0.2
- **Node**: v14+

---

**Last Updated**: December 2025
