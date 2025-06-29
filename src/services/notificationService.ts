import { apiService } from './api';

export interface NotificationData {
  id: string;
  type: 'appointment-reminder' | 'appointment-confirmed' | 'appointment-cancelled' | 'new-appointment' | 'promotion' | 'review-request';
  title: string;
  message: string;
  recipientId: string;
  recipientType: 'client' | 'provider';
  appointmentId?: string;
  salonId?: string;
  scheduledFor?: string;
  channels: ('sms' | 'whatsapp' | 'email' | 'push')[];
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  createdAt: string;
  sentAt?: string;
}

export interface NotificationTemplate {
  id: string;
  type: string;
  title: string;
  message: string;
  channels: string[];
  triggerEvent: string;
  triggerDelay?: number; // minutes before event
}

class NotificationService {
  // Send immediate notification
  public async sendNotification(data: Omit<NotificationData, 'id' | 'status' | 'createdAt'>): Promise<NotificationData> {
    return await apiService.post<NotificationData>('/notifications/send', data);
  }

  // Schedule notification (e.g., reminder before appointment)
  public async scheduleNotification(data: Omit<NotificationData, 'id' | 'status' | 'createdAt' | 'sentAt'>): Promise<NotificationData> {
    return await apiService.post<NotificationData>('/notifications/schedule', data);
  }

  // Get user notifications
  public async getUserNotifications(userId: string, type?: string): Promise<NotificationData[]> {
    const params = type ? { type } : {};
    return await apiService.get<NotificationData[]>(`/notifications/user/${userId}`, params);
  }

  // Mark notification as read
  public async markAsRead(notificationId: string): Promise<void> {
    await apiService.patch(`/notifications/${notificationId}/read`);
  }

  // Cancel scheduled notification
  public async cancelNotification(notificationId: string): Promise<void> {
    await apiService.delete(`/notifications/${notificationId}`);
  }

  // Send appointment reminder
  public async sendAppointmentReminder(appointmentId: string, reminderType: '24h' | '2h' | '30min'): Promise<void> {
    await apiService.post('/notifications/appointment-reminder', {
      appointment_id: appointmentId,
      reminder_type: reminderType
    });
  }

  // Send new appointment notification to provider
  public async notifyProviderNewAppointment(appointmentId: string): Promise<void> {
    await apiService.post('/notifications/provider/new-appointment', {
      appointment_id: appointmentId
    });
  }

  // Send promotional notification
  public async sendPromotion(salonId: string, promotionData: {
    title: string;
    message: string;
    targetAudience: 'all' | 'loyal' | 'new';
    channels: string[];
  }): Promise<void> {
    await apiService.post('/notifications/promotion', {
      salon_id: salonId,
      ...promotionData
    });
  }

  // Get notification templates
  public async getTemplates(): Promise<NotificationTemplate[]> {
    return await apiService.get<NotificationTemplate[]>('/notifications/templates');
  }

  // Update notification preferences
  public async updatePreferences(userId: string, preferences: {
    sms: boolean;
    whatsapp: boolean;
    email: boolean;
    push: boolean;
  }): Promise<void> {
    await apiService.put(`/notifications/preferences/${userId}`, preferences);
  }
}

export const notificationService = new NotificationService();