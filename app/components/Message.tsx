import ReactMarkdown from 'react-markdown';
import { useRef } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MessageProps {
    text: string;
    role: 'user' | 'assistant' | 'code';
    isStreaming: boolean;
    id: string;
}

export default function Message({ text, role, isStreaming, id }: MessageProps) {
    const contentRef = useRef<HTMLDivElement>(null);

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
                {text}
            </ReactMarkdown>
        </div>
    );
} 