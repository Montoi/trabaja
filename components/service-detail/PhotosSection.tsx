import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Theme } from '../../constants/Theme';

interface PhotosSectionProps {
    photos: string[];
    onSeeAll: () => void;
}

export const PhotosSection: React.FC<PhotosSectionProps> = ({ photos, onSeeAll }) => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Photos & Videos</Text>
                <Pressable onPress={onSeeAll}><Text style={styles.seeAllText}>See All</Text></Pressable>
            </View>
            <View style={styles.photoGrid}>
                <View style={styles.photoCol}>
                    <Image source={photos[0]} style={[styles.photo, { height: 180 }]} contentFit="cover" />
                    <Image source={photos[2]} style={[styles.photo, { height: 120 }]} contentFit="cover" />
                </View>
                <View style={styles.photoCol}>
                    <Image source={photos[1]} style={[styles.photo, { height: 120 }]} contentFit="cover" />
                    <Image source={photos[3]} style={[styles.photo, { height: 180 }]} contentFit="cover" />
                </View>
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
});
