import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopWidth: 1,
                    borderTopColor: '#e0e0e0',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
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

function CustomTabBar({ state, descriptors, navigation }: any) {
    return (
        <View style={styles.tabBar}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label = options.title || route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <Pressable
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={({ pressed }) => [
                            styles.tabButton,
                            pressed && styles.tabButtonPressed,
                        ]}
                    >
                        <View style={[styles.tabItem, isFocused && styles.tabItemFocused]}>
                            <Text
                                style={[
                                    styles.tabLabel,
                                    isFocused && styles.tabLabelFocused,
                                ]}
                            >
                                {label}
                            </Text>
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        height: 60,
        paddingBottom: 8,
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
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    tabItemFocused: {
        backgroundColor: '#f0f0f0',
    },
    tabLabel: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    tabLabelFocused: {
        color: '#007AFF',
        fontWeight: '600',
    },
});
