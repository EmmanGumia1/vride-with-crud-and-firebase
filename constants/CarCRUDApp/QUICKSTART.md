# Vride - Quick Start Guide

## 🚀 5-Minute Setup

### Prerequisites
- Node.js v14+
- npm or yarn
- Firebase Account (free tier is fine)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Get Firebase credentials**
   - Visit [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication → Email/Password
   - Create Firestore Database (test mode)
   - Copy your web app config

3. **Add Firebase config**
   - Open `constants/firebase.ts`
   - Replace placeholder values with your Firebase config

4. **Start the app**
   ```bash
   npm start
   ```

### First Steps

1. **Sign up** with an email and password
2. **Add a car** using the red "+" button
3. **Search** for cars using the search bar
4. **Edit/Delete** your cars

---

## App Features

### 🔐 Authentication
- Email/Password signup and login
- Secure logout button
- User-specific data isolation

### 🚗 Car Management
- **Add**: Create new cars with 6 fields
- **Edit**: Modify your cars
- **Delete**: Remove cars (with confirmation)
- **Search**: Find cars by name, brand, or model

### 💎 Modern Design
- Beautiful coral red theme (#FF6B6B)
- Smooth animations
- Intuitive user interface
- Responsive layout

---

## Project Architecture

```
Authentication Flow:
  Login/Signup → Firebase Auth → App Navigation → Home Screen

Car Management:
  Add Car → Firestore → Real-time Update → Car List
  
Search:
  Type Query → Filter Cars → Display Results
```

---

## Key Technologies

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **Firebase** - Authentication
- **Firestore** - Real-time database
- **TypeScript** - Type safety
- **Expo Router** - Navigation

---

## Car Fields

When adding or editing a car, you'll need:

| Field | Type | Example |
|-------|------|---------|
| Car Name | Text | Tesla Model 3 |
| Manufacturer | Text | Tesla |
| Model | Text | Model 3 |
| Year | Number | 2024 |
| Color | Selection | Red, Blue, Black, etc. |
| Car Details | Text (Optional) | Well-maintained, low mileage |

---

## Common Actions

### Add a Car
1. Tap red **+** button
2. Fill in all fields
3. Select a color
4. Tap **"Add Car"**

### Search for Cars
1. Use search bar at top
2. Type car name, brand, or model
3. Results update in real-time

### Edit a Car
1. Find car in list
2. Tap **Edit** (pencil icon)
3. Modify information
4. Tap **"Update Car"**

### Delete a Car
1. Find car in list
2. Tap **Delete** (trash icon)
3. Confirm in dialog

### Logout
1. Tap **Logout** button (top-right)
2. Return to login screen

---

## Troubleshooting

### Login issues
✓ Check Firebase is configured in `constants/firebase.ts`
✓ Verify Email/Password auth is enabled in Firebase
✓ Check internet connection

### No cars showing
✓ Ensure you're logged in
✓ Check Firestore database exists
✓ Add a car using the **+** button

### Search not working
✓ Clear search field and try again
✓ Check car data is synced to Firestore
✓ Search is case-insensitive

---

## File Structure

```
app/
  ├── _layout.tsx              ← Auth routing
  ├── login.tsx                ← Login screen
  ├── signup.tsx               ← Sign up screen
  ├── home-screen.tsx          ← Car list & search
  ├── add-edit-car-modal.tsx   ← Car form modal
  └── (tabs)/
      ├── _layout.tsx          ← Tab navigation
      └── index.tsx            ← Main home screen

constants/
  ├── firebase.ts              ← Firebase config
  └── auth-context.tsx         ← Auth provider & hooks
```

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure Firebase
3. ✅ Run the app
4. ✅ Create an account
5. ✅ Add your first car
6. 🎉 Enjoy searching!

---

For detailed setup instructions, see the main [README.md](./README.md)
