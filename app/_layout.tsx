import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LanguageProvider } from '../contexts/LanguageContext';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <LanguageProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </LanguageProvider>
        </SafeAreaProvider>
    );
}
