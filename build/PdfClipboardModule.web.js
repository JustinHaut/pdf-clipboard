import { registerWebModule, NativeModule } from 'expo';
class PdfClipboardModule extends NativeModule {
    PI = Math.PI;
    async setValueAsync(value) {
        this.emit('onChange', { value });
    }
    hello() {
        return 'Hello world! 👋';
    }
}
export default registerWebModule(PdfClipboardModule);
//# sourceMappingURL=PdfClipboardModule.web.js.map