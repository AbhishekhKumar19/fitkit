import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {getTodayMeals} from '../redux/slices/mealSlice';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types';
import Icon from 'react-native-vector-icons/Ionicons';
import {formatCalories, getMealTypeEmoji, getMealTypeLabel} from '../utils/formatters';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {user} = useSelector((state: RootState) => state.auth);
  const {todayMeals, isLoading} = useSelector((state: RootState) => state.meals);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await dispatch(getTodayMeals()).unwrap();
    } catch (error) {
      // Handle error silently or show a toast
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const calculateTotalCalories = () => {
    return todayMeals.reduce((sum, meal) => sum + meal.totalCalories, 0);
  };

  const calculateMacros = () => {
    const totals = todayMeals.reduce(
      (acc, meal) => {
        meal.items.forEach(item => {
          acc.protein += item.protein;
          acc.carbs += item.carbs;
          acc.fat += item.fat;
        });
        return acc;
      },
      {protein: 0, carbs: 0, fat: 0},
    );
    return totals;
  };

  const totalCalories = calculateTotalCalories();
  const targetCalories = user?.dailyCalorieTarget || 2000;
  const remainingCalories = targetCalories - totalCalories;
  const progress = Math.min((totalCalories / targetCalories) * 100, 100);
  const macros = calculateMacros();

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* Calorie Summary Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Calories</Text>
        <View style={styles.calorieContainer}>
          <View style={styles.calorieCircle}>
            <Text style={styles.calorieNumber}>
              {Math.round(totalCalories)}
            </Text>
            <Text style={styles.calorieLabel}>consumed</Text>
          </View>
          <View style={styles.calorieStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Target</Text>
              <Text style={styles.statValue}>{targetCalories}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Remaining</Text>
              <Text
                style={[
                  styles.statValue,
                  remainingCalories < 0 && styles.overTarget,
                ]}>
                {Math.abs(Math.round(remainingCalories))}
              </Text>
            </View>
          </View>
        </View>
        
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {width: `${progress}%`},
              progress > 100 && styles.progressOver,
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {Math.round(progress)}% of daily goal
        </Text>
      </View>

      {/* Macros Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Macronutrients</Text>
        <View style={styles.macrosContainer}>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{Math.round(macros.protein)}g</Text>
            <Text style={styles.macroLabel}>Protein</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{Math.round(macros.carbs)}g</Text>
            <Text style={styles.macroLabel}>Carbs</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{Math.round(macros.fat)}g</Text>
            <Text style={styles.macroLabel}>Fat</Text>
          </View>
        </View>
      </View>

      {/* Add Meal Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddMeal')}>
        <Icon name="camera" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Meal</Text>
      </TouchableOpacity>

      {/* Today's Meals */}
      <View style={styles.mealsSection}>
        <Text style={styles.sectionTitle}>Today's Meals</Text>
        {todayMeals.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="restaurant-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No meals logged yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the button above to add your first meal
            </Text>
          </View>
        ) : (
          todayMeals.map(meal => (
            <View key={meal._id} style={styles.mealCard}>
              <View style={styles.mealHeader}>
                <View style={styles.mealTitleContainer}>
                  <Text style={styles.mealEmoji}>
                    {getMealTypeEmoji(meal.mealType)}
                  </Text>
                  <Text style={styles.mealType}>
                    {getMealTypeLabel(meal.mealType)}
                  </Text>
                </View>
                <Text style={styles.mealCalories}>
                  {formatCalories(meal.totalCalories)}
                </Text>
              </View>
              <View style={styles.mealItems}>
                {meal.items.map((item, index) => (
                  <Text key={index} style={styles.mealItem}>
                    • {item.food} ({item.quantity_g}g)
                  </Text>
                ))}
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  calorieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  calorieCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calorieNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  calorieLabel: {
    fontSize: 14,
    color: '#fff',
  },
  calorieStats: {
    flex: 1,
    marginLeft: 20,
  },
  statItem: {
    marginBottom: 15,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  overTarget: {
    color: '#f44336',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 15,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressOver: {
    backgroundColor: '#f44336',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  macroLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    marginHorizontal: 15,
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  mealsSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  mealCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  mealTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  mealType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  mealCalories: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  mealItems: {
    paddingLeft: 10,
  },
  mealItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
});

export default HomeScreen;
