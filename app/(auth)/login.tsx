import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import Svg, { Path } from 'react-native-svg';

export default function LoginScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [isChecked, setIsChecked] = useState(false);

    // Theme Primary Color
    const PRIMARY_COLOR = '#7F3DFF';

    // SVG Icons for Social Buttons
    const FacebookIcon = () => (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="#1877F2">
            <Path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </Svg>
    );

    const GoogleIcon = () => (
        <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </Svg>
    );

    const AppleIcon = () => (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="#000">
            <Path d="M17.073 10.146c.011 2.564 2.112 3.425 2.14 3.438-.018.062-.336 1.144-1.104 2.263-.664.966-1.353 1.93-2.435 1.95-1.061.02-1.402-.625-2.614-.625-1.211 0-1.59.605-2.613.645-1.004.039-1.803-.898-2.473-1.867-1.369-1.973-2.417-5.572-1.008-8.017.7-1.213 1.948-1.982 3.291-2.002 1.025-.019 1.993.689 2.614.689.62 0 1.815-.862 3.033-.739.511.022 1.947.206 2.868 1.551-.074.046-1.713.994-1.699 2.914zm-2.858-6.31c.552-.668.924-1.597.822-2.527-.798.033-1.763.533-2.336 1.201-.514.594-.963 1.543-.842 2.454.89.069 1.805-.459 2.356-1.128z" />
        </Svg>
    );

    const handleLogin = () => {
        // For demo purposes, navigate to main tabs
        router.replace('/(tabs)');
    };

    return (
        <ScrollView
            style={[styles.container, { paddingTop: insets.top }]}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1F2937" />
                </Pressable>
            </View>

            {/* Title */}
            <Text style={styles.title}>
                Login into your{'\n'}Account
            </Text>

            {/* Form */}
            <View style={styles.formContainer}>
                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputIcon}>
                        <MaterialIcons name="mail-outline" size={22} color="#9CA3AF" />
                    </View>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#9CA3AF"
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputIcon}>
                        <MaterialIcons name="lock-outline" size={22} color="#9CA3AF" />
                    </View>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#9CA3AF"
                        style={styles.input}
                        secureTextEntry
                    />
                    <Pressable style={styles.visibilityIcon}>
                        <MaterialIcons name="visibility-off" size={22} color="#9CA3AF" />
                    </Pressable>
                </View>
            </View>

            {/* Checkbox */}
            <Pressable
                style={styles.checkboxContainer}
                onPress={() => setIsChecked(!isChecked)}
            >
                <View style={[styles.checkbox, isChecked && { backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }]}>
                    {isChecked && <MaterialIcons name="check" size={14} color="#FFF" />}
                </View>
                <Text style={styles.checkboxLabel}>Remember me</Text>
            </Pressable>

            {/* Sign In Button */}
            <Pressable
                style={[styles.primaryButton, { backgroundColor: PRIMARY_COLOR }]}
                onPress={handleLogin}
            >
                <Text style={styles.primaryButtonText}>Sign in</Text>
            </Pressable>

            {/* Divider */}
            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons Footer */}
            <View style={styles.socialButtonsRow}>
                <Pressable style={styles.socialIconBtn}>
                    <FacebookIcon />
                </Pressable>
                <Pressable style={styles.socialIconBtn}>
                    <GoogleIcon />
                </Pressable>
                <Pressable style={styles.socialIconBtn}>
                    <AppleIcon />
                </Pressable>
            </View>

            {/* Sign Up Link */}
            <View style={styles.footerLink}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <Pressable onPress={() => router.push('/(auth)/sign-up')}>
                    <Text style={[styles.linkText, { color: PRIMARY_COLOR }]}>Sign up</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
    },
    header: {
        paddingVertical: 12,
        marginBottom: 32,
    },
    backButton: {
        padding: 4,
        alignSelf: 'flex-start',
        marginLeft: -4,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#111827',
        lineHeight: 40,
        marginBottom: 32,
    },
    formContainer: {
        gap: 16,
    },
    inputContainer: {
        position: 'relative',
        justifyContent: 'center',
    },
    inputIcon: {
        position: 'absolute',
        left: 16,
        zIndex: 1,
    },
    visibilityIcon: {
        position: 'absolute',
        right: 16,
        zIndex: 1,
        padding: 4,
    },
    input: {
        backgroundColor: '#F8F8FA',
        borderRadius: 16,
        paddingVertical: 16,
        paddingLeft: 48,
        paddingRight: 48,
        fontSize: 16,
        color: '#111827',
        width: '100%',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        gap: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#7F3DFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
    },
    primaryButton: {
        width: '100%',
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
        shadowColor: '#7F3DFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 6,
    },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 40,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    dividerText: {
        paddingHorizontal: 16,
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
    },
    socialButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 40,
    },
    socialIconBtn: {
        width: 64,
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerLink: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 32,
        marginTop: 'auto',
    },
    footerText: {
        fontSize: 14,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    linkText: {
        fontSize: 14,
        fontWeight: '700',
    },
});
