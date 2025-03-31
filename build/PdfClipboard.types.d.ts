import type { StyleProp, ViewStyle } from 'react-native';
export type OnLoadEventPayload = {
    url: string;
};
export type PdfClipboardModuleEvents = {
    onChange: (params: ChangeEventPayload) => void;
};
export type ChangeEventPayload = {
    value: string;
};
export type PdfClipboardViewProps = {
    url: string;
    onLoad: (event: {
        nativeEvent: OnLoadEventPayload;
    }) => void;
    style?: StyleProp<ViewStyle>;
};
//# sourceMappingURL=PdfClipboard.types.d.ts.map