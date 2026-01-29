import { View, Text, StyleSheet, SectionList, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { memo, useCallback } from 'react';
import { Theme } from '../constants/Theme';

interface NotificationItem {
    id: string;
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    iconBg: string;
    type: 'payment' | 'category' | 'offer' | 'security' | 'account';
}

interface NotificationSection {
    title: string;
    data: NotificationItem[];
}

const NOTIFICATIONS: NotificationSection[] = [
    {
        title: 'Today',
        data: [
            {
                id: '1',
                title: 'Payment Successful!',
                description: 'You have made a services payment',
                icon: 'wallet-outline',
                iconBg: '#7C3AED',
                type: 'payment',
            },
            {
                id: '2',
                title: 'New Category Services!',
                description: 'Now the plumbing service is available',
                icon: 'grid-outline',
                iconBg: '#FB7185',
                type: 'category',
            },
        ],
    },
    {
        title: 'Yesterday',
        data: [
            {
                id: '3',
                title: "Today's Special Offers",
                description: 'You get a special promo today!',
                icon: 'gift-outline',
                iconBg: '#FBBF24',
                type: 'offer',
            },
        ],
    },
    {
        title: 'December 22, 2024',
        data: [
            {
                id: '4',
                title: 'Credit Card Connected!',
                description: 'Credit Card has been linked!',
                icon: 'card-outline',
                iconBg: '#7C3AED',
                type: 'security',
            },
            {
                id: '5',
                title: 'Account Setup Successful!',
                description: 'Your account has been created!',
                icon: 'person-outline',
                iconBg: '#34D399',
                type: 'account',
            },
        ],
    },
];

const NotificationCard = memo(({ item }: { item: NotificationItem }) => (
    <View style={styles.card}>
        <View style={styles.iconWrapper}>
            <View style={styles.iconContainer}>
                <View style={[styles.iconBg, { backgroundColor: item.iconBg }]}>
                    <Ionicons name={item.icon} size={24} color="#FFF" />
                </View>
                {/* Decorative Dots matching HTML design */}
                <View style={[styles.dot, { backgroundColor: item.iconBg, width: 6, height: 6, top: -4, right: -4, opacity: 0.4 }]} />
                <View style={[styles.dot, { backgroundColor: item.iconBg, width: 4, height: 4, bottom: 0, left: -4, opacity: 0.3 }]} />
                <View style={[styles.dot, { backgroundColor: item.iconBg, width: 8, height: 8, top: 8, left: -12, opacity: 0.2 }]} />
            </View>
        </View>
        <View style={styles.content}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationDesc}>{item.description}</Text>
        </View>
    </View>
));

export default function NotificationsScreen() {
    const insets = useSafeAreaInsets();

    const renderItem = useCallback(({ item }: { item: NotificationItem }) => (
        <NotificationCard item={item} />
    ), []);

    const renderSectionHeader = useCallback(({ section: { title } }: { section: { title: string } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
    ), []);

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
                        <Text style={styles.headerTitle}>Notification</Text>
                    </View>
                    <Pressable style={styles.moreButton}>
                        <Ionicons name="ellipsis-horizontal" size={20} color={Theme.colors.textPrimary} />
                    </Pressable>
                </View>
            </View>

            <SectionList
                sections={NOTIFICATIONS}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                stickySectionHeadersEnabled={false}
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
        backgroundColor: '#F8F9FA',
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
        paddingTop: 8,
        paddingBottom: 40,
    },
    section: {
        marginTop: 24,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: '700',
        color: '#64748B',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        // Premium Shadow matching HTML
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
    },
    iconWrapper: {
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        position: 'relative',
        width: 48,
        height: 48,
    },
    iconBg: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    dot: {
        position: 'absolute',
        borderRadius: 999,
    },
    content: {
        flex: 1,
        marginLeft: 16,
    },
    notificationTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 2,
    },
    notificationDesc: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
    },
});
