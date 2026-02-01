import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Pressable, Platform, Dimensions } from 'react-native';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolateColor,
    useAnimatedProps
} from 'react-native-reanimated';
import { useLanguage } from '../../contexts/LanguageContext';

export default function TabLayout() {
    const { t } = useLanguage();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: { position: 'absolute' },
            }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: t.tabs.home,
                    headerTitle: 'Inicio',
                }}
            />
            <Tabs.Screen
                name="my-bookings"
                options={{
                    title: t.tabs.bookings,
                    headerTitle: 'My Bookings',
                }}
            />
            <Tabs.Screen
                name="stats"
                options={{
                    title: t.tabs.stats,
                    headerTitle: 'Estadísticas',
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: t.tabs.profile,
                    headerTitle: 'Configuración de Perfil',
                }}
            />
        </Tabs>
    );
}

interface TabItemProps {
    route: any;
    index: number;
    isFocused: boolean;
    label: string;
    icon?: string;
    accessibilityLabel?: string;
    testID?: string;
    onPress: () => void;
    onLongPress: () => void;
}

// Memoized tab item component to prevent unnecessary re-renders
const TabItem = memo(function TabItem({
    route,
    isFocused,
    label,
    icon,
    accessibilityLabel,
    testID,
    onPress,
    onLongPress,
}: TabItemProps) {
    return (
        <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={accessibilityLabel}
            testID={testID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
            android_ripple={{ color: 'rgba(114, 16, 255, 0.1)', borderless: true }}
        >
            <View style={styles.tabItem}>
                {!!icon && (
                    <Ionicons
                        name={icon as any}
                        size={20}
                        color={isFocused ? '#FFFFFF' : '#999'}
                    />
                )}
                <Text style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}>
                    {label}
                </Text>
            </View>
        </Pressable>
    );
});

function CustomTabBar({ state, descriptors, navigation }: any) {
    // Get safe area insets to prevent tab bar from being covered by system UI
    const insets = useSafeAreaInsets();

    // Hoisted callback creator - single function instance
    const createTabPressHandler = useCallback(
        (routeName: string, routeKey: string, isFocused: boolean) => () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: routeKey,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(routeName);
            }
        },
        [navigation]
    );

    const createTabLongPressHandler = useCallback(
        (routeKey: string) => () => {
            navigation.emit({
                type: 'tabLongPress',
                target: routeKey,
            });
        },
        [navigation]
    );

    // Icon mapping for each tab
    const iconMap: Record<string, string> = {
        index: 'home',
        'my-bookings': 'calendar',
        stats: 'stats-chart',
        profile: 'person',
    };

    // Standardize floating position to be 100% stable
    // We use the safe area bottom inset plus a fixed gap
    const bottomPosition = (insets.bottom || 12) + 12;

    // Animation logic
    const totalWidth = Dimensions.get('window').width - 60; // 60 = marginHorizontal 30 * 2
    const tabWidth = totalWidth / state.routes.length;
    const pillPadding = 8;
    const pillWidth = tabWidth - (pillPadding * 2);
    const translateX = useSharedValue(state.index * tabWidth + pillPadding);

    useEffect(() => {
        translateX.value = withSpring(state.index * tabWidth + pillPadding, {
            damping: 20,
            stiffness: 150,
            mass: 0.8,
        });
    }, [state.index, tabWidth, translateX]);

    const animatedPillStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={[styles.tabBar, { bottom: bottomPosition }]}>
            {/* Animated Pill Background - Rendered first to stay behind */}
            <Animated.View
                style={[
                    styles.animatedPill,
                    { width: pillWidth },
                    animatedPillStyle
                ]}
            />

            <View style={styles.buttonsContainer}>
                {state.routes.map((route: any, index: number) => {
                    const { options } = descriptors[route.key];
                    const label = options.title || route.name;
                    const isFocused = state.index === index;

                    return (
                        <TabItem
                            key={route.key}
                            route={route}
                            index={index}
                            isFocused={isFocused}
                            label={label}
                            icon={iconMap[route.name]}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={createTabPressHandler(route.name, route.key, isFocused)}
                            onLongPress={createTabLongPressHandler(route.key)}
                        />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0,
        marginHorizontal: 30,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 6,
        height: 48,
        overflow: 'hidden',
    },
    buttonsContainer: {
        flexDirection: 'row',
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 20,
        gap: 1,
        width: 64,
        zIndex: 2,
    },
    animatedPill: {
        position: 'absolute',
        top: 4,
        bottom: 4,
        left: 0,
        backgroundColor: '#7210FF',
        borderRadius: 20,
        zIndex: 0,
    },
    tabItemFocused: {
        // Background handled by animatedPill
    },
    tabLabel: {
        fontSize: 7.5,
        color: '#9E9E9E',
        fontWeight: '600',
    },
    tabLabelFocused: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
});
