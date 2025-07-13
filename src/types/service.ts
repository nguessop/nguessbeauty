export interface Service {
    id: number;
    salon_id: number;
    name: string;
    description?: string;
    duration: number; // durée en minutes
    price: number;
    category?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}