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
import { useLanguage } from '../contexts/LanguageContext';

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
    const { t } = useLanguage();

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
                    <Text style={styles.headerTitle}>{t.notifications.title}</Text>
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
                        title={t.notifications.generalNotification}
                        enabled={generalNotification}
                        onToggle={setGeneralNotification}
                    />

                    <NotificationSetting
                        title={t.notifications.sound}
                        enabled={sound}
                        onToggle={setSound}
                    />

                    <NotificationSetting
                        title={t.notifications.vibrate}
                        enabled={vibrate}
                        onToggle={setVibrate}
                    />

                    <NotificationSetting
                        title={t.notifications.specialOffers}
                        enabled={specialOffers}
                        onToggle={setSpecialOffers}
                    />

                    <NotificationSetting
                        title={t.notifications.promoDiscount}
                        enabled={promoDiscount}
                        onToggle={setPromoDiscount}
                    />

                    <NotificationSetting
                        title={t.notifications.payments}
                        enabled={payments}
                        onToggle={setPayments}
                    />

                    <NotificationSetting
                        title={t.notifications.cashback}
                        enabled={cashback}
                        onToggle={setCashback}
                    />

                    <NotificationSetting
                        title={t.notifications.appUpdates}
                        enabled={appUpdates}
                        onToggle={setAppUpdates}
                    />

                    <NotificationSetting
                        title={t.notifications.newService}
                        enabled={newService}
                        onToggle={setNewService}
                    />

                    <NotificationSetting
                        title={t.notifications.newTips}
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
