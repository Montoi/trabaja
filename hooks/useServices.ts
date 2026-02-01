// Custom hooks for fetching and managing services data
import { useState, useEffect, useCallback } from 'react';
import { servicesAPI, APIError } from '../api/services';
import type { PopularService } from '../types/home';

// Hook for fetching popular services
export function usePopularServices() {
    const [data, setData] = useState<PopularService[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const services = await servicesAPI.getPopular();
            setData(services);
        } catch (err) {
            const message = err instanceof APIError
                ? err.message
                : 'Failed to fetch popular services';
            setError(message);
            console.error('Error fetching popular services:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

// Hook for fetching bookmarked services
export function useBookmarkedServices() {
    const [data, setData] = useState<PopularService[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const services = await servicesAPI.getBookmarked();
            setData(services);
        } catch (err) {
            const message = err instanceof APIError
                ? err.message
                : 'Failed to fetch bookmarked services';
            setError(message);
            console.error('Error fetching bookmarked services:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

// Hook for fetching services by category
export function useServicesByCategory(category?: string) {
    const [data, setData] = useState<PopularService[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const services = await servicesAPI.getAll(category);
            setData(services);
        } catch (err) {
            const message = err instanceof APIError
                ? err.message
                : 'Failed to fetch services';
            setError(message);
            console.error('Error fetching services:', err);
        } finally {
            setLoading(false);
        }
    }, [category]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

// Hook for toggling bookmark status
export function useToggleBookmark() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleBookmark = useCallback(async (id: string): Promise<PopularService | null> => {
        try {
            setLoading(true);
            setError(null);
            const updatedService = await servicesAPI.toggleBookmark(id);
            return updatedService;
        } catch (err) {
            const message = err instanceof APIError
                ? err.message
                : 'Failed to toggle bookmark';
            setError(message);
            console.error('Error toggling bookmark:', err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { toggleBookmark, loading, error };
}
