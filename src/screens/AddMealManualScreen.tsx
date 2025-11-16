import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {addMeal} from '../redux/slices/mealSlice';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {Meal} from '../types';

const AddMealManualScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMeal = async () => {
    if (!foodName || !quantity || !calories) {
      Alert.alert('Missing Fields', 'Please fill in all required fields');
      return;
    }

    const mealData: Partial<Meal> = {
      mealType,
      items: [
        {
          food: foodName,
          quantity_g: parseFloat(quantity),
          calories: parseFloat(calories),
          protein: parseFloat(protein) || 0,
          carbs: parseFloat(carbs) || 0,
          fat: parseFloat(fat) || 0,
        },
      ],
      totalCalories: parseFloat(calories),
      createdAt: new Date().toISOString(),
    };

    setIsLoading(true);
    try {
      await dispatch(addMeal(mealData)).unwrap();
      Alert.alert('Success', 'Meal added successfully');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to add meal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Meal Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={mealType}
            onValueChange={itemValue => setMealType(itemValue)}>
            <Picker.Item label="Breakfast" value="breakfast" />
            <Picker.Item label="Lunch" value="lunch" />
            <Picker.Item label="Dinner" value="dinner" />
            <Picker.Item label="Snack" value="snack" />
          </Picker>
        </View>

        <Text style={styles.label}>Food Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Chicken Breast"
          value={foodName}
          onChangeText={setFoodName}
        />

        <Text style={styles.label}>Quantity (grams) *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 150"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Calories *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 180"
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Protein (g)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 30"
          value={protein}
          onChangeText={setProtein}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Carbs (g)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 0"
          value={carbs}
          onChangeText={setCarbs}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Fat (g)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 4"
          value={fat}
          onChangeText={setFat}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddMeal}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Add Meal</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
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

export default AddMealManualScreen;
