import { apiService } from './api';
import {Salon} from '../types/salon.ts';

class SalonService {
    /**
     * Récupérer tous les salons (avec pagination et recherche)

    public async getAllSalons(params?: {
        city?: string;
        is_active?: boolean;
        name?: string;
        page?: number;
        per_page?: number;
    }): Promise<{ data: Salon[]; total: number; current_page: number; last_page: number }> {
        return await apiService.get('/salon', { params });
    }*/


    public async getAllSalons(): Promise<any> {
        return await apiService.get<any>(`/salon/all`);
    }



    /**
     * Récupérer les détails d’un salon
     */
    public async getSalonById(salonId: number): Promise<Salon> {
        return await apiService.get<Salon>(`/salon/${salonId}`);
    }

    /**
     * Créer un nouveau salon
     */
    public async createSalon(data: Partial<Salon>): Promise<Salon> {
        return await apiService.post<Salon>('/salon', data);
    }

    /**
     * Mettre à jour un salon
     */
    public async updateSalon(salonId: number, data: Partial<Salon>): Promise<Salon> {
        return await apiService.put<Salon>(`/salon/${salonId}`, data);
    }

    /**
     * Supprimer un salon
     */
    public async deleteSalon(salonId: number): Promise<{ message: string }> {
        return await apiService.delete<{ message: string }>(`/salon/${salonId}`);
    }

    /**
     * Assigner un ou plusieurs salons à un utilisateur
     */
    public async assignSalonsToUser(userId: number, salonIds: number[]): Promise<{ message: string }> {
        return await apiService.post<{ message: string }>(`/users/${userId}/assign-salons`, {
            salon_ids: salonIds,
        });
    }
}

export const salonService = new SalonService();