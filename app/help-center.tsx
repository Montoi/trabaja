import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Theme } from '../constants/Theme';
import { useLanguage } from '../contexts/LanguageContext';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQItemProps extends FAQItem {
    isExpanded: boolean;
    onToggle: () => void;
}

interface HelpCategoryProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    description: string;
    color: string;
    onPress: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isExpanded, onToggle }) => {
    return (
        <Pressable
            onPress={onToggle}
            style={({ pressed }) => [
                styles.faqItem,
                pressed && styles.faqItemPressed,
            ]}
        >
            <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{question}</Text>
                <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={Theme.colors.textSecondary}
                />
            </View>
            {isExpanded && (
                <Text style={styles.faqAnswer}>{answer}</Text>
            )}
        </Pressable>
    );
};

const HelpCategory: React.FC<HelpCategoryProps> = ({ icon, title, description, color, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.categoryCard,
                pressed && styles.categoryCardPressed,
            ]}
        >
            <View style={[styles.categoryIcon, { backgroundColor: color }]}>
                <Ionicons name={icon} size={28} color={Theme.colors.white} />
            </View>
            <View style={styles.categoryContent}>
                <Text style={styles.categoryTitle}>{title}</Text>
                <Text style={styles.categoryDescription}>{description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Theme.colors.textSecondary} />
        </Pressable>
    );
};

export default function HelpCenterScreen() {
    const insets = useSafeAreaInsets();
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
    const { t } = useLanguage();

    const handleToggleFAQ = useCallback((index: number) => {
        setExpandedFAQ(prev => prev === index ? null : index);
    }, []);

    const faqs: FAQItem[] = [
        {
            question: 'How do I book a service?',
            answer: 'Browse services on the home page, select the service you need, choose a provider, pick your preferred date and time, and confirm your booking. You\'ll receive a confirmation notification.'
        },
        {
            question: 'How can I cancel or reschedule a booking?',
            answer: 'Go to your bookings page, select the booking you want to modify, and choose either "Reschedule" or "Cancel". Please note that cancellation policies may apply depending on timing.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and digital wallets including Apple Pay and Google Pay.'
        },
        {
            question: 'How do I become a service provider?',
            answer: 'Download the Provider app, complete the registration form, upload required documents (ID, certifications), and wait for verification. The process typically takes 2-3 business days.'
        },
        {
            question: 'Is my payment information secure?',
            answer: 'Yes, we use industry-standard encryption and comply with PCI DSS standards. We never store your full card details on our servers.'
        },
        {
            question: 'How do I contact customer support?',
            answer: 'You can reach us via in-app chat (24/7), email at support@trabaja.com, or call our hotline. Average response time is under 2 hours.'
        },
    ];

    const categories = [
        {
            icon: 'calendar-outline' as keyof typeof Ionicons.glyphMap,
            title: 'Bookings',
            description: 'Manage and track your bookings',
            color: Theme.colors.primary,
        },
        {
            icon: 'card-outline' as keyof typeof Ionicons.glyphMap,
            title: 'Payments',
            description: 'Billing and payment issues',
            color: '#10B981',
        },
        {
            icon: 'person-outline' as keyof typeof Ionicons.glyphMap,
            title: 'Account',
            description: 'Profile and account settings',
            color: '#F59E0B',
        },
        {
            icon: 'shield-checkmark-outline' as keyof typeof Ionicons.glyphMap,
            title: 'Safety',
            description: 'Safety guidelines and tips',
            color: '#EF4444',
        },
    ];

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <View style={styles.headerContent}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={Theme.colors.textPrimary} />
                    </Pressable>
                    <Text style={styles.headerTitle}>{t.helpCenter.title}</Text>
                    <View style={styles.headerSpacer} />
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: insets.bottom + 40 }
                ]}
            >
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <View style={styles.heroIcon}>
                        <Ionicons name="help-circle" size={48} color={Theme.colors.primary} />
                    </View>
                    <Text style={styles.heroTitle}>{t.helpCenter.subtitle}</Text>
                    <Text style={styles.heroSubtitle}>
                        Find answers to common questions or contact our support team
                    </Text>
                </View>

                {/* Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t.helpCenter.browseCategories}</Text>
                    <View style={styles.categoriesGrid}>
                        {categories.map((category, index) => (
                            <HelpCategory
                                key={index}
                                {...category}
                                onPress={() => console.log(`Category: ${category.title}`)}
                            />
                        ))}
                    </View>
                </View>

                {/* FAQs */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t.helpCenter.faqs}</Text>
                    <View style={styles.faqList}>
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                {...faq}
                                isExpanded={expandedFAQ === index}
                                onToggle={() => handleToggleFAQ(index)}
                            />
                        ))}
                    </View>
                </View>

                {/* Contact Support */}
                <View style={styles.contactSection}>
                    <Text style={styles.contactTitle}>Still need help?</Text>
                    <Text style={styles.contactSubtitle}>
                        Our support team is available 24/7 to assist you
                    </Text>

                    <View style={styles.contactButtons}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.contactButton,
                                styles.contactButtonPrimary,
                                pressed && styles.contactButtonPressed,
                            ]}
                        >
                            <Ionicons name="chatbubble-ellipses" size={20} color={Theme.colors.white} />
                            <Text style={styles.contactButtonTextPrimary}>{t.helpCenter.liveChat}</Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                styles.contactButton,
                                styles.contactButtonSecondary,
                                pressed && styles.contactButtonPressed,
                            ]}
                        >
                            <Ionicons name="mail" size={20} color={Theme.colors.primary} />
                            <Text style={styles.contactButtonTextSecondary}>{t.helpCenter.emailUs}</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
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
    headerSpacer: {
        width: 40,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 8,
    },
    heroSection: {
        alignItems: 'center',
        paddingVertical: 32,
        marginBottom: 16,
    },
    heroIcon: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: Theme.colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Theme.colors.textPrimary,
        marginBottom: 8,
    },
    heroSubtitle: {
        fontSize: 16,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        fontWeight: '500',
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Theme.colors.textPrimary,
        marginBottom: 16,
    },
    categoriesGrid: {
        gap: 12,
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: Theme.colors.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        ...Theme.shadows.small,
    },
    categoryCardPressed: {
        opacity: 0.7,
    },
    categoryIcon: {
        width: 56,
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    categoryContent: {
        flex: 1,
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Theme.colors.textPrimary,
        marginBottom: 4,
    },
    categoryDescription: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
        fontWeight: '400',
    },
    faqList: {
        backgroundColor: Theme.colors.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        overflow: 'hidden',
        ...Theme.shadows.small,
    },
    faqItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    faqItemPressed: {
        backgroundColor: Theme.colors.surface,
    },
    faqHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    faqQuestion: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: Theme.colors.textPrimary,
        marginRight: 12,
    },
    faqAnswer: {
        fontSize: 14,
        lineHeight: 20,
        color: Theme.colors.textSecondary,
        marginTop: 12,
        fontWeight: '400',
    },
    contactSection: {
        padding: 24,
        backgroundColor: Theme.colors.primaryLight,
        borderRadius: 20,
        alignItems: 'center',
    },
    contactTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Theme.colors.textPrimary,
        marginBottom: 8,
    },
    contactSubtitle: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: 24,
        fontWeight: '500',
    },
    contactButtons: {
        width: '100%',
        gap: 12,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 8,
    },
    contactButtonPrimary: {
        backgroundColor: Theme.colors.primary,
    },
    contactButtonSecondary: {
        backgroundColor: Theme.colors.white,
        borderWidth: 2,
        borderColor: Theme.colors.primary,
    },
    contactButtonPressed: {
        opacity: 0.8,
    },
    contactButtonTextPrimary: {
        fontSize: 16,
        fontWeight: '600',
        color: Theme.colors.white,
    },
    contactButtonTextSecondary: {
        fontSize: 16,
        fontWeight: '600',
        color: Theme.colors.primary,
    },
});
