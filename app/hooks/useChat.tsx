import React, { useState } from 'react';

const [messages, setMessages] = useState([]);

function handleNewMessage(content: string) {
    const newMessage = {
        id: generateUniqueId(),
        content: '',
        isStreaming: true,
        // ... other properties ...
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