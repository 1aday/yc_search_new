/**
 * Generates a unique ID using a combination of timestamp and random numbers
 */
export function generateUniqueId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Simulates streaming content by breaking it into chunks
 * @param content The full content to stream
 * @param onChunk Callback function to handle each chunk
 */
export async function streamMessageContent(
    content: string,
    onChunk: (chunk: string) => void
): Promise<void> {
    const chunkSize = 3; // Number of characters per chunk
    const delay = 50; // Milliseconds between chunks

    for (let i = 0; i < content.length; i += chunkSize) {
        const chunk = content.slice(i, i + chunkSize);
        onChunk(chunk);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
} 