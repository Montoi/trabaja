import React from 'react';
import { Modal, View, StyleSheet, Pressable, Text, Platform, ActivityIndicator } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Ionicons } from '@expo/vector-icons';

interface ImageViewerModalProps {
    visible: boolean;
    images: { uri: string }[];
    initialIndex: number;
    onClose: () => void;
}

export default function ImageViewerModal({ visible, images, initialIndex, onClose }: ImageViewerModalProps) {
    const formattedImages = images.map(img => ({ url: img.uri }));

    const renderHeader = (currentIndex?: number) => (
        <View style={styles.header}>
            <Text style={styles.counter}>
                {(currentIndex ?? 0) + 1} / {images.length}
            </Text>
            <Pressable onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={28} color="white" />
            </Pressable>
        </View>
    );

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <ImageViewer
                imageUrls={formattedImages}
                index={initialIndex}
                renderHeader={renderHeader}
                enableSwipeDown={true}
                onSwipeDown={onClose}
                useNativeDriver={true}
                loadingRender={() => <ActivityIndicator size="large" color="white" />}
                backgroundColor="black"
                renderIndicator={() => <View />} // We use custom header for indicator
                enablePreload={true}
            />
        </Modal>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        height: 100,
    },
    counter: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    closeBtn: {
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 20,
    },
});
