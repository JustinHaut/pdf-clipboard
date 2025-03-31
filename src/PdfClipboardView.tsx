import { requireNativeView } from 'expo';
import * as React from 'react';

import { PdfClipboardViewProps } from './PdfClipboard.types';

const NativeView: React.ComponentType<PdfClipboardViewProps> =
  requireNativeView('PdfClipboard');

export default function PdfClipboardView(props: PdfClipboardViewProps) {
  return <NativeView {...props} />;
}
