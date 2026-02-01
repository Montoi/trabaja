import { View, Text, StyleSheet, Pressable } from 'react-native';
import { memo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SectionHeaderProps {
    title: string;
    onSeeAllPress?: () => void;
    showSeeAll?: boolean;
}

export const SectionHeader = memo(function SectionHeader({
    title,
    onSeeAllPress,
    showSeeAll = true,
}: SectionHeaderProps) {
    const { t } = useLanguage();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {showSeeAll && onSeeAllPress && (
                <Pressable onPress={onSeeAllPress}>
                    <Text style={styles.seeAll}>{t.home.viewAll}</Text>
                </Pressable>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },
    seeAll: {
        fontSize: 14,
        fontWeight: '700',
        color: '#7210FF',
    },
});
