import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Theme } from '../../constants/Theme';
import { USER_DATA } from '../../constants/MockData';

interface MenuItemProps {
    icon: keyof typeof Ionicons.glyphMap | keyof typeof MaterialIcons.glyphMap;
    iconType?: 'Ionicons' | 'MaterialIcons';
    title: string;
    value?: string;
    onPress: () => void;
    isDestructive?: boolean;
    hasSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
    icon,
    iconType = 'Ionicons',
    title,
    value,
    onPress,
    isDestructive = false,
    hasSwitch = false,
    switchValue = false,
    onSwitchChange
}) => {
    const IconComponent = iconType === 'Ionicons' ? Ionicons : MaterialIcons;
    const color = isDestructive ? Theme.colors.error : Theme.colors.textPrimary;

    return (
        <Pressable
            onPress={hasSwitch ? undefined : onPress}
            style={({ pressed }) => [
                styles.menuItem,
                pressed && !hasSwitch && styles.menuItemPressed
            ]}
        >
            <View style={styles.menuItemLeft}>
                <IconComponent
                    name={icon as any}
                    size={24}
                    color={color}
                />
                <Text style={[styles.menuItemTitle, { color }]}>{title}</Text>
            </View>
            <View style={styles.menuItemRight}>
                {value && <Text style={styles.menuItemValue}>{value}</Text>}
                {hasSwitch ? (
                    <Switch
                        value={switchValue}
                        onValueChange={onSwitchChange}
                        trackColor={{ false: '#E2E8F0', true: Theme.colors.primary }}
                        thumbColor={Theme.colors.white}
                    />
                ) : (
                    <Ionicons name="chevron-forward" size={20} color={Theme.colors.textSecondary} />
                )}
            </View>
        </Pressable>
    );
};

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleEditProfile = useCallback(() => router.push('/edit-profile'), []);
    const handleLogout = useCallback(() => console.log('Logout'), []);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Header toolbar */}
            <View style={[styles.toolbar, { paddingTop: insets.top }]}>
                <View style={styles.toolbarContent}>
                    <View style={styles.logoBadge}>
                        <Text style={styles.logoText}>h</Text>
                    </View>
                    <Text style={styles.toolbarTitle}>Profile</Text>
                    <Pressable style={styles.optionsBtn}>
                        <Ionicons name="ellipsis-horizontal" size={24} color={Theme.colors.textPrimary} />
                    </Pressable>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
            >
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={USER_DATA.avatar}
                            style={styles.avatar}
                            contentFit="cover"
                        />
                        <Pressable style={styles.editBadge} onPress={handleEditProfile}>
                            <Ionicons name="pencil" size={14} color={Theme.colors.white} />
                        </Pressable>
                    </View>
                    <Text style={styles.userName}>{USER_DATA.name}</Text>
                    <Text style={styles.userEmail}>andrew_ainsley@yourdomain.com</Text>
                </View>

                <View style={styles.divider} />

                {/* Menu List */}
                <View style={styles.menuList}>
                    <MenuItem icon="person-outline" title="Edit Profile" onPress={() => router.push('/edit-profile')} />
                    <MenuItem icon="notifications-outline" title="Notification" onPress={() => router.push('/notification-settings')} />
                    <MenuItem icon="wallet-outline" title="Payment" onPress={() => router.push('/payment-methods')} />
                    <MenuItem icon="shield-checkmark-outline" title="Security" onPress={() => router.push('/security')} />
                    <MenuItem
                        icon="language-outline"
                        title="Language"
                        value="English (US)"
                        onPress={() => router.push('/language')}
                    />
                    <MenuItem
                        icon="eye-outline"
                        title="Dark Mode"
                        onPress={() => { }}
                        hasSwitch
                        switchValue={isDarkMode}
                        onSwitchChange={setIsDarkMode}
                    />
                    <MenuItem icon="lock-closed-outline" title="Privacy Policy" onPress={() => { }} />
                    <MenuItem icon="help-circle-outline" title="Help Center" onPress={() => { }} />
                    <MenuItem icon="people-outline" title="Invite Friends" onPress={() => { }} />
                    <MenuItem
                        icon="log-out-outline"
                        title="Logout"
                        onPress={handleLogout}
                        isDestructive
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    toolbar: {
        backgroundColor: Theme.colors.background,
    },
    toolbarContent: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    logoBadge: {
        width: 36,
        height: 36,
        backgroundColor: Theme.colors.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    logoText: {
        color: Theme.colors.white,
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    toolbarTitle: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        color: Theme.colors.textPrimary,
    },
    optionsBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: Theme.colors.background,
    },
    editBadge: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        width: 32,
        height: 32,
        backgroundColor: Theme.colors.primary,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Theme.colors.background,
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: Theme.colors.textPrimary,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: Theme.colors.border,
        marginBottom: 8,
    },
    menuList: {
        paddingBottom: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    menuItemPressed: {
        opacity: 0.7,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    menuItemTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    menuItemValue: {
        fontSize: 16,
        color: Theme.colors.textSecondary,
        fontWeight: '500',
    },
});
