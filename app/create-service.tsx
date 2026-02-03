import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Image as RNImage, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Theme } from '../constants/Theme';
import { useLanguage } from '../contexts/LanguageContext';
import { SERVICES } from '../constants/MockData';

interface FormErrors {
    title?: string;
    category?: string;
    description?: string;
    price?: string;
}

export default function CreateServiceScreen() {
    const insets = useSafeAreaInsets();
    const { t } = useLanguage();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!title.trim()) newErrors.title = t.createService.required;
        if (!category) newErrors.category = t.createService.required;
        if (!description.trim()) newErrors.description = t.createService.required;
        if (!price.trim()) {
            newErrors.price = t.createService.required;
        } else if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
            newErrors.price = t.createService.invalidPrice;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePublish = async () => {
        if (!validate()) return;

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            Alert.alert(t.common.success, t.createService.publishSuccess, [
                { text: 'OK', onPress: () => router.back() }
            ]);
        }, 1000);
    };

    const handleImagePick = () => {
        // For now, just use a placeholder
        setImageUri('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <View style={styles.headerContent}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={Theme.colors.textPrimary} />
                    </Pressable>
                    <Text style={styles.headerTitle}>{t.createService.title}</Text>
                    <Pressable
                        onPress={handlePublish}
                        disabled={isSubmitting}
                        style={[styles.publishButton, isSubmitting && styles.publishButtonDisabled]}
                    >
                        <Text style={styles.publishButtonText}>{t.createService.publish}</Text>
                    </Pressable>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Service Title */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>{t.createService.serviceTitle}</Text>
                    <TextInput
                        style={[styles.input, errors.title && styles.inputError]}
                        placeholder={t.createService.serviceTitlePlaceholder}
                        value={title}
                        onChangeText={setTitle}
                        placeholderTextColor={Theme.colors.textPlaceholder}
                    />
                    {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
                </View>

                {/* Category Picker */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>{t.createService.category}</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryList}
                    >
                        {SERVICES.filter(s => s.id !== '14').map((service) => (
                            <Pressable
                                key={service.id}
                                style={[
                                    styles.categoryCard,
                                    category === service.name && styles.categoryCardActive
                                ]}
                                onPress={() => setCategory(service.name)}
                            >
                                <View style={[styles.categoryIcon, { backgroundColor: service.bgColor }]}>
                                    <Ionicons name={service.icon as any} size={28} color={service.iconColor} />
                                </View>
                                <Text style={[
                                    styles.categoryName,
                                    category === service.name && styles.categoryNameActive
                                ]}>{service.name}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                    {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
                </View>

                {/* Description */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>{t.createService.description}</Text>
                    <TextInput
                        style={[styles.textArea, errors.description && styles.inputError]}
                        placeholder={t.createService.descriptionPlaceholder}
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={6}
                        textAlignVertical="top"
                        placeholderTextColor={Theme.colors.textPlaceholder}
                    />
                    {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
                </View>

                {/* Price */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>{t.createService.price}</Text>
                    <View style={styles.priceInputContainer}>
                        <Text style={styles.currencySymbol}>$</Text>
                        <TextInput
                            style={[styles.priceInput, errors.price && styles.inputError]}
                            placeholder={t.createService.pricePlaceholder}
                            value={price}
                            onChangeText={setPrice}
                            keyboardType="decimal-pad"
                            placeholderTextColor={Theme.colors.textPlaceholder}
                        />
                    </View>
                    {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
                </View>

                {/* Image Upload */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>{t.createService.uploadImage}</Text>
                    <Pressable style={styles.imageUpload} onPress={handleImagePick}>
                        {imageUri ? (
                            <View style={styles.imagePreviewContainer}>
                                <RNImage source={{ uri: imageUri }} style={styles.imagePreview} />
                                <Pressable style={styles.changeImageButton} onPress={handleImagePick}>
                                    <MaterialIcons name="edit" size={20} color={Theme.colors.white} />
                                </Pressable>
                            </View>
                        ) : (
                            <View style={styles.uploadPlaceholder}>
                                <Ionicons name="cloud-upload-outline" size={48} color={Theme.colors.textSecondary} />
                                <Text style={styles.uploadText}>{t.createService.uploadImage}</Text>
                            </View>
                        )}
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    header: {
        backgroundColor: Theme.colors.background,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    headerContent: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        justifyContent: 'space-between',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: '700',
        color: Theme.colors.textPrimary,
        marginLeft: 8,
    },
    publishButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Theme.colors.primary,
        borderRadius: 8,
    },
    publishButtonDisabled: {
        opacity: 0.5,
    },
    publishButtonText: {
        color: Theme.colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 120,
    },
    formGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: Theme.colors.textPrimary,
        marginBottom: 12,
    },
    input: {
        height: 56,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: Theme.colors.textPrimary,
        backgroundColor: Theme.colors.background,
    },
    inputError: {
        borderColor: Theme.colors.error,
    },
    errorText: {
        color: Theme.colors.error,
        fontSize: 14,
        marginTop: 8,
    },
    categoryList: {
        paddingVertical: 8,
    },
    categoryCard: {
        alignItems: 'center',
        marginRight: 16,
        width: 80,
    },
    categoryCardActive: {
        transform: [{ scale: 1.05 }],
    },
    categoryIcon: {
        width: 64,
        height: 64,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryName: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
    },
    categoryNameActive: {
        color: Theme.colors.primary,
        fontWeight: '600',
    },
    textArea: {
        borderWidth: 1,
        borderColor: Theme.colors.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingTop: 16,
        fontSize: 16,
        color: Theme.colors.textPrimary,
        backgroundColor: Theme.colors.background,
        minHeight: 150,
    },
    priceInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.colors.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: Theme.colors.background,
    },
    currencySymbol: {
        fontSize: 20,
        fontWeight: '600',
        color: Theme.colors.textPrimary,
        marginRight: 8,
    },
    priceInput: {
        flex: 1,
        height: 56,
        fontSize: 16,
        color: Theme.colors.textPrimary,
        borderWidth: 0,
    },
    imageUpload: {
        borderWidth: 2,
        borderColor: Theme.colors.border,
        borderRadius: 12,
        height: 200,
        borderStyle: 'dashed',
        overflow: 'hidden',
    },
    uploadPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadText: {
        marginTop: 12,
        fontSize: 16,
        color: Theme.colors.textSecondary,
    },
    imagePreviewContainer: {
        flex: 1,
        position: 'relative',
    },
    imagePreview: {
        width: '100%',
        height: '100%',
    },
    changeImageButton: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
