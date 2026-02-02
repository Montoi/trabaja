import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LanguageProvider } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import {
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold
} from '@expo-google-fonts/inter';
import {
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold
} from '@expo-google-fonts/plus-jakarta-sans';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import CustomSplashScreen from '../components/CustomSplashScreen';

export default function RootLayout() {
    const [isAppReady, setIsAppReady] = useState(false);

    useEffect(() => {
        const prepare = async () => {
            try {
                // Actual Resource Loading: App waits for fonts AND icons to be ready
                await Font.loadAsync({
                    Inter_400Regular,
                    Inter_600SemiBold,
                    Inter_700Bold,
                    PlusJakartaSans_400Regular,
                    PlusJakartaSans_600SemiBold,
                    PlusJakartaSans_700Bold,
                    // Explicitly preload the icon fonts used in Splah & App
                    ...MaterialCommunityIcons.font,
                    ...MaterialIcons.font,
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setIsAppReady(true);
            }
        };

        prepare();
    }, []);

    if (!isAppReady) {
        return (
            <SafeAreaProvider>
                <CustomSplashScreen />
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <LanguageProvider>
                <Stack
                    screenOptions={{ headerShown: false }}
                    initialRouteName="(auth)"
                >
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </LanguageProvider>
        </SafeAreaProvider>
    );
}
