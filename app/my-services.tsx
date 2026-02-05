import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Image, AppState } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Theme } from '../constants/Theme';
import { useLanguage } from '../contexts/LanguageContext';
import type { PopularService } from '../types/home';

// Mock worker's services - in production, fetch from API
const MOCK_WORKER_SERVICES: PopularService[] = [
    {
        id: '1',
        title: 'Professional House Cleaning',
        category: 'Cleaning',
        provider: 'Andrew Ainsley',
        price: 45,
        rating: 4.9,
        reviewCount: 127,
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
        isBookmarked: false,
    },
    {
        id: '2',
        title: 'Deep Office Cleaning',
        category: 'Cleaning',
        provider: 'Andrew Ainsley',
        price: 60,
        rating: 4.8,
        reviewCount: 89,
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
        isBookmarked: false,
    },
];

export default function MyServicesScreen() {
    const insets = useSafeAreaInsets();
    const { t } = useLanguage();
    const services = MOCK_WORKER_SERVICES;

    // State for dynamic bottom padding
    const [bottomPadding, setBottomPadding] = useState(100 + insets.bottom);
    const appState = useRef(AppState.currentState);

    // Update bottom padding when insets change
    useEffect(() => {
        setBottomPadding(100 + insets.bottom);
    }, [insets.bottom]);

    // Force update when app comes to foreground
    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                setBottomPadding(100 + insets.bottom);
            }
            appState.current = nextAppState;
        });
        return () => subscription.remove();
    }, [insets.bottom]);

    const handleEdit = (id: string) => {
        console.log('Edit service:', id);
        // In production: router.push(`/edit-service/${id}`)
    };

    const handleDelete = (id: string) => {
        console.log('Delete service:', id);
        // Show confirmation dialog then delete
    };

    const renderItem = ({ item }: { item: PopularService }) => (
        <View style={styles.serviceCard}>
            <Image source={{ uri: item.image }} style={styles.serviceImage} />
            <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle} numberOfLines={1}>{item.title}</Text>
                <View style={styles.serviceMetaRow}>
                    <Text style={styles.serviceCategory}>{item.category}</Text>
                    <Text style={styles.servicePrice}>${item.price}</Text>
                </View>
                <View style={styles.statsRow}>
                    <View style={styles.stat}>
                        <Ionicons name="star" size={16} color="#FFC107" />
                        <Text style={styles.statText}>{item.rating}</Text>
                    </View>
                    <View style={styles.stat}>
                        <Ionicons name="chatbubble-outline" size={16} color={Theme.colors.textSecondary} />
                        <Text style={styles.statText}>{item.reviewCount}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.actions}>
                <Pressable
                    style={styles.actionButton}
                    onPress={() => handleEdit(item.id)}
                >
                    <Ionicons name="pencil" size={20} color={Theme.colors.primary} />
                </Pressable>
                <Pressable
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(item.id)}
                >
                    <Ionicons name="trash-outline" size={20} color={Theme.colors.error} />
                </Pressable>
            </View>
        </View>
    );

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="briefcase-outline" size={80} color={Theme.colors.textSecondary} />
            <Text style={styles.emptyTitle}>{t.myServices.empty}</Text>
            <Pressable
                style={styles.createButton}
                onPress={() => router.push('/create-service')}
            >
                <Text style={styles.createButtonText}>{t.myServices.createFirst}</Text>
            </Pressable>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <View style={styles.headerContent}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={Theme.colors.textPrimary} />
                    </Pressable>
                    <Text style={styles.headerTitle}>{t.myServices.title}</Text>
                    <Pressable
                        style={styles.addButton}
                        onPress={() => router.push('/create-service')}
                    >
                        <Ionicons name="add" size={28} color={Theme.colors.primary} />
                    </Pressable>
                </View>
            </View>

            {/* Services List */}
            <FlashList
                data={services}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={[styles.listContent, { paddingBottom: bottomPadding }]}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmpty}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    header: {
        backgroundColor: Theme.colors.background,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    headerContent: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        justifyContent: 'space-between',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: '700',
        color: Theme.colors.textPrimary,
        marginLeft: 8,
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 100,
    },
    serviceCard: {
        flexDirection: 'row',
        backgroundColor: Theme.colors.white,
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    serviceImage: {
        width: 96,
        height: 96,
        borderRadius: 12,
    },
    serviceInfo: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
    },
    serviceTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Theme.colors.textPrimary,
        marginBottom: 4,
    },
    serviceMetaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    serviceCategory: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
    },
    servicePrice: {
        fontSize: 18,
        fontWeight: '700',
        color: Theme.colors.primary,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 16,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
    },
    actions: {
        justifyContent: 'center',
        gap: 8,
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.background,
    },
    deleteButton: {
        borderColor: Theme.colors.error + '40',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Theme.colors.textPrimary,
        marginTop: 24,
        marginBottom: 16,
    },
    createButton: {
        paddingHorizontal: 32,
        paddingVertical: 14,
        backgroundColor: Theme.colors.primary,
        borderRadius: 12,
    },
    createButtonText: {
        color: Theme.colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
});
