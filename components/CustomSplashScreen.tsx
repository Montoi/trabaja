import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BrandLogo from './BrandLogo';
import FloatingTools from './FloatingTools';
import { Theme } from '../constants/Theme';

const { width } = Dimensions.get('window');

export default function CustomSplashScreen() {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Background Pattern */}
            <View style={styles.backgroundPatterns}>
                <View style={[styles.blurCircle, styles.blurTop]} />
                <View style={[styles.blurCircle, styles.blurBottom]} />
            </View>

            {/* Content Wrapper */}
            <View style={styles.content}>
                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <View style={styles.logoWrapper}>
                        <BrandLogo width={64} height={64} color="#FFFFFF" />
                    </View>
                </View>

                {/* Animated Tools Fountain */}
                <View style={styles.spinnerContainer}>
                    <FloatingTools />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // background-light
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    backgroundPatterns: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    blurCircle: {
        position: 'absolute',
        borderRadius: 999,
        backgroundColor: Theme.colors.primary,
        opacity: 0.05, // bg-primary/5
    },
    blurTop: {
        width: 500,
        height: 500,
        top: '-20%',
        right: '-10%',
    },
    blurBottom: {
        width: 400,
        height: 400,
        bottom: '-10%',
        left: '-10%',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 384, // max-w-sm
        padding: 24,
    },
    logoContainer: {
        marginBottom: 64, // mb-16
        alignItems: 'center',
    },
    logoWrapper: {
        width: 128, // w-32
        height: 128, // h-32
        backgroundColor: Theme.colors.primary,
        borderRadius: 32, // rounded-[2rem]
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2, // shadow-xl shadow-primary/20
        shadowRadius: 20,
        elevation: 10,
        marginBottom: 16,
    },
    spinnerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20, // Add some space from logo
    },
});
