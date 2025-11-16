import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import Icon from 'react-native-vector-icons/Ionicons';
import {calculateBMI, getBMICategory} from '../utils/calories';

const ProfileScreen: React.FC = () => {
  const {user} = useSelector((state: RootState) => state.auth);

  if (!user) {
    return null;
  }

  const bmi = calculateBMI(user.weight, user.height);
  const bmiCategory = getBMICategory(bmi);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Body Stats</Text>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Icon name="fitness" size={24} color="#4CAF50" />
            <Text style={styles.statLabel}>Weight</Text>
            <Text style={styles.statValue}>{user.weight} kg</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="resize" size={24} color="#4CAF50" />
            <Text style={styles.statLabel}>Height</Text>
            <Text style={styles.statValue}>{user.height} cm</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="calendar" size={24} color="#4CAF50" />
            <Text style={styles.statLabel}>Age</Text>
            <Text style={styles.statValue}>{user.age} yrs</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>BMI</Text>
        <View style={styles.bmiContainer}>
          <Text style={styles.bmiValue}>{bmi}</Text>
          <Text style={styles.bmiCategory}>{bmiCategory}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Goals & Activity</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Daily Calorie Target</Text>
          <Text style={styles.infoValue}>{user.dailyCalorieTarget} cal</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Goal</Text>
          <Text style={styles.infoValue}>
            {user.goal.charAt(0).toUpperCase() + user.goal.slice(1)} Weight
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Activity Level</Text>
          <Text style={styles.infoValue}>
            {user.activityLevel.charAt(0).toUpperCase() +
              user.activityLevel.slice(1).replace('_', ' ')}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Icon name="create-outline" size={20} color="#fff" />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
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
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bmiContainer: {
    alignItems: 'center',
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  bmiCategory: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    marginHorizontal: 15,
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProfileScreen;
