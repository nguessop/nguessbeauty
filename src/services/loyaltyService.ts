import { apiService } from './api';
import { LoyaltyTransaction, Promotion } from '../types/auth';

class LoyaltyService {
  public async getLoyaltyPoints(): Promise<number> {
    const response = await apiService.get<{ points: number }>('/loyalty/points');
    return response.points;
  }

  public async getLoyaltyHistory(): Promise<LoyaltyTransaction[]> {
    return await apiService.get<LoyaltyTransaction[]>('/loyalty/history');
  }

  public async getAvailablePromotions(): Promise<Promotion[]> {
    return await apiService.get<Promotion[]>('/loyalty/promotions');
  }

  public async redeemPromotion(promotionId: string): Promise<{ success: boolean; message: string }> {
    return await apiService.post(`/loyalty/promotions/${promotionId}/redeem`);
  }

  public async earnPoints(appointmentId: string): Promise<{ points: number; total: number }> {
    return await apiService.post('/loyalty/earn', { appointment_id: appointmentId });
  }

  public async getLoyaltyLevel(): Promise<{
    level: string;
    currentPoints: number;
    nextLevelPoints: number;
    benefits: string[];
  }> {
    return await apiService.get('/loyalty/level');
  }
}

export const loyaltyService = new LoyaltyService();