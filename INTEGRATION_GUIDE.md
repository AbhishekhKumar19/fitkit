# NutriTrack AI - Frontend-Backend Integration Guide

Complete guide for integrating the React Native frontend with the Node.js backend.

---

## 🎯 Quick Start Integration

### Step 1: Deploy Backend (Choose One)

#### Option A: Render.com (Recommended - Free)
1. Go to https://render.com
2. Connect your GitHub repository (AbhishekhKumar19/fitkit)
3. Create "New Blueprint"
4. Render will detect `backend/render.yaml`
5. Configure environment variables:
   - `MONGODB_URI`: Get from MongoDB Atlas
   - `JWT_SECRET`: Generate secure random string
6. Click "Apply" and wait 5-10 minutes
7. Note your backend URL: `https://your-app.onrender.com`

#### Option B: Local Development
```bash
# Terminal 1: Start MongoDB (if local)
mongod

# Terminal 2: Start Backend
cd backend
npm install
npm run dev
# Backend runs on http://localhost:5000

# Terminal 3: Start ML Service
cd backend/ml-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
# ML service runs on http://localhost:8000
```

### Step 2: Update Frontend API URL

**File**: `src/services/api.ts`

```typescript
// For Production (Render/Railway)
const API_BASE_URL = 'https://your-backend.onrender.com/api';

// For Local Development
// const API_BASE_URL = 'http://localhost:5000/api';

// For Android Emulator
// const API_BASE_URL = 'http://10.0.2.2:5000/api';

// For iOS Simulator
// const API_BASE_URL = 'http://localhost:5000/api';
```

### Step 3: Test Connection

```bash
# In React Native app directory
npm start

# In another terminal
npm run android
# or
npm run ios
```

---

## 📡 API Endpoint Mapping

### Frontend Services ↔ Backend Endpoints

| Frontend Service | Backend Endpoint | Method | Auth Required |
|-----------------|------------------|--------|---------------|
| `authService.register()` | `/api/auth/register` | POST | No |
| `authService.login()` | `/api/auth/login` | POST | No |
| `authService.getProfile()` | `/api/auth/profile` | GET | Yes |
| `authService.updateProfile()` | `/api/auth/profile` | PUT | Yes |
| `mealService.uploadImage()` | `/api/meal/upload-image` | POST | Yes |
| `mealService.addMeal()` | `/api/meal/add` | POST | Yes |
| `mealService.getMealsForDay()` | `/api/meal/day/:date` | GET | Yes |
| `mealService.getWeeklyMeals()` | `/api/meal/week` | GET | Yes |
| `mealService.deleteMeal()` | `/api/meal/:id` | DELETE | Yes |
| `mealService.searchFood()` | `/api/meal/search` | GET | Yes |
| `analyticsService.getWeeklyAnalytics()` | `/api/analytics/weekly` | GET | Yes |
| `analyticsService.getMacros()` | `/api/analytics/macros` | GET | Yes |
| `analyticsService.getInsights()` | `/api/analytics/insights` | GET | Yes |

---

## 🔄 Data Flow Examples

### 1. User Registration Flow

```typescript
// Frontend: SignupScreen.tsx
const response = await authService.register({
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  age: 28,
  weight: 75,
  height: 175,
  gender: "male",
  activityLevel: "moderate",
  goal: "loss"
});

// Backend Response:
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 28,
      "weight": 75,
      "height": 175,
      "activityLevel": "moderate",
      "dailyCalorieTarget": 1800,
      "goal": "loss",
      "createdAt": "2024-01-15T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}

// Frontend: Store token and user
await AsyncStorage.setItem('token', response.data.token);
dispatch(setUser(response.data.user));
```

### 2. Meal Photo Upload Flow

```typescript
// Frontend: AddMealScreen.tsx
const imagePickerResult = await ImagePicker.launchCamera({
  mediaType: 'photo',
  quality: 0.8,
});

const formData = new FormData();
formData.append('image', {
  uri: imagePickerResult.assets[0].uri,
  type: 'image/jpeg',
  name: 'meal.jpg',
});

const response = await mealService.uploadImage(formData);

// Backend Response:
{
  "success": true,
  "data": {
    "items": [
      {
        "name": "Rice",
        "quantity_g": 150,
        "calories": 195,
        "protein": 4.05,
        "carbs": 42.3,
        "fat": 0.45,
        "confidence": 0.90
      },
      {
        "name": "Chicken Breast",
        "quantity_g": 120,
        "calories": 198,
        "protein": 37.2,
        "carbs": 0,
        "fat": 4.32,
        "confidence": 0.85
      }
    ],
    "imageUrl": "/uploads/meal-1234567890.jpg",
    "confidence": 0.87
  }
}

// Frontend: Navigate to PredictionReviewScreen
navigation.navigate('PredictionReview', {
  predictions: response.data.items,
  imageUrl: response.data.imageUrl
});
```

### 3. Adding Meal After Review

```typescript
// Frontend: PredictionReviewScreen.tsx
const response = await mealService.addMeal({
  mealType: selectedMealType, // 'breakfast', 'lunch', 'dinner', 'snack'
  items: editedItems, // Modified predictions
  totalCalories: calculateTotal(editedItems),
  imageUrl: imageUrl,
  createdAt: new Date().toISOString()
});

// Backend Response:
{
  "success": true,
  "data": {
    "_id": "meal_id_123",
    "userId": "user_id_456",
    "mealType": "lunch",
    "items": [...],
    "totalCalories": 393,
    "imageUrl": "/uploads/meal-1234567890.jpg",
    "createdAt": "2024-01-15T12:30:00Z"
  },
  "message": "Meal added successfully"
}

// Frontend: Update Redux store and navigate
dispatch(addMeal(response.data));
navigation.navigate('Home');
```

### 4. Daily Dashboard Data Loading

```typescript
// Frontend: HomeScreen.tsx useEffect
const today = format(new Date(), 'yyyy-MM-dd');
const mealsResponse = await mealService.getMealsForDay(today);
const profileResponse = await authService.getProfile();

// Backend Response (Meals):
{
  "success": true,
  "data": [
    {
      "_id": "meal1",
      "mealType": "breakfast",
      "items": [...],
      "totalCalories": 450,
      "createdAt": "2024-01-15T08:00:00Z"
    },
    {
      "_id": "meal2",
      "mealType": "lunch",
      "items": [...],
      "totalCalories": 650,
      "createdAt": "2024-01-15T12:30:00Z"
    }
  ]
}

// Frontend: Calculate totals
const totalCalories = mealsResponse.data.reduce((sum, meal) => sum + meal.totalCalories, 0);
const calorieTarget = profileResponse.data.dailyCalorieTarget;
const remaining = calorieTarget - totalCalories;
```

### 5. Weekly Analytics Loading

```typescript
// Frontend: AnalyticsScreen.tsx
const response = await analyticsService.getWeeklyAnalytics();

// Backend Response:
{
  "success": true,
  "data": {
    "dailyStats": [
      {
        "date": "2024-01-09",
        "totalCalories": 1850,
        "protein": 95,
        "carbs": 210,
        "fat": 58
      },
      // ... 7 days
    ],
    "averageCalories": 1975,
    "totalCalories": 13825,
    "macroDistribution": {
      "protein": 102,
      "carbs": 220,
      "fat": 61
    }
  }
}

// Frontend: Display in charts
const chartData = {
  labels: response.data.dailyStats.map(d => d.date),
  datasets: [{
    data: response.data.dailyStats.map(d => d.totalCalories)
  }]
};
```

---

## 🔐 Authentication Flow

### Token Management

```typescript
// Frontend: src/services/api.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor: Add token to headers
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await AsyncStorage.removeItem('token');
      // Redirect to login
      // navigationRef.navigate('Login');
    }
    return Promise.reject(error);
  }
);
```

### Login Flow with Token

```typescript
// 1. User enters credentials
const credentials = {
  email: 'john@example.com',
  password: 'password123'
};

// 2. Frontend sends login request
const response = await authService.login(credentials);

// 3. Backend validates and returns token
{
  "success": true,
  "data": {
    "user": { /* user object */ },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

// 4. Frontend stores token
await AsyncStorage.setItem('token', response.data.token);

// 5. Subsequent requests include token automatically
// Header: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🐛 Common Integration Issues & Solutions

### Issue 1: Network Request Failed

**Problem**: `Network request failed` error on Android

**Solution**:
1. For Android Emulator, use `http://10.0.2.2:5000/api` instead of `localhost`
2. For physical device, ensure computer and device are on same network
3. Use computer's IP address: `http://192.168.1.X:5000/api`

### Issue 2: CORS Error

**Problem**: CORS policy blocking requests

**Solution**:
Backend already configured for CORS. Ensure `FRONTEND_URL` environment variable is set:
```env
FRONTEND_URL=http://localhost:3000
```

For development, backend allows all origins.

### Issue 3: 401 Unauthorized

**Problem**: Requests return 401 even after login

**Solution**:
1. Check if token is being stored: `await AsyncStorage.getItem('token')`
2. Verify token in request headers
3. Check token expiration (default: 7 days)
4. Re-login to get fresh token

### Issue 4: Image Upload Failing

**Problem**: Image upload returns error or timeout

**Solution**:
1. Check file size (max: 10MB)
2. Verify file format (JPG, JPEG, PNG only)
3. Ensure proper FormData formatting:
```typescript
const formData = new FormData();
formData.append('image', {
  uri: image.uri,
  type: 'image/jpeg',
  name: 'meal.jpg',
} as any);
```

### Issue 5: ML Service Not Responding

**Problem**: Food prediction timeout or error

**Solution**:
1. Check if ML service is running
2. Verify `ML_SERVICE_URL` in backend .env
3. For development, backend returns mock predictions automatically
4. Check ML service logs: `cd backend/ml-service && python app.py`

---

## 🧪 Testing Integration

### 1. Test Backend Health

```bash
# Test backend
curl http://localhost:5000/api/health

# Expected response:
{
  "success": true,
  "message": "NutriTrack API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}

# Test ML service
curl http://localhost:8000/health

# Expected response:
{
  "status": "healthy",
  "model": "mock-model (development)",
  "message": "ML service is running"
}
```

### 2. Test Authentication from Frontend

```typescript
// Test registration
try {
  const response = await authService.register({
    name: "Test User",
    email: "test@example.com",
    password: "test123",
    age: 25,
    weight: 70,
    height: 170,
    gender: "male",
    activityLevel: "moderate",
    goal: "loss"
  });
  console.log('Registration successful:', response);
} catch (error) {
  console.error('Registration failed:', error);
}
```

### 3. Test Complete Flow

```
1. Open app → Shows Login screen
2. Tap "Sign Up" → Navigate to Signup
3. Fill form → Submit registration
4. Backend creates user → Returns token
5. Frontend stores token → Navigate to Profile Setup
6. Complete profile → Navigate to Home
7. Tap "Add Meal" → Open camera
8. Take photo → Upload to backend
9. Backend calls ML service → Returns predictions
10. Review predictions → Edit if needed
11. Submit meal → Backend saves meal
12. Navigate to Home → Shows updated calories
13. Navigate to Analytics → Shows weekly stats
```

---

## 📊 Data Type Compatibility

### User Types

**Frontend (TypeScript)**:
```typescript
interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  dailyCalorieTarget: number;
  goal: 'loss' | 'maintain' | 'gain';
}
```

**Backend (TypeScript)**:
```typescript
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  age: number;
  weight: number;
  height: number;
  gender?: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  dailyCalorieTarget: number;
  goal: 'loss' | 'maintain' | 'gain';
  createdAt: Date;
  updatedAt: Date;
}
```

✅ **Compatible** - Frontend types match backend response

### Meal Types

**Frontend**:
```typescript
interface Meal {
  _id: string;
  userId: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  items: FoodItem[];
  totalCalories: number;
  imageUrl?: string;
  createdAt: string;
}

interface FoodItem {
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity_g: number;
}
```

**Backend**:
```typescript
interface IMeal extends Document {
  userId: mongoose.Types.ObjectId;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  items: IFoodItem[];
  totalCalories: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

✅ **Compatible** - Types match perfectly

---

## 🔄 State Management Integration

### Redux Actions

```typescript
// After successful login
dispatch(setUser(response.data.user));
dispatch(setToken(response.data.token));

// After adding meal
dispatch(addMeal(response.data));

// After loading meals
dispatch(setMeals(response.data));

// After loading analytics
dispatch(setAnalytics(response.data));
```

### Redux Selectors

```typescript
// Get current user
const user = useSelector((state: RootState) => state.auth.user);

// Get today's meals
const meals = useSelector((state: RootState) => state.meal.meals);

// Get analytics
const analytics = useSelector((state: RootState) => state.analytics.data);
```

---

## 🚀 Deployment Checklist

### Backend Deployment

- [ ] MongoDB Atlas cluster created
- [ ] Environment variables configured
- [ ] Backend deployed to Render/Railway
- [ ] ML service deployed
- [ ] Health endpoints accessible
- [ ] CORS configured for frontend domain
- [ ] SSL/HTTPS enabled

### Frontend Updates

- [ ] API_BASE_URL updated to production URL
- [ ] Image picker permissions configured
- [ ] Network security exceptions (Android)
- [ ] App Transport Security (iOS)
- [ ] Error handling for network failures
- [ ] Loading states implemented
- [ ] Token refresh logic added

### Testing

- [ ] Registration flow works
- [ ] Login flow works
- [ ] Token storage works
- [ ] Protected routes require auth
- [ ] Image upload works
- [ ] ML predictions return
- [ ] Meals save correctly
- [ ] Analytics load correctly
- [ ] Logout clears data

---

## 📱 Platform-Specific Configuration

### Android Configuration

**File**: `android/app/src/main/AndroidManifest.xml`

```xml
<!-- Add network permissions -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

<!-- Allow cleartext traffic for development -->
<application
  android:usesCleartextTraffic="true"
  ...>
```

### iOS Configuration

**File**: `ios/FitkitAI/Info.plist`

```xml
<!-- Camera permission -->
<key>NSCameraUsageDescription</key>
<string>We need access to your camera to take meal photos</string>

<!-- Photo library permission -->
<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photo library to select meal photos</string>

<!-- App Transport Security (for HTTP) -->
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

---

## 🎯 Success Criteria

### Backend Integration Successful When:

✅ User can register and login
✅ Token is stored and used automatically
✅ Meals can be added and retrieved
✅ Images upload successfully
✅ ML predictions return results
✅ Analytics load correctly
✅ All CRUD operations work
✅ Error messages display appropriately
✅ Loading states show correctly
✅ No network errors

---

## 📞 Support & Troubleshooting

### Debug Steps

1. **Check Backend Status**
   ```bash
   curl https://your-backend.onrender.com/api/health
   ```

2. **Verify Token**
   ```typescript
   const token = await AsyncStorage.getItem('token');
   console.log('Token:', token);
   ```

3. **Check Request Headers**
   ```typescript
   api.interceptors.request.use((config) => {
     console.log('Request:', config.method, config.url);
     console.log('Headers:', config.headers);
     return config;
   });
   ```

4. **Monitor Response**
   ```typescript
   api.interceptors.response.use(
     (response) => {
       console.log('Response:', response.status, response.data);
       return response;
     },
     (error) => {
       console.error('Error:', error.response?.status, error.response?.data);
       return Promise.reject(error);
     }
   );
   ```

### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `Network request failed` | Backend not accessible | Check URL, network, backend status |
| `401 Unauthorized` | Invalid/missing token | Re-login, check token storage |
| `400 Bad Request` | Invalid request data | Check request payload format |
| `404 Not Found` | Wrong endpoint | Verify API endpoint URL |
| `500 Internal Server Error` | Backend error | Check backend logs |

---

## ✅ Integration Complete!

Once all steps are completed, your NutriTrack AI app will be fully functional with:
- ✅ Complete backend integration
- ✅ Real-time data sync
- ✅ AI-powered food recognition
- ✅ Analytics and insights
- ✅ Production-ready deployment

**Ready to launch! 🚀**
