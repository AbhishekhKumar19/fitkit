import {apiClient} from './api';
import {Meal, PredictionResult} from '../types';

class MealService {
  async uploadImage(imageUri: string): Promise<PredictionResult> {
    return apiClient.uploadFile<PredictionResult>(
      '/meal/upload-image',
      imageUri,
      'image',
    );
  }

  async addMeal(mealData: Partial<Meal>): Promise<Meal> {
    return apiClient.post<Meal>('/meal/add', mealData);
  }

  async getTodayMeals(): Promise<Meal[]> {
    const today = new Date().toISOString().split('T')[0];
    return apiClient.get<Meal[]>(`/meal/day/${today}`);
  }

  async getWeeklyMeals(): Promise<Meal[]> {
    return apiClient.get<Meal[]>('/meal/week');
  }

  async getMealById(mealId: string): Promise<Meal> {
    return apiClient.get<Meal>(`/meal/${mealId}`);
  }

  async deleteMeal(mealId: string): Promise<void> {
    return apiClient.delete(`/meal/${mealId}`);
  }

  async searchFood(query: string): Promise<any[]> {
    return apiClient.get(`/meal/search?q=${query}`);
  }
}

export const mealService = new MealService();
