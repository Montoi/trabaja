import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../../constants/Theme';

interface InfoSectionProps {
    title: string;
    provider: string;
    category: string;
    rating: number;
    reviewCount: string;
    price: number;
    onBookmark: () => void;
    isBookmarked?: boolean;
}

export const InfoSection: React.FC<InfoSectionProps> = ({
    title, provider, category, rating, reviewCount, price, onBookmark, isBookmarked
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleRow}>
                <View style={styles.titleContent}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.providerRow}>
                        <Text style={styles.providerName}>{provider}</Text>
                        <View style={styles.ratingBadge}>
                            <Ionicons name="star" size={14} color={Theme.colors.warning} />
                            <Text style={styles.ratingText}>{rating} ({reviewCount})</Text>
                        </View>
                    </View>
                </View>
                <Pressable onPress={onBookmark} style={styles.bookmarkBtn}>
                    <Ionicons
                        name={isBookmarked ? "bookmark" : "bookmark-outline"}
                        size={24}
                        color={Theme.colors.primary}
                    />
                </Pressable>
            </View>

            <View style={styles.infoTags}>
                <View style={styles.categoryTag}>
                    <Text style={styles.categoryTagText}>{category}</Text>
                </View>
                <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={14} color={Theme.colors.textSecondary} />
                    <Text style={styles.locationText}>255 Grand Park Avenue, New York</Text>
                </View>
            </View>

            <View style={styles.priceRow}>
                <Text style={styles.price}>${price}</Text>
                <Text style={styles.priceLabel}>(Floor price)</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    titleContent: {
        flex: 1,
        marginRight: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: '900',
        color: Theme.colors.textPrimary,
        letterSpacing: -0.5,
    },
    providerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    providerName: {
        fontSize: 14,
        fontWeight: '800',
        color: Theme.colors.primary,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
        gap: 4,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '700',
        color: Theme.colors.textSecondary,
    },
    bookmarkBtn: {
        width: 48,
        height: 48,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    categoryTag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: Theme.colors.primaryLight,
        borderRadius: 8,
    },
    categoryTagText: {
        color: Theme.colors.primary,
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
        fontWeight: '500',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 24,
        gap: 6,
    },
    price: {
        fontSize: 28,
        fontWeight: '900',
        color: Theme.colors.primary,
    },
    priceLabel: {
        fontSize: 14,
        color: Theme.colors.textPlaceholder,
        fontWeight: '600',
    },
});
