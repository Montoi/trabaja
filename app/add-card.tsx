import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    TextInput,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Theme } from '../constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function AddCardScreen() {
    const insets = useSafeAreaInsets();

    // Form state
    const [cardName, setCardName] = useState('Andrew Ainsley');
    const [cardNumber, setCardNumber] = useState('5672 4739 7837 7265');
    const [expiryDate, setExpiryDate] = useState('09/07/26');
    const [cvv, setCvv] = useState('699');

    const handleAddCard = useCallback(() => {
        console.log('Add card:', {
            cardName,
            cardNumber,
            expiryDate,
            cvv,
        });
        router.back();
    }, [cardName, cardNumber, expiryDate, cvv]);

    const handleMoreOptions = useCallback(() => {
        console.log('More options');
    }, []);

    const formatCardNumber = (text: string) => {
        // Remove all non-digits
        const cleaned = text.replace(/\D/g, '');
        // Add space every 4 digits
        const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
        return formatted.slice(0, 19); // Max 16 digits + 3 spaces
    };

    const handleCardNumberChange = (text: string) => {
        setCardNumber(formatCardNumber(text));
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <View style={styles.headerContent}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={Theme.colors.textPrimary} />
                    </Pressable>
                    <Text style={styles.headerTitle}>Add New Card</Text>
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
                {/* Credit Card Preview */}
                <View style={styles.cardContainer}>
                    <LinearGradient
                        colors={[Theme.colors.primary, '#6B21A8']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.card}
                    >
                        {/* Card Pattern Overlay */}
                        <View style={styles.cardPattern} />

                        {/* Glow Effect */}
                        <View style={styles.cardGlow} />

                        {/* Card Content */}
                        <View style={styles.cardContent}>
                            {/* Top Section - Logo */}
                            <View style={styles.cardTop}>
                                <Text style={styles.cardLogo}>Mocard</Text>
                                <Text style={styles.cardProvider}>AMAZON</Text>
                            </View>

                            {/* Middle - Card Number */}
                            <View style={styles.cardMiddle}>
                                <Text style={styles.cardNumber}>••••  ••••  ••••  ••••</Text>
                            </View>

                            {/* Bottom Section */}
                            <View style={styles.cardBottom}>
                                <View style={styles.cardInfoLeft}>
                                    <Text style={styles.cardLabel}>CARD HOLDER NAME</Text>
                                    <Text style={styles.cardValue}>{cardName}</Text>
                                </View>
                                <View style={styles.cardInfoRight}>
                                    <View style={styles.cardExpiry}>
                                        <Text style={styles.cardLabel}>EXPIRY DATE</Text>
                                        <Text style={styles.cardValue}>09/26</Text>
                                    </View>
                                    {/* Mastercard Logo */}
                                    <View style={styles.mastercardLogo}>
                                        <View style={[styles.mastercardCircle, styles.mastercardCircleLeft]} />
                                        <View style={[styles.mastercardCircle, styles.mastercardCircleRight]} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    {/* Card Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Card Name</Text>
                        <TextInput
                            style={styles.input}
                            value={cardName}
                            onChangeText={setCardName}
                            placeholder="Enter card holder name"
                            placeholderTextColor={Theme.colors.textPlaceholder}
                        />
                    </View>

                    {/* Card Number */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Card Number</Text>
                        <TextInput
                            style={styles.input}
                            value={cardNumber}
                            onChangeText={handleCardNumberChange}
                            placeholder="0000 0000 0000 0000"
                            placeholderTextColor={Theme.colors.textPlaceholder}
                            keyboardType="number-pad"
                            maxLength={19}
                        />
                    </View>

                    {/* Expiry Date & CVV */}
                    <View style={styles.inputRow}>
                        <View style={[styles.inputGroup, styles.inputGroupFlex]}>
                            <Text style={styles.label}>Expiry Date</Text>
                            <View style={styles.inputWithIcon}>
                                <TextInput
                                    style={[styles.input, styles.inputWithIconPadding]}
                                    value={expiryDate}
                                    onChangeText={setExpiryDate}
                                    placeholder="MM/DD/YY"
                                    placeholderTextColor={Theme.colors.textPlaceholder}
                                />
                                <Ionicons
                                    name="calendar-outline"
                                    size={20}
                                    color={Theme.colors.textSecondary}
                                    style={styles.iconRight}
                                />
                            </View>
                        </View>

                        <View style={[styles.inputGroup, styles.inputGroupSmall]}>
                            <Text style={styles.label}>CVV</Text>
                            <TextInput
                                style={styles.input}
                                value={cvv}
                                onChangeText={setCvv}
                                placeholder="000"
                                placeholderTextColor={Theme.colors.textPlaceholder}
                                keyboardType="number-pad"
                                maxLength={3}
                                secureTextEntry
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Fixed Add Button */}
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
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 8,
    },
    cardContainer: {
        marginBottom: 32,
    },
    card: {
        width: '100%',
        aspectRatio: 1.58,
        borderRadius: 24,
        padding: 24,
        overflow: 'hidden',
        ...Theme.shadows.primary,
    },
    cardPattern: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundColor: 'transparent',
    },
    cardGlow: {
        position: 'absolute',
        right: -40,
        bottom: -40,
        width: 192,
        height: 192,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 96,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
        zIndex: 10,
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardLogo: {
        fontSize: 18,
        fontWeight: '700',
        color: Theme.colors.white,
        fontStyle: 'italic',
    },
    cardProvider: {
        fontSize: 10,
        fontWeight: '700',
        color: Theme.colors.white,
        letterSpacing: 2,
        opacity: 0.9,
    },
    cardMiddle: {
        justifyContent: 'center',
    },
    cardNumber: {
        fontSize: 24,
        fontWeight: '600',
        color: Theme.colors.white,
        letterSpacing: 4,
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    cardInfoLeft: {
        gap: 4,
    },
    cardInfoRight: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 16,
    },
    cardExpiry: {
        gap: 4,
    },
    cardLabel: {
        fontSize: 9,
        fontWeight: '600',
        color: Theme.colors.white,
        opacity: 0.7,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    cardValue: {
        fontSize: 14,
        fontWeight: '600',
        color: Theme.colors.white,
        letterSpacing: 0.5,
    },
    mastercardLogo: {
        width: 40,
        height: 24,
        position: 'relative',
    },
    mastercardCircle: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    mastercardCircleLeft: {
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    mastercardCircleRight: {
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    form: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    inputGroupFlex: {
        flex: 1,
    },
    inputGroupSmall: {
        width: '33%',
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: Theme.colors.textPrimary,
    },
    input: {
        height: 56,
        backgroundColor: Theme.colors.surface,
        borderRadius: 16,
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: '600',
        color: Theme.colors.textPrimary,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    inputRow: {
        flexDirection: 'row',
        gap: 16,
    },
    inputWithIcon: {
        position: 'relative',
    },
    inputWithIconPadding: {
        paddingRight: 48,
    },
    iconRight: {
        position: 'absolute',
        right: 16,
        top: 18,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingTop: 20,
        backgroundColor: Theme.colors.background,
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
