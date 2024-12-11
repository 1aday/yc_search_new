import React, { useState } from 'react';
import { generateUniqueId, streamMessageContent } from '../utils/helpers';

interface Message {
    id: string;
    content: string;
    isStreaming: boolean;
}

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);

    function handleNewMessage(content: string) {
        const newMessage = {
            id: generateUniqueId(),
            content: '',
            isStreaming: true,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Simulate streaming
        streamMessageContent(content, (chunk) => {
            setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg.id === newMessage.id
                        ? { ...msg, content: msg.content + chunk }
                        : msg
                )
            );
        }).then(() => {
            // Streaming complete
            setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg.id === newMessage.id ? { ...msg, isStreaming: false } : msg
                )
            );
        });
    }

    return {
        messages,
        handleNewMessage
    };
} 