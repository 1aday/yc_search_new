import ReactMarkdown from 'react-markdown';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MessageProps {
    text: string;
    role: 'user' | 'assistant' | 'code';
    isStreaming: boolean;
    id: string;
}

// Add mermaid initialization at the top of the file
mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
});

export default function Message({ text, role, isStreaming, id }: MessageProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    // Process content to replace Mermaid code blocks with div elements
    const processedContent = !isStreaming
        ? text.replace(/```mermaid\n([\s\S]*?)```/g, (_, code) =>
            `<div class="mermaid">${code}</div>`
        )
        : text;

    // Initialize Mermaid diagrams when content updates and streaming is complete
    useEffect(() => {
        if (!isStreaming && contentRef.current) {
            const mermaidElements = contentRef.current.querySelectorAll('.mermaid');
            if (mermaidElements.length > 0) {
                try {
                    mermaid.init(undefined, mermaidElements as NodeListOf<HTMLElement>);
                } catch (error) {
                    console.error('Mermaid initialization error:', error);
                }
            }
        }
    }, [processedContent, isStreaming]);

    if (role === 'user') {
        return <div className="userMessage">{text}</div>;
    }

    if (role === 'code') {
        return (
            <div className="codeMessage">
                {text.split('\n').map((line, index) => (
                    <div key={index}>
                        <span>{`${index + 1}. `}</span>
                        {line}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="assistantMessage" ref={contentRef}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw as any]}
                allowDangerousHtml={true}
            >
                {processedContent}
            </ReactMarkdown>
        </div>
    );
} 