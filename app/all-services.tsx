import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ServiceIcon } from '../components/home/ServiceIcon';
import type { Service } from '../types/home';

const ALL_SERVICES: Service[] = [
    {
        id: '1',
        name: 'Cleaning',
        icon: 'brush-outline',
        iconColor: '#7C3AED',
        bgColor: '#EDE9FE',
    },
    {
        id: '2',
        name: 'Repairing',
        icon: 'build-outline',
        iconColor: '#EA580C',
        bgColor: '#FFEDD5',
    },
    {
        id: '3',
        name: 'Painting',
        icon: 'color-fill-outline',
        iconColor: '#2563EB',
        bgColor: '#DBEAFE',
    },
    {
        id: '4',
        name: 'Laundry',
        icon: 'water-outline',
        iconColor: '#CA8A04',
        bgColor: '#FEF9C3',
    },
    {
        id: '5',
        name: 'Appliance',
        icon: 'refrigerator-outline',
        iconColor: '#DC2626',
        bgColor: '#FEE2E2',
    },
    {
        id: '6',
        name: 'Plumbing',
        icon: 'Construct-outline',
        iconColor: '#059669',
        bgColor: '#D1FAE5',
    },
    {
        id: '7',
        name: 'Shifting',
        icon: 'bus-outline',
        iconColor: '#0891B2',
        bgColor: '#CFFAFE',
    },
    {
        id: '8',
        name: 'Beauty',
        icon: 'cut-outline',
        iconColor: '#DB2777',
        bgColor: '#FCE7F3',
    },
    {
        id: '9',
        name: 'AC Repair',
        icon: 'snow-outline',
        iconColor: '#16A34A',
        bgColor: '#DCFCE7',
    },
    {
        id: '10',
        name: 'Vehicle',
        icon: 'car-outline',
        iconColor: '#4F46E5',
        bgColor: '#E0E7FF',
    },
    {
        id: '11',
        name: 'Electronics',
        icon: 'laptop-outline',
        iconColor: '#D97706',
        bgColor: '#FEF3C7',
    },
    {
        id: '12',
        name: 'Massage',
        icon: 'leaf-outline',
        iconColor: '#E11D48',
        bgColor: '#FFE4E6',
    },
    {
        id: '13',
        name: "Men's Salon",
        icon: 'person-outline',
        iconColor: '#7C3AED',
        bgColor: '#F5F3FF',
    },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_PADDING = 24;
const COLUMN_GAP = 16;
const ITEM_WIDTH = (SCREEN_WIDTH - (GRID_PADDING * 2) - (COLUMN_GAP * 3)) / 4;

export default function AllServicesScreen() {
    const insets = useSafeAreaInsets();

    const handleServicePress = (id: string) => {
        const service = ALL_SERVICES.find(s => s.id === id);
        if (service) {
            router.push({
                pathname: '/popular-services',
                params: { category: service.name }
            });
        }
    };

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
                        <Text style={styles.headerTitle}>All Services</Text>
                    </View>
                    <Pressable style={styles.moreButton}>
                        <Ionicons name="ellipsis-horizontal" size={20} color="#000" />
                    </Pressable>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.grid}>
                    {ALL_SERVICES.map((service) => (
                        <View key={service.id} style={[styles.gridItem, { width: ITEM_WIDTH }]}>
                            <ServiceIcon
                                service={service}
                                onPress={handleServicePress}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
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
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16, // This is COLUMN_GAP
        rowGap: 32, // More space between rows
    },
    gridItem: {
        // Width is handled dynamically
    },
});
