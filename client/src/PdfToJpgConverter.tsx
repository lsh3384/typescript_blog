import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs} from "react-pdf";
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfData, setPdfData] = useState<string>('');

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  useEffect(() => {
    async function loadPdfData() {
      if (file) {
        const dataUrl = await blobToBase64(file);
        setPdfData(dataUrl);
      }
    }
    loadPdfData();
  }, [file]);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {pdfData && (
        <Document file={pdfData} onLoadError={console.error}>
          <Page pageNumber={1} renderTextLayer={false}/>
        </Document>
      )}
    </div>
  );
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64Data = reader.result?.toString();
      if (base64Data) {
        resolve(base64Data);
      } else {
        reject(new Error('Failed to convert Blob to base64'));
      }
    };
    reader.onerror = () => {
      reject(reader.error);
    };
  });
}

const PdfToJpgConverter = () => {
  const [numPages, setNumPages] = useState(0);
  const [file, setFile] = useState({url: "http://localhost:5000/sample.pdf"})
  const onDocumentLoadSuccess = ({numPages} : PDFDocumentProxy) => {
    console.log("onDocumentLoadSuccess");
    setNumPages(numPages);
  };

  return (
    <div>
      {/* <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess} // pdf 모듈 전달
      >
        <Page pageNumber={1} />
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document> */}
     <FileUpload></FileUpload>
      {/* <button onClick={convertToJpg}>Convert to JPG</button> */}
    </div>
  );
};

export default PdfToJpgConverter;
