export interface Salon {
    id: number;
    user_id: number;
    name: string;
    description?: string;
    address: string;
    city: string;
    phone?: string;
    logo?: string;
    latitude?: number;
    longitude?: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}