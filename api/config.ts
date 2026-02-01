// API Configuration for Trabaja App
// Central location for all API endpoints and base URL

// IMPORTANT: Update this URL based on your environment
// - For Web: http://localhost:3000
// - For Physical Device: http://YOUR_LOCAL_IP:3000 (e.g., http://10.0.0.162:3000)
// - For Android Emulator: http://10.0.2.2:3000
// - For iOS Simulator: http://localhost:3000
// - For Production: https://your-railway-app.up.railway.app

// Use your local network IP for physical devices
export const API_BASE_URL = 'http://10.0.0.162:3000';

export const API_ENDPOINTS = {
    services: {
        getAll: (category?: string) =>
            category
                ? `${API_BASE_URL}/services?category=${encodeURIComponent(category)}`
                : `${API_BASE_URL}/services`,
        getPopular: () => `${API_BASE_URL}/services/popular`,
        getBookmarked: () => `${API_BASE_URL}/services/bookmarked`,
        getById: (id: string) => `${API_BASE_URL}/services/${id}`,
        toggleBookmark: (id: string) => `${API_BASE_URL}/services/${id}/bookmark`,
        togglePopular: (id: string) => `${API_BASE_URL}/services/${id}/popular`,
    },
};
