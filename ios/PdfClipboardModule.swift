import ExpoModulesCore
import MobileCoreServices
import PDFKit

public class PdfClipboardModule: Module {
  public func definition() -> ModuleDefinition {
    // The module will be accessible from `requireNativeModule('PdfClipboard')` in JavaScript
    Name("PdfClipboard")
    
    // Check if clipboard has PDF content
    AsyncFunction("hasPDFContent") { () -> Bool in
      let pasteboard = UIPasteboard.general
      
      // Debug logging
      print("Available pasteboard types:", pasteboard.types)
      return pasteboard.data(forPasteboardType: kUTTypePDF as String) != nil
    }
    
    // Get PDF content as base64 string
    AsyncFunction("getPDFContent") { () -> [String: Any]? in
      let pasteboard = UIPasteboard.general
      print("Attempting to get PDF content...")
      
      guard let pdfData = pasteboard.data(forPasteboardType: kUTTypePDF as String) else {
        print("Failed to get PDF data")
        return nil
      }
      
      print("Successfully got PDF data with size:", pdfData.count)
      
      var result: [String: Any] = [
        "base64": pdfData.base64EncodedString()
      ]
      
      // Try to get PDF metadata
      if let pdf = PDFDocument(data: pdfData) {
        result["pageCount"] = pdf.pageCount
        
        if let documentAttributes = pdf.documentAttributes {
          result["title"] = documentAttributes[PDFDocumentAttribute.titleAttribute] as? String
          result["author"] = documentAttributes[PDFDocumentAttribute.authorAttribute] as? String
          result["creator"] = documentAttributes[PDFDocumentAttribute.creatorAttribute] as? String
          result["fileSize"] = pdfData.count
        }
      }
      
      return result
    }
    
    // Clear clipboard contents
    AsyncFunction("clearClipboard") { () -> Void in
      UIPasteboard.general.items = []
    }
  }
}