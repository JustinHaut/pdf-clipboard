package expo.modules.pdfclipboard

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.net.Uri
import android.util.Base64
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.io.ByteArrayOutputStream
import java.io.IOException

class PdfClipboardModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("PdfClipboard")

    AsyncFunction("hasPDFContent") {
      val clipboardManager = appContext.reactContext?.getSystemService(Context.CLIPBOARD_SERVICE) as? ClipboardManager
      if (clipboardManager == null || !clipboardManager.hasPrimaryClip()) {
        return@AsyncFunction false
      }

      val clip = clipboardManager.primaryClip
      if (clip == null || clip.itemCount == 0) {
        return@AsyncFunction false
      }

      // Check for PDF Uri
      for (i in 0 until clip.itemCount) {
        val item = clip.getItemAt(i)
        val uri = item.uri
        if (uri != null && isPdfUri(uri)) {
          return@AsyncFunction true
        }
      }

      return@AsyncFunction false
    }

    AsyncFunction("getPDFContent") {
      val clipboardManager = appContext.reactContext?.getSystemService(Context.CLIPBOARD_SERVICE) as? ClipboardManager
      if (clipboardManager == null || !clipboardManager.hasPrimaryClip()) {
        return@AsyncFunction null
      }

      val clip = clipboardManager.primaryClip
      if (clip == null || clip.itemCount == 0) {
        return@AsyncFunction null
      }

      // Try to extract PDF content
      for (i in 0 until clip.itemCount) {
        val item = clip.getItemAt(i)
        val uri = item.uri
        if (uri != null && isPdfUri(uri)) {
          try {
            val inputStream = appContext.reactContext?.contentResolver?.openInputStream(uri)
            if (inputStream != null) {
              val outputStream = ByteArrayOutputStream()
              val buffer = ByteArray(4096)
              var bytesRead: Int
              while (inputStream.read(buffer).also { bytesRead = it } != -1) {
                outputStream.write(buffer, 0, bytesRead)
              }
              inputStream.close()
              val pdfData = outputStream.toByteArray()
              return@AsyncFunction Base64.encodeToString(pdfData, Base64.DEFAULT)
            }
          } catch (e: IOException) {
            e.printStackTrace()
          }
        }
      }

      return@AsyncFunction null
    }

    AsyncFunction("clearClipboard") {
      val clipboardManager = appContext.reactContext?.getSystemService(Context.CLIPBOARD_SERVICE) as? ClipboardManager
      clipboardManager?.setPrimaryClip(ClipData.newPlainText("", ""))
    }
  }

  private fun isPdfUri(uri: Uri): Boolean {
    val mimeType = appContext.reactContext?.contentResolver?.getType(uri)
    return mimeType == "application/pdf"
  }
}