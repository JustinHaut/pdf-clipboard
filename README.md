# PDF Clipboard

A React Native module for accessing PDF data from the clipboard in Expo apps. This module provides a way to check if PDF content is available in the clipboard, retrieve the PDF data along with metadata, and clear the clipboard.

## Features

- Check if the clipboard contains PDF content
- Retrieve PDF content as base64 encoded string
- Get PDF metadata (title, author, page count, etc.)
- Clear clipboard content
- Cross-platform support (iOS and Android)

## Installation

```bash
npm install pdf-clipboard
# or
yarn add pdf-clipboard
```

## Requirements

- Expo SDK 52 or higher
- iOS 14.0 or higher
- Android API level 21 or higher

## Usage

```javascript
import * as PdfClipboard from 'pdf-clipboard';

// Check if clipboard has PDF content
const checkForPdfContent = async () => {
  try {
    const hasPdf = await PdfClipboard.hasPDFContent();
    console.log('PDF detected:', hasPdf);
  } catch (error) {
    console.error('Error checking clipboard:', error);
  }
};

// Get PDF content from clipboard
const getPdfContent = async () => {
  try {
    const content = await PdfClipboard.getPDFContent();
    if (content) {
      console.log('PDF metadata:', {
        pageCount: content.pageCount,
        title: content.title,
        author: content.author,
        fileSize: content.fileSize
      });
      
      // Use the base64 data with a PDF viewer
      const base64Data = `data:application/pdf;base64,${content.base64}`;
      // Pass base64Data to your PDF viewer
    }
  } catch (error) {
    console.error('Error getting PDF content:', error);
  }
};

// Clear clipboard
const clearClipboardContent = async () => {
  try {
    await PdfClipboard.clearClipboard();
    console.log('Clipboard cleared');
  } catch (error) {
    console.error('Error clearing clipboard:', error);
  }
};
```

## Example with react-native-pdf

You can use the retrieved PDF content with a PDF viewer like `react-native-pdf`:

```javascript
import Pdf from 'react-native-pdf';
import * as PdfClipboard from 'pdf-clipboard';

// In your component
const [pdfUri, setPdfUri] = useState(null);

const getPdfContent = async () => {
  try {
    const content = await PdfClipboard.getPDFContent();
    if (content) {
      const base64Data = `data:application/pdf;base64,${content.base64}`;
      setPdfUri(base64Data);
    }
  } catch (error) {
    console.error('Error getting PDF content:', error);
  }
};

// In your render
{pdfUri && (
  <Pdf
    source={{ uri: pdfUri }}
    style={{ flex: 1, width: '100%', height: 400 }}
    onLoadComplete={(numberOfPages) => {
      console.log(`PDF Loaded: ${numberOfPages} pages`);
    }}
    onError={(error) => {
      console.log('PDF Error:', error);
    }}
  />
)}
```

## API Reference

### `hasPDFContent(): Promise<boolean>`

Checks if the clipboard contains PDF content.

**Returns:** Promise that resolves to a boolean indicating whether the clipboard has PDF content.

### `getPDFContent(): Promise<PDFMetadata | null>`

Gets the PDF content from the clipboard as a base64 string along with metadata.

**Returns:** Promise that resolves to a PDFMetadata object, or null if no PDF content is available.

The `PDFMetadata` object contains the following properties:
- `base64` (string): Base64 encoded string of the PDF content
- `pageCount` (number, optional): Number of pages in the PDF
- `title` (string, optional): Title of the PDF document
- `author` (string, optional): Author of the PDF document
- `creator` (string, optional): Creator of the PDF document
- `fileSize` (number, optional): Size of the PDF file in bytes

### `clearClipboard(): Promise<void>`

Clears the clipboard content.

**Returns:** Promise that resolves when the clipboard is cleared.

## Platform-specific Notes

### iOS
- Uses `PDFKit` to extract metadata from PDFs
- Requires iOS 14.0 or higher

### Android
- Uses content resolvers to extract PDF data from URIs
- Support may vary across different Android devices

## License

MIT