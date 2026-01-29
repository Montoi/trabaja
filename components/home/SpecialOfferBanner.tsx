import { View, Text, StyleSheet } from 'react-native';
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
        width: '100%',
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
