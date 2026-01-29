import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import type { User } from '../../types/home';

interface ProfileHeaderProps {
    user: User;
    onNotificationPress: () => void;
    onBookmarkPress: () => void;
}

export const ProfileHeader = memo(function ProfileHeader({
    user,
    onNotificationPress,
    onBookmarkPress,
}: ProfileHeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image
                    source={{ uri: user.avatar }}
                    style={styles.avatar}
                    contentFit="cover"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.greeting}>
                        {user.greeting} 👋
                    </Text>
                    <Text style={styles.name}>{user.name}</Text>
                </View>
            </View>
            <View style={styles.actions}>
                <Pressable onPress={onNotificationPress} style={styles.iconButton}>
                    <Ionicons name="notifications-outline" size={24} color="#333" />
                </Pressable>
                <Pressable onPress={onBookmarkPress} style={styles.iconButton}>
                    <Ionicons name="bookmark-outline" size={24} color="#333" />
                </Pressable>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F5F5F5',
    },
    textContainer: {
        gap: 2,
    },
    greeting: {
        fontSize: 14,
        color: '#666',
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
