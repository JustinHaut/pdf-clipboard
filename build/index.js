import { requireNativeModule } from 'expo-modules-core';
// It loads the native module object from the JSI or falls back to
// the bridge module (from NativeModulesProxy) if the remote debugger is on.
const PdfClipboard = requireNativeModule('PdfClipboard');
/**
 * Checks if the clipboard contains PDF content
 * @returns Promise that resolves to a boolean indicating whether the clipboard has PDF content
 */
export async function hasPDFContent() {
    return await PdfClipboard.hasPDFContent();
}
/**
 * Gets the PDF content from the clipboard as a base64 string
 * @returns Promise that resolves to a base64 string of the PDF content, or null if no PDF content is available
 */
export async function getPDFContent() {
    return await PdfClipboard.getPDFContent();
}
/**
 * Clears the clipboard content
 * @returns Promise that resolves when the clipboard is cleared
 */
export async function clearClipboard() {
    return await PdfClipboard.clearClipboard();
}
export default {
    hasPDFContent,
    getPDFContent,
    clearClipboard,
};
//# sourceMappingURL=index.js.map