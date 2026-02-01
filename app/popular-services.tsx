import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PopularServiceCard } from '../components/home/PopularServiceCard';
import type { PopularService } from '../types/home';
import { useMemo, useCallback } from 'react';
import { Theme } from '../constants/Theme';
import { usePopularServices, useServicesByCategory, useToggleBookmark } from '../hooks/useServices';

export default function PopularServicesScreen() {
    const insets = useSafeAreaInsets();
    const { category } = useLocalSearchParams<{ category?: string }>();

    // Fetch services from API based on category
    const { data: allServices, loading: allLoading, error: allError } = usePopularServices();
    const { data: categoryServices, loading: categoryLoading, error: categoryError } = useServicesByCategory(category);
    const { toggleBookmark } = useToggleBookmark();

    // Use category-specific data if category is provided, otherwise use all popular services
    const services = category ? categoryServices : allServices;
    const loading = category ? categoryLoading : allLoading;
    const error = category ? categoryError : allError;

    const headerTitle = useMemo(() => {
        if (!category) return 'Most Popular Services';
        return `${category} Services`;
    }, [category]);

    const handleServicePress = useCallback((id: string) => {
        const service = services.find(s => s.id === id);
        if (service) {
            router.push({
                pathname: `/service-detail/${id}`,
                params: {
                    title: service.title,
                    provider: service.provider,
                    category: service.category,
                    image: service.image,
                }
            });
        }
    }, [services]);

    const handleBookmarkPress = useCallback(async (id: string) => {
        await toggleBookmark(id);
    }, [toggleBookmark]);

    const renderItem = useCallback(({ item }: { item: PopularService }) => (
        <View style={styles.cardWrapper}>
            <PopularServiceCard
                service={item}
                onPress={handleServicePress}
                onBookmarkPress={handleBookmarkPress}
            />
        </View>
    ), [handleServicePress, handleBookmarkPress]);

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

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Theme.colors.primary} />
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : (
                <FlashList
                    data={services}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No services found</Text>
                        </View>
                    )}
                />
            )}
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
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
        paddingHorizontal: 40,
    },
    errorText: {
        fontSize: 16,
        color: Theme.colors.error,
        textAlign: 'center',
    },
});
