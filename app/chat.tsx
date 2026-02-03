import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Modal, ScrollView, ActivityIndicator, TouchableOpacity, useWindowDimensions, AppState, Keyboard } from 'react-native';
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated';
import ImageViewerModal from '../components/ImageViewerModal';
import { FlashList, type FlashListProps } from '@shopify/flash-list';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Theme } from '../constants/Theme';
import { useLanguage } from '../contexts/LanguageContext';
import type { Message } from '../types/chat';

// Mock messages for demonstration
const MOCK_MESSAGES: Message[] = [
    {
        id: '1',
        text: 'Hi! I have a question about the service.',
        senderId: 'user',
        senderName: 'You',
        timestamp: new Date(Date.now() - 3600000),
        isRead: true,
    },
    {
        id: '2',
        text: 'Hello! Of course, how can I help you?',
        senderId: 'provider',
        senderName: 'Provider',
        timestamp: new Date(Date.now() - 3000000),
        isRead: true,
    },
    {
        id: '3',
        text: 'What time would you be available tomorrow?',
        senderId: 'user',
        senderName: 'You',
        timestamp: new Date(Date.now() - 2400000),
        isRead: true,
    },
    {
        id: '4',
        text: 'I can come at 10 AM or 2 PM. Which works better for you?',
        senderId: 'provider',
        senderName: 'Provider',
        timestamp: new Date(Date.now() - 1800000),
        isRead: true,
    },
];

export default function ChatScreen() {
    const insets = useSafeAreaInsets();
    const { t } = useLanguage();
    const params = useLocalSearchParams<{
        bookingId?: string;
        provider?: string;
        providerImage?: string;
    }>();

    // Key to force re-render of KeyboardAvoidingView on AppState change (fix for Android stickiness)
    const [kavKey, setKavKey] = useState(0);
    const appState = useRef(AppState.currentState);

    // Dynamic Keyboard Handling (Android)
    const { height: windowHeight } = useWindowDimensions();
    const [initialWindowHeight, setInitialWindowHeight] = useState(windowHeight);

    useEffect(() => {
        // Capture stable max height (when keyboard closed) to detect resize failure
        if (windowHeight > initialWindowHeight) {
            setInitialWindowHeight(windowHeight);
        }
    }, [windowHeight]);

    // If window shrinks significantly (>100px), native resize is working.
    // If not, we fall back to 'padding'.
    const isNativeResizeWorking = (initialWindowHeight - windowHeight) > 100;

    // Track Keyboard Visibility to prevent "Gap" when closed
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const showListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', () => setIsKeyboardVisible(true));
        const hideListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => setIsKeyboardVisible(false));
        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                // App came to foreground - remount KAV to reset native listeners
                setKavKey(prev => prev + 1);
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
    const [inputText, setInputText] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [selectedMessageIds, setSelectedMessageIds] = useState<Set<string>>(new Set());
    const [previewImageUris, setPreviewImageUris] = useState<string[]>([]);
    const [isViewerVisible, setIsViewerVisible] = useState(false);
    const [viewerImages, setViewerImages] = useState<{ uri: string }[]>([]);
    const [viewerIndex, setViewerIndex] = useState(0);
    const listRef = useRef<React.ElementRef<typeof FlashList<Message>>>(null);

    const providerName = params.provider || 'Service Provider';
    const providerImage = params.providerImage || 'https://i.pravatar.cc/150?img=5';

    const { width } = useWindowDimensions();
    const modalWidth = width * 0.9;
    const imagePreviewWidth = modalWidth - 40; // 40 is padding (20 left + 20 right)

    useEffect(() => {
        // Auto-scroll to bottom when messages change
        setTimeout(() => {
            if (messages.length > 0) {
                listRef.current?.scrollToEnd({ animated: true });
            }
        }, 100);
    }, [messages]);

    const formatTime = (date: Date): string => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        // Today
        if (diff < 86400000 && now.getDate() === date.getDate()) {
            return timeStr;
        }
        // Yesterday
        if (diff < 172800000 && now.getDate() - date.getDate() === 1) {
            return `${t.chat.yesterday} ${timeStr}`;
        }
        // Older
        return `${date.getMonth() + 1}/${date.getDate()} ${timeStr}`;
    };

    const handleSend = async (imageUris?: string[]) => {
        const textToSend = inputText.trim();
        if (!textToSend && (!imageUris || imageUris.length === 0)) return;

        // 1. Optimistic Update: Create message and update UI immediately
        const newMessage: Message = {
            id: Date.now().toString(),
            text: textToSend,
            senderId: 'user',
            senderName: 'You',
            timestamp: new Date(),
            isRead: false,
            imageUris,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputText('');

        // 2. Handle "Sending" state (Simulate network only for images or deep backend logic)
        if (imageUris && imageUris.length > 0) {
            setIsSending(true);
            // Simulate upload time for images
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSending(false);
        } else {
            // Text is instant, no delay needed locally.
            // In a real app, you might trigger the API call here in background.
        }
    };

    const pickImage = async () => {
        // Request permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to share images!');
            return;
        }

        // Launch image picker - multiple images
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 0.8,
        });

        if (!result.canceled && result.assets.length > 0) {
            // Show preview with all selected images
            setPreviewImageUris(result.assets.map(asset => asset.uri));
        }
    };

    const sendImage = async () => {
        if (previewImageUris.length > 0) {
            await handleSend(previewImageUris);
            setPreviewImageUris([]);
        }
    };

    const openImage = (images: string[], startIndex: number = 0) => {
        const formattedImages = images.map(uri => ({ uri }));
        setViewerImages(formattedImages);
        setViewerIndex(startIndex);
        setIsViewerVisible(true);
    };


    const renderMessage = ({ item }: { item: Message }) => {
        const isUser = item.senderId === 'user';
        const imageCount = item.imageUris?.length || 0;

        const renderImageGrid = () => {
            if (!item.imageUris || imageCount === 0) return null;

            // Single image - no stack
            if (imageCount === 1) {
                return (
                    <Pressable onPress={() => openImage(item.imageUris!, 0)}>
                        <Image
                            source={{ uri: item.imageUris[0] }}
                            style={styles.messageSingleImage}
                            contentFit="cover"
                        />
                    </Pressable>
                );
            }

            // Multiple images - stacked card layout
            const visibleImages = item.imageUris.slice(0, 3).reverse(); // Show max 3, reverse for z-index

            return (
                <Pressable onPress={() => openImage(item.imageUris!, 0)} style={styles.stackContainer}>
                    {visibleImages.map((uri, index) => {
                        const reverseIndex = visibleImages.length - 1 - index; // 0 = front, 1 = middle, 2 = back
                        return (
                            <View
                                key={index}
                                style={[
                                    styles.stackItem,
                                    reverseIndex === 0 && styles.stackItem1,
                                    reverseIndex === 1 && styles.stackItem2,
                                    reverseIndex === 2 && styles.stackItem3,
                                ]}
                            >
                                <Image
                                    source={{ uri }}
                                    style={styles.stackImage}
                                    contentFit="cover"
                                />
                                {reverseIndex === 0 && imageCount > 1 && (
                                    <View style={styles.photoCountBadge}>
                                        <Ionicons name="images-outline" size={12} color={Theme.colors.white} />
                                        <Text style={styles.photoCountText}>{imageCount} Photos</Text>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </Pressable>
            );
        };

        const toggleTimestamp = () => {
            setSelectedMessageIds(prev => {
                const next = new Set(prev);
                if (next.has(item.id)) {
                    next.delete(item.id);
                } else {
                    next.add(item.id);
                }
                return next;
            });
        };

        const isSelected = selectedMessageIds.has(item.id);

        return (
            <View style={[styles.messageContainer, isUser && styles.messageContainerUser]}>
                <Pressable
                    onPress={toggleTimestamp}
                    style={[
                        styles.messageBubble,
                        imageCount > 0 ? styles.messageBubbleWithImages : styles.messageBubbleWithText,
                        isUser ? styles.messageBubbleUser : styles.messageBubbleProvider
                    ]}
                >
                    {renderImageGrid()}
                    {item.text ? (
                        <Text style={[styles.messageText, isUser && styles.messageTextUser]}>
                            {item.text}
                        </Text>
                    ) : null}
                </Pressable>
                {isSelected && (
                    <Animated.Text
                        entering={FadeInUp.duration(500).springify()}
                        exiting={FadeOut.duration(400)}
                        style={[styles.messageTime, isUser && styles.messageTimeUser]}
                    >
                        {formatTime(item.timestamp)}
                    </Animated.Text>
                )}
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            key={kavKey}
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            enabled={Platform.OS === 'ios' ? true : (!isNativeResizeWorking && isKeyboardVisible)}
            keyboardVerticalOffset={0}
        >
            <StatusBar style="dark" />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <View style={styles.headerContent}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={Theme.colors.textPrimary} />
                    </Pressable>
                    <Image source={{ uri: providerImage }} style={styles.headerAvatar} contentFit="cover" />
                    <View style={styles.headerInfo}>
                        <Text style={styles.headerName}>{providerName}</Text>
                        {/* <Text style={styles.headerStatus}>{t.chat.typing}</Text> */}
                    </View>
                    <Pressable style={styles.moreButton}>
                        <Ionicons name="ellipsis-vertical" size={20} color={Theme.colors.textPrimary} />
                    </Pressable>
                </View>
            </View>

            {/* Messages List */}
            <FlashList
                ref={listRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messagesList}
                showsVerticalScrollIndicator={false}
            />

            {/* Input Area */}
            <View style={[styles.inputContainer, { paddingBottom: isKeyboardVisible ? 0 : (insets.bottom || 10) }]}>
                <Pressable style={styles.attachButton} onPress={pickImage}>
                    <Ionicons name="add-circle" size={28} color={Theme.colors.textSecondary} />
                </Pressable>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder={t.chat.typeMessage}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                        maxLength={500}
                        placeholderTextColor={Theme.colors.textPlaceholder}
                    />
                </View>
                <Pressable
                    style={[styles.sendButton, (!inputText.trim() && !isSending) && styles.sendButtonDisabled]}
                    onPress={() => handleSend()}
                    disabled={!inputText.trim() || isSending}
                >
                    {isSending && previewImageUris.length > 0 ? (
                        <ActivityIndicator size="small" color={Theme.colors.white} />
                    ) : (
                        <Ionicons
                            name="send"
                            size={20}
                            color={inputText.trim() ? Theme.colors.white : Theme.colors.textPlaceholder}
                        />
                    )}
                </Pressable>
            </View>

            {/* Image Preview Modal */}
            <Modal
                visible={previewImageUris.length > 0}
                transparent
                animationType="fade"
                onRequestClose={() => setPreviewImageUris([])}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Pressable
                            style={styles.modalCloseButton}
                            onPress={() => setPreviewImageUris([])}
                        >
                            <Ionicons name="close" size={24} color={Theme.colors.white} />
                        </Pressable>

                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            style={styles.previewGallery}
                            contentContainerStyle={styles.previewGalleryContent}
                        >
                            {previewImageUris.map((uri, index) => (
                                <Image
                                    key={index}
                                    source={{ uri }}
                                    style={[styles.previewImage, { width: imagePreviewWidth }]}
                                    contentFit="contain"
                                />
                            ))}
                        </ScrollView>

                        {previewImageUris.length > 1 && (
                            <View style={styles.imageCountBadge}>
                                <Text style={styles.imageCountText}>
                                    {previewImageUris.length} {previewImageUris.length === 1 ? 'image' : 'images'}
                                </Text>
                            </View>
                        )}

                        <Pressable
                            style={styles.sendImageButtonFull}
                            onPress={sendImage}
                            disabled={isSending}
                        >
                            {isSending ? (
                                <ActivityIndicator size="small" color={Theme.colors.white} />
                            ) : (
                                <>
                                    <Ionicons name="send" size={20} color={Theme.colors.white} />
                                    <Text style={styles.sendImageButtonText}>{t.chat.send}</Text>
                                </>
                            )}
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Fullscreen Image Viewer with Zoom */}
            <ImageViewerModal
                images={viewerImages}
                initialIndex={viewerIndex}
                visible={isViewerVisible}
                onClose={() => setIsViewerVisible(false)}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    header: {
        backgroundColor: Theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    headerContent: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        marginRight: 8,
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    headerInfo: {
        flex: 1,
    },
    headerName: {
        fontSize: 16,
        fontWeight: '600',
        color: Theme.colors.textPrimary,
    },
    headerStatus: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
        marginTop: 2,
    },
    moreButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messagesList: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
    },
    messageContainer: {
        marginBottom: 12,
        alignItems: 'flex-start',
    },
    messageContainerUser: {
        alignItems: 'flex-end',
    },
    messageBubble: {
        maxWidth: '75%',
        borderRadius: 16,
    },
    messageBubbleWithImages: {
        padding: 4,
    },
    messageBubbleWithText: {
        padding: 12,
    },
    messageBubbleProvider: {
        backgroundColor: Theme.colors.surface,
        borderBottomLeftRadius: 4,
    },
    messageBubbleUser: {
        backgroundColor: Theme.colors.primary,
        borderBottomRightRadius: 4,
    },
    messageText: {
        fontSize: 15,
        color: Theme.colors.textPrimary,
        lineHeight: 20,
    },
    messageTextUser: {
        color: Theme.colors.white,
    },
    messageTime: {
        fontSize: 11,
        color: Theme.colors.textSecondary,
        marginTop: 4,
        marginLeft: 4,
    },
    messageTimeUser: {
        marginLeft: 0,
        marginRight: 4,
    },
    messageImage: {
        width: 150,
        height: 150,
        borderRadius: 12,
        marginBottom: 8,
        marginRight: 8,
    },
    messageSingleImage: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 12,
        marginBottom: 8,
    },
    imageGallery: {
        marginBottom: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        paddingTop: 12,
        backgroundColor: Theme.colors.white,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.border,
    },
    attachButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        marginBottom: 4,
    },
    inputWrapper: {
        flex: 1,
        minHeight: 40,
        maxHeight: 100,
        backgroundColor: Theme.colors.surface,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 8,
    },
    input: {
        fontSize: 15,
        color: Theme.colors.textPrimary,
        maxHeight: 80,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    sendButtonDisabled: {
        backgroundColor: Theme.colors.divider,
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: Theme.colors.surface,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalCloseButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    previewImage: {
        height: 400,
        borderRadius: 12,
        // Removed marginHorizontal for correct paging
    },
    previewGallery: {
        maxHeight: 420,
        marginBottom: 16,
    },
    previewGalleryContent: {
        // Removed paddingHorizontal for correct paging
    },
    imageCountBadge: {
        backgroundColor: Theme.colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginBottom: 16,
    },
    imageCountText: {
        color: Theme.colors.white,
        fontSize: 14,
        fontWeight: '600',
    },
    sendImageButtonFull: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        gap: 8,
        backgroundColor: Theme.colors.primary,
    },
    sendImageButtonText: {
        color: Theme.colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    // Stacked Card Layout Styles
    stackContainer: {
        width: 140,
        height: 140,
        position: 'relative',
        marginBottom: 0,
        alignSelf: 'center',
    },
    stackItem: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Theme.colors.white,
    },
    stackItem1: {
        zIndex: 3,
        transform: [{ translateX: 0 }, { translateY: 0 }],
    },
    stackItem2: {
        zIndex: 2,
        opacity: 0.9,
        transform: [{ translateX: 10 }, { translateY: 8 }, { rotate: '2deg' }],
    },
    stackItem3: {
        zIndex: 1,
        opacity: 0.7,
        transform: [{ translateX: 20 }, { translateY: 16 }, { rotate: '4deg' }],
    },
    stackImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    photoCountBadge: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    photoCountText: {
        color: Theme.colors.white,
        fontSize: 11,
        fontWeight: '700',
    },
    imageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    imageOverlayText: {
        color: Theme.colors.white,
        fontSize: 28,
        fontWeight: 'bold',
    },
    // Fullscreen Viewer Styles
    viewerContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
    },

});
