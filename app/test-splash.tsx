import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import CustomSplashScreen from '../components/CustomSplashScreen';

export default function TestSplashScreen() {
    const router = useRouter();

    useEffect(() => {
        // Simulate the splash delay then go back
        const timeout = setTimeout(() => {
            if (router.canGoBack()) {
                router.back();
            } else {
                router.replace('/(tabs)');
            }
        }, 3000); // 3 seconds for testing

        return () => clearTimeout(timeout);
    }, []);

    return <CustomSplashScreen />;
}
