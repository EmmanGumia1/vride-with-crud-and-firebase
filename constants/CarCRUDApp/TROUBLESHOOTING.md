# Vride - Troubleshooting Guide

## Common Issues & Solutions

### Authentication Issues

#### 1. "Firebase is not initialized" Error

**Problem**: App crashes with Firebase initialization error

**Solutions**:
1. Check `constants/firebase.ts` has your Firebase config
2. Verify all config values are filled in (not "YOUR_API_KEY")
3. Ensure Firebase SDK is installed: `npm install firebase`
4. Clear cache: `npm start -- --reset-cache`

```typescript
// ✅ Correct
const firebaseConfig = {
  apiKey: "AIzaSyD...",  // Real value
  authDomain: "myapp-abc.firebaseapp.com",
  // ... other fields with real values
};

// ❌ Wrong
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",  // Placeholder
  // ...
};
```

#### 2. Login/Signup Not Working

**Problem**: Authentication requests fail

**Solutions**:
1. Check internet connection
2. Verify Email/Password auth is enabled in Firebase Console
3. Check Firebase project ID is correct
4. Ensure credentials are in the correct format
5. Check app.json has correct scheme

```bash
# Reset cache and restart
npm start -- --reset-cache
```

#### 3. "User Not Authenticated" After Login

**Problem**: Login succeeds but app still shows login screen

**Solutions**:
1. Check `useAuth()` hook is returning user correctly
2. Verify Firestore rules aren't blocking access
3. Check auth state persistence is working
4. Try logging in again
5. Check browser/app local storage

```typescript
// Debug: Add console logs
const { user, loading } = useAuth();
console.log('User:', user);
console.log('Loading:', loading);
```

#### 4. Account Creation Fails with "Email Already in Use"

**Problem**: Cannot create account with existing email

**Solutions**:
- Use a different email address
- Delete the old account in Firebase Console (Authentication → Users)
- Wait 24 hours for account to be deleted (Firebase policy)

---

### Car Management Issues

#### 5. "No Cars Showing"

**Problem**: Added cars but they don't appear in list

**Solutions**:
1. Verify you're logged in with correct account
2. Check Firestore database exists
3. Verify `cars` collection is created
4. Check Firestore security rules allow access
5. Check network is connected
6. Try scrolling or refreshing

```typescript
// Debug: Check if cars are being fetched
const [cars, setCars] = useState<Car[]>([]);
console.log('Cars:', cars);
```

#### 6. Search Not Working

**Problem**: Typing in search doesn't filter results

**Solutions**:
1. Search is case-insensitive - any case works
2. Search checks name, model, and manufacturer
3. Clear search field and try again
4. Verify car data is synced to Firestore
5. Check for typos in car fields

```typescript
// Search checks these fields
car.name.toLowerCase().includes(query) ||
car.model.toLowerCase().includes(query) ||
car.manufacturer.toLowerCase().includes(query)
```

#### 7. Can't Edit/Delete Cars

**Problem**: Edit/Delete buttons don't work

**Solutions**:
1. Verify you're the car owner (creator)
2. Check Firestore rules allow updates
3. Check internet connection
4. Try refreshing the app
5. Check Firebase console for errors

```typescript
// Only show edit/delete if you're the owner
if (car.userId === user.uid) {
  // Show buttons
}
```

#### 8. Delete Confirmation Doesn't Appear

**Problem**: Tapping delete does nothing

**Solutions**:
1. Check Alert is imported from react-native
2. Try tapping again (double-tap sometimes works)
3. Check for JavaScript errors in console
4. Restart app

```typescript
import { Alert } from 'react-native';

// Should show dialog
Alert.alert('Delete Car', 'Are you sure?', [
  { text: 'Cancel' },
  { text: 'Delete', onPress: () => { /* ... */ } }
]);
```

---

### UI/Styling Issues

#### 9. Buttons Look Wrong or Don't Respond

**Problem**: Buttons aren't styled correctly or won't tap

**Solutions**:
1. Check button TouchableOpacity is properly wrapped
2. Verify styles are applied correctly
3. Check button isn't disabled (disabled={true})
4. Restart app and clear cache

```typescript
// ✅ Correct
<TouchableOpacity style={styles.button} onPress={handlePress}>
  <Text style={styles.buttonText}>Press Me</Text>
</TouchableOpacity>

// ❌ Wrong
<TouchableOpacity disabled={true}> {/* Won't respond */}
```

#### 10. Colors Look Wrong

**Problem**: Color doesn't match design

**Solutions**:
1. Check hex color codes are correct
2. Verify color names match the color map
3. Check phone display settings (brightness, color filter)
4. Clear cache: `npm start -- --reset-cache`

**Color Map**:
```javascript
const COLOR_MAP = {
  Red: '#FF6B6B',
  Blue: '#4A90E2',
  Black: '#333333',
  White: '#FFFFFF',
  Silver: '#C0C0C0',
  Gray: '#808080',
  Gold: '#FFD700',
  Green: '#2ECC71',
  Orange: '#FF9500',
  Purple: '#9B59B6',
};
```

#### 11. Text Too Small/Large

**Problem**: Text is unreadable

**Solutions**:
1. Check font size in styles (should be 12-40px range)
2. Check device zoom settings
3. Check OS text size settings
4. Verify line-height is set correctly

```typescript
// Font size scale
40px - App title
24px - Screen heading
18px - Card title
16px - Subtitle
14px - Body text
12px - Small text
```

#### 12. Layout Issues or Overlapping Elements

**Problem**: UI elements overlap or position incorrectly

**Solutions**:
1. Check padding/margin values
2. Verify flexbox layout properties
3. Check safe area insets on notch devices
4. Test on different screen sizes
5. Check for absolute positioning conflicts

```typescript
// Use SafeAreaView for notch devices
import { SafeAreaView } from 'react-native';

<SafeAreaView style={{ flex: 1 }}>
  {/* Your content */}
</SafeAreaView>
```

---

### Performance Issues

#### 13. App Slow or Freezing

**Problem**: App lags or becomes unresponsive

**Solutions**:
1. Clear cache: `npm start -- --reset-cache`
2. Reduce number of cars (try adding <100 cars)
3. Check network isn't congested
4. Close other apps using memory
5. Restart emulator/device
6. Update dependencies: `npm update`

```bash
# Check performance
npm run web  # Run on web to check performance

# Profile with React DevTools
npm install -g react-devtools
react-devtools
```

#### 14. Search Is Slow

**Problem**: Filtering cars takes time

**Solutions**:
1. Normal for large lists (100+)
2. Implement pagination for better performance
3. Use React.useMemo for optimization:

```typescript
const filteredCars = useMemo(() => {
  return cars.filter(/* ... */);
}, [cars, searchQuery]);
```

---

### Network & Firestore Issues

#### 15. Firebase Connection Errors

**Problem**: "Network error" or "CORS error"

**Solutions**:
1. Check internet connection
2. Verify Firebase project ID
3. Check firewall/VPN isn't blocking
4. Try on different network
5. Restart app

#### 16. Data Not Saving to Firestore

**Problem**: Added car but it doesn't persist

**Solutions**:
1. Check Firestore database exists
2. Verify `cars` collection is created
3. Check Firebase rules allow write
4. Verify userId is being saved
5. Check for errors in Firebase console

```typescript
// Debug: Check if data was saved
await addDoc(collection(db, 'cars'), {
  name, model, manufacturer, details, year, color,
  userId: user?.uid,  // Make sure user ID exists
  createdAt: new Date()
});
console.log('Car added successfully');
```

#### 17. Real-time Updates Not Working

**Problem**: Added car in one place but doesn't show elsewhere

**Solutions**:
1. Restart app
2. Check Firestore listener is active
3. Verify `onSnapshot` is properly subscribed
4. Check for errors in console
5. Ensure unique car IDs

---

### Device-Specific Issues

#### 18. App Crashes on iOS

**Problem**: App works on Android but crashes on iOS

**Solutions**:
1. Check iOS specific code
2. Ensure pod dependencies are installed
3. Clear derived data:
   ```bash
   rm -rf ~/Library/Developer/Xcode/DerivedData/*
   ```
4. Reinstall pods:
   ```bash
   cd ios && pod install && cd ..
   ```

#### 19. App Crashes on Android

**Problem**: App works on iOS but crashes on Android

**Solutions**:
1. Check Android specific code
2. Check heap size
3. Clear gradle cache:
   ```bash
   cd android && ./gradlew clean && cd ..
   ```
4. Try APK instead of AAB

#### 20. Emulator Won't Start

**Problem**: Android/iOS emulator won't launch

**Solutions**:
1. Check Android Studio is installed
2. Verify emulator exists in device manager
3. Try running from Android Studio GUI
4. Check system RAM (needs 2GB+)
5. Restart emulator manager

---

### Development & Build Issues

#### 21. Metro Bundler Crashes

**Problem**: "Metro bundler encountered an error"

**Solutions**:
```bash
# Clear cache and restart
npm start -- --reset-cache

# Or kill process manually
pkill -f "node.*metro"
npm start
```

#### 22. Dependencies Conflict

**Problem**: "Could not resolve module" errors

**Solutions**:
```bash
# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Or clear cache
npm cache clean --force
npm install
```

#### 23. Expo CLI Issues

**Problem**: `expo` command not found

**Solutions**:
```bash
# Install globally
npm install -g expo-cli

# Or use npx
npx expo start

# Check installation
expo --version
```

#### 24. Port Already in Use

**Problem**: "Port 19006 is already in use"

**Solutions**:
```bash
# Use different port
npm start -- --port 19007

# Or kill process using port
# On macOS/Linux:
lsof -i :19006 | grep -v PID | awk '{print $2}' | xargs kill

# On Windows (PowerShell):
netstat -ano | findstr :19006
taskkill /PID <PID> /F
```

---

### Data & Firestore Issues

#### 25. Firestore Rules Too Restrictive

**Problem**: "Permission denied" errors

**Recommended Rules**:
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

#### 26. Accidentally Deleted All Cars

**Problem**: Deleted all cars from list

**Solutions**:
1. Firestore has automatic backups (7 days)
2. Contact Firebase support to restore
3. Manually add cars back
4. Consider adding soft-delete in future

```typescript
// Future enhancement: Soft delete
deleted: false,  // Instead of deleting, mark as deleted
deletedAt: timestamp
```

---

### Debugging Techniques

#### Enable Detailed Logging

```typescript
// Add to auth-context.tsx
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    console.log('Auth state changed:', user?.uid);
    setUser(user);
    setLoading(false);
  });
  return unsubscribe;
}, []);
```

#### Check Firestore Data

```typescript
// Add temporary console log to home-screen.tsx
useEffect(() => {
  if (!user) return;
  
  const q = query(collection(db, 'cars'), where('userId', '==', user.uid));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    console.log('Firestore snapshot:', snapshot.docs.map(d => d.data()));
    // ...
  });
  
  return unsubscribe;
}, [user]);
```

#### Use React DevTools

```bash
# Install
npm install -g react-devtools

# Run in separate terminal
react-devtools

# App should auto-connect when running on web
npm run web
```

---

### Getting Help

If you're still stuck:

1. **Check the logs**
   - Browser console (web)
   - Device logs (mobile)
   - Expo console output

2. **Simplify the issue**
   - Create a minimal reproducible example
   - Test one feature at a time
   - Comment out suspected code

3. **Resources**
   - [React Native Docs](https://reactnative.dev)
   - [Expo Docs](https://docs.expo.dev)
   - [Firebase Docs](https://firebase.google.com/docs)
   - [Stack Overflow](https://stackoverflow.com)

4. **Provide details when asking for help**
   - Error message (full text)
   - Steps to reproduce
   - Device/OS information
   - App version

---

**Last Updated**: December 2025
