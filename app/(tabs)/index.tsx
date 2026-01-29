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

export default function HomeScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const insets = useSafeAreaInsets();

    // Mock data
    const user: User = {
        name: 'Andrew Ainsley',
        avatar: 'https://i.pravatar.cc/150?img=12',
        greeting: 'Good Morning',
    };

    const specialOffers: SpecialOffer[] = [
        {
            id: '1',
            discount: '50%',
            title: 'Emergency Services!',
            description: 'Professional firefighters ready 24/7 for your safety',
            bgColor: '#FF3B30',
        },
        {
            id: '2',
            discount: '40%',
            title: 'Tech Experts!',
            description: 'Certified technicians for all your repair needs',
            bgColor: '#007AFF',
        },
        {
            id: '3',
            discount: '30%',
            title: 'Deep Cleaning!',
            description: 'Professional cleaning service for your home or office',
            bgColor: '#7210FF',
        },
        {
            id: '4',
            discount: '35%',
            title: 'Health Care!',
            description: 'Licensed nurses for home healthcare services',
            bgColor: '#34C759',
        },
        {
            id: '5',
            discount: '45%',
            title: 'Construction!',
            description: 'Expert builders for all your construction projects',
            bgColor: '#FF9500',
        },
    ];

    const services: Service[] = [
        { id: '1', name: 'Cleaning', icon: 'water-outline', bgColor: '#F3E8FF', iconColor: '#7210FF' },
        { id: '2', name: 'Repairing', icon: 'construct-outline', bgColor: '#FFF4E6', iconColor: '#FF9800' },
        { id: '3', name: 'Painting', icon: 'color-palette-outline', bgColor: '#E3F2FD', iconColor: '#2196F3' },
        { id: '4', name: 'Laundry', icon: 'shirt-outline', bgColor: '#FFF9C4', iconColor: '#FFC107' },
        { id: '5', name: 'Appliance', icon: 'tv-outline', bgColor: '#FFEBEE', iconColor: '#F44336' },
        { id: '6', name: 'Plumbing', icon: 'water', bgColor: '#E8F5E9', iconColor: '#4CAF50' },
        { id: '7', name: 'Shifting', icon: 'car-outline', bgColor: '#E0F2F1', iconColor: '#009688' },
        { id: '8', name: 'More', icon: 'ellipsis-horizontal', bgColor: '#F3E8FF', iconColor: '#7210FF' },
    ];

    const popularServices: PopularService[] = [
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

    // Callbacks
    const handleNotificationPress = useCallback(() => {
        router.push('/notifications');
    }, []);

    const handleBookmarkPress = useCallback(() => {
        console.log('Bookmark pressed');
    }, []);

    const handleFilterPress = useCallback(() => {
        console.log('Filter pressed');
    }, []);

    const handleSeeAllOffers = useCallback(() => {
        console.log('See all offers');
    }, []);

    const handleSeeAllServices = useCallback(() => {
        console.log('See all services');
    }, []);

    const handleSeeAllPopular = useCallback(() => {
        console.log('See all popular services');
    }, []);

    const handleServicePress = useCallback((id: string) => {
        console.log('Service pressed:', id);
    }, []);

    const handlePopularServicePress = useCallback((id: string) => {
        console.log('Popular service pressed:', id);
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
                    user={user}
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
                        {specialOffers.map((offer, index) => (
                            <SpecialOfferBanner
                                key={offer.id}
                                offer={offer}
                                width={BANNER_WIDTH}
                                currentIndex={index}
                                totalItems={specialOffers.length}
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
                        {services.map((service) => (
                            <ServiceIcon
                                key={service.id}
                                service={service}
                                onPress={handleServicePress}
                            />
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
                        {popularServices.map((service) => (
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
        gap: 16,
        justifyContent: 'space-between',
    },
    popularList: {
        gap: 16,
    },
});
