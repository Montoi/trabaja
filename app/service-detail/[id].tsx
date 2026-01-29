import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState, useCallback, useMemo } from 'react';
import { Theme } from '../../constants/Theme';
import { MOCK_REVIEWS, MOCK_PHOTOS } from '../../constants/MockData';

// Modular Components
import { DetailHeader } from '../../components/service-detail/DetailHeader';
import { InfoSection } from '../../components/service-detail/InfoSection';
import { AboutSection } from '../../components/service-detail/AboutSection';
import { PhotosSection } from '../../components/service-detail/PhotosSection';
import { ReviewsSection } from '../../components/service-detail/ReviewsSection';
import { BottomActionTab } from '../../components/service-detail/BottomActionTab';

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
    const handleMessage = useCallback(() => console.log('Message pressed'), []);
    const handleBook = useCallback(() => console.log('Book now pressed'), []);

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
                <DetailHeader
                    image="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                    onBack={handleBack}
                    onShare={handleShare}
                    topInset={insets.top}
                />

                <View style={styles.content}>
                    <InfoSection
                        title={title as string}
                        provider={provider as string}
                        category={category as string}
                        rating={4.8}
                        reviewCount="4,479 reviews"
                        price={20}
                        onBookmark={handleBookmark}
                    />

                    <AboutSection
                        about="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim nisi ut aliquip."
                    />

                    <PhotosSection
                        photos={MOCK_PHOTOS}
                        onSeeAll={handleSeeAllPhotos}
                    />

                    <ReviewsSection
                        rating={4.8}
                        reviewCount="4,479 reviews"
                        onSeeAll={handleSeeAllReviews}
                        selectedRating={selectedRating}
                        onRatingSelect={handleRatingSelect}
                        reviews={filteredReviews}
                    />
                </View>
            </ScrollView>

            <BottomActionTab
                onMessage={handleMessage}
                onBook={handleBook}
                bottomInset={insets.bottom}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.white,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 120,
    },
    content: {
        paddingHorizontal: 24,
    },
});

