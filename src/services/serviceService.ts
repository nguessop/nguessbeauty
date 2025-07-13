import { apiService } from './api';
import { Service } from '../types/service';

class ServiceService {
    /**
     * Récupérer tous les services d’un salon
     */
    public async getServicesBySalon(salonId: number): Promise<Service[]> {
        return await apiService.get<Service[]>(`/salon/${salonId}/services`);
    }

    /**
     * Récupérer la liste de tous les services actifs
     */
    public async getAllServices(): Promise<Service[]> {
        return await apiService.get<Service[]>('/service/all');
    }

    /**
     * Récupérer un service précis
     */
    public async getServiceById(serviceId: number): Promise<Service> {
        return await apiService.get<Service>(`/service/${serviceId}`);
    }

    /**
     * Créer un nouveau service dans un salon
     */
    public async createService(salonId: number, data: Partial<Service>): Promise<Service> {
        return await apiService.post<Service>(`/salon/${salonId}/service`, data);
    }

    /**
     * Mettre à jour un service
     */
    public async updateService(serviceId: number, data: Partial<Service>): Promise<Service> {
        return await apiService.put<Service>(`/service/${serviceId}`, data);
    }

    /**
     * Supprimer un service
     */
    public async deleteService(serviceId: number): Promise<{ message: string }> {
        return await apiService.delete<{ message: string }>(`/service/${serviceId}`);
    }


    /**
     * Filtrer les services par ville et nom de service
     * @param city - Ville du salon (ex: "Yaoundé")
     * @param serviceName - Nom du service (ex: "Épilation à la cire")
     * @param category - Optionnel : catégorie du service
     */
    public async filterServicesByCityAndName(
        city: string,
        serviceName?: string
    ): Promise<Service[]> {
        const params = new URLSearchParams();

        // Encodage correct des paramètres avec encodeURIComponent
        params.append('city', city.trim());

        if (serviceName) {
            params.append('service_name', serviceName.trim());
        }

        try {
            const response = await apiService.get<Service[]>(
                `/services/filter-by-city?${params.toString()}`
            );
            console.log("API Response:", response);
            return response.data;
        } catch (error) {
            console.error('Error filtering services', error);
            throw error;
        }
    }
}

export const serviceService = new ServiceService();