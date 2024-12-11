/**
 * Generates a unique ID using a combination of timestamp and random numbers
 */
export function generateUniqueId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
} 