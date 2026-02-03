import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../../constants/Theme';

interface ErrorStateProps {
    title?: string;
    message?: string;
    icon?: keyof typeof Ionicons.glyphMap;
}

export const ErrorState = ({
    title = "Not Found",
    message = "Sorry, the keyword you entered cannot be found, please check again or search with another keyword.",
    icon = "alert-circle-outline" // Changed default to alert, specific cases override
}: ErrorStateProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <View style={styles.circle}>
                    <Ionicons name={icon} size={64} color={Theme.colors.white} />
                </View>
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        width: '100%',
    },
    iconContainer: {
        marginBottom: 16,
    },
    circle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Theme.colors.textPrimary,
        marginBottom: 8,
        textAlign: 'center',
    },
    message: {
        fontSize: 13,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
        maxWidth: '90%',
    }
});
