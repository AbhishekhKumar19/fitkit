# Fitkit AI - AI-powered Calorie Tracking App

![Fitkit AI](https://img.shields.io/badge/React%20Native-0.73-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Redux](https://img.shields.io/badge/Redux%20Toolkit-2.0-purple)

An intelligent mobile application that helps users track their daily calorie intake using AI-powered food recognition and comprehensive nutrition tracking.

## 🚀 Features

### Core Features
- **AI-Powered Food Recognition**: Upload meal photos for instant calorie and nutrient analysis
- **Manual Meal Entry**: Add meals manually with detailed nutritional information
- **Daily Dashboard**: Track daily calorie intake with visual progress indicators
- **Weekly Analytics**: View trends, charts, and insights about your eating habits
- **Profile Management**: Personalized calorie targets based on user goals
- **Settings**: Dark mode, notifications, and app preferences

### Tracking Capabilities
- ✅ Calorie tracking
- ✅ Macronutrient tracking (Protein, Carbs, Fat)
- ✅ Meal categorization (Breakfast, Lunch, Dinner, Snack)
- ✅ Daily calorie targets
- ✅ Progress visualization
- ✅ Weekly analytics and insights

## 📱 Screenshots

### Home Dashboard
- Real-time calorie tracking
- Progress circle showing daily consumption
- Macronutrient breakdown
- Meal history

### Add Meal
- Camera integration
- Gallery selection
- AI prediction review
- Manual entry option

### Analytics
- Weekly calorie trends
- Macro distribution charts
- Insights and recommendations

## 🛠 Technology Stack

### Frontend
- **React Native 0.73** - Cross-platform mobile development
- **TypeScript** - Type-safe code
- **Redux Toolkit** - State management
- **React Navigation** - Navigation framework
- **React Native Chart Kit** - Data visualization

### Key Libraries
- `react-native-image-picker` - Image capture and selection
- `react-native-vector-icons` - Icon library
- `@react-native-async-storage/async-storage` - Local storage
- `axios` - HTTP client
- `date-fns` - Date formatting

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- React Native development environment
  - For Android: Android Studio, JDK
  - For iOS: Xcode (macOS only)

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/AbhishekhKumar19/fitkit.git
cd fitkit/FitkitAI
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Install Pods (iOS only)**
```bash
cd ios
pod install
cd ..
```

4. **Configure Backend URL**
Edit `src/services/api.ts` and update the `API_BASE_URL`:
```typescript
const API_BASE_URL = 'YOUR_BACKEND_URL/api';
```

5. **Run the app**

For Android:
```bash
npm run android
# or
yarn android
```

For iOS (macOS only):
```bash
npm run ios
# or
yarn ios
```

## 🏗 Project Structure

```
FitkitAI/
├── src/
│   ├── components/        # Reusable components
│   ├── navigation/        # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   └── MainTabNavigator.tsx
│   ├── redux/            # Redux store and slices
│   │   ├── store.ts
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       ├── mealSlice.ts
│   │       ├── analyticsSlice.ts
│   │       └── settingsSlice.ts
│   ├── screens/          # App screens
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── ProfileSetupScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── AddMealScreen.tsx
│   │   ├── AddMealManualScreen.tsx
│   │   ├── PredictionReviewScreen.tsx
│   │   ├── AnalyticsScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── services/         # API services
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── mealService.ts
│   │   └── analyticsService.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   ├── calories.ts
│   │   ├── formatters.ts
│   │   └── validation.ts
│   └── assets/           # Images, fonts, etc.
├── android/              # Android native code
├── ios/                  # iOS native code
├── App.tsx               # Root component
├── index.js              # App entry point
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript config
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
API_BASE_URL=https://your-backend-url.com/api
```

### Calorie Calculation
The app uses the Mifflin-St Jeor Formula to calculate daily calorie targets:
- **BMR** = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + s
  - s = +5 for males, -161 for females
- **TDEE** = BMR × Activity Level Multiplier
- **Goal Adjustment**:
  - Weight Loss: TDEE - 500 cal
  - Weight Gain: TDEE + 500 cal
  - Maintain: TDEE

## 🌐 Backend Integration

### Required API Endpoints

#### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile

#### Meals
- `POST /meal/upload-image` - Upload meal image for AI analysis
- `POST /meal/add` - Add meal entry
- `GET /meal/day/:date` - Get meals for specific date
- `GET /meal/week` - Get weekly meals
- `DELETE /meal/:id` - Delete meal
- `GET /meal/search?q=query` - Search food database

#### Analytics
- `GET /analytics/weekly` - Get weekly analytics
- `GET /analytics/macros` - Get macro distribution
- `GET /analytics/insights` - Get AI insights

### API Response Format
```typescript
{
  "success": boolean,
  "data": T,
  "message"?: string
}
```

## 🎨 Customization

### Theme Colors
Edit the colors in each screen's StyleSheet:
```typescript
const PRIMARY_COLOR = '#4CAF50';  // Main green
const SECONDARY_COLOR = '#2196F3'; // Blue
const DANGER_COLOR = '#f44336';    // Red
```

### Icons
Icons are from `react-native-vector-icons/Ionicons`. Browse available icons:
https://ionic.io/ionicons

## 📊 Data Models

### User
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

### Meal
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
```

### Food Item
```typescript
interface FoodItem {
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity_g: number;
}
```

## 🧪 Testing

### Run Tests
```bash
npm test
# or
yarn test
```

### Test Coverage
```bash
npm run test:coverage
# or
yarn test:coverage
```

## 🚀 Deployment

### Android
1. Generate a signed APK:
```bash
cd android
./gradlew assembleRelease
```

2. Find the APK at:
```
android/app/build/outputs/apk/release/app-release.apk
```

3. Upload to Google Play Console

### iOS (macOS only)
1. Open Xcode:
```bash
open ios/FitkitAI.xcworkspace
```

2. Select "Any iOS Device" as the target
3. Product → Archive
4. Distribute to App Store

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Abhishekh Kumar** - [GitHub](https://github.com/AbhishekhKumar19)

## 🙏 Acknowledgments

- React Native community
- Redux Toolkit team
- React Navigation team
- All open-source contributors

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Email: support@fitkitai.com

## 🗺 Roadmap

### Upcoming Features
- [ ] Google Fit / Apple Health integration
- [ ] Water intake tracker
- [ ] Meal recommendations
- [ ] Barcode scanning
- [ ] Social features (share meals)
- [ ] Workout tracking
- [ ] Recipe database
- [ ] Meal planning
- [ ] Voice-based meal logging
- [ ] Multi-language support
- [ ] Offline mode

---

**Made with ❤️ using React Native**
