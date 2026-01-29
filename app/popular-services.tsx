import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PopularServiceCard } from '../components/home/PopularServiceCard';
import type { PopularService } from '../types/home';
import { useMemo, useCallback } from 'react';

const POPULAR_SERVICES: PopularService[] = [
    // Cleaning
    { id: 'c1', title: 'House Cleaning', category: 'Cleaning', provider: 'Jenny Wilson', price: 24, rating: 4.8, reviewCount: 8289, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=500', isBookmarked: false },
    { id: 'c2', title: 'Office Cleaning', category: 'Cleaning', provider: 'Robert Fox', price: 30, rating: 4.7, reviewCount: 1240, image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=500', isBookmarked: false },
    { id: 'c3', title: 'Deep Kitchen Cleaning', category: 'Cleaning', provider: 'Arlene McCoy', price: 45, rating: 4.9, reviewCount: 950, image: 'https://images.unsplash.com/photo-1527515545081-5db817172677?q=80&w=500', isBookmarked: false },
    // Repairing
    { id: 'r1', title: 'AC Repair & Service', category: 'Repairing', provider: 'Sarah Johnson', price: 45, rating: 4.9, reviewCount: 5120, image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400', isBookmarked: true },
    { id: 'r2', title: 'Washing Machine Repair', category: 'Repairing', provider: 'Michael Jordan', price: 35, rating: 4.7, reviewCount: 2100, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=500', isBookmarked: false },
    { id: 'r3', title: 'Microwave Repair', category: 'Repairing', provider: 'David Goggins', price: 25, rating: 4.8, reviewCount: 1540, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=500', isBookmarked: false },
    // Painting
    { id: 'p1', title: 'House Painting', category: 'Painting', provider: 'Clinton Mcclure', price: 32, rating: 4.6, reviewCount: 4210, image: 'https://images.unsplash.com/photo-1589939705384-5185138a04b9?w=400', isBookmarked: false },
    { id: 'p2', title: 'Wall Stenciling', category: 'Painting', provider: 'Emily Blunt', price: 50, rating: 4.9, reviewCount: 890, image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=500', isBookmarked: false },
    { id: 'p3', title: 'Textured Painting', category: 'Painting', provider: 'Jessica Alba', price: 40, rating: 4.7, reviewCount: 1120, image: 'https://images.unsplash.com/photo-1562663474-6cbb3fee4c77?q=80&w=500', isBookmarked: false },
    // Laundry
    { id: 'l1', title: 'Laundry Services', category: 'Laundry', provider: 'Janetta Rotolo', price: 19, rating: 4.7, reviewCount: 7938, image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=500', isBookmarked: false },
    { id: 'l2', title: 'Dry Cleaning', category: 'Laundry', provider: 'Tom Cruise', price: 25, rating: 4.8, reviewCount: 3400, image: 'https://images.unsplash.com/photo-1545173168-9f1947eeba01?q=80&w=500', isBookmarked: false },
    { id: 'l3', title: 'Ironing Services', category: 'Laundry', provider: 'Brad Pitt', price: 10, rating: 4.6, reviewCount: 1200, image: 'https://images.unsplash.com/photo-1489274495757-95c7c137b42d?q=80&w=500', isBookmarked: false },
    // Appliance
    { id: 'a1', title: 'Refrigerator Repair', category: 'Appliance', provider: 'Johnny Depp', price: 40, rating: 4.8, reviewCount: 2200, image: 'https://images.unsplash.com/photo-1571175432230-01c288a399bb?q=80&w=500', isBookmarked: false },
    { id: 'a2', title: 'TV Installation', category: 'Appliance', provider: 'Leonardo DiCaprio', price: 50, rating: 4.9, reviewCount: 1800, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=500', isBookmarked: false },
    { id: 'a3', title: 'Dishwasher Repair', category: 'Appliance', provider: 'Scarlett Johansson', price: 35, rating: 4.7, reviewCount: 950, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500', isBookmarked: false },
    // Plumbing
    { id: 'pl1', title: 'Leakage Repair', category: 'Plumbing', provider: 'Jason Statham', price: 30, rating: 4.9, reviewCount: 3100, image: 'https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=500', isBookmarked: false },
    { id: 'pl2', title: 'Tap Replacement', category: 'Plumbing', provider: 'Dwayne Johnson', price: 15, rating: 4.8, reviewCount: 1500, image: 'https://images.unsplash.com/photo-1585704032915-c3400ca1f965?q=80&w=500', isBookmarked: false },
    { id: 'pl3', title: 'Pipe Fitting', category: 'Plumbing', provider: 'Vin Diesel', price: 60, rating: 4.7, reviewCount: 890, image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=500', isBookmarked: false },
    // Shifting
    { id: 's1', title: 'House Shifting', category: 'Shifting', provider: 'Will Smith', price: 200, rating: 4.9, reviewCount: 520, image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=500', isBookmarked: false },
    { id: 's2', title: 'Office Relocation', category: 'Shifting', provider: 'Chris Pratt', price: 500, rating: 4.8, reviewCount: 340, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=500', isBookmarked: false },
    { id: 's3', title: 'Vehicle Transportation', category: 'Shifting', provider: 'Ryan Reynolds', price: 300, rating: 4.7, reviewCount: 220, image: 'https://images.unsplash.com/photo-1519003722824-11867c29bebc?q=80&w=500', isBookmarked: false },
    // Beauty
    { id: 'b1', title: 'Full Face Makeup', category: 'Beauty', provider: 'Kim Kardashian', price: 80, rating: 4.9, reviewCount: 12000, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=500', isBookmarked: false },
    { id: 'b2', title: 'Bridal Package', category: 'Beauty', provider: 'Rihanna', price: 300, rating: 5.0, reviewCount: 4500, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=500', isBookmarked: false },
    { id: 'b3', title: 'Nail Art', category: 'Beauty', provider: 'Selena Gomez', price: 40, rating: 4.8, reviewCount: 3200, image: 'https://images.unsplash.com/photo-1604654894610-df49ff668781?q=80&w=500', isBookmarked: false },
    // AC Repair
    { id: 'ac1', title: 'Split AC Service', category: 'AC Repair', provider: 'Lionel Messi', price: 40, rating: 4.9, reviewCount: 8900, image: 'https://images.unsplash.com/photo-1590432243402-b67329598a4d?q=80&w=500', isBookmarked: false },
    { id: 'ac2', title: 'Window AC Service', category: 'AC Repair', provider: 'Cristiano Ronaldo', price: 35, rating: 4.8, reviewCount: 6700, image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=500', isBookmarked: false },
    { id: 'ac3', title: 'Gas Charging', category: 'AC Repair', provider: 'Neymar Jr', price: 60, rating: 4.7, reviewCount: 4300, image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?q=80&w=500', isBookmarked: false },
    // Vehicle
    { id: 'v1', title: 'Car Deep Wash', category: 'Vehicle', provider: 'Lewis Hamilton', price: 20, rating: 4.9, reviewCount: 11000, image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=500', isBookmarked: false },
    { id: 'v2', title: 'Full Engine Check', category: 'Vehicle', provider: 'Sebastian Vettel', price: 100, rating: 4.8, reviewCount: 5400, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=500', isBookmarked: false },
    { id: 'v3', title: 'Tyre Replacement', category: 'Vehicle', provider: 'Max Verstappen', price: 80, rating: 4.7, reviewCount: 3200, image: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=500', isBookmarked: false },
    // Electronics
    { id: 'e1', title: 'Laptop Repair', category: 'Electronics', provider: 'Elon Musk', price: 150, rating: 4.9, reviewCount: 7800, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=500', isBookmarked: false },
    { id: 'e2', title: 'Mobile Screen Repair', category: 'Electronics', provider: 'Bill Gates', price: 80, rating: 4.8, reviewCount: 5600, image: 'https://images.unsplash.com/photo-1512428559083-a40ce9033afb?q=80&w=500', isBookmarked: false },
    { id: 'e3', title: 'Camera Lens Cleaning', category: 'Electronics', provider: 'Mark Zuckerberg', price: 30, rating: 4.7, reviewCount: 2300, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500', isBookmarked: false },
    // Massage
    { id: 'm1', title: 'Full Body Massage', category: 'Massage', provider: 'The Rock', price: 60, rating: 4.9, reviewCount: 9400, image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=500', isBookmarked: false },
    { id: 'm2', title: 'Spa & Aroma Therapy', category: 'Massage', provider: 'Gal Gadot', price: 100, rating: 4.8, reviewCount: 6200, image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=500', isBookmarked: false },
    { id: 'm3', title: 'Foot Massage', category: 'Massage', provider: 'Zendaya', price: 30, rating: 4.7, reviewCount: 4500, image: 'https://images.unsplash.com/photo-1519415510271-435423635c2a?q=80&w=500', isBookmarked: false },
    // Men's Salon
    { id: 'ms1', title: 'Hair Cut & Styling', category: "Men's Salon", provider: 'David Beckham', price: 25, rating: 4.9, reviewCount: 15000, image: 'https://images.unsplash.com/photo-1503910358245-44d77ba70447?q=80&w=500', isBookmarked: false },
    { id: 'ms2', title: 'Beard Trimming', category: "Men's Salon", provider: 'Chris Hemsworth', price: 15, rating: 4.8, reviewCount: 8900, image: 'https://images.unsplash.com/photo-1599351431247-f132f0384aa8?q=80&w=500', isBookmarked: false },
    { id: 'ms3', title: 'Facial for Men', category: "Men's Salon", provider: 'Henry Cavill', price: 40, rating: 4.7, reviewCount: 5400, image: 'https://images.unsplash.com/photo-1567894340348-735d7c0f9937?q=80&w=500', isBookmarked: false },
];

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
                            <Ionicons name="arrow-back" size={24} color="#000" />
                        </Pressable>
                        <Text style={styles.headerTitle}>{headerTitle}</Text>
                    </View>
                    <Pressable style={styles.moreButton}>
                        <Ionicons name="ellipsis-horizontal" size={20} color="#000" />
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
