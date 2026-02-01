import React from 'react';
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

interface PolicySectionProps {
    title: string;
    content: string;
}

const PolicySection: React.FC<PolicySectionProps> = ({ title, content }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionContent}>{content}</Text>
        </View>
    );
};

export default function PrivacyPolicyScreen() {
    const insets = useSafeAreaInsets();
    const { t } = useLanguage();

    const sections = [
        {
            title: '1. Information We Collect',
            content: 'We collect information you provide directly to us, such as when you create an account, book a service, or contact us for support. This includes your name, email address, phone number, payment information, and service preferences.'
        },
        {
            title: '2. How We Use Your Information',
            content: 'We use the information we collect to provide, maintain, and improve our services, process your transactions, send you technical notices and support messages, respond to your comments and questions, and communicate with you about products, services, and events.'
        },
        {
            title: '3. Information Sharing',
            content: 'We do not share your personal information with third parties except as described in this policy. We may share information with service providers who perform services on our behalf, to comply with legal obligations, or to protect our rights and safety.'
        },
        {
            title: '4. Data Security',
            content: 'We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet or electronic storage system is completely secure.'
        },
        {
            title: '5. Your Rights',
            content: 'You have the right to access, update, or delete your personal information at any time. You can do this through your account settings or by contacting us directly. You may also opt out of receiving promotional communications from us.'
        },
        {
            title: '6. Cookies and Tracking',
            content: 'We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.'
        },
        {
            title: '7. Children\'s Privacy',
            content: 'Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.'
        },
        {
            title: '8. Changes to This Policy',
            content: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date.'
        },
        {
            title: '9. Contact Us',
            content: 'If you have any questions about this privacy policy, please contact us at privacy@trabaja.com or through our in-app support chat.'
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
                    <Text style={styles.headerTitle}>{t.privacyPolicy.title}</Text>
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
                {/* Last Updated */}
                <View style={styles.updatedContainer}>
                    <Ionicons name="time-outline" size={16} color={Theme.colors.textSecondary} />
                    <Text style={styles.updatedText}>Last updated: January 2026</Text>
                </View>

                {/* Introduction */}
                <View style={styles.introContainer}>
                    <Text style={styles.introText}>
                        This Privacy Policy describes how Trabaja collects, uses, and shares your personal information when you use our service marketplace platform.
                    </Text>
                </View>

                {/* Policy Sections */}
                {sections.map((section, index) => (
                    <PolicySection
                        key={index}
                        title={section.title}
                        content={section.content}
                    />
                ))}

                {/* Footer Note */}
                <View style={styles.footerNote}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="shield-checkmark" size={40} color={Theme.colors.primary} />
                    </View>
                    <Text style={styles.footerTitle}>Your Privacy Matters</Text>
                    <Text style={styles.footerText}>
                        We're committed to protecting your personal information and being transparent about our data practices.
                    </Text>
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
    updatedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 24,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: Theme.colors.surface,
        borderRadius: 12,
    },
    updatedText: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
        fontWeight: '500',
    },
    introContainer: {
        marginBottom: 32,
        padding: 20,
        backgroundColor: Theme.colors.primaryLight,
        borderRadius: 16,
        borderLeftWidth: 4,
        borderLeftColor: Theme.colors.primary,
    },
    introText: {
        fontSize: 16,
        lineHeight: 24,
        color: Theme.colors.textPrimary,
        fontWeight: '500',
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Theme.colors.textPrimary,
        marginBottom: 12,
    },
    sectionContent: {
        fontSize: 16,
        lineHeight: 24,
        color: Theme.colors.textSecondary,
        fontWeight: '400',
    },
    footerNote: {
        alignItems: 'center',
        padding: 24,
        backgroundColor: Theme.colors.white,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        marginTop: 8,
        ...Theme.shadows.small,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Theme.colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    footerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Theme.colors.textPrimary,
        marginBottom: 8,
    },
    footerText: {
        fontSize: 14,
        lineHeight: 20,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        fontWeight: '500',
    },
});
