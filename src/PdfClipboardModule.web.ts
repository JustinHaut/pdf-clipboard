import { registerWebModule, NativeModule } from 'expo';

import { PdfClipboardModuleEvents } from './PdfClipboard.types';

class PdfClipboardModule extends NativeModule<PdfClipboardModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(PdfClipboardModule);
