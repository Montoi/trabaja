import React, { useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Theme } from '../constants/Theme';

interface PaymentMethod {
    id: string;
    name: string;
    icon: any;
    type: 'wallet' | 'card';
    lastFour?: string;
    connected: boolean;
}

interface PaymentCardProps {
    method: PaymentMethod;
    onPress: () => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ method, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.paymentCard,
                pressed && styles.paymentCardPressed,
            ]}
        >
            <View style={styles.paymentCardLeft}>
                {/* Icon placeholder - in production, use actual logos */}
                <View style={styles.paymentIcon}>
                    {method.type === 'wallet' ? (
                        <Ionicons name="wallet" size={24} color={Theme.colors.primary} />
                    ) : (
                        <Ionicons name="card" size={24} color={Theme.colors.primary} />
                    )}
                </View>
                <Text style={styles.paymentName}>
                    {method.type === 'card' && method.lastFour
                        ? `•••• •••• •••• ${method.lastFour}`
                        : method.name}
                </Text>
            </View>
            <Text style={styles.connectedBadge}>
                {method.connected ? 'Connected' : 'Not Connected'}
            </Text>
        </Pressable>
    );
};

export default function PaymentMethodsScreen() {
    const insets = useSafeAreaInsets();

    // Payment methods data
    const paymentMethods: PaymentMethod[] = [
        {
            id: '1',
            name: 'PayPal',
            icon: 'paypal',
            type: 'wallet',
            connected: true,
        },
        {
            id: '2',
            name: 'Google Pay',
            icon: 'google-pay',
            type: 'wallet',
            connected: true,
        },
        {
            id: '3',
            name: 'Apple Pay',
            icon: 'apple-pay',
            type: 'wallet',
            connected: true,
        },
        {
            id: '4',
            name: 'Mastercard',
            icon: 'mastercard',
            type: 'card',
            lastFour: '4679',
            connected: true,
        },
    ];

    const handlePaymentMethodPress = useCallback((method: PaymentMethod) => {
        console.log('Selected payment method:', method.name);
        // TODO: Navigate to payment method details or disconnect
    }, []);

    const handleAddCard = useCallback(() => {
        router.push('/add-card');
    }, []);

    const handleMoreOptions = useCallback(() => {
        console.log('More options');
    }, []);

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
                        <Text style={styles.headerTitle}>Payment</Text>
                    </View>
                    <Pressable onPress={handleMoreOptions} style={styles.moreButton}>
                        <Ionicons name="ellipsis-horizontal" size={24} color={Theme.colors.textPrimary} />
                    </Pressable>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: insets.bottom + 120 }
                ]}
            >
                {/* Payment Methods List */}
                <View style={styles.paymentsList}>
                    {paymentMethods.map((method) => (
                        <PaymentCard
                            key={method.id}
                            method={method}
                            onPress={() => handlePaymentMethodPress(method)}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* Fixed Add Card Button */}
            <View
                style={[
                    styles.bottomBar,
                    { paddingBottom: insets.bottom || 20 }
                ]}
            >
                <Pressable
                    onPress={handleAddCard}
                    style={({ pressed }) => [
                        styles.addButton,
                        pressed && styles.addButtonPressed,
                    ]}
                >
                    <Text style={styles.addButtonText}>Add New Card</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    header: {
        backgroundColor: Theme.colors.background,
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
        gap: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Theme.colors.textPrimary,
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
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    paymentsList: {
        gap: 16,
    },
    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Theme.colors.white,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        ...Theme.shadows.small,
    },
    paymentCardPressed: {
        opacity: 0.7,
        transform: [{ scale: 0.98 }],
    },
    paymentCardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    paymentIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: Theme.colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    paymentName: {
        fontSize: 16,
        fontWeight: '600',
        color: Theme.colors.textPrimary,
        letterSpacing: 0.5,
    },
    connectedBadge: {
        fontSize: 14,
        fontWeight: '600',
        color: Theme.colors.primary,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Theme.colors.background,
        paddingHorizontal: 24,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.border,
        ...Theme.shadows.medium,
    },
    addButton: {
        backgroundColor: Theme.colors.primary,
        borderRadius: 28,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        ...Theme.shadows.primary,
    },
    addButtonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    addButtonText: {
        color: Theme.colors.white,
        fontSize: 18,
        fontWeight: '700',
    },
});
