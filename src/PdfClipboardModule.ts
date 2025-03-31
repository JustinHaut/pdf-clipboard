import { NativeModule, requireNativeModule } from 'expo';

import { PdfClipboardModuleEvents } from './PdfClipboard.types';

declare class PdfClipboardModule extends NativeModule<PdfClipboardModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<PdfClipboardModule>('PdfClipboard');
