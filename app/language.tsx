import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Theme } from '../constants/Theme';

interface Language {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
}

interface LanguageItemProps {
    language: Language;
    isSelected: boolean;
    onSelect: () => void;
}

const LanguageItem: React.FC<LanguageItemProps> = ({ language, isSelected, onSelect }) => {
    return (
        <Pressable
            onPress={onSelect}
            style={({ pressed }) => [
                styles.languageItem,
                isSelected && styles.languageItemSelected,
                pressed && styles.languageItemPressed,
            ]}
        >
            <View style={styles.languageLeft}>
                <Text style={styles.flagEmoji}>{language.flag}</Text>
                <View style={styles.languageInfo}>
                    <Text style={styles.languageName}>{language.name}</Text>
                    <Text style={styles.languageNative}>{language.nativeName}</Text>
                </View>
            </View>
            {isSelected && (
                <View style={styles.checkmarkContainer}>
                    <Ionicons name="checkmark-circle" size={24} color={Theme.colors.primary} />
                </View>
            )}
        </Pressable>
    );
};

export default function LanguageScreen() {
    const insets = useSafeAreaInsets();

    const languages: Language[] = [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
        { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
        { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
        { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
        { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
        { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
        { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
        { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
        { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
        { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    ];

    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const handleSelectLanguage = useCallback((code: string) => {
        setSelectedLanguage(code);
        console.log('Selected language:', code);
        // TODO: Update app language
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
                    <Text style={styles.headerTitle}>Language</Text>
                    <View style={styles.headerSpacer} />
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: insets.bottom + 40 }
                ]}
            >
                {/* Language List */}
                <View style={styles.languageList}>
                    {languages.map((language) => (
                        <LanguageItem
                            key={language.code}
                            language={language}
                            isSelected={selectedLanguage === language.code}
                            onSelect={() => handleSelectLanguage(language.code)}
                        />
                    ))}
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
    headerSpacer: {
        width: 40,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 8,
    },
    languageList: {
        backgroundColor: Theme.colors.white,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Theme.colors.border,
        ...Theme.shadows.small,
    },
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    languageItemSelected: {
        backgroundColor: Theme.colors.primaryLight,
    },
    languageItemPressed: {
        opacity: 0.7,
    },
    languageLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    flagEmoji: {
        fontSize: 32,
    },
    languageInfo: {
        gap: 4,
    },
    languageName: {
        fontSize: 16,
        fontWeight: '600',
        color: Theme.colors.textPrimary,
    },
    languageNative: {
        fontSize: 14,
        fontWeight: '400',
        color: Theme.colors.textSecondary,
    },
    checkmarkContainer: {
        width: 24,
        height: 24,
    },
});
