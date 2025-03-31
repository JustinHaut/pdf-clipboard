import { NativeModule } from 'expo';
import { PdfClipboardModuleEvents } from './PdfClipboard.types';
declare class PdfClipboardModule extends NativeModule<PdfClipboardModuleEvents> {
    PI: number;
    setValueAsync(value: string): Promise<void>;
    hello(): string;
}
declare const _default: typeof PdfClipboardModule;
export default _default;
//# sourceMappingURL=PdfClipboardModule.web.d.ts.map