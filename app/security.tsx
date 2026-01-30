import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Theme } from '../constants/Theme';

interface SecuritySettingProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    hasSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    onPress?: () => void;
    showChevron?: boolean;
}

const SecuritySetting: React.FC<SecuritySettingProps> = ({
    icon,
    title,
    hasSwitch = false,
    switchValue = false,
    onSwitchChange,
    onPress,
    showChevron = true,
}) => {
    return (
        <Pressable
            onPress={hasSwitch ? undefined : onPress}
            style={({ pressed }) => [
                styles.settingItem,
                !hasSwitch && pressed && styles.settingItemPressed,
            ]}
        >
            <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon} size={22} color={Theme.colors.primary} />
                </View>
                <Text style={styles.settingTitle}>{title}</Text>
            </View>
            <View style={styles.settingRight}>
                {hasSwitch ? (
                    <Switch
                        value={switchValue}
                        onValueChange={onSwitchChange}
                        trackColor={{
                            false: Theme.colors.border,
                            true: Theme.colors.primary
                        }}
                        thumbColor={Theme.colors.white}
                        ios_backgroundColor={Theme.colors.border}
                    />
                ) : showChevron ? (
                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={Theme.colors.textSecondary}
                    />
                ) : null}
            </View>
        </Pressable>
    );
};

export default function SecurityScreen() {
    const insets = useSafeAreaInsets();

    // Security settings state
    const [rememberMe, setRememberMe] = useState(true);
    const [faceId, setFaceId] = useState(true);
    const [biometricId, setBiometricId] = useState(false);
    const [smsAuth, setSmsAuth] = useState(true);
    const [googleAuth, setGoogleAuth] = useState(false);

    const handleChangePassword = useCallback(() => {
        console.log('Change password');
        // TODO: Navigate to change password screen
    }, []);

    const handleChangePIN = useCallback(() => {
        console.log('Change PIN');
        // TODO: Navigate to change PIN screen
    }, []);

    const handleDeviceMgmt = useCallback(() => {
        console.log('Manage devices');
        // TODO: Navigate to device management screen
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <View style={styles.headerContent}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={Theme.colors.textPrimary} />
                    </Pressable>
                    <Text style={styles.headerTitle}>Security</Text>
                    <View style={{ width: 40 }} />
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: insets.bottom + 40 }
                ]}
            >
                {/* Authentication Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Authentication</Text>
                    <View style={styles.settingsList}>
                        <SecuritySetting
                            icon="lock-closed-outline"
                            title="Change Password"
                            onPress={handleChangePassword}
                        />
                        <SecuritySetting
                            icon="keypad-outline"
                            title="Change PIN"
                            onPress={handleChangePIN}
                        />
                    </View>
                </View>

                {/* Biometric Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Biometric</Text>
                    <View style={styles.settingsList}>
                        <SecuritySetting
                            icon="finger-print-outline"
                            title="Face ID"
                            hasSwitch
                            switchValue={faceId}
                            onSwitchChange={setFaceId}
                        />
                        <SecuritySetting
                            icon="scan-outline"
                            title="Biometric ID"
                            hasSwitch
                            switchValue={biometricId}
                            onSwitchChange={setBiometricId}
                        />
                    </View>
                </View>

                {/* Two-Factor Authentication */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Two-Factor Authentication</Text>
                    <View style={styles.settingsList}>
                        <SecuritySetting
                            icon="chatbox-ellipses-outline"
                            title="SMS Authenticator"
                            hasSwitch
                            switchValue={smsAuth}
                            onSwitchChange={setSmsAuth}
                        />
                        <SecuritySetting
                            icon="logo-google"
                            title="Google Authenticator"
                            hasSwitch
                            switchValue={googleAuth}
                            onSwitchChange={setGoogleAuth}
                        />
                    </View>
                </View>

                {/* Other Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Other</Text>
                    <View style={styles.settingsList}>
                        <SecuritySetting
                            icon="checkbox-outline"
                            title="Remember Me"
                            hasSwitch
                            switchValue={rememberMe}
                            onSwitchChange={setRememberMe}
                        />
                        <SecuritySetting
                            icon="phone-portrait-outline"
                            title="Device Management"
                            onPress={handleDeviceMgmt}
                        />
                    </View>
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
    header: {
        backgroundColor: Theme.colors.background,
    },
    headerContent: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Theme.colors.textPrimary,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 8,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Theme.colors.textPrimary,
        marginBottom: 16,
    },
    settingsList: {
        backgroundColor: Theme.colors.white,
        borderRadius: 20,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        ...Theme.shadows.small,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    settingItemPressed: {
        opacity: 0.7,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: Theme.colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Theme.colors.textPrimary,
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
