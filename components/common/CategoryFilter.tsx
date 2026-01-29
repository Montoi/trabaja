import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { memo } from 'react';

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
    containerStyle?: any;
}

export const CategoryFilter = memo(function CategoryFilter({
    categories,
    selectedCategory,
    onSelectCategory,
    containerStyle,
}: CategoryFilterProps) {
    return (
        <View style={[styles.filterContainer, containerStyle]}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterScroll}
            >
                {categories.map((category) => (
                    <Pressable
                        key={category}
                        onPress={() => onSelectCategory(category)}
                        style={[
                            styles.filterPill,
                            selectedCategory === category && styles.filterPillActive
                        ]}
                    >
                        <Text style={[
                            styles.filterText,
                            selectedCategory === category && styles.filterTextActive
                        ]}>
                            {category}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    filterContainer: {
        paddingVertical: 12,
    },
    filterScroll: {
        paddingHorizontal: 24,
        gap: 12,
    },
    filterPill: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#7210FF',
        backgroundColor: '#FFF',
    },
    filterPillActive: {
        backgroundColor: '#7210FF',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#7210FF',
    },
    filterTextActive: {
        color: '#FFF',
    },
});
