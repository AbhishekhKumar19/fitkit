// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  dailyCalorieTarget: number;
  goal: 'loss' | 'maintain' | 'gain';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// Meal Types
export interface FoodItem {
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity_g: number;
}

export interface Meal {
  _id: string;
  userId: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  items: FoodItem[];
  totalCalories: number;
  imageUrl?: string;
  createdAt: string;
}

export interface MealState {
  meals: Meal[];
  todayMeals: Meal[];
  weeklyMeals: Meal[];
  isLoading: boolean;
  error: string | null;
}

// ML Prediction Types
export interface PredictionResult {
  items: FoodItem[];
  imageUrl: string;
  confidence: number;
}

// Analytics Types
export interface DailyStats {
  date: string;
  totalCalories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface WeeklyAnalytics {
  dailyStats: DailyStats[];
  averageCalories: number;
  totalCalories: number;
  macroDistribution: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface AnalyticsState {
  weeklyData: WeeklyAnalytics | null;
  isLoading: boolean;
  error: string | null;
}

// Navigation Types
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ProfileSetup: undefined;
  Main: undefined;
  AddMeal: undefined;
  AddMealManual: undefined;
  PredictionReview: {
    prediction: PredictionResult;
    imageUri: string;
  };
  MealDetail: {
    mealId: string;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Analytics: undefined;
  Profile: undefined;
  Settings: undefined;
};

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest extends LoginRequest {
  name: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: string;
  goal: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

// Settings Types
export interface AppSettings {
  darkMode: boolean;
  notifications: boolean;
  language: 'en' | 'es' | 'fr';
}
