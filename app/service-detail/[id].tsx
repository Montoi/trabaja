import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { memo, useMemo, useState, useCallback } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MOCK_REVIEWS = [
    {
        id: 'r1',
        user: 'Lauralee Quintera',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv_-45SF_NgKERC_QZ1QaU2PeBZIWrR34dZ5OWSD9vFXsqg6cLW809rmlpWj-AvhZY26Gxot6FDhUVFer-8FmFI1DLU1e2vVvseO4ErAOeODtDFF_oe-1CwBxyydAI-ph26N4yU7_7BowR3-A0IeDPq_4x9bMojZnFZqvTNXhL1IGhROOcDtyLyBxY5y-Mwbur5QT6X3rpeo1oNqTqKkWzIaPlAQvk6AElsBKPCUoFVtHC8WeCEqtcJxbLRCbn39ReN5Q04yym8JTd',
        rating: 5,
        time: '3 weeks ago',
        content: 'Awesome! this is what I was looking for, I recommend to everyone ❤️❤️❤️',
        likes: 724,
    },
    {
        id: 'r2',
        user: 'Clinton McClure',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL9tuJ5-V767TEJkYE_KroiV-c_Zj_gRTt9KPI-JknXbV4r58rQFWWjoeB5sHh3k0Q7J5oCidnGmiFpL1v14bd78lVo9Mq6F3yuPxLpWfUJPt9vMx3rK0GOwVq9UiSLWDAsG0MmHJ6VP3ffNFtzCyqvTxM6gHSBa8M8_k5Gcsy9ny38hDhrtPv4Qyd67KX5so3jLGAgXOdKxG2gKxGLMFXylV4qLNH4pcCwtXbEiBUQOmKVzOaKGiB_njkvRIwWemGLZU8xmFC0fRD',
        rating: 4,
        time: '1 week ago',
        content: 'The workers are very professional and the results are very satisfying! I like it very much! 💯💯',
        likes: 118,
    },
];

const MOCK_PHOTOS = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBesBWuoTOy4GlyBWSkqup_Hc_g5dmsepQrxn-9OW2MgF6FH10R5sm6xejEDfdF5DmpLCWKNo8I83EpL0Ht9EfVFAbSGKPOox_SPJin0bohur1Knccb57XmHbYVbVRH8hMz1gOA6PpnypOx2yyJaP-hmGRn11NEuoYGRD-V5RCIN3EMn5YiB5BbuApPuiGhL8amIkVQlZpLfcsLeeF6VWoDPbKbh6qq8qhwZcb7oufrQFPrGb5m9WnOrbFaZfBrcX7GUaAKfeo-4lrR',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAEZMthYOndYe6FYY2qpp1rY0oOlobPSstQDq--C8kKW-nMxVhbQyUcOfnHkuaPSsSSum3nJZp8_xo5Yjl_J2NAnDrgJ2EzGpQZfXNSuhxDWUDh_K4d0joBb72oy14clD9Mqmxtmaf68NMwoosnhivqZ4NVbkFWMoCs3AOfAviT62GcZS6ctLGS-2Ar9GU_zDpeIjBX6-0VNjz4TpdBpPR-Eur4HBsEbxs3pd7-gx99rVM9Zx5PPXMGWp6b7SYFnE3WPF7LMZURlCcE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDqXSRangzCsCbo5Nl1HjwMx9vaU6ctdisSrLHfYl8_To0OXBaweC20cNs55nhAPZVGj8X1nr9hTn0Vvm_pNMvk_OAfV04IKeh1oFnosloiQZK6VOGYS7M7IzekaUJxhRBEWBrd6lPMqNRAOf8KUbP9HiUsbx-Dbh075r6VteVTH8-F3pWzzQBfmR7jfkvQLERvt-LanhSIngqAcPkSjlYrA-lyFrtxUmqBrAuLEeCTVvkk4bqJaIcm6-SLlrFB0k3vspJ0LJnk_Cm6',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB7jjqeLsVfyA-irObp01NDJy8h2kskFNT1PO3wgYnUe5hdogvMoGsC9ulGhkpWy3khCj93qu2RtNBC5sDoAV9uHJ2xFD3jzMwBvpEJ5hHE1OMejYiblbawLJNSUFkEkAdVLYDZZeE9OP8OX7RhcpR342Fz5iV878fauEVUBIQgqFHqU2A_HCrIDDFACeE9Y6mSsDXpxo0Q5x3nZnwkL2Ax_CN7qCrf7kgZd7nT52v5T6F4o2e9wYjibfQ6pms1JRhrgJ3Yw5FlzJEE',
];

export default function ServiceDetailScreen() {
    const insets = useSafeAreaInsets();
    const { id, title = 'House Cleaning', provider = 'Jenny Wilson', category = 'Cleaning' } = useLocalSearchParams();
    const [selectedRating, setSelectedRating] = useState('All');

    const handleBack = useCallback(() => router.back(), []);
    const handleShare = useCallback(() => console.log('Share pressed'), []);
    const handleBookmark = useCallback(() => console.log('Bookmark pressed'), []);
    const handleSeeAllPhotos = useCallback(() => console.log('See all photos'), []);
    const handleSeeAllReviews = useCallback(() => console.log('See all reviews'), []);
    const handleRatingSelect = useCallback((rate: string) => setSelectedRating(rate), []);

    const filteredReviews = useMemo(() => {
        if (selectedRating === 'All') return MOCK_REVIEWS;
        return MOCK_REVIEWS.filter(r => r.rating.toString() === selectedRating);
    }, [selectedRating]);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Image */}
                <View style={styles.headerImageContainer}>
                    <Image
                        source="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                        style={styles.headerImage}
                        contentFit="cover"
                    />
                    {/* Header Overlay Actions */}
                    <View style={[styles.headerActions, { top: insets.top + 12 }]}>
                        <Pressable onPress={handleBack} style={styles.headerIconBtn}>
                            <Ionicons name="chevron-back" size={24} color="#FFF" />
                        </Pressable>
                        <Pressable onPress={handleShare} style={styles.headerIconBtn}>
                            <Ionicons name="share-outline" size={24} color="#FFF" />
                        </Pressable>
                    </View>
                    {/* Pagination Indicator */}
                    <View style={styles.pagination}>
                        <View style={[styles.dot, styles.dotActive]} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <View style={styles.titleRow}>
                        <View>
                            <Text style={styles.title}>{title}</Text>
                            <View style={styles.providerRow}>
                                <Text style={styles.providerName}>{provider}</Text>
                                <View style={styles.ratingBadge}>
                                    <Ionicons name="star" size={14} color="#FBBF24" />
                                    <Text style={styles.ratingText}>4.8 (4,479 reviews)</Text>
                                </View>
                            </View>
                        </View>
                        <Pressable onPress={handleBookmark} style={styles.bookmarkBtn}>
                            <Ionicons name="bookmark-outline" size={24} color="#7F3DFF" />
                        </Pressable>
                    </View>

                    <View style={styles.infoTags}>
                        <View style={styles.categoryTag}>
                            <Text style={styles.categoryTagText}>{category}</Text>
                        </View>
                        <View style={styles.locationRow}>
                            <Ionicons name="location-outline" size={14} color="#64748B" />
                            <Text style={styles.locationText}>255 Grand Park Avenue, New York</Text>
                        </View>
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>$20</Text>
                        <Text style={styles.priceLabel}>(Floor price)</Text>
                    </View>

                    {/* About Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About me</Text>
                        <Text style={styles.aboutText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim nisi ut aliquip.
                            <Text style={styles.readMore}> Read more...</Text>
                        </Text>
                    </View>

                    {/* Photos & Videos */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Photos & Videos</Text>
                            <Pressable onPress={handleSeeAllPhotos}><Text style={styles.seeAllText}>See All</Text></Pressable>
                        </View>
                        <View style={styles.photoGrid}>
                            <View style={styles.photoCol}>
                                <Image source={MOCK_PHOTOS[0]} style={[styles.photo, { height: 180 }]} />
                                <Image source={MOCK_PHOTOS[2]} style={[styles.photo, { height: 120 }]} />
                            </View>
                            <View style={styles.photoCol}>
                                <Image source={MOCK_PHOTOS[1]} style={[styles.photo, { height: 120 }]} />
                                <Image source={MOCK_PHOTOS[3]} style={[styles.photo, { height: 180 }]} />
                            </View>
                        </View>
                    </View>

                    {/* Reviews */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.reviewSummaryHeader}>
                                <Ionicons name="star" size={20} color="#FBBF24" />
                                <Text style={styles.sectionTitle}>4.8 (4,479 reviews)</Text>
                            </View>
                            <Pressable onPress={handleSeeAllReviews}><Text style={styles.seeAllText}>See All</Text></Pressable>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ratingFilters}>
                            {['All', '5', '4', '3', '2'].map((rate) => (
                                <Pressable
                                    key={rate}
                                    onPress={() => handleRatingSelect(rate)}
                                    style={[
                                        styles.filterChip,
                                        selectedRating === rate && styles.filterChipActive
                                    ]}
                                >
                                    <Ionicons name="star" size={12} color={selectedRating === rate ? "#FFF" : "#7F3DFF"} />
                                    <Text style={[
                                        styles.filterChipText,
                                        selectedRating === rate && styles.filterChipTextActive
                                    ]}>{rate}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>

                        <View style={styles.reviewsList}>
                            {filteredReviews.length > 0 ? filteredReviews.map((review) => (
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
                                                <Ionicons name="star" size={10} color="#7F3DFF" />
                                                <Text style={styles.reviewRatingText}>{review.rating}</Text>
                                            </View>
                                            <Ionicons name="ellipsis-horizontal" size={20} color="#94A3B8" />
                                        </View>
                                    </View>
                                    <Text style={styles.reviewContent}>{review.content}</Text>
                                    <View style={styles.reviewLikes}>
                                        <Ionicons name="heart" size={16} color="#F43F5E" />
                                        <Text style={styles.likesText}>{review.likes}</Text>
                                    </View>
                                </View>
                            )) : (
                                <Text style={styles.emptyText}>No reviews found for this rating.</Text>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 20) }]}>
                <Pressable style={styles.msgBtn}>
                    <Text style={styles.msgBtnText}>Message</Text>
                </Pressable>
                <Pressable style={styles.bookBtn}>
                    <Text style={styles.bookBtnText}>Book Now</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 120,
    },
    headerImageContainer: {
        height: 380,
        width: '100%',
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    headerActions: {
        position: 'absolute',
        left: 24,
        right: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    headerIconBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagination: {
        position: 'absolute',
        bottom: 24,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    dotActive: {
        width: 24,
        backgroundColor: '#7F3DFF',
    },
    content: {
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 26,
        fontWeight: '900',
        color: '#0F172A',
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
        color: '#7F3DFF',
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
        color: '#64748B',
    },
    bookmarkBtn: {
        width: 48,
        height: 48,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
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
        backgroundColor: '#F5F3FF',
        borderRadius: 8,
    },
    categoryTagText: {
        color: '#7F3DFF',
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
        color: '#64748B',
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
        color: '#7F3DFF',
    },
    priceLabel: {
        fontSize: 14,
        color: '#94A3B8',
        fontWeight: '600',
    },
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
        color: '#0F172A',
    },
    seeAllText: {
        color: '#7F3DFF',
        fontSize: 14,
        fontWeight: '800',
    },
    aboutText: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 22,
        fontWeight: '500',
    },
    readMore: {
        color: '#7F3DFF',
        fontWeight: '800',
    },
    photoGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    photoCol: {
        flex: 1,
        gap: 12,
    },
    photo: {
        width: '100%',
        borderRadius: 24,
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
        borderColor: '#E2E8F0',
        marginRight: 8,
        gap: 6,
        backgroundColor: '#FFF',
    },
    filterChipActive: {
        backgroundColor: '#7F3DFF',
        borderColor: '#7F3DFF',
    },
    filterChipText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#64748B',
    },
    filterChipTextActive: {
        color: '#FFF',
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
        color: '#0F172A',
    },
    reviewTime: {
        fontSize: 11,
        color: '#94A3B8',
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
        backgroundColor: '#F5F3FF',
        gap: 4,
    },
    reviewRatingText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#7F3DFF',
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
        color: '#94A3B8',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        paddingTop: 20,
        paddingHorizontal: 24,
        flexDirection: 'row',
        gap: 16,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        zIndex: 50,
    },
    msgBtn: {
        flex: 1,
        height: 56,
        borderRadius: 20,
        backgroundColor: '#F5F3FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    msgBtnText: {
        color: '#7F3DFF',
        fontSize: 16,
        fontWeight: '800',
    },
    bookBtn: {
        flex: 2,
        height: 56,
        borderRadius: 20,
        backgroundColor: '#7F3DFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#7F3DFF',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
    },
    bookBtnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '800',
    },
    emptyText: {
        fontSize: 14,
        color: '#94A3B8',
        textAlign: 'center',
        paddingVertical: 20,
        fontWeight: '500',
    },
});
