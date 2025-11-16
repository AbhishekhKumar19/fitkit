import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store';
import {loadStoredAuth} from '../redux/slices/authSlice';

// Screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import MainTabNavigator from './MainTabNavigator';
import AddMealScreen from '../screens/AddMealScreen';
import AddMealManualScreen from '../screens/AddMealManualScreen';
import PredictionReviewScreen from '../screens/PredictionReviewScreen';

import {RootStackParamList} from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {user, token} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(loadStoredAuth());
  }, [dispatch]);

  const isAuthenticated = !!token && !!user;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="ProfileSetup"
              component={ProfileSetupScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen
              name="AddMeal"
              component={AddMealScreen}
              options={{
                headerShown: true,
                title: 'Add Meal',
              }}
            />
            <Stack.Screen
              name="AddMealManual"
              component={AddMealManualScreen}
              options={{
                headerShown: true,
                title: 'Add Meal Manually',
              }}
            />
            <Stack.Screen
              name="PredictionReview"
              component={PredictionReviewScreen}
              options={{
                headerShown: true,
                title: 'Review Prediction',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
