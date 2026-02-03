// Type definitions for home screen components

export interface User {
    name: string;
    avatar: string;
    greeting: string;
    role?: 'user' | 'worker';
}

export interface SpecialOffer {
    id: string;
    discount: string;
    title: string;
    description: string;
    image?: string | number; // URL string or local require() number (optional)
    bgColor: string;
}

export interface Service {
    id: string;
    name: string;
    icon: string;
    bgColor: string;
    iconColor: string;
}

export interface PopularService {
    id: string;
    title: string;
    category: string;
    provider: string;
    price: number;
    rating: number;
    reviewCount: number;
    image: string;
    isBookmarked: boolean;
    isPopular?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
