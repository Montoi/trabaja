/**
 * Design System for Trabaja
 * Centralizes colors, spacing, and other UI tokens.
 */

export const Theme = {
    colors: {
        // Brand Colors
        primary: '#7F3DFF',
        primaryLight: '#F5F3FF',
        primarySoft: 'rgba(127, 61, 255, 0.1)',

        // Semantic Colors
        success: '#34C759',
        successLight: '#D1FAE5',
        warning: '#FBBF24',
        warningLight: '#FEF9C3',
        error: '#F43F5E',
        errorLight: '#FEE2E2',
        info: '#2563EB',
        infoLight: '#DBEAFE',

        // Neutral Palette
        white: '#FFFFFF',
        black: '#0F172A',
        background: '#FFFFFF',
        surface: '#F8F9FA',

        // Text Colors
        textPrimary: '#0F172A',
        textSecondary: '#64748B',
        textPlaceholder: '#94A3B8',
        textInverse: '#FFFFFF',

        // Border & Divider
        border: '#F1F5F9',
        divider: '#E2E8F0',

        // Category Backgrounds (Light variants)
        catPurple: '#EDE9FE',
        catOrange: '#FFEDD5',
        catBlue: '#DBEAFE',
        catYellow: '#FEF9C3',
        catRed: '#FEE2E2',
        catGreen: '#D1FAE5',
        catCyan: '#CFFAFE',
        catLavender: '#F5F3FF',

        // Icon Colors
        iconPurple: '#7C3AED',
        iconOrange: '#EA580C',
        iconBlue: '#2563EB',
        iconYellow: '#CA8A04',
        iconRed: '#DC2626',
        iconGreen: '#059669',
        iconCyan: '#0891B2',
        iconLavender: '#7210FF',
    },

    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 40,
    },

    borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        xxl: 24,
        full: 999,
    },

    shadows: {
        small: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 4,
        },
        primary: {
            shadowColor: '#7F3DFF',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 8,
        }
    }
};

export default Theme;
