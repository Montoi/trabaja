import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    AppState,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Theme } from '../../constants/Theme';
import { useLanguage } from '../../contexts/LanguageContext';

type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

interface Booking {
    id: string;
    serviceTitle: string;
    providerName: string;
    providerImage: string;
    status: BookingStatus;
    date?: string;
    time?: string;
}

interface BookingCardProps {
    booking: Booking;
    isExpanded: boolean;
    onToggleExpand: () => void;
    onChatPress: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
    booking,
    isExpanded,
    onToggleExpand,
    onChatPress
}) => {
    const { t } = useLanguage();

    const getStatusConfig = () => {
        switch (booking.status) {
            case 'upcoming':
                return {
                    bg: Theme.colors.primaryLight,
                    text: Theme.colors.primary,
                    label: t.bookings.upcoming
                };
            case 'completed':
                return {
                    bg: Theme.colors.successLight,
                    text: Theme.colors.success,
                    label: t.bookings.completed
                };
            case 'cancelled':
                return {
                    bg: Theme.colors.errorLight,
                    text: Theme.colors.error,
                    label: t.bookings.cancelled
                };
        }
    };

    const statusConfig = getStatusConfig();

    return (
        <View style={styles.bookingCard}>
            <View style={styles.bookingMain}>
                <Image
                    source={{ uri: booking.providerImage }}
                    style={styles.providerImage}
                    contentFit="cover"
                />
                <View style={styles.bookingInfo}>
                    <Text style={styles.serviceTitle} numberOfLines={1}>
                        {booking.serviceTitle}
                    </Text>
                    <Text style={styles.providerName} numberOfLines={1}>
                        {booking.providerName}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
                        <Text style={[styles.statusText, { color: statusConfig.text }]}>
                            {statusConfig.label}
                        </Text>
                    </View>
                </View>
                <Pressable
                    onPress={onChatPress}
                    style={({ pressed }) => [
                        styles.chatButton,
                        pressed && styles.chatButtonPressed
                    ]}
                >
                    <Ionicons name="chatbubble-ellipses" size={20} color={Theme.colors.primary} />
                </Pressable>
            </View>

            <Pressable
                onPress={onToggleExpand}
                style={styles.expandButton}
            >
                <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={24}
                    color={Theme.colors.border}
                />
            </Pressable>

            {isExpanded && (
                <View style={styles.expandedContent}>
                    <View style={styles.expandedRow}>
                        <Ionicons name="calendar-outline" size={20} color={Theme.colors.textSecondary} />
                        <Text style={styles.expandedText}>
                            {booking.date || 'Dec 28, 2024'}
                        </Text>
                    </View>
                    <View style={styles.expandedRow}>
                        <Ionicons name="time-outline" size={20} color={Theme.colors.textSecondary} />
                        <Text style={styles.expandedText}>
                            {booking.time || '10:00 AM - 12:00 PM'}
                        </Text>
                    </View>
                    <View style={styles.expandedRow}>
                        <Ionicons name="location-outline" size={20} color={Theme.colors.textSecondary} />
                        <Text style={styles.expandedText}>
                            123 Main Street, Apt 4B
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default function MyBookingsScreen() {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<BookingStatus>('upcoming');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const { t } = useLanguage();

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

    const handleToggleExpand = useCallback((id: string) => {
        setExpandedId(prev => prev === id ? null : id);
    }, []);

    // Mock data
    const allBookings: Booking[] = [
        {
            id: '1',
            serviceTitle: 'House Cleaning',
            providerName: 'Jenny Wilson',
            providerImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
            status: 'upcoming',
            date: 'Dec 28, 2024',
            time: '09:00 AM - 11:00 AM'
        },
        {
            id: '2',
            serviceTitle: 'Plumbing Repair',
            providerName: 'Robert Fox',
            providerImage: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400',
            status: 'upcoming',
            date: 'Dec 29, 2024',
            time: '02:00 PM - 04:00 PM'
        },
        {
            id: '3',
            serviceTitle: 'Electrical Service',
            providerName: 'Devon Lane',
            providerImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400',
            status: 'completed',
            date: 'Dec 20, 2024',
            time: '10:00 AM - 12:00 PM'
        },
        {
            id: '4',
            serviceTitle: 'AC Repair',
            providerName: 'Kristin Watson',
            providerImage: 'https://images.unsplash.com/photo-1632053002-e9a87138ce1f?w=400',
            status: 'completed',
            date: 'Dec 18, 2024',
            time: '03:00 PM - 05:00 PM'
        },
        {
            id: '5',
            serviceTitle: 'Plumbing Repair',
            providerName: 'Chantal Shelburne',
            providerImage: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400',
            status: 'cancelled',
            date: 'Dec 15, 2024',
            time: '01:00 PM - 03:00 PM'
        },
        {
            id: '6',
            serviceTitle: 'Appliance Service',
            providerName: 'Benny Spanbauer',
            providerImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400',
            status: 'cancelled',
            date: 'Dec 12, 2024',
            time: '11:00 AM - 01:00 PM'
        },
    ];

    const filteredBookings = allBookings.filter(b => b.status === activeTab);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={[styles.toolbar, { paddingTop: insets.top }]}>
                <View style={styles.toolbarContent}>
                    <View style={styles.toolbarLeft}>
                        <View style={styles.logoBadge}>
                            <Text style={styles.logoText}>h</Text>
                        </View>
                        <Text style={styles.toolbarTitle}>{t.bookings.title}</Text>
                    </View>
                    <View style={styles.toolbarRight}>
                        <Pressable style={styles.iconButton}>
                            <Ionicons name="search-outline" size={24} color={Theme.colors.textPrimary} />
                        </Pressable>
                        <Pressable style={styles.iconButton}>
                            <Ionicons name="ellipsis-horizontal" size={24} color={Theme.colors.textPrimary} />
                        </Pressable>
                    </View>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <Pressable
                    onPress={() => setActiveTab('upcoming')}
                    style={styles.tab}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'upcoming' && styles.tabTextActive
                    ]}>
                        {t.bookings.upcoming}
                    </Text>
                    {activeTab === 'upcoming' && <View style={styles.tabIndicator} />}
                </Pressable>

                <Pressable
                    onPress={() => setActiveTab('completed')}
                    style={styles.tab}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'completed' && styles.tabTextActive
                    ]}>
                        {t.bookings.completed}
                    </Text>
                    {activeTab === 'completed' && <View style={styles.tabIndicator} />}
                </Pressable>

                <Pressable
                    onPress={() => setActiveTab('cancelled')}
                    style={styles.tab}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'cancelled' && styles.tabTextActive
                    ]}>
                        {t.bookings.cancelled}
                    </Text>
                    {activeTab === 'cancelled' && <View style={styles.tabIndicator} />}
                </Pressable>
            </View>

            {/* Bookings List */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: bottomPadding }
                ]}
            >
                {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                        <BookingCard
                            key={booking.id}
                            booking={booking}
                            isExpanded={expandedId === booking.id}
                            onToggleExpand={() => handleToggleExpand(booking.id)}
                            onChatPress={() => router.push({
                                pathname: '/chat',
                                params: {
                                    bookingId: booking.id,
                                    provider: booking.providerName,
                                    providerImage: booking.providerImage,
                                }
                            })}
                        />
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="calendar-outline" size={64} color={Theme.colors.border} />
                        <Text style={styles.emptyTitle}>No {activeTab} bookings</Text>
                        <Text style={styles.emptyText}>
                            You don't have any {activeTab} bookings at the moment
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    toolbar: {
        backgroundColor: Theme.colors.background,
    },
    toolbarContent: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    toolbarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    logoBadge: {
        width: 40,
        height: 40,
        backgroundColor: Theme.colors.primary,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        ...Theme.shadows.primary,
    },
    logoText: {
        color: Theme.colors.white,
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    toolbarTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Theme.colors.textPrimary,
    },
    toolbarRight: {
        flexDirection: 'row',
        gap: 8,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabsContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
        paddingHorizontal: 24,
    },
    tab: {
        flex: 1,
        paddingVertical: 16,
        alignItems: 'center',
        position: 'relative',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        color: Theme.colors.textSecondary,
    },
    tabTextActive: {
        fontWeight: '700',
        color: Theme.colors.primary,
    },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: Theme.colors.primary,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 20,
        gap: 16,
    },
    bookingCard: {
        backgroundColor: Theme.colors.white,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        ...Theme.shadows.small,
    },
    bookingMain: {
        flexDirection: 'row',
        gap: 16,
    },
    providerImage: {
        width: 80,
        height: 80,
        borderRadius: 16,
    },
    bookingInfo: {
        flex: 1,
        gap: 8,
    },
    serviceTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Theme.colors.textPrimary,
    },
    providerName: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
        fontWeight: '500',
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
    },
    chatButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Theme.colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatButtonPressed: {
        opacity: 0.7,
    },
    expandButton: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.border,
        alignItems: 'center',
    },
    expandedContent: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.border,
        gap: 12,
    },
    expandedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    expandedText: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
        fontWeight: '500',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 60,
        gap: 16,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Theme.colors.textPrimary,
    },
    emptyText: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        fontWeight: '500',
    },
});
