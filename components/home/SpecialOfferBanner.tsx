import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { memo } from 'react';
import type { SpecialOffer } from '../../types/home';

interface SpecialOfferBannerProps {
    offer: SpecialOffer;
    width: number;
    currentIndex?: number;
    totalItems?: number;
}

export const SpecialOfferBanner = memo(function SpecialOfferBanner({
    offer,
    width,
    currentIndex = 0,
    totalItems = 1,
}: SpecialOfferBannerProps) {
    return (
        <View style={[styles.container, { backgroundColor: offer.bgColor, width }]}>
            <View style={styles.content}>
                <Text style={styles.discount}>{offer.discount}</Text>
                <Text style={styles.title}>{offer.title}</Text>
                <Text style={styles.description}>{offer.description}</Text>
            </View>
            <View style={styles.imageContainer}>
                <View style={styles.imageGlow} />
                <Image
                    source={typeof offer.image === 'string' ? { uri: offer.image } : offer.image}
                    style={styles.image}
                    contentFit="contain"
                />
            </View>
            {totalItems > 1 && (
                <View style={styles.pagination}>
                    {Array.from({ length: totalItems }).map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                index === currentIndex ? styles.dotActive : styles.dotInactive,
                            ]}
                        />
                    ))}
                </View>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        borderRadius: 32,
        padding: 24,
        height: 176,
        position: 'relative',
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content: {
        zIndex: 10,
        width: '70%',
        justifyContent: 'center',
    },
    discount: {
        fontSize: 40,
        fontWeight: '800',
        color: '#FFF',
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
        marginBottom: 4,
    },
    description: {
        fontSize: 10,
        color: '#FFF',
        opacity: 0.9,
        lineHeight: 16,
    },
    imageContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        height: '100%',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        overflow: 'visible',
    },
    imageGlow: {
        position: 'absolute',
        width: '120%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderTopLeftRadius: 100,
        bottom: -20,
        right: -20,
        transform: [{ rotate: '-15deg' }],
    },
    image: {
        position: 'absolute',
        bottom: -5,
        right: -10,
        height: '95%',
        width: '110%',
    },
    pagination: {
        position: 'absolute',
        bottom: 16,
        left: 24,
        flexDirection: 'row',
        gap: 6,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    dotActive: {
        width: 20,
        backgroundColor: '#FFF',
    },
    dotInactive: {
        width: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
});
