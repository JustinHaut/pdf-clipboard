import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// Import directly from parent directory
import * as PdfClipboard from '../src';
import type { PDFMetadata } from '../src';
import { useState } from 'react';
import Pdf from 'react-native-pdf';

export default function App() {
  const [checking, setChecking] = useState(false);
  const [retrieving, setRetrieving] = useState(false);
  const [pdfDetected, setPdfDetected] = useState(false);
  const [pdfContent, setPdfContent] = useState<PDFMetadata | null>(null);
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  const checkForPdfContent = async () => {
    setChecking(true);
    try {
      const hasPdf = await PdfClipboard.hasPDFContent();
      setPdfDetected(hasPdf);
      if (hasPdf) {
        Alert.alert('PDF Detected', 'PDF content was found in the clipboard!');
      } else {
        Alert.alert('No PDF Found', 'No PDF content was detected in the clipboard.');
      }
    } catch (error) {
      console.error('Error checking clipboard:', error);
      Alert.alert('Error', 'Failed to check clipboard for PDF content.');
    } finally {
      setChecking(false);
    }
  };

  const getPdfContent = async () => {
    setRetrieving(true);
    try {
      const content = await PdfClipboard.getPDFContent();
      setPdfContent(content);
      
      if (content) {
        const base64Data = `data:application/pdf;base64,${content.base64}`;
        setPdfUri(base64Data);
        Alert.alert('Success', 'PDF content retrieved successfully!');
      } else {
        Alert.alert('Error', 'Failed to retrieve PDF content from clipboard.');
      }
    } catch (error) {
      console.error('Error getting PDF content:', error);
      Alert.alert('Error', 'Failed to retrieve PDF content from clipboard.');
    } finally {
      setRetrieving(false);
    }
  };

  const clearClipboardContent = async () => {
    try {
      await PdfClipboard.clearClipboard();
      setPdfDetected(false);
      setPdfContent(null);
      setPdfUri(null);
      Alert.alert('Clipboard Cleared', 'Clipboard content has been cleared.');
    } catch (error) {
      console.error('Error clearing clipboard:', error);
      Alert.alert('Error', 'Failed to clear clipboard content.');
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>PDF Clipboard Example</Text>
        <Text style={styles.description}>
          Copy a PDF to your clipboard, then use the buttons below to interact with it.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={checkForPdfContent}
            disabled={checking}
          >
            {checking ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Check for PDF</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, !pdfDetected && styles.buttonDisabled]} 
            onPress={getPdfContent}
            disabled={!pdfDetected || retrieving}
          >
            {retrieving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Get PDF Content</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, (!pdfDetected && !pdfContent) && styles.buttonDisabled]} 
            onPress={clearClipboardContent}
            disabled={!pdfDetected && !pdfContent}
          >
            <Text style={styles.buttonText}>Clear Clipboard</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>PDF Detected:</Text>
          <Text style={styles.statusValue}>{pdfDetected ? 'Yes' : 'No'}</Text>
        </View>

        {pdfUri && (
          <View style={styles.pdfContainer}>
            <Text style={styles.contentLabel}>PDF Preview:</Text>
            <View style={styles.pdfWrapper}>
              <Pdf
                source={{ uri: pdfUri }}
                style={styles.pdf}
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`PDF Loaded: ${numberOfPages} pages`);
                }}
                onError={(error) => {
                  console.log('PDF Error:', error);
                }}
                enablePaging={true}
                renderActivityIndicator={() => (
                  <ActivityIndicator color="#2196F3" />
                )}
              />
            </View>
          </View>
        )}

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  statusLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  statusValue: {
    color: '#555',
  },
  pdfContainer: {
    width: '100%',
    marginTop: 20,
  },
  pdfWrapper: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentLabel: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});