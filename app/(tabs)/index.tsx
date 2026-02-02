import {
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    Text,
    ActivityIndicator,
    Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { SectionHeader, SearchBar } from '../../components/common';
import {
    ProfileHeader,
    SpecialOfferBanner,
    ServiceIcon,
    PopularServiceCard,
} from '../../components/home';
import type { User, SpecialOffer, Service, PopularService } from '../../types/home';
import { Theme } from '../../constants/Theme';
import { USER_DATA, SPECIAL_OFFERS, SERVICES } from '../../constants/MockData';
import { usePopularServices, useToggleBookmark } from '../../hooks/useServices';
import { useLanguage } from '../../contexts/LanguageContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 48; // SCREEN_WIDTH - (paddingHorizontal * 2)
const BANNER_GAP = 16;
const SNAP_INTERVAL = BANNER_WIDTH + BANNER_GAP;

// GRID_PADDING and other constants moved to styles or handled by Theme if appropriate, 
// but keeping these locals for layout calculations for now.
const GRID_PADDING = 24;
const COLUMN_GAP = 16;
const ITEM_WIDTH = (SCREEN_WIDTH - (GRID_PADDING * 2) - (COLUMN_GAP * 3)) / 4;

export default function HomeScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const insets = useSafeAreaInsets();
    const { t } = useLanguage();

    // Fetch popular services from API
    const { data: popularServices, loading: servicesLoading, error: servicesError, refetch } = usePopularServices();
    const { toggleBookmark, loading: bookmarkLoading } = useToggleBookmark();

    // Callbacks
    const handleNotificationPress = useCallback(() => {
        console.log('Navigating to notifications...');
        router.push('/notifications');
    }, []);

    const handleBookmarkPress = useCallback(() => {
        console.log('Navigating to bookmarks...');
        router.push('/bookmarks');
    }, []);

    const handleFilterPress = useCallback(() => {
        console.log('Filter pressed');
    }, []);

    const handleSeeAllOffers = useCallback(() => {
        router.push('/special-offers');
    }, []);

    const handleSeeAllServices = useCallback(() => {
        router.push('/all-services');
    }, []);

    const handleSeeAllPopular = useCallback(() => {
        router.push('/popular-services');
    }, []);

    const handleServicePress = useCallback((id: string) => {
        if (id === '8') {
            router.push('/all-services');
        } else {
            const service = SERVICES.find(s => s.id === id);
            if (service) {
                router.push({
                    pathname: '/popular-services',
                    params: { category: service.name }
                });
            }
        }
    }, []);

    const handlePopularServicePress = useCallback((id: string) => {
        const service = popularServices.find(s => s.id === id);
        if (service) {
            router.push({
                pathname: `/service-detail/${id}`,
                params: {
                    title: service.title,
                    category: service.category,
                    provider: service.provider,
                    image: service.image,
                },
            });
        }
    }, [popularServices]);

    const handlePopularServiceBookmark = useCallback((id: string) => {
        console.log('Toggle bookmark:', id);
    }, []);

    return (
        <View style={styles.container}>
            {/* Top Safe Area Guard */}
            <View style={[styles.topGuard, { height: insets.top }]} />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingTop: 20, paddingBottom: 120 }
                ]}
            >
                {/* Profile Header */}
                <ProfileHeader
                    user={USER_DATA}
                    onNotificationPress={handleNotificationPress}
                    onBookmarkPress={handleBookmarkPress}
                />

                {/* Temporary Trigger for Splash Screen */}
                <Pressable
                    onPress={() => router.push('/test-splash')}
                    style={{
                        marginHorizontal: 24,
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: Theme.colors.primary,
                        borderRadius: 8,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Test Splash Animation 🎨</Text>
                </Pressable>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <SearchBar
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onFilterPress={handleFilterPress}
                        placeholder={t.common.search}
                    />
                </View>

                {/* Special Offers */}
                <View style={styles.section}>
                    <SectionHeader
                        title={t.home.specialOffers}
                        onSeeAllPress={handleSeeAllOffers}
                    />
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={false}
                        snapToInterval={SNAP_INTERVAL}
                        snapToAlignment="start"
                        decelerationRate="fast"
                        disableIntervalMomentum={true}
                        contentContainerStyle={styles.bannerScroll}
                    >
                        {SPECIAL_OFFERS.map((offer, index) => (
                            <SpecialOfferBanner
                                key={offer.id}
                                offer={offer}
                                width={BANNER_WIDTH}
                                currentIndex={index}
                                totalItems={SPECIAL_OFFERS.length}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Services Grid */}
                <View style={styles.section}>
                    <SectionHeader
                        title={t.home.services}
                        onSeeAllPress={handleSeeAllServices}
                    />
                    <View style={styles.servicesGrid}>
                        {SERVICES.slice(0, 7).map((service) => (
                            <View key={service.id} style={styles.serviceItem}>
                                <ServiceIcon
                                    service={service}
                                    onPress={handleServicePress}
                                />
                            </View>
                        ))}
                        {/* More Button */}
                        <View style={styles.serviceItem}>
                            <ServiceIcon
                                service={SERVICES[SERVICES.length - 1]} // The "More" service from MockData
                                onPress={handleSeeAllServices}
                            />
                        </View>
                    </View>
                </View>

                {/* Most Popular Services */}
                <View style={styles.section}>
                    <SectionHeader
                        title={t.home.popularServices}
                        onSeeAllPress={handleSeeAllPopular}
                    />
                    {servicesLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={Theme.colors.primary} />
                        </View>
                    ) : servicesError ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{servicesError}</Text>
                        </View>
                    ) : (
                        <View style={styles.popularList}>
                            {popularServices.slice(0, 5).map((service) => (
                                <PopularServiceCard
                                    key={service.id}
                                    service={service}
                                    onPress={handlePopularServicePress}
                                    onBookmarkPress={handlePopularServiceBookmark}
                                />
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    topGuard: {
        backgroundColor: Theme.colors.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    searchContainer: {
        marginBottom: 24,
    },
    section: {
        marginBottom: 32,
    },
    bannerScroll: {
        gap: 16,
    },
    servicesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: COLUMN_GAP,
        rowGap: 24,
    },
    serviceItem: {
        width: ITEM_WIDTH,
    },
    popularList: {
        gap: 16,
    },
    loadingContainer: {
        paddingVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorContainer: {
        paddingVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: Theme.colors.error,
        fontSize: 14,
        textAlign: 'center',
    },
});
