# Vride - Car Search App

A modern React Native car search and management application built with Expo, Firebase, and Firestore. Users can create accounts, manage cars (add, edit, delete), and search for cars by brand, model, or manufacturer. Only car owners can edit or delete their own cars.

## Features

✨ **User Authentication**
- Firebase Authentication for secure login/signup
- Email and password-based authentication
- Logout functionality

🚗 **Car Management**
- Add new cars with detailed information
- Edit your own cars
- Delete your own cars
- Real-time synchronization with Firestore

🔍 **Search Functionality**
- Search cars by brand name
- Search cars by model
- Search cars by manufacturer
- Real-time filtered results

💅 **Modern UI**
- Clean and intuitive design
- Beautiful color scheme (Coral red #FF6B6B)
- Smooth animations and transitions
- Responsive layout

🔐 **Privacy & Security**
- Cars are tied to user accounts
- Only car owners can view, edit, or delete their cars
- Firebase Firestore with user-based data isolation

## Project Structure

```
CarCRUDApp/
├── app/
│   ├── _layout.tsx              # Root layout with auth navigation
│   ├── login.tsx                # Login screen
│   ├── signup.tsx               # Sign up screen
│   ├── home-screen.tsx          # Main car list with search
│   ├── add-edit-car-modal.tsx   # Add/Edit car modal
│   └── (tabs)/
│       ├── _layout.tsx          # Tab navigation layout
│       └── index.tsx            # Home tab with Vride header
├── constants/
│   ├── auth-context.tsx         # Authentication context & hooks
│   └── firebase.ts              # Firebase configuration
├── components/                  # Reusable UI components
├── hooks/                       # Custom React hooks
└── package.json                 # Project dependencies
```

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Expo CLI** installed globally: `npm install -g expo-cli`
- **Firebase Account** (for backend services)

## Setup Instructions

### Step 1: Clone or Extract the Project

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

### Step 3: Setup Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing one)
3. Enable **Authentication**:
   - Go to Authentication → Sign-in method
   - Enable "Email/Password" authentication
4. Create a **Firestore Database**:
   - Go to Firestore Database
   - Create database in test mode (or with custom security rules)
5. Get your Firebase configuration:
   - Go to Project Settings → General
   - Scroll down to "Your apps" and select the web app
   - Copy the Firebase config object

### Step 4: Configure Firebase in App

Open `constants/firebase.ts` and replace the placeholder values:

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

### Step 5: Setup Firestore Security Rules (Optional but Recommended)

In Firebase Console, go to Firestore Database → Rules and set:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /cars/{document=**} {
      allow read, write: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         request.resource.data.userId == request.auth.uid);
    }
  }
}
```

This ensures users can only access and modify their own cars.

### Step 6: Start the App

```bash
npx expo start --tunnel
```

For iOS:
```bash
npm run ios
```

For Android:
```bash
npm run android
```

For Web:
```bash
npm run web
```

## Usage Guide

### Authentication

1. **First Time Users**: Click "Sign Up" on the login screen
   - Enter email and password
   - Confirm password
   - Tap "Sign Up"

2. **Returning Users**: Login with your credentials
   - Enter email and password
   - Tap "Login"

### Managing Cars

**Add a Car**:
1. Tap the red "+" button at the bottom right
2. Fill in the car details:
   - **Car Name**: The name/title of the car (e.g., "Tesla Model 3")
   - **Manufacturer**: The car brand (e.g., "Tesla")
   - **Model**: The model name (e.g., "Model 3")
   - **Year**: Manufacturing year
   - **Color**: Select from available colors
   - **Car Details**: Additional information (optional)
3. Tap "Add Car"

**Search Cars**:
1. Use the search bar at the top
2. Type to search by:
   - Car name
   - Manufacturer
   - Model
3. Results update in real-time

**Edit a Car**:
1. Find the car in the list
2. Tap the "Edit" button (pencil icon)
3. Modify the information
4. Tap "Update Car"

**Delete a Car**:
1. Find the car in the list
2. Tap the "Delete" button (trash icon)
3. Confirm deletion in the dialog

**Logout**:
1. Tap the "Logout" button in the top-right corner
2. You'll be returned to the login screen

## API Reference

### Authentication Context (`useAuth`)

```typescript
const { user, loading, signUp, signIn, logOut } = useAuth();
```

- `user`: Current authenticated Firebase user
- `loading`: Boolean indicating if auth is being checked
- `signUp(email, password)`: Create new account
- `signIn(email, password)`: Login with credentials
- `logOut()`: Logout current user

### Car Data Model

```typescript
interface Car {
  id: string;                  // Firestore document ID
  name: string;               // Car name/title
  model: string;              // Car model
  manufacturer: string;       // Car brand
  details: string;            // Additional details
  year: number;               // Manufacturing year
  color: string;              // Car color
  userId: string;             // Owner's user ID
  createdAt?: Date;           // Creation timestamp
}
```

## Firestore Database Structure

```
cars/
├── {carId}
│   ├── name: string
│   ├── model: string
│   ├── manufacturer: string
│   ├── details: string
│   ├── year: number
│   ├── color: string
│   ├── userId: string (indexed)
│   └── createdAt: timestamp
```

## Styling & Theme

The app uses a modern design with:

- **Primary Color**: #FF6B6B (Coral Red)
- **Background**: #F8F9FB (Light Blue-Gray)
- **Cards**: #FFF (White) with subtle shadows
- **Text Primary**: #333 (Dark Gray)
- **Text Secondary**: #666 (Medium Gray)
- **Borders**: #E8E8E8 (Light Gray)

All components feature:
- Rounded corners (border-radius: 12px)
- Subtle shadows for depth
- Proper padding and spacing
- Touch feedback

## Troubleshooting

### "Firebase is not initialized"
- Ensure you've added your Firebase credentials in `constants/firebase.ts`
- Verify all required fields are filled in the config

### "No cars shown"
- Make sure you're logged in with your account
- Only cars you created will be visible
- Check that your Firestore database is created and rules allow access

### "Search not working"
- The search is case-insensitive and searches all three fields (name, model, manufacturer)
- Try clearing the search field and typing slowly
- Ensure data is synced to Firestore

### Authentication errors
- Check that Email/Password authentication is enabled in Firebase
- Verify your Firebase project is properly configured
- Check internet connection

## Environment Variables

No `.env` file is required. Firebase configuration is managed directly in `constants/firebase.ts`.

For production deployment, consider using environment variables:

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
# etc.
```

Then import from environment:
```typescript
import { getEnvSecurely } from 'expo-constants';
const firebaseConfig = {
  apiKey: getEnvSecurely('EXPO_PUBLIC_FIREBASE_API_KEY'),
  // ...
};
```

## Building for Production

### iOS Build
```bash
expo build:ios
```

### Android Build
```bash
expo build:android
```

### Web Build
```bash
expo export --platform web
```

## Technologies Used

- **React Native** - Cross-platform mobile development
- **Expo** - React Native framework and toolchain
- **Firebase** - Authentication and backend
- **Firestore** - Real-time cloud database
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Tab-based navigation
- **Expo Router** - File-based routing

## Security Considerations

1. **Never commit Firebase credentials** to version control
2. **Use environment variables** for sensitive data in production
3. **Enable Firebase Security Rules** to restrict database access
4. **Regularly update dependencies** to patch security vulnerabilities
5. **Use strong passwords** and encourage users to do the same

## Contributing

Feel free to fork this project and submit pull requests for improvements!

## License

This project is open source and available under the MIT License.

## Support

For issues and feature requests, please create an issue in the project repository.

## Author

Created with ❤️ for car enthusiasts and React Native developers.

---

**Happy coding! 🚀**
