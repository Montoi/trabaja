import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';

interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    onFilterPress: () => void;
}

export const SearchBar = memo(function SearchBar({
    placeholder = 'Search',
    value,
    onChangeText,
    onFilterPress,
}: SearchBarProps) {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChangeText}
            />
            <Pressable onPress={onFilterPress} style={styles.filterButton}>
                <Ionicons name="options" size={20} color="#7210FF" />
            </Pressable>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 16,
        height: 48,
        paddingHorizontal: 16,
        position: 'relative',
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#000',
    },
    filterButton: {
        padding: 4,
    },
});
