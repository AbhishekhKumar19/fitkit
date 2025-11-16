# Contributing to Fitkit AI

Thank you for your interest in contributing to Fitkit AI! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18 or higher
- npm or yarn
- Git
- React Native development environment
  - For Android: Android Studio, JDK 11+
  - For iOS: Xcode (macOS only)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/fitkit.git
cd fitkit/FitkitAI
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/AbhishekhKumar19/fitkit.git
```

## 💻 Development Setup

### Install Dependencies

```bash
npm install
# or
yarn install
```

### iOS Setup (macOS only)

```bash
cd ios
pod install
cd ..
```

### Configure Backend

Edit `src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:5000/api'; // For local development
```

### Run the App

Android:
```bash
npm run android
```

iOS:
```bash
npm run ios
```

## 📁 Project Structure

```
FitkitAI/
├── src/
│   ├── components/          # Reusable UI components
│   ├── navigation/          # Navigation configuration
│   ├── redux/              # Redux state management
│   ├── screens/            # App screens
│   ├── services/           # API services
│   ├── types/              # TypeScript types
│   └── utils/              # Utility functions
├── android/                # Android native code
├── ios/                    # iOS native code
└── ...config files
```

### Key Directories

- **screens/**: Each screen is a separate component
- **redux/slices/**: Redux Toolkit slices for state management
- **services/**: API integration and HTTP clients
- **utils/**: Helper functions (calculations, formatting, validation)
- **types/**: TypeScript interfaces and types

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper interfaces and types
- Avoid using `any` type
- Use meaningful variable and function names

### React Native

- Use functional components with hooks
- Follow React hooks rules
- Keep components small and focused
- Extract reusable logic into custom hooks

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### Naming Conventions

- **Components**: PascalCase (e.g., `HomeScreen.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase (e.g., `userName`, `totalCalories`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Interfaces**: PascalCase with descriptive names (e.g., `User`, `MealState`)

### Component Structure

```typescript
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  // Define props interface
}

const ComponentName: React.FC<Props> = ({prop1, prop2}) => {
  // Hooks at the top
  const [state, setState] = useState();

  // Event handlers
  const handleEvent = () => {
    // ...
  };

  // Render
  return (
    <View style={styles.container}>
      <Text>Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ComponentName;
```

### Redux Slice Structure

```typescript
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// Define async thunks
export const fetchData = createAsyncThunk(
  'slice/fetchData',
  async (params, {rejectWithValue}) => {
    try {
      // API call
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create slice
const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    // Synchronous actions
  },
  extraReducers: builder => {
    // Handle async actions
  },
});

export default slice.reducer;
```

## 🔄 Making Changes

### Create a Branch

Always create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### Commit Messages

Follow conventional commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(auth): add biometric authentication

fix(meals): resolve calorie calculation issue

docs(readme): update installation instructions
```

### Keep Your Branch Updated

```bash
# Fetch latest changes from upstream
git fetch upstream

# Rebase your branch
git rebase upstream/main
```

## 🧪 Testing

### Run Tests

```bash
npm test
# or
yarn test
```

### Writing Tests

- Write tests for new features
- Update tests when modifying existing code
- Aim for good test coverage
- Test edge cases and error scenarios

Example test:
```typescript
import {calculateDailyCalories} from '../utils/calories';

describe('calculateDailyCalories', () => {
  it('calculates correct calories for weight loss', () => {
    const calories = calculateDailyCalories(75, 175, 28, 'male', 'moderate', 'loss');
    expect(calories).toBeGreaterThan(0);
  });
});
```

### Manual Testing

Before submitting:
1. Test on both Android and iOS (if possible)
2. Test different screen sizes
3. Test with slow network
4. Test error scenarios
5. Check for UI/UX issues

## 📤 Submitting Changes

### Before Submitting

1. **Lint your code**:
```bash
npm run lint
```

2. **Run tests**:
```bash
npm test
```

3. **Test the app**:
```bash
npm run android
npm run ios
```

4. **Update documentation** if needed

### Create a Pull Request

1. Push your branch to your fork:
```bash
git push origin feature/your-feature-name
```

2. Go to GitHub and create a Pull Request

3. Fill in the PR template:
   - **Title**: Clear, descriptive title
   - **Description**: What changes were made and why
   - **Testing**: How to test the changes
   - **Screenshots**: If UI changes, include screenshots
   - **Related Issues**: Link to related issues

### PR Template Example

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- Tested on Android
- Tested on iOS
- Manual testing performed

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No new warnings
```

### Code Review Process

- Wait for maintainers to review
- Address feedback and comments
- Push additional commits if needed
- Once approved, maintainers will merge

## 🐛 Reporting Issues

### Before Creating an Issue

1. Check if the issue already exists
2. Try to reproduce on latest version
3. Gather relevant information

### Creating an Issue

Use the issue template and include:

- **Title**: Clear, specific title
- **Description**: Detailed description
- **Steps to Reproduce**:
  1. Step 1
  2. Step 2
  3. ...
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**:
  - OS: (e.g., Android 13, iOS 16)
  - Device: (e.g., Pixel 7, iPhone 14)
  - App Version: (e.g., 1.0.0)
- **Screenshots/Videos**: If applicable
- **Logs**: Relevant error logs

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested

## 🎯 Development Tips

### Debugging

**React Native Debugger**:
- Android: Shake device or press `Ctrl+M`
- iOS: Shake device or press `Cmd+D`

**Console Logs**:
```typescript
console.log('Debug:', variable);
```

**Redux DevTools**:
Install Redux DevTools extension for debugging state

### Common Issues

**Build Errors**:
```bash
# Clean and rebuild
cd android && ./gradlew clean && cd ..
npm run android
```

**Metro Bundler**:
```bash
# Reset Metro cache
npm start -- --reset-cache
```

**iOS Pods**:
```bash
cd ios
pod deinstall && pod install
cd ..
```

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Discord/Slack**: (if available)

## 🙏 Thank You!

Thank you for contributing to Fitkit AI! Your efforts help make the app better for everyone.

---

**Happy Coding!** 🚀
