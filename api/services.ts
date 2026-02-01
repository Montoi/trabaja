// Service API layer for making HTTP requests to the backend
import { API_ENDPOINTS } from './config';
import type { PopularService } from '../types/home';

// Generic error class for API errors
export class APIError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'APIError';
    }
}

// Generic fetch wrapper with error handling
async function fetchAPI<T>(url: string, options?: RequestInit): Promise<T> {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new APIError(
                response.status,
                `API Error: ${response.status} - ${errorText}`
            );
        }

        return await response.json();
    } catch (error) {
        if (error instanceof APIError) {
            throw error;
        }
        throw new APIError(0, `Network Error: ${(error as Error).message}`);
    }
}

// Services API
export const servicesAPI = {
    // Get all services (optionally filtered by category)
    getAll: async (category?: string): Promise<PopularService[]> => {
        return fetchAPI<PopularService[]>(API_ENDPOINTS.services.getAll(category));
    },

    // Get only popular services
    getPopular: async (): Promise<PopularService[]> => {
        return fetchAPI<PopularService[]>(API_ENDPOINTS.services.getPopular());
    },

    // Get only bookmarked services
    getBookmarked: async (): Promise<PopularService[]> => {
        return fetchAPI<PopularService[]>(API_ENDPOINTS.services.getBookmarked());
    },

    // Get a single service by ID
    getById: async (id: string): Promise<PopularService> => {
        return fetchAPI<PopularService>(API_ENDPOINTS.services.getById(id));
    },

    // Toggle bookmark status
    toggleBookmark: async (id: string): Promise<PopularService> => {
        return fetchAPI<PopularService>(
            API_ENDPOINTS.services.toggleBookmark(id),
            { method: 'PATCH' }
        );
    },

    // Toggle popular status
    togglePopular: async (id: string): Promise<PopularService> => {
        return fetchAPI<PopularService>(
            API_ENDPOINTS.services.togglePopular(id),
            { method: 'PATCH' }
        );
    },
};
