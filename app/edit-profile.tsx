import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    TextInput,
    Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Theme } from '../constants/Theme';
import { USER_DATA } from '../constants/MockData';

interface FormInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    icon?: keyof typeof Ionicons.glyphMap;
    keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
    multiline?: boolean;
    numberOfLines?: number;
}

const FormInput: React.FC<FormInputProps> = ({
    placeholder,
    value,
    onChangeText,
    icon,
    keyboardType = 'default',
    multiline = false,
    numberOfLines = 1,
}) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={[
                    styles.input,
                    multiline && styles.inputMultiline,
                ]}
                placeholder={placeholder}
                placeholderTextColor={Theme.colors.textPlaceholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                multiline={multiline}
                numberOfLines={numberOfLines}
                textAlignVertical={multiline ? 'top' : 'center'}
            />
            {icon && (
                <Ionicons
                    name={icon}
                    size={20}
                    color={Theme.colors.textSecondary}
                    style={styles.inputIcon}
                />
            )}
        </View>
    );
};

interface PickerInputProps {
    placeholder: string;
    value: string;
    onPress: () => void;
}

const PickerInput: React.FC<PickerInputProps> = ({ placeholder, value, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.inputContainer,
                pressed && styles.inputPressed,
            ]}
        >
            <Text style={[styles.input, styles.pickerText]}>{value}</Text>
            <Ionicons
                name="chevron-down"
                size={20}
                color={Theme.colors.textSecondary}
                style={styles.inputIcon}
            />
        </Pressable>
    );
};

export default function EditProfileScreen() {
    const insets = useSafeAreaInsets();

    // Form state
    const [fullName, setFullName] = useState('Andrew Ainsley');
    const [nickname, setNickname] = useState('Andrew');
    const [dateOfBirth, setDateOfBirth] = useState('12/27/1995');
    const [email, setEmail] = useState('andrew_ainsley@yourdomain.com');
    const [country, setCountry] = useState('United States');
    const [phoneNumber, setPhoneNumber] = useState('+1 111 467 378 399');
    const [gender, setGender] = useState('Male');
    const [address, setAddress] = useState('267 New Avenue Park, New York');

    const handleUpdate = useCallback(() => {
        console.log('Update profile', {
            fullName,
            nickname,
            dateOfBirth,
            email,
            country,
            phoneNumber,
            gender,
            address,
        });
        router.back();
    }, [fullName, nickname, dateOfBirth, email, country, phoneNumber, gender, address]);

    const handleSelectCountry = useCallback(() => {
        console.log('Open country picker');
        // TODO: Implement country picker
    }, []);

    const handleSelectGender = useCallback(() => {
        console.log('Open gender picker');
        // TODO: Implement gender picker
    }, []);

    const handleSelectDate = useCallback(() => {
        console.log('Open date picker');
        // TODO: Implement date picker
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
                    <Text style={styles.headerTitle}>Edit Profile</Text>
                    <View style={{ width: 40 }} />
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: insets.bottom + 100 }
                ]}
            >
                {/* Avatar Section */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={USER_DATA.avatar}
                            style={styles.avatar}
                            contentFit="cover"
                        />
                        <Pressable style={styles.editBadge}>
                            <Ionicons name="camera" size={16} color={Theme.colors.white} />
                        </Pressable>
                    </View>
                </View>

                {/* Form Fields */}
                <View style={styles.form}>
                    <FormInput
                        placeholder="Full Name"
                        value={fullName}
                        onChangeText={setFullName}
                    />

                    <FormInput
                        placeholder="Nickname"
                        value={nickname}
                        onChangeText={setNickname}
                    />

                    <Pressable
                        onPress={handleSelectDate}
                        style={({ pressed }) => [
                            styles.inputContainer,
                            pressed && styles.inputPressed,
                        ]}
                    >
                        <Text style={[styles.input, styles.pickerText]}>{dateOfBirth}</Text>
                        <Ionicons
                            name="calendar-outline"
                            size={20}
                            color={Theme.colors.textSecondary}
                            style={styles.inputIcon}
                        />
                    </Pressable>

                    <FormInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        icon="mail-outline"
                        keyboardType="email-address"
                    />

                    <PickerInput
                        placeholder="Country"
                        value={country}
                        onPress={handleSelectCountry}
                    />

                    <FormInput
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        icon="call-outline"
                        keyboardType="phone-pad"
                    />

                    <PickerInput
                        placeholder="Gender"
                        value={gender}
                        onPress={handleSelectGender}
                    />

                    <FormInput
                        placeholder="Street Address"
                        value={address}
                        onChangeText={setAddress}
                        multiline
                        numberOfLines={3}
                    />
                </View>
            </ScrollView>

            {/* Fixed Update Button */}
            <View
                style={[
                    styles.bottomBar,
                    { paddingBottom: insets.bottom || 20 }
                ]}
            >
                <Pressable
                    onPress={handleUpdate}
                    style={({ pressed }) => [
                        styles.updateButton,
                        pressed && styles.updateButtonPressed,
                    ]}
                >
                    <Text style={styles.updateButtonText}>Update</Text>
                </Pressable>
            </View>
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
    avatarSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarWrapper: {
        position: 'relative',
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
        width: 36,
        height: 36,
        backgroundColor: Theme.colors.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Theme.colors.background,
    },
    form: {
        gap: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        paddingHorizontal: 16,
        minHeight: 56,
    },
    inputPressed: {
        backgroundColor: Theme.colors.border,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: Theme.colors.textPrimary,
        paddingVertical: Platform.OS === 'ios' ? 16 : 12,
    },
    inputMultiline: {
        minHeight: 80,
        paddingTop: 16,
        paddingBottom: 16,
    },
    inputIcon: {
        marginLeft: 8,
    },
    pickerText: {
        paddingVertical: 0,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Theme.colors.background,
        paddingHorizontal: 24,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.border,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    updateButton: {
        backgroundColor: Theme.colors.primary,
        borderRadius: 28,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: Theme.colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    updateButtonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    updateButtonText: {
        color: Theme.colors.white,
        fontSize: 18,
        fontWeight: '700',
    },
});
