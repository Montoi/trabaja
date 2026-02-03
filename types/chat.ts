export interface Message {
    id: string;
    text: string;
    senderId: string;
    senderName: string;
    timestamp: Date;
    isRead: boolean;
    imageUris?: string[];
}

export interface ChatParticipant {
    id: string;
    name: string;
    avatar: string;
}
