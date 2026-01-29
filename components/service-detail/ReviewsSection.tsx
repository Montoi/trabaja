import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../../constants/Theme';

interface Review {
    id: string;
    user: string;
    avatar: string;
    rating: number;
    time: string;
    content: string;
    likes: number;
}

interface ReviewsSectionProps {
    rating: number;
    reviewCount: string;
    onSeeAll: () => void;
    selectedRating: string;
    onRatingSelect: (rate: string) => void;
    reviews: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
    rating, reviewCount, onSeeAll, selectedRating, onRatingSelect, reviews
}) => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={styles.reviewSummaryHeader}>
                    <Ionicons name="star" size={20} color={Theme.colors.warning} />
                    <Text style={styles.sectionTitle}>{rating} ({reviewCount})</Text>
                </View>
                <Pressable onPress={onSeeAll}><Text style={styles.seeAllText}>See All</Text></Pressable>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ratingFilters}>
                {['All', '5', '4', '3', '2'].map((rate) => (
                    <Pressable
                        key={rate}
                        onPress={() => onRatingSelect(rate)}
                        style={[
                            styles.filterChip,
                            selectedRating === rate && styles.filterChipActive
                        ]}
                    >
                        <Ionicons name="star" size={12} color={selectedRating === rate ? Theme.colors.white : Theme.colors.primary} />
                        <Text style={[
                            styles.filterChipText,
                            selectedRating === rate && styles.filterChipTextActive
                        ]}>{rate}</Text>
                    </Pressable>
                ))}
            </ScrollView>

            <View style={styles.reviewsList}>
                {reviews.length > 0 ? reviews.map((review) => (
                    <View key={review.id} style={styles.reviewItem}>
                        <View style={styles.reviewHeader}>
                            <View style={styles.reviewAuthor}>
                                <Image source={review.avatar} style={styles.avatar} />
                                <View>
                                    <Text style={styles.authorName}>{review.user}</Text>
                                    <Text style={styles.reviewTime}>{review.time}</Text>
                                </View>
                            </View>
                            <View style={styles.reviewMeta}>
                                <View style={styles.reviewRatingBadge}>
                                    <Ionicons name="star" size={10} color={Theme.colors.primary} />
                                    <Text style={styles.reviewRatingText}>{review.rating}</Text>
                                </View>
                                <Ionicons name="ellipsis-horizontal" size={20} color={Theme.colors.textPlaceholder} />
                            </View>
                        </View>
                        <Text style={styles.reviewContent}>{review.content}</Text>
                        <View style={styles.reviewLikes}>
                            <Ionicons name="heart" size={16} color={Theme.colors.error} />
                            <Text style={styles.likesText}>{review.likes}</Text>
                        </View>
                    </View>
                )) : (
                    <Text style={styles.emptyText}>No reviews found for this rating.</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginTop: 32,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: Theme.colors.textPrimary,
    },
    seeAllText: {
        color: Theme.colors.primary,
        fontSize: 14,
        fontWeight: '800',
    },
    reviewSummaryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    ratingFilters: {
        marginTop: 8,
        marginBottom: 24,
    },
    filterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Theme.colors.divider,
        marginRight: 8,
        gap: 6,
        backgroundColor: Theme.colors.white,
    },
    filterChipActive: {
        backgroundColor: Theme.colors.primary,
        borderColor: Theme.colors.primary,
    },
    filterChipText: {
        fontSize: 12,
        fontWeight: '800',
        color: Theme.colors.textSecondary,
    },
    filterChipTextActive: {
        color: Theme.colors.white,
    },
    reviewsList: {
        gap: 24,
    },
    reviewItem: {
        gap: 12,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reviewAuthor: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
    },
    authorName: {
        fontSize: 14,
        fontWeight: '800',
        color: Theme.colors.textPrimary,
    },
    reviewTime: {
        fontSize: 11,
        color: Theme.colors.textPlaceholder,
        fontWeight: '600',
    },
    reviewMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    reviewRatingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(127, 61, 255, 0.2)',
        backgroundColor: Theme.colors.primaryLight,
        gap: 4,
    },
    reviewRatingText: {
        fontSize: 11,
        fontWeight: '900',
        color: Theme.colors.primary,
    },
    reviewContent: {
        fontSize: 13,
        color: '#475569',
        lineHeight: 20,
        fontWeight: '500',
    },
    reviewLikes: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    likesText: {
        fontSize: 11,
        fontWeight: '800',
        color: Theme.colors.textPlaceholder,
    },
    emptyText: {
        fontSize: 14,
        color: Theme.colors.textPlaceholder,
        textAlign: 'center',
        paddingVertical: 20,
        fontWeight: '500',
    },
});
