import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {getWeeklyAnalytics} from '../redux/slices/analyticsSlice';
import {LineChart, PieChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const AnalyticsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {weeklyData, isLoading} = useSelector(
    (state: RootState) => state.analytics,
  );

  useEffect(() => {
    dispatch(getWeeklyAnalytics());
  }, []);

  if (isLoading || !weeklyData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  const chartData = {
    labels: weeklyData.dailyStats.map(stat =>
      new Date(stat.date).toLocaleDateString('en', {weekday: 'short'}),
    ),
    datasets: [
      {
        data: weeklyData.dailyStats.map(stat => stat.totalCalories),
      },
    ],
  };

  const macroData = [
    {
      name: 'Protein',
      population: weeklyData.macroDistribution.protein,
      color: '#FF6384',
      legendFontColor: '#333',
    },
    {
      name: 'Carbs',
      population: weeklyData.macroDistribution.carbs,
      color: '#36A2EB',
      legendFontColor: '#333',
    },
    {
      name: 'Fat',
      population: weeklyData.macroDistribution.fat,
      color: '#FFCE56',
      legendFontColor: '#333',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Calorie Trend</Text>
        <LineChart
          data={chartData}
          width={screenWidth - 60}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Average Stats</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Average Daily Calories</Text>
          <Text style={styles.statValue}>
            {Math.round(weeklyData.averageCalories)}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Weekly Calories</Text>
          <Text style={styles.statValue}>
            {Math.round(weeklyData.totalCalories)}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Macro Distribution</Text>
        <PieChart
          data={macroData}
          width={screenWidth - 60}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Insights</Text>
        <View style={styles.insightCard}>
          <Text style={styles.insightEmoji}>💡</Text>
          <Text style={styles.insightText}>
            Your average daily intake is {Math.round(weeklyData.averageCalories)}{' '}
            calories
          </Text>
        </View>
        <View style={styles.insightCard}>
          <Text style={styles.insightEmoji}>📊</Text>
          <Text style={styles.insightText}>
            You're consuming {Math.round(weeklyData.macroDistribution.protein)}g
            protein daily on average
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  chart: {
    borderRadius: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  insightEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
});

export default AnalyticsScreen;
