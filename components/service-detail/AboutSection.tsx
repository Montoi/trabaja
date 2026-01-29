import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../../constants/Theme';

interface AboutSectionProps {
    about: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>About me</Text>
            <Text style={styles.aboutText}>
                {about}
                <Text style={styles.readMore}> Read more...</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginTop: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: Theme.colors.textPrimary,
        marginBottom: 12,
    },
    aboutText: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
        lineHeight: 22,
        fontWeight: '500',
    },
    readMore: {
        color: Theme.colors.primary,
        fontWeight: '800',
    },
});
