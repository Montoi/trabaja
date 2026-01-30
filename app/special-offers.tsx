import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SpecialOfferBanner } from '../components/home/SpecialOfferBanner';
import type { SpecialOffer } from '../types/home';
import { useCallback } from 'react';

const SPECIAL_OFFERS: SpecialOffer[] = [
    {
        id: '1',
        discount: '30%',
        title: "Today's Special!",
        description: 'Get discount for every service, only valid for today',
        bgColor: '#7210FF',
    },
    {
        id: '2',
        discount: '25%',
        title: 'Cleaning Promo',
        description: 'Professional home cleaning at a special price',
        bgColor: '#FF9500',
    },
    {
        id: '3',
        discount: '20%',
        title: 'Repairing Deal',
        description: 'Fixed price for all minor home repairs',
        bgColor: '#FF2D55',
    },
    {
        id: '4',
        discount: '15%',
        title: 'Painting Offer',
        description: 'Refresh your home walls with our expert painters',
        bgColor: '#34C759',
    },
    {
        id: '5',
        discount: '45%',
        title: 'Construction!',
        description: 'Expert builders for all your construction projects',
        bgColor: '#5856D6',
    },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 48;

export default function SpecialOffersScreen() {
    const insets = useSafeAreaInsets();

    const renderItem = useCallback(({ item }: { item: SpecialOffer }) => (
        <View style={styles.bannerWrapper}>
            <SpecialOfferBanner
                offer={item}
                width={BANNER_WIDTH}
            />
        </View>
    ), []);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <View style={styles.headerContent}>
                    <View style={styles.headerLeft}>
                        <Pressable onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#000" />
                        </Pressable>
                        <Text style={styles.headerTitle}>Special Offers</Text>
                    </View>
                    <Pressable style={styles.moreButton}>
                        <Ionicons name="ellipsis-horizontal" size={20} color="#000" />
                    </Pressable>
                </View>
            </View>

            <FlashList
                data={SPECIAL_OFFERS}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
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
        color: '#000',
        marginLeft: 8,
    },
    moreButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
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
    bannerWrapper: {
        marginBottom: 20,
    },
});
