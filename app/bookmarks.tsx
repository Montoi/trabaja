import { View, Text, StyleSheet, Pressable, ActivityIndicator, AppState } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { PopularServiceCard } from '../components/home/PopularServiceCard';
import { CategoryFilter } from '../components/common';
import type { PopularService } from '../types/home';
import { Theme } from '../constants/Theme';
import { useBookmarkedServices, useToggleBookmark } from '../hooks/useServices';

const CATEGORIES = ['All', 'Cleaning', 'Repairing', 'Painting', 'Laundry', 'Appliance', 'Plumbing', 'Shifting'];

export default function BookmarksScreen() {
    const insets = useSafeAreaInsets();
    const [selectedCategory, setSelectedCategory] = useState('All');

    // State for dynamic bottom padding
    const [bottomPadding, setBottomPadding] = useState(40 + insets.bottom);
    const appState = useRef(AppState.currentState);

    // Update bottom padding when insets change
    useEffect(() => {
        setBottomPadding(40 + insets.bottom);
    }, [insets.bottom]);

    // Force update when app comes to foreground
    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                setBottomPadding(40 + insets.bottom);
            }
            appState.current = nextAppState;
        });
        return () => subscription.remove();
    }, [insets.bottom]);

    // Fetch bookmarked services from API
    const { data: bookmarks, loading, error, refetch } = useBookmarkedServices();
    const { toggleBookmark } = useToggleBookmark();

    const filteredBookmarks = useMemo(() => {
        if (selectedCategory === 'All') return bookmarks;
        return bookmarks.filter(item => item.category === selectedCategory);
    }, [selectedCategory, bookmarks]);

    const handleServicePress = useCallback((id: string) => {
        const service = bookmarks.find(s => s.id === id);
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
    }, [bookmarks]);

    const handleBookmarkToggle = useCallback(async (id: string) => {
        const result = await toggleBookmark(id);
        if (result) {
            // Refetch bookmarks to update the list
            refetch();
        }
    }, [toggleBookmark, refetch]);

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
                        <Text style={styles.headerTitle}>My Bookmark</Text>
                    </View>
                    <Pressable style={styles.moreButton}>
                        <Ionicons name="ellipsis-horizontal" size={20} color={Theme.colors.textPrimary} />
                    </Pressable>
                </View>
            </View>

            {/* Category Filter */}
            <CategoryFilter
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            {/* Bookmarks List */}
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
                    data={filteredBookmarks}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles.scrollView}
                    contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="bookmark-outline" size={64} color="#EEE" />
                            <Text style={styles.emptyText}>No bookmarks yet</Text>
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
        paddingTop: 24,
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
        color: Theme.colors.textPlaceholder,
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
