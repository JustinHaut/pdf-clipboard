export interface PDFMetadata {
    base64: string;
    pageCount?: number;
    title?: string;
    author?: string;
    creator?: string;
    fileSize?: number;
}
/**
 * Checks if the clipboard contains PDF content
 * @returns Promise that resolves to a boolean indicating whether the clipboard has PDF content
 */
export declare function hasPDFContent(): Promise<boolean>;
/**
 * Gets the PDF content from the clipboard as a base64 string
 * @returns Promise that resolves to a base64 string of the PDF content, or null if no PDF content is available
 */
export declare function getPDFContent(): Promise<PDFMetadata | null>;
/**
 * Clears the clipboard content
 * @returns Promise that resolves when the clipboard is cleared
 */
export declare function clearClipboard(): Promise<void>;
declare const _default: {
    hasPDFContent: typeof hasPDFContent;
    getPDFContent: typeof getPDFContent;
    clearClipboard: typeof clearClipboard;
};
export default _default;
//# sourceMappingURL=index.d.ts.map