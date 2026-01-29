import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PopularServiceCard } from '../components/home/PopularServiceCard';
import type { PopularService } from '../types/home';
import { useMemo, useCallback } from 'react';
import { Theme } from '../constants/Theme';
import { POPULAR_SERVICES } from '../constants/MockData';

export default function PopularServicesScreen() {
    const insets = useSafeAreaInsets();
    const { category } = useLocalSearchParams<{ category?: string }>();

    const filteredServices = useMemo(() => {
        if (!category) return POPULAR_SERVICES;
        return POPULAR_SERVICES.filter(service => service.category.toLowerCase() === category.toLowerCase());
    }, [category]);

    const headerTitle = useMemo(() => {
        if (!category) return 'Most Popular Services';
        return `${category} Services`;
    }, [category]);

    const handleServicePress = useCallback((id: string) => {
        const service = POPULAR_SERVICES.find(s => s.id === id);
        if (service) {
            router.push({
                pathname: `/service-detail/${id}`,
                params: {
                    title: service.title,
                    provider: service.provider,
                    category: service.category
                }
            });
        }
    }, []);

    const handleBookmarkToggle = useCallback((id: string) => {
        console.log('Toggle bookmark:', id);
    }, []);

    const renderItem = useCallback(({ item }: { item: PopularService }) => (
        <View style={styles.cardWrapper}>
            <PopularServiceCard
                service={item}
                onPress={handleServicePress}
                onBookmarkPress={handleBookmarkToggle}
            />
        </View>
    ), [handleServicePress, handleBookmarkToggle]);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <View style={styles.headerContent}>
                    <View style={styles.headerLeft}>
                        <Pressable onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color={Theme.colors.textPrimary} />
                        </Pressable>
                        <Text style={styles.headerTitle}>{headerTitle}</Text>
                    </View>
                    <Pressable style={styles.moreButton}>
                        <Ionicons name="ellipsis-horizontal" size={20} color={Theme.colors.textPrimary} />
                    </Pressable>
                </View>
            </View>

            <FlatList
                data={filteredServices}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="search-outline" size={64} color="#EEE" />
                        <Text style={styles.emptyText}>No services found in this category</Text>
                    </View>
                }
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
        // Transparent to show container background
    },
    headerContent: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Theme.colors.textPrimary,
        marginLeft: 8,
    },
    moreButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 40,
    },
    cardWrapper: {
        marginBottom: 20,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: '#9E9E9E',
        fontWeight: '500',
    },
});
