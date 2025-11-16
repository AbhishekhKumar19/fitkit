import {apiClient} from './api';
import {WeeklyAnalytics} from '../types';

class AnalyticsService {
  async getWeeklyAnalytics(): Promise<WeeklyAnalytics> {
    return apiClient.get<WeeklyAnalytics>('/analytics/weekly');
  }

  async getMacros(): Promise<any> {
    return apiClient.get('/analytics/macros');
  }

  async getInsights(): Promise<any> {
    return apiClient.get('/analytics/insights');
  }
}

export const analyticsService = new AnalyticsService();
