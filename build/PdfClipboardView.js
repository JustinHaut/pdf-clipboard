import { requireNativeView } from 'expo';
import * as React from 'react';
const NativeView = requireNativeView('PdfClipboard');
export default function PdfClipboardView(props) {
    return <NativeView {...props}/>;
}
//# sourceMappingURL=PdfClipboardView.js.map