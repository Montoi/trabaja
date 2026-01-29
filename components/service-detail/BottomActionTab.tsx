import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Theme } from '../../constants/Theme';

interface BottomActionTabProps {
    onMessage: () => void;
    onBook: () => void;
    bottomInset: number;
}

export const BottomActionTab: React.FC<BottomActionTabProps> = ({ onMessage, onBook, bottomInset }) => {
    return (
        <View style={[styles.bottomBar, { paddingBottom: Math.max(bottomInset, 20) }]}>
            <Pressable onPress={onMessage} style={styles.msgBtn}>
                <Text style={styles.msgBtnText}>Message</Text>
            </Pressable>
            <Pressable onPress={onBook} style={styles.bookBtn}>
                <Text style={styles.bookBtnText}>Book Now</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Theme.colors.white,
        paddingTop: 20,
        paddingHorizontal: 24,
        flexDirection: 'row',
        gap: 16,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.divider,
        zIndex: 50,
    },
    msgBtn: {
        flex: 1,
        height: 56,
        borderRadius: 20,
        backgroundColor: Theme.colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    msgBtnText: {
        color: Theme.colors.primary,
        fontSize: 16,
        fontWeight: '800',
    },
    bookBtn: {
        flex: 2,
        height: 56,
        borderRadius: 20,
        backgroundColor: Theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
    },
    bookBtnText: {
        color: Theme.colors.white,
        fontSize: 16,
        fontWeight: '800',
    },
});
