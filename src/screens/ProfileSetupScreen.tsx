import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {signup} from '../redux/slices/authSlice';
import {validateAge, validateWeight, validateHeight} from '../utils/validation';
import {calculateDailyCalories} from '../utils/calories';
import {Picker} from '@react-native-picker/picker';

const ProfileSetupScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading} = useSelector((state: RootState) => state.auth);
  
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState<'loss' | 'maintain' | 'gain'>('maintain');

  const handleComplete = async () => {
    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    // Validation
    if (!validateAge(ageNum)) {
      Alert.alert('Invalid Age', 'Age must be between 13 and 120');
      return;
    }

    if (!validateWeight(weightNum)) {
      Alert.alert('Invalid Weight', 'Weight must be between 30 and 300 kg');
      return;
    }

    if (!validateHeight(heightNum)) {
      Alert.alert('Invalid Height', 'Height must be between 100 and 250 cm');
      return;
    }

    // Calculate daily calorie target
    const dailyCalorieTarget = calculateDailyCalories(
      weightNum,
      heightNum,
      ageNum,
      gender,
      activityLevel as any,
      goal,
    );

    try {
      // Here you would combine with signup data from previous screen
      // For now, we'll just show success
      Alert.alert(
        'Profile Setup Complete',
        `Your daily calorie target is ${dailyCalorieTarget} cal`,
      );
      // In a real app, dispatch signup with complete data
    } catch (err: any) {
      Alert.alert('Setup Failed', err.message || 'Please try again');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Help us personalize your experience
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your weight"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your height"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Gender</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={itemValue => setGender(itemValue as 'male' | 'female')}>
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>

          <Text style={styles.label}>Activity Level</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={activityLevel}
              onValueChange={itemValue => setActivityLevel(itemValue)}>
              <Picker.Item label="Sedentary (Little to no exercise)" value="sedentary" />
              <Picker.Item label="Light (1-3 days/week)" value="light" />
              <Picker.Item label="Moderate (3-5 days/week)" value="moderate" />
              <Picker.Item label="Active (6-7 days/week)" value="active" />
              <Picker.Item label="Very Active (Physical job + exercise)" value="very_active" />
            </Picker>
          </View>

          <Text style={styles.label}>Goal</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={goal}
              onValueChange={itemValue => setGoal(itemValue as 'loss' | 'maintain' | 'gain')}>
              <Picker.Item label="Lose Weight" value="loss" />
              <Picker.Item label="Maintain Weight" value="maintain" />
              <Picker.Item label="Gain Weight" value="gain" />
            </Picker>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleComplete}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Complete Setup</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileSetupScreen;
