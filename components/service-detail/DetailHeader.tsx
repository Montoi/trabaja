import React from 'react';
import { View, Pressable, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../../constants/Theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface DetailHeaderProps {
    image: string;
    onBack: () => void;
    onShare: () => void;
    topInset: number;
}

export const DetailHeader: React.FC<DetailHeaderProps> = ({ image, onBack, onShare, topInset }) => {
    return (
        <View style={styles.headerImageContainer}>
            <Image
                source={image}
                style={styles.headerImage}
                contentFit="cover"
            />
            {/* Header Overlay Actions */}
            <View style={[styles.headerActions, { top: topInset + 12 }]}>
                <Pressable onPress={onBack} style={styles.headerIconBtn}>
                    <Ionicons name="chevron-back" size={24} color={Theme.colors.white} />
                </Pressable>
                <Pressable onPress={onShare} style={styles.headerIconBtn}>
                    <Ionicons name="share-outline" size={24} color={Theme.colors.white} />
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
    );
};

const styles = StyleSheet.create({
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
        backgroundColor: Theme.colors.primary,
    },
});
