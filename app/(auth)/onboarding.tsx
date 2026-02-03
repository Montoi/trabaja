import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions, Image } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/Theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface OnboardingPage {
    icon1: keyof typeof MaterialIcons.glyphMap;
    icon2: keyof typeof MaterialIcons.glyphMap;
    title: string;
    description: string;
    gradientColors: readonly [string, string];
    imageUrl: string;
}

const PAGES: OnboardingPage[] = [
    {
        icon1: 'verified-user',
        icon2: 'cleaning-services',
        title: 'Find trusted professionals',
        description: 'Browse vetted service providers in your area',
        gradientColors: [Theme.colors.primary + '20', Theme.colors.primary + '05'] as const,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP2cY3nPiZTYvo1y82jfon1DmrE96A4LXeYKqv7oJY7cJGMEoYyuBZi26e57ON3hHXxY7e_baV6x86jcgexdwt5zoewF06zijouuSdeOvFedmvkAu1qEEA_BdoS2R577V-x35VBpYYv46WKyTuGEU5kIC_MdUqB30xjZ6rSxazQefMNNZzqdPPNLDjMve9ZSZLPOFo2nsHqCXjGVHw8tCMP3Cf4wStFrIDsUKuwdF28h5Z7CIJ_0XP9bjgz7aXLMJSjA8h4l3ptA6G'
    },
    {
        icon1: 'build',
        icon2: 'handyman',
        title: 'Book services instantly',
        description: 'Schedule appointments in just a few taps',
        gradientColors: [Theme.colors.iconOrange + '20', Theme.colors.iconOrange + '05'] as const,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqCNbisSmHzqjAU4RIYNGzTDPzfSWc3TeE0ZUitZ61HQhs5DPBACZ4A9_vhffxvEE4-24aAMr97907FUzd8C0heKgLGl33MvWo6aFy2_HcVBFwYD5xXyLOVH7ewtVb2B1LfZks1P77RqOpBazBIGntIxtcSGH0WBB-h53Tvcq-ZvFNxg4kGJwmDWQ9JKq_eWTaOmR9tjdpXS9yoTLO6BpjcQmp97fxhaiCTxiqPzJtcx4k3EtbPqxQDLSc8QLJiGer_RlQnV1TLEc3'
    },
    {
        icon1: 'star',
        icon2: 'favorite',
        title: 'Rate and review',
        description: 'Share your experience and help others find the best',
        gradientColors: [Theme.colors.iconGreen + '20', Theme.colors.iconGreen + '05'] as const,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaSJk_NFKkpNGs1-7JaNN41IW9S47Ij2FGwMhVT59SbiKsq7GWNtSnQDXhbDQ7M4pJq3Lpx2nKCbBgQuMv-Xy9JZXvSLKE1BDku52VWiUjZ16I6GI6SYTa-tV3hKSRtWMB4FgBdVnkXXncEn24Ju6FeQVylbOp4tkbbSfC8hah94vTtPyL7gYGZZft17_H6SWOGI2BVZ42c9dBmcZIaOL8t8YBSwDio5iLg0p693InXrjdZdZ4T4i9ZPmSkzbP6ubmMbqYR2aCPPlc'
    }
];

export default function OnboardingScreen() {
    const [currentPage, setCurrentPage] = useState(0);
    const [imageError, setImageError] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Reset image error state when page changes
        setImageError(false);
        // Fade out then fade in when page changes
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
        }).start();
    }, [currentPage]);

    const handleNext = () => {
        if (currentPage < PAGES.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            router.replace('/(auth)/login');
        }
    };

    const pageData = PAGES[currentPage];

    return (
        <View style={styles.container}>
            {/* Background Gradient */}
            <LinearGradient
                colors={pageData.gradientColors}
                style={StyleSheet.absoluteFill}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            />

            {/* Hero Section with Icons */}
            <View style={styles.heroSection}>
                {/* Main Circle Background */}
                <View style={[styles.circleLarge, { backgroundColor: Theme.colors.primary + '20' }]} />
                <View style={[styles.circleSmall, { backgroundColor: Theme.colors.primary + '30' }]} />

                {/* Image Container */}
                <View style={styles.imageContainer}>
                    {!imageError ? (
                        <Image
                            source={{ uri: pageData.imageUrl }}
                            style={styles.image}
                            resizeMode="cover"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <View style={[styles.imagePlaceholder, { backgroundColor: Theme.colors.primary }]}>
                            <MaterialIcons name="home-repair-service" size={64} color="white" />
                        </View>
                    )}
                </View>

                {/* Floating Badges */}
                <Animated.View style={[styles.badge, styles.badgeRight]}>
                    <MaterialIcons name={pageData.icon1} size={24} color={Theme.colors.primary} />
                </Animated.View>

                <Animated.View style={[styles.badge, styles.badgeLeft]}>
                    <MaterialIcons name={pageData.icon2} size={24} color={Theme.colors.primary} />
                </Animated.View>
            </View>

            {/* Content Section */}
            <View style={styles.contentSection}>
                {/* Page Indicators */}
                <View style={styles.indicatorContainer}>
                    {PAGES.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                index === currentPage && styles.indicatorActive
                            ]}
                        />
                    ))}
                </View>

                {/* Text Content */}
                <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
                    <Text style={styles.title}>{pageData.title}</Text>
                    <Text style={styles.description}>{pageData.description}</Text>
                </Animated.View>

                {/* Action Button */}
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>
                        {currentPage === PAGES.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                </Pressable>

                {/* Safe Area Spacer */}
                <View style={styles.safeAreaSpacer} />
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    heroSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    circleLarge: {
        position: 'absolute',
        width: 340,
        height: 340,
        borderRadius: 170,
    },
    circleSmall: {
        position: 'absolute',
        width: 280,
        height: 280,
        borderRadius: 140,
    },
    imageContainer: {
        width: 220,
        height: 280,
        borderTopLeftRadius: 110,
        borderTopRightRadius: 110,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        borderWidth: 4,
        borderColor: 'white',
    },
    imagePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    badge: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    badgeRight: {
        right: 24,
        bottom: '20%',
    },
    badgeLeft: {
        left: 24,
        top: '30%',
    },
    contentSection: {
        width: '100%',
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 24,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 20,
        marginBottom: 8,
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Theme.colors.divider,
    },
    indicatorActive: {
        backgroundColor: Theme.colors.primary,
        transform: [{ scale: 1.1 }],
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 32,
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 32,
        fontFamily: 'Inter_700Bold',
        color: Theme.colors.textPrimary,
        textAlign: 'center',
        lineHeight: 38,
        marginBottom: 12,
        letterSpacing: -0.5,
        minHeight: 76,
    },
    description: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 16,
    },
    button: {
        width: '100%',
        height: 56,
        backgroundColor: Theme.colors.primary,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        elevation: 4,
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
    },
    buttonPressed: {
        transform: [{ scale: 0.98 }],
        opacity: 0.9,
    },
    buttonText: {
        fontSize: 17,
        fontFamily: 'Inter_600SemiBold',
        color: 'white',
        letterSpacing: 0.015,
    },
    safeAreaSpacer: {
        height: 8,
    },
});
