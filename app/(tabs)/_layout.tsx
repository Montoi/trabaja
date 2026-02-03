import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Dimensions, AppState } from 'react-native';
import { memo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolateColor
} from 'react-native-reanimated';
import { useLanguage } from '../../contexts/LanguageContext';
import PagerView from 'react-native-pager-view';
import { Theme } from '../../constants/Theme';

// Import screens directly
import HomeScreen from './index';
import MyBookingsScreen from './my-bookings';
import ReferralsScreen from './referrals';
import ProfileScreen from './profile';

const TAB_CONFIG = [
    { name: 'index', title: 'home', icon: 'home', component: HomeScreen },
    { name: 'my-bookings', title: 'bookings', icon: 'calendar', component: MyBookingsScreen },
    { name: 'referrals', title: 'referrals', icon: 'people', component: ReferralsScreen },
    { name: 'profile', title: 'profile', icon: 'person', component: ProfileScreen },
] as const;

export default function TabLayout() {
    const { t } = useLanguage();
    const [currentPage, setCurrentPage] = useState(0);
    const pagerRef = React.useRef<PagerView>(null);

    const handlePageSelected = useCallback((e: any) => {
        setCurrentPage(e.nativeEvent.position);
    }, []);

    const handleTabPress = useCallback((index: number) => {
        pagerRef.current?.setPage(index);
        setCurrentPage(index);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {/* Swipeable Content */}
            <PagerView
                ref={pagerRef}
                style={{ flex: 1 }}
                initialPage={0}
                onPageSelected={handlePageSelected}
            >
                {TAB_CONFIG.map((tab, index) => (
                    <View key={index} style={{ flex: 1 }}>
                        <tab.component />
                    </View>
                ))}
            </PagerView>

            {/* Fixed Tab Bar */}
            <CustomTabBar
                currentPage={currentPage}
                onTabPress={handleTabPress}
                tabs={TAB_CONFIG}
            />
        </View>
    );
}

interface TabItemProps {
    index: number;
    isFocused: boolean;
    label: string;
    icon?: string;
    onPress: () => void;
}

// Memoized tab item component to prevent unnecessary re-renders
const TabItem = memo(function TabItem({
    isFocused,
    label,
    icon,
    onPress,
}: TabItemProps) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
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

interface CustomTabBarProps {
    currentPage: number;
    onTabPress: (index: number) => void;
    tabs: readonly typeof TAB_CONFIG[number][];
}

function CustomTabBar({ currentPage, onTabPress, tabs }: CustomTabBarProps) {
    // Get safe area insets to prevent tab bar from being covered by system UI
    const insets = useSafeAreaInsets();
    const { t } = useLanguage();

    // Standardize floating position to be 100% stable
    // We use the safe area bottom inset plus a fixed gap
    const [bottomPosition, setBottomPosition] = useState((insets.bottom || 12) + 12);

    // Update bottom position whenever insets change
    useEffect(() => {
        setBottomPosition((insets.bottom || 12) + 12);
    }, [insets.bottom]);

    // Force update when app comes to foreground
    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                setBottomPosition((insets.bottom || 12) + 12);
            }
        });
        return () => subscription.remove();
    }, [insets.bottom]);

    // Animation logic
    const totalWidth = Dimensions.get('window').width - 60; // 60 = marginHorizontal 30 * 2
    const tabWidth = totalWidth / tabs.length;
    const pillPadding = 8;
    const pillWidth = tabWidth - (pillPadding * 2);
    const translateX = useSharedValue(currentPage * tabWidth + pillPadding);

    useEffect(() => {
        translateX.value = withSpring(currentPage * tabWidth + pillPadding, {
            damping: 20,
            stiffness: 150,
            mass: 0.8,
        });
    }, [currentPage, tabWidth, translateX]);

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
                {tabs.map((tab, index) => {
                    const isFocused = currentPage === index;
                    const label = t.tabs[tab.title as keyof typeof t.tabs];

                    return (
                        <TabItem
                            key={index}
                            index={index}
                            isFocused={isFocused}
                            label={label}
                            icon={tab.icon}
                            onPress={() => onTabPress(index)}
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
