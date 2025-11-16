import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList, FoodItem} from '../types';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {addMeal} from '../redux/slices/mealSlice';
import {Picker} from '@react-native-picker/picker';

type PredictionReviewRouteProp = RouteProp<
  RootStackParamList,
  'PredictionReview'
>;

const PredictionReviewScreen: React.FC = () => {
  const route = useRoute<PredictionReviewRouteProp>();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const {prediction, imageUri} = route.params;

  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
  const [items, setItems] = useState<FoodItem[]>(prediction.items);

  const updateItem = (index: number, field: keyof FoodItem, value: string) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = parseFloat(value) || 0;
    setItems(newItems);
  };

  const calculateTotalCalories = () => {
    return items.reduce((sum, item) => sum + item.calories, 0);
  };

  const handleSave = async () => {
    try {
      await dispatch(
        addMeal({
          mealType,
          items,
          totalCalories: calculateTotalCalories(),
          imageUrl: prediction.imageUrl,
          createdAt: new Date().toISOString(),
        }),
      ).unwrap();
      Alert.alert('Success', 'Meal saved successfully');
      navigation.navigate('Main');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save meal');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: imageUri}} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>AI Prediction Results</Text>
        <Text style={styles.subtitle}>Review and edit if needed</Text>

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

        {items.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <Text style={styles.itemTitle}>{item.food}</Text>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Quantity (g)</Text>
                <TextInput
                  style={styles.smallInput}
                  value={item.quantity_g.toString()}
                  onChangeText={value => updateItem(index, 'quantity_g', value)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Calories</Text>
                <TextInput
                  style={styles.smallInput}
                  value={item.calories.toString()}
                  onChangeText={value => updateItem(index, 'calories', value)}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Protein (g)</Text>
                <TextInput
                  style={styles.smallInput}
                  value={item.protein.toString()}
                  onChangeText={value => updateItem(index, 'protein', value)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Carbs (g)</Text>
                <TextInput
                  style={styles.smallInput}
                  value={item.carbs.toString()}
                  onChangeText={value => updateItem(index, 'carbs', value)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Fat (g)</Text>
                <TextInput
                  style={styles.smallInput}
                  value={item.fat.toString()}
                  onChangeText={value => updateItem(index, 'fat', value)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        ))}

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Calories</Text>
          <Text style={styles.totalValue}>{Math.round(calculateTotalCalories())}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Meal</Text>
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
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },
  pickerContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 15,
  },
  itemCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  inputLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  smallInput: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
  },
  totalCard: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  totalValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PredictionReviewScreen;
