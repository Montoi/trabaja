import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { memo, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                tabBarStyle: styles.tabBarStyle,
            }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerTitle: 'Inicio',
                }}
            />
            <Tabs.Screen
                name="stats"
                options={{
                    title: 'Estadísticas',
                    headerTitle: 'Estadísticas',
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Perfil',
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
            style={getPressableStyle}
        >
            <View style={[styles.tabItem, isFocused && styles.tabItemFocused]}>
                {icon && (
                    <Ionicons
                        name={icon as any}
                        size={24}
                        color={isFocused ? '#7210FF' : '#999'}
                    />
                )}
                <Text style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}>
                    {label}
                </Text>
            </View>
        </Pressable>
    );
});

// Stable style function reference (hoisted outside component)
function getPressableStyle({ pressed }: { pressed: boolean }) {
    return [styles.tabButton, pressed && styles.tabButtonPressed];
}

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
        stats: 'stats-chart',
        profile: 'person',
    };

    return (
        <View style={[styles.tabBar, { paddingBottom: insets.bottom + 4 }]}>
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
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingTop: 8,
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabButtonPressed: {
        opacity: 0.7,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        gap: 4,
    },
    tabItemFocused: {
        backgroundColor: '#f0f0f0',
    },
    tabLabel: {
        fontSize: 10,
        color: '#666',
        fontWeight: '500',
    },
    tabLabelFocused: {
        color: '#007AFF',
        fontWeight: '600',
    },
});
