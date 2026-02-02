import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';

export default function WelcomeScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

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

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar style="dark" />

            {/* Header / Back Button Placeholder */}
            <View style={styles.header}>
                <Pressable onPress={() => { }} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </Pressable>
            </View>

            <View style={styles.content}>
                {/* Image Section */}
                <View style={[styles.imageContainer, { borderColor: 'rgba(127, 61, 255, 0.1)' }]}>
                    <Image
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_JnQktbRyxDn0amrHLi0tOYJcevJVqA69eSiM5YjayH7MMyNYpxX-yTfGDEbgg_29GHz9d0oEoH8qeyCoeSt3GEwYACzocmGLHIPc94l3QlnBM1eWjYPateTWC3hgEEnfyikUlzuLFHH9wuL0D-vAJ_eo2CEdSDodojb4TMPboTzGnK3Lu5F3VU1H_xXmNXRCIQT4eMHp6jEoLRTkkYPOMrlj0yJoccEcrfEKRENNfUijGLIFsJw-NWveGqbFpkXz7a5q0ehsglPO' }}
                        style={styles.image}
                    />
                </View>

                {/* Title */}
                <Text style={styles.title}>Let's you in</Text>

                {/* Social Buttons */}
                <View style={styles.socialButtons}>
                    <Pressable style={styles.socialButton}>
                        <FacebookIcon />
                        <Text style={styles.socialButtonText}>Continue with Facebook</Text>
                    </Pressable>
                    <Pressable style={styles.socialButton}>
                        <GoogleIcon />
                        <Text style={styles.socialButtonText}>Continue with Google</Text>
                    </Pressable>
                    <Pressable style={styles.socialButton}>
                        <AppleIcon />
                        <Text style={styles.socialButtonText}>Continue with Apple</Text>
                    </Pressable>
                </View>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or</Text>
                    <View style={styles.dividerLine} />
                </View>

                {/* Password Sign In */}
                <Pressable
                    style={[styles.primaryButton, { backgroundColor: PRIMARY_COLOR, shadowColor: PRIMARY_COLOR }]}
                    onPress={() => router.push('/(auth)/login')}
                >
                    <Text style={styles.primaryButtonText}>Sign in with password</Text>
                </Pressable>

                {/* Sign Up Link */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <Pressable onPress={() => router.push('/(auth)/sign-up')}>
                        <Text style={[styles.linkText, { color: PRIMARY_COLOR }]}>Sign up</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 8,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    imageContainer: {
        marginTop: 16,
        marginBottom: 32,
        width: 224, // w-56
        height: 224, // h-56
        borderRadius: 112,
        borderWidth: 4,
        padding: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 112,
    },
    title: {
        fontSize: 36, // text-4xl
        fontWeight: '700',
        color: '#111827', // text-gray-900
        marginBottom: 32,
    },
    socialButtons: {
        width: '100%',
        gap: 12, // space-y-3
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        width: '100%',
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F3F4F6', // border-gray-100
        backgroundColor: '#FFFFFF',
    },
    socialButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151', // text-gray-700
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB', // bg-gray-200
    },
    dividerText: {
        paddingHorizontal: 16,
        fontSize: 18,
        fontWeight: '500',
        color: '#6B7280', // text-gray-500
    },
    primaryButton: {
        width: '100%',
        height: 56,
        borderRadius: 28, // rounded-full
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    footer: {
        marginTop: 'auto',
        marginBottom: 32,
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#6B7280', // text-gray-500
    },
    linkText: {
        fontSize: 14,
        fontWeight: '700',
    },
});
