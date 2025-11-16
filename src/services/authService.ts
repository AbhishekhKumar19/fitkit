import {apiClient} from './api';
import {LoginRequest, SignupRequest, LoginResponse} from '../types';

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/auth/login', credentials);
  }

  async signup(userData: SignupRequest): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/auth/register', userData);
  }

  async getProfile() {
    return apiClient.get('/auth/profile');
  }

  async updateProfile(data: any) {
    return apiClient.put('/auth/profile', data);
  }
}

export const authService = new AuthService();
