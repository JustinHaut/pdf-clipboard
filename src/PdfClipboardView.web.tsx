import * as React from 'react';

import { PdfClipboardViewProps } from './PdfClipboard.types';

export default function PdfClipboardView(props: PdfClipboardViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
