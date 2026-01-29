import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import type { PopularService } from '../../types/home';

interface PopularServiceCardProps {
    service: PopularService;
    onPress: (id: string) => void;
    onBookmarkPress: (id: string) => void;
}

export const PopularServiceCard = memo(function PopularServiceCard({
    service,
    onPress,
    onBookmarkPress,
}: PopularServiceCardProps) {
    const handlePress = () => onPress(service.id);
    const handleBookmark = () => onBookmarkPress(service.id);

    return (
        <Pressable onPress={handlePress} style={styles.container}>
            <Image
                source={{ uri: service.image }}
                style={styles.image}
                contentFit="cover"
            />
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryText}>{service.category}</Text>
                        </View>
                        <Text style={styles.title}>{service.title}</Text>
                        <Text style={styles.provider}>{service.provider}</Text>
                    </View>
                    <Pressable onPress={handleBookmark}>
                        <Ionicons
                            name={service.isBookmarked ? 'bookmark' : 'bookmark-outline'}
                            size={24}
                            color="#7210FF"
                        />
                    </Pressable>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.price}>${service.price}</Text>
                    <Text style={styles.separator}>|</Text>
                    <View style={styles.rating}>
                        <Ionicons name="star" size={14} color="#FFC107" />
                        <Text style={styles.ratingText}>
                            {service.rating} ({service.reviewCount.toLocaleString()} reviews)
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 16,
        gap: 16,
        borderWidth: 1,
        borderColor: '#F5F5F5',
    },
    image: {
        width: 96,
        height: 96,
        borderRadius: 16,
        backgroundColor: '#F5F5F5',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerLeft: {
        flex: 1,
        gap: 4,
    },
    categoryBadge: {
        backgroundColor: 'rgba(114, 16, 255, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    categoryText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#7210FF',
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000',
    },
    provider: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    price: {
        fontSize: 14,
        fontWeight: '700',
        color: '#7210FF',
    },
    separator: {
        fontSize: 10,
        color: '#CCC',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        flex: 1,
    },
    ratingText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#333',
        flexShrink: 1,
    },
});
