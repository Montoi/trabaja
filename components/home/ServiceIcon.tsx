import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import type { Service } from '../../types/home';

interface ServiceIconProps {
    service: Service;
    onPress: (id: string) => void;
}

export const ServiceIcon = memo(function ServiceIcon({ service, onPress }: ServiceIconProps) {
    const handlePress = () => onPress(service.id);

    return (
        <Pressable onPress={handlePress} style={styles.container}>
            <View style={[styles.iconContainer, { backgroundColor: service.bgColor }]}>
                <Ionicons name={service.icon as any} size={28} color={service.iconColor} />
            </View>
            <Text style={styles.label}>{service.name}</Text>
        </Pressable>
    );
});

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
    },
});
