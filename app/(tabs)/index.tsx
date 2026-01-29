import {
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 48; // SCREEN_WIDTH - (paddingHorizontal * 2)
const BANNER_GAP = 16;
const SNAP_INTERVAL = BANNER_WIDTH + BANNER_GAP;

const GRID_PADDING = 24;
const COLUMN_GAP = 16;
const ITEM_WIDTH = (SCREEN_WIDTH - (GRID_PADDING * 2) - (COLUMN_GAP * 3)) / 4;

// Mock data
const USER_DATA: User = {
    name: 'Andrew Ainsley',
    avatar: 'https://i.pravatar.cc/150?img=12',
    greeting: 'Good Morning',
};

const SPECIAL_OFFERS: SpecialOffer[] = [
    {
        id: '1',
        discount: '50%',
        title: 'Emergency Services!',
        description: 'Professional firefighters ready 24/7 for your safety',
        bgColor: '#FF3B30',
        image: 'https://images.unsplash.com/photo-1510515134701-443372c0cc95?w=400&q=80',
    },
    {
        id: '2',
        discount: '40%',
        title: 'Tech Experts!',
        description: 'Certified technicians for all your repair needs',
        bgColor: '#007AFF',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80',
    },
    {
        id: '3',
        discount: '30%',
        title: 'Deep Cleaning!',
        description: 'Professional cleaning service for your home or office',
        bgColor: '#7210FF',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80',
    },
    {
        id: '4',
        discount: '35%',
        title: 'Health Care!',
        description: 'Licensed nurses for home healthcare services',
        bgColor: '#34C759',
        image: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?w=400&q=80',
    },
    {
        id: '5',
        discount: '45%',
        title: 'Construction!',
        description: 'Expert builders for all your construction projects',
        bgColor: '#FF9500',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    },
];

const SERVICES: Service[] = [
    { id: '1', name: 'Cleaning', icon: 'brush-outline', bgColor: '#EDE9FE', iconColor: '#7C3AED' },
    { id: '2', name: 'Repairing', icon: 'build-outline', bgColor: '#FFEDD5', iconColor: '#EA580C' },
    { id: '3', name: 'Painting', icon: 'color-fill-outline', bgColor: '#DBEAFE', iconColor: '#2563EB' },
    { id: '4', name: 'Laundry', icon: 'water-outline', bgColor: '#FEF9C3', iconColor: '#CA8A04' },
    { id: '5', name: 'Appliance', icon: 'tv-outline', bgColor: '#FEE2E2', iconColor: '#DC2626' },
    { id: '6', name: 'Plumbing', icon: 'construct-outline', bgColor: '#D1FAE5', iconColor: '#059669' },
    { id: '7', name: 'Shifting', icon: 'bus-outline', bgColor: '#CFFAFE', iconColor: '#0891B2' },
    { id: '8', name: 'More', icon: 'ellipsis-horizontal', bgColor: '#F5F3FF', iconColor: '#7210FF' },
];

const POPULAR_SERVICES: PopularService[] = [
    {
        id: '1',
        title: 'Full House Cleaning',
        category: 'House Cleaning',
        provider: 'Kylee Danford',
        price: 25,
        rating: 4.8,
        reviewCount: 8289,
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
        isBookmarked: false,
    },
    {
        id: '2',
        title: 'AC Repair & Service',
        category: 'Repairing',
        provider: 'Sarah Johnson',
        price: 45,
        rating: 4.9,
        reviewCount: 5120,
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
        isBookmarked: true,
    },
];

export default function HomeScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const insets = useSafeAreaInsets();

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

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <SearchBar
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onFilterPress={handleFilterPress}
                        placeholder="Search"
                    />
                </View>

                {/* Special Offers */}
                <View style={styles.section}>
                    <SectionHeader
                        title="Special Offers"
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
                        title="Services"
                        onSeeAllPress={handleSeeAllServices}
                    />
                    <View style={styles.servicesGrid}>
                        {SERVICES.map((service) => (
                            <View key={service.id} style={{ width: ITEM_WIDTH }}>
                                <ServiceIcon
                                    service={service}
                                    onPress={handleServicePress}
                                />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Most Popular Services */}
                <View style={styles.section}>
                    <SectionHeader
                        title="Most Popular Services"
                        onSeeAllPress={handleSeeAllPopular}
                    />
                    <View style={styles.popularList}>
                        {POPULAR_SERVICES.map((service) => (
                            <PopularServiceCard
                                key={service.id}
                                service={service}
                                onPress={handlePopularServicePress}
                                onBookmarkPress={handlePopularServiceBookmark}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    topGuard: {
        backgroundColor: '#FFF',
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
    popularList: {
        gap: 16,
    },
});
