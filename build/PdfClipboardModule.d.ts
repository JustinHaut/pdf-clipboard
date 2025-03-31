import { NativeModule } from 'expo';
import { PdfClipboardModuleEvents } from './PdfClipboard.types';
declare class PdfClipboardModule extends NativeModule<PdfClipboardModuleEvents> {
    PI: number;
    hello(): string;
    setValueAsync(value: string): Promise<void>;
}
declare const _default: PdfClipboardModule;
export default _default;
//# sourceMappingURL=PdfClipboardModule.d.ts.map