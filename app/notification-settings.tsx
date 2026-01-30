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

interface NotificationSettingProps {
    title: string;
    enabled: boolean;
    onToggle: (value: boolean) => void;
}

const NotificationSetting: React.FC<NotificationSettingProps> = ({
    title,
    enabled,
    onToggle,
}) => {
    return (
        <View style={styles.settingItem}>
            <Text style={styles.settingTitle}>{title}</Text>
            <Switch
                value={enabled}
                onValueChange={onToggle}
                trackColor={{
                    false: Theme.colors.border,
                    true: Theme.colors.primary
                }}
                thumbColor={Theme.colors.white}
                ios_backgroundColor={Theme.colors.border}
            />
        </View>
    );
};

export default function NotificationSettingsScreen() {
    const insets = useSafeAreaInsets();

    // Notification settings state
    const [generalNotification, setGeneralNotification] = useState(true);
    const [sound, setSound] = useState(true);
    const [vibrate, setVibrate] = useState(false);
    const [specialOffers, setSpecialOffers] = useState(true);
    const [promoDiscount, setPromoDiscount] = useState(false);
    const [payments, setPayments] = useState(true);
    const [cashback, setCashback] = useState(false);
    const [appUpdates, setAppUpdates] = useState(true);
    const [newService, setNewService] = useState(false);
    const [newTips, setNewTips] = useState(false);

    const handleSaveSettings = useCallback(() => {
        console.log('Notification settings saved:', {
            generalNotification,
            sound,
            vibrate,
            specialOffers,
            promoDiscount,
            payments,
            cashback,
            appUpdates,
            newService,
            newTips,
        });
    }, [
        generalNotification,
        sound,
        vibrate,
        specialOffers,
        promoDiscount,
        payments,
        cashback,
        appUpdates,
        newService,
        newTips,
    ]);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <View style={styles.headerContent}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={Theme.colors.textPrimary} />
                    </Pressable>
                    <Text style={styles.headerTitle}>Notification</Text>
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
                {/* Settings List */}
                <View style={styles.settingsList}>
                    <NotificationSetting
                        title="General Notification"
                        enabled={generalNotification}
                        onToggle={setGeneralNotification}
                    />

                    <NotificationSetting
                        title="Sound"
                        enabled={sound}
                        onToggle={setSound}
                    />

                    <NotificationSetting
                        title="Vibrate"
                        enabled={vibrate}
                        onToggle={setVibrate}
                    />

                    <NotificationSetting
                        title="Special Offers"
                        enabled={specialOffers}
                        onToggle={setSpecialOffers}
                    />

                    <NotificationSetting
                        title="Promo & Discount"
                        enabled={promoDiscount}
                        onToggle={setPromoDiscount}
                    />

                    <NotificationSetting
                        title="Payments"
                        enabled={payments}
                        onToggle={setPayments}
                    />

                    <NotificationSetting
                        title="Cashback"
                        enabled={cashback}
                        onToggle={setCashback}
                    />

                    <NotificationSetting
                        title="App Updates"
                        enabled={appUpdates}
                        onToggle={setAppUpdates}
                    />

                    <NotificationSetting
                        title="New Service Available"
                        enabled={newService}
                        onToggle={setNewService}
                    />

                    <NotificationSetting
                        title="New Tips Available"
                        enabled={newTips}
                        onToggle={setNewTips}
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
    settingsList: {
        gap: 4,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Theme.colors.textPrimary,
    },
});
