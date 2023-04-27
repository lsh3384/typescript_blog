import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs} from "react-pdf";
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function PdfToJpgConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfData, setPdfData] = useState<string>('');
  const [numPages, setNumPages] = useState(0);

  function convertToJpg() {
    console.log("convertToJpg");
    const img = new Image();
    
    console.log(img);

    const canvas = document.createElement("canvas");

    // Set the canvas width and height to match the image
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image onto the canvas
    const ctx = canvas.getContext("2d");
    if(ctx) {
      ctx.drawImage(img, 0, 0);
    }

    // Get the canvas data as a data URI
    const dataUri = canvas.toDataURL();

    // Do something with the data URI
    console.log(dataUri);
    
    img.onload = () => {
      // Create a new canvas element
      console.log("img.onload success!");
    };
    img.src = pdfData;
  }

  const onDocumentLoadSuccess = ({numPages} : PDFDocumentProxy) => {
    console.log("onDocumentLoadSuccess, numPages");
    console.log(numPages);
    setNumPages(numPages);
  };

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
        console.log(dataUrl);
        setPdfData(dataUrl);
      }
    }
    loadPdfData();
  }, [file]);

  
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {pdfData && (
        <Document file={pdfData} onLoadError={console.error} onLoadSuccess={onDocumentLoadSuccess}>
          
          {/* <Page pageNumber={1} renderTextLayer={false}/> */}
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} />
          ))}
        </Document>
      )}
      <img src={pdfData}></img>
      <button onClick={() => convertToJpg()}>변환</button>
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

        console.log('base64Data:', base64Data);
      } else {
        reject(new Error('Failed to convert Blob to base64'));
      }
    };
    reader.onerror = () => {
      reject(reader.error);
    };
  });
}

export default PdfToJpgConverter;
