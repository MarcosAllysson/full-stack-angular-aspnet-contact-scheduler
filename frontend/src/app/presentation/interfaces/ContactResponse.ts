export interface ContactResponse {
    id: number;
    name: string;
    email: string;
    cellPhone: string;
    phone: string;
    isFavorite: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt?: string;
}