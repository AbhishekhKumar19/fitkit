# Fitkit AI - Quick Start Guide

Get up and running with Fitkit AI in minutes! 🚀

## ⚡ Quick Installation

### 1. Clone the Repository

```bash
git clone https://github.com/AbhishekhKumar19/fitkit.git
cd fitkit/FitkitAI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Backend URL

Edit `src/services/api.ts`:
```typescript
const API_BASE_URL = 'YOUR_BACKEND_URL/api';
```

### 4. Run the App

**Android**:
```bash
npm run android
```

**iOS** (macOS only):
```bash
cd ios && pod install && cd ..
npm run ios
```

## 📱 App Features

### For Users:
- 📸 Take photos of meals for instant calorie tracking
- ✍️ Manually log meals with detailed nutrition info
- 📊 View daily progress with visual indicators
- 📈 Analyze weekly trends and macro distribution
- 👤 Personalized calorie targets based on your goals
- ⚙️ Customize app settings

### For Developers:
- 🏗 Well-organized project structure
- 📦 Redux Toolkit for state management
- 🎨 Clean UI with React Native
- 🔒 JWT authentication ready
- 📡 API service layer for backend integration
- 📝 TypeScript for type safety

## 🎯 Test the App (Without Backend)

The app is structured to work with mock data for development:

### 1. Login Screen
- Enter any email and password (will fail gracefully)
- Navigation structure is ready

### 2. View Screens
- All 10 screens are implemented
- UI/UX is fully functional
- Mock data can be added to Redux slices

### 3. Explore Features
- Camera/Gallery picker works
- Forms are functional
- Navigation flows correctly

## 🔧 Development Mode

### Start Metro Bundler
```bash
npm start
```

### Open React Native Debugger
- Android: Press `Ctrl+M` or shake device → "Debug"
- iOS: Press `Cmd+D` or shake device → "Debug"

### View Logs
```bash
# Android logs
npx react-native log-android

# iOS logs
npx react-native log-ios
```

## 🏗 Project Structure Overview

```
FitkitAI/
├── src/
│   ├── screens/           # 10 app screens
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── AddMealScreen.tsx
│   │   └── ... (6 more)
│   │
│   ├── navigation/        # App navigation
│   │   ├── AppNavigator.tsx
│   │   └── MainTabNavigator.tsx
│   │
│   ├── redux/            # State management
│   │   ├── store.ts
│   │   └── slices/       # 4 slices (auth, meals, analytics, settings)
│   │
│   ├── services/         # API services
│   │   ├── api.ts        # Axios client
│   │   ├── authService.ts
│   │   ├── mealService.ts
│   │   └── analyticsService.ts
│   │
│   ├── types/            # TypeScript definitions
│   └── utils/            # Helper functions
│
├── App.tsx               # Root component
└── index.js             # Entry point
```

## 🔗 Backend Integration

### Required API Endpoints

The app expects these endpoints:

**Authentication**:
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile

**Meals**:
- `POST /meal/upload-image` - Upload meal photo for AI analysis
- `POST /meal/add` - Add meal entry
- `GET /meal/day/:date` - Get daily meals
- `DELETE /meal/:id` - Delete meal

**Analytics**:
- `GET /analytics/weekly` - Get weekly stats
- `GET /analytics/macros` - Get macro distribution

See `API_DOCUMENTATION.md` for complete API specs.

## 📚 Documentation

- **README.md** - Complete project documentation
- **API_DOCUMENTATION.md** - Backend API specifications
- **PROJECT_SUMMARY.md** - Project overview and features
- **CONTRIBUTING.md** - Contribution guidelines
- **QUICK_START.md** - This file!

## 🐛 Common Issues & Solutions

### Android Build Fails
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Metro Bundler Issues
```bash
npm start -- --reset-cache
```

### iOS Pod Issues (macOS)
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules
npm install
```

## 🎨 Customization

### Change Theme Colors

Edit colors in screen StyleSheets:
```typescript
const PRIMARY_COLOR = '#4CAF50';  // Green
const SECONDARY_COLOR = '#2196F3'; // Blue
```

### Add New Screen

1. Create screen file in `src/screens/`
2. Add route in `src/navigation/AppNavigator.tsx`
3. Create Redux slice if needed
4. Add API service if needed

### Modify Calorie Formula

Edit `src/utils/calories.ts`:
```typescript
export const calculateDailyCalories = (...) => {
  // Your formula here
}
```

## 🚀 Building for Production

### Android Release APK

```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

### iOS Release (macOS)

1. Open Xcode: `open ios/FitkitAI.xcworkspace`
2. Select target device: "Any iOS Device"
3. Product → Archive
4. Distribute to App Store

## 📱 Testing

### Run Tests
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

### Manual Testing Checklist
- [ ] Login/Signup flow
- [ ] Camera/Gallery selection
- [ ] Meal entry (manual & AI)
- [ ] Dashboard calculations
- [ ] Analytics charts
- [ ] Profile display
- [ ] Settings changes
- [ ] Logout

## 🌟 Next Steps

### For Mobile Developers:
1. ✅ Project is ready to use
2. 🔧 Configure backend URL
3. 🧪 Test with real API
4. 🎨 Customize UI if needed
5. 📱 Build and deploy

### For Backend Developers:
1. 📖 Read `API_DOCUMENTATION.md`
2. 🏗 Implement API endpoints
3. 🤖 Deploy ML service
4. 🔗 Test integration
5. 🚀 Deploy to production

### For Contributors:
1. 📖 Read `CONTRIBUTING.md`
2. 🍴 Fork the repository
3. 🌿 Create feature branch
4. 💻 Make changes
5. 📤 Submit pull request

## 🎓 Learning Resources

### React Native
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)

### Redux
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Redux](https://react-redux.js.org/)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

## 💡 Pro Tips

1. **Use React Native Debugger** for better debugging experience
2. **Enable Hot Reload** for faster development
3. **Use TypeScript** for type safety
4. **Keep Redux slices small** and focused
5. **Write reusable components**
6. **Test on real devices** for better accuracy

## 🆘 Need Help?

- **GitHub Issues**: https://github.com/AbhishekhKumar19/fitkit/issues
- **Documentation**: Check other .md files in the project
- **Stack Overflow**: Tag with `react-native` and `fitkit-ai`

## ✨ Quick Commands Reference

```bash
# Development
npm start                 # Start Metro bundler
npm run android          # Run on Android
npm run ios             # Run on iOS

# Testing
npm test                # Run tests
npm run lint           # Check code style

# Cleaning
npm start -- --reset-cache  # Clear Metro cache
rm -rf node_modules && npm install  # Reinstall dependencies
```

---

**Ready to build something awesome? Let's go! 🚀**

For detailed documentation, see `README.md` and `API_DOCUMENTATION.md`.
