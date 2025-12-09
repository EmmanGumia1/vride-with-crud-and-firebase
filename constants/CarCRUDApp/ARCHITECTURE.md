# Vride - Architecture & Flow Diagrams

## App Navigation Flow

```
┌─────────────────────────────────────────┐
│      App Starts (app/_layout.tsx)       │
│                                         │
│  ├─ Check Auth State                   │
│  └─ Show Loading Spinner               │
└────────────────┬────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
    ┌────────────┐   ┌─────────────┐
    │ User Auth? │   │ Firebase    │
    └────┬───────┘   │ Connected   │
         │           └─────────────┘
     No  │  Yes
        ▼  ▼
    ┌──────────────────────────┐
    │   Login Screen           │
    │   - Email input          │
    │   - Password input       │
    │   - Login button         │
    │   - Link to signup       │
    └────────┬─────────────────┘
             │
        ┌────┴─────┐
        │           │
    Login    Sign Up
    Success    (Signup Screen)
        │           │
        └───┬───┬───┘
            │   │
            ▼   ▼
         ┌───────────────┐
         │ Create User   │
         │ in Firebase   │
         └───────┬───────┘
                 │
                 ▼
        ┌──────────────────────────┐
        │    Home Screen           │
        │    - Car List            │
        │    - Search Bar          │
        │    - FAB (+) Button      │
        │    - Logout Button       │
        └──────────────────────────┘
                 │
        ┌────────┴─────────────┐
        │                      │
    Add/Edit Car         Search/View
        │                      │
        ▼                      ▼
    ┌──────────────┐    ┌───────────┐
    │ Modal Form   │    │ Filter    │
    │ - Car fields │    │ Results   │
    │ - Color picker     │ by Name/  │
    │ - Submit     │    │ Model/    │
    └──────────────┘    │ Brand     │
                        └───────────┘
        │                      │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │ Real-time Firestore  │
        │ Update Car List      │
        └──────────────────────┘
                   │
                   └─► Return to Home Screen
```

---

## Authentication Flow

```
┌──────────────────────┐
│   AuthProvider       │
│  (auth-context.tsx)  │
└──────────────────────┘
         │
         ├─ onAuthStateChanged() listener
         │  └─ Tracks user state
         │
         ├─ useAuth() hook
         │  ├─ user: User | null
         │  ├─ loading: boolean
         │  ├─ signUp()
         │  ├─ signIn()
         │  └─ logOut()
         │
         └─ Wrapped around entire app

┌──────────────────────────────────┐
│    Firebase Authentication       │
│    - Email/Password provider     │
│    - User credentials encrypted  │
│    - Session management          │
└──────────────────────────────────┘
         │
         ├─ createUserWithEmailAndPassword
         ├─ signInWithEmailAndPassword
         └─ signOut
```

---

## Data Flow (CRUD Operations)

```
┌─────────────────────────────────────────────────────────┐
│            User Action (Add/Edit/Delete Car)            │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
    ADD CAR      EDIT CAR     DELETE CAR
    │            │            │
    ▼            ▼            ▼
┌─────────┐  ┌────────┐   ┌────────────┐
│ Validate│  │Validate│   │ Confirm    │
│ Form    │  │ Form   │   │ Alert      │
└────┬────┘  └───┬────┘   └────┬───────┘
     │           │             │
     ▼           ▼             ▼
 addDoc()    updateDoc()   deleteDoc()
     │           │             │
     └───────────┼─────────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │  Firestore Database    │
    │                        │
    │  cars/                 │
    │  ├─ {carId}            │
    │  │  ├─ name            │
    │  │  ├─ model           │
    │  │  ├─ manufacturer    │
    │  │  ├─ year            │
    │  │  ├─ color           │
    │  │  ├─ details         │
    │  │  ├─ userId          │
    │  │  └─ createdAt       │
    │  └─ ...more cars       │
    └────────────────────────┘
                 │
                 ▼
    ┌─────────────────────────┐
    │  onSnapshot() Listener  │
    │  (Real-time update)     │
    └────────────┬────────────┘
                 │
                 ▼
    ┌─────────────────────────┐
    │  Update UI Component    │
    │  - setCars(newData)     │
    │  - Filter results       │
    │  - Display updated list │
    └─────────────────────────┘
```

---

## Search Flow

```
User types in search bar
         │
         ▼
setSearchQuery(input)
         │
         ▼
useEffect triggered
         │
         ▼
Filter cars array:
  car.name.includes(query) OR
  car.model.includes(query) OR
  car.manufacturer.includes(query)
         │
         ▼
setFilteredCars(results)
         │
         ▼
Re-render with filtered list
         │
         ▼
Display matching cars
(or empty state if none)
```

---

## Component Hierarchy

```
App
├── AuthProvider
│   ├── RootLayout
│   │   ├── LoginScreen
│   │   │   └── Form (email, password)
│   │   │
│   │   ├── SignupScreen
│   │   │   └── Form (email, password, confirm)
│   │   │
│   │   └── TabNavigation
│   │       └── HomeScreen
│   │           ├── Header
│   │           │   ├── Logo (Vride)
│   │           │   └── Logout Button
│   │           │
│   │           ├── SearchBar
│   │           │   └── TextInput
│   │           │
│   │           ├── CarList
│   │           │   └── FlatList
│   │           │       └── CarCard (multiple)
│   │           │           ├── Car Info
│   │           │           ├── Edit Button
│   │           │           └── Delete Button
│   │           │
│   │           ├── FAB (+Button)
│   │           │
│   │           └── AddEditCarModal
│   │               ├── TextInputs (name, model, etc)
│   │               ├── ColorPicker
│   │               └── Submit Button
│   │
│   └── Modal Components
```

---

## Database Schema

```
Firebase Project
│
├── Authentication
│   └── Email/Password Users
│       └── user.uid (unique ID)
│
└── Firestore Database
    │
    └── cars/ (collection)
        │
        ├── {autoGeneratedId}
        │   ├── name: string
        │   ├── manufacturer: string
        │   ├── model: string
        │   ├── year: number
        │   ├── color: string
        │   ├── details: string
        │   ├── userId: string (indexes user)
        │   ├── createdAt: timestamp
        │   └── ... more cars
        │
        └── {documentId}
            ├── ...same structure
            └── ...more cars
```

---

## State Management Flow

```
┌──────────────────┐
│  Global State    │
│  (AuthContext)   │
├──────────────────┤
│ user: User       │
│ loading: boolean │
│ auth functions   │
└────────┬─────────┘
         │
         └──► Used in: app/_layout.tsx
             - Route decision (login vs home)

┌──────────────────┐
│  Home Screen     │
│  Local State     │
├──────────────────┤
│ cars: Car[]      │
│ filtered: Car[]  │
│ search: string   │
│ modal: boolean   │
│ editing: Car|null
└────────┬─────────┘
         │
         ├──► Used in: Rendering car list
         ├──► Used in: Search filtering
         └──► Used in: Modal management

┌──────────────────┐
│  Modal Component │
│  Local State     │
├──────────────────┤
│ name: string     │
│ model: string    │
│ ...other fields  │
│ loading: boolean │
│ error: string    │
└────────┬─────────┘
         │
         └──► Used in: Form display
             - Input values
             - Loading/error states
```

---

## Security Flow

```
User Signup
    │
    ▼
Firebase Creates User
    │ (Password hashed)
    │
    ▼
User Added to Authentication DB
    │
    ▼
Token Generated
    │
    ▼
User Added to Context State
    │
    ▼

User Adds Car
    │
    ▼
Check: Is user authenticated?
    ├─ NO: Block operation
    └─ YES: Continue

    ▼
Save car with userId
    │
    ▼
Firestore Security Rule Check:
    │
    ├─ Is request authenticated?
    ├─ Does userId match current user?
    │   YES: Allow write ✓
    │   NO: Block write ✗
    │
    ▼

User Views Cars
    │
    ▼
Query: WHERE userId == currentUser.uid
    │
    ▼
Only user's cars returned
```

---

## Error Handling Flow

```
Operation Initiated
         │
         ▼
Try Block
    │
    ├─ Validate input
    ├─ Call Firebase/Firestore
    └─ Update UI
         │
    ┌────┴────┐
    │         │
 Success   Error
    │         │
    ▼         ▼
Reset      Catch Block
Error State    │
Reset Form     ├─ Extract error
Close Modal    ├─ Format message
Show Toast     ├─ Set error state
              │
              ▼
          Display Error
          to User
              │
              ▼
          User can retry
```

---

## Real-time Sync Flow

```
Firestore Listener Active
(onSnapshot subscription)
         │
         ├─ Monitoring cars/ collection
         ├─ WHERE userId == currentUser.uid
         │
         ▼
Car Added/Updated/Deleted in Firestore
         │
         ▼
Listener Triggered Automatically
         │
         ▼
New snapshot Received
         │
         ▼
Transform docs to Car objects
    newSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
         │
         ▼
Update Local State: setCars(newData)
         │
         ▼
Component Re-renders with New Data
         │
         ▼
UI Updates Automatically
         │
         └─► No manual refresh needed!
```

---

## API Integration Points

```
Frontend Components
        │
        ├─ Firebase Auth API
        │  ├─ createUserWithEmailAndPassword()
        │  ├─ signInWithEmailAndPassword()
        │  └─ signOut()
        │
        ├─ Firestore API
        │  ├─ addDoc()          (Create)
        │  ├─ updateDoc()       (Update)
        │  ├─ deleteDoc()       (Delete)
        │  ├─ query()           (Read)
        │  └─ onSnapshot()      (Real-time)
        │
        └─ External Libraries
           ├─ React Navigation
           ├─ Expo Router
           ├─ React Native
           └─ Material Icons
```

---

## Performance Optimization Points

```
Optimization Strategy
│
├─ Component Memoization
│  └─ React.memo() for list items
│
├─ Hook Optimization
│  ├─ useCallback() for functions
│  └─ useMemo() for expensive operations
│
├─ Firestore Optimization
│  ├─ Query with WHERE clause
│  ├─ Limit results (future)
│  └─ Index on userId
│
├─ State Management
│  ├─ Only update when changed
│  ├─ Avoid re-renders
│  └─ Use local state when possible
│
└─ Bundle Optimization
   ├─ Tree shaking
   ├─ Code splitting
   └─ Dynamic imports
```

---

**Diagram Version**: 1.0
**Last Updated**: December 2025
