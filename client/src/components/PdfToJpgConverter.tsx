import React, { useState, useEffect } from "react";
import { pdfjs} from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfToJpgConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfData, setPdfData] = useState<string>('');

  async function convertToJpg() {
    
    const pdfDataTest = pdfData.split(',')[1]
    const decodedPdf = atob(pdfDataTest);
    
    const pdf = await pdfjs.getDocument({ data: decodedPdf }).promise;
    
    const pageNumber = 1;
    const page = await pdf.getPage(pageNumber);

    // Set the canvas dimensions to match the PDF page
    const canvas = document.createElement('canvas');
    canvas.width = page.view[2];
    canvas.height = page.view[3];

    // Render the PDF page to the canvas as a JPEG image
    const context = canvas.getContext('2d');
    if (!context || !(context instanceof CanvasRenderingContext2D)) {
      throw new Error('Failed to get 2D context');
    }
    
    const renderContext = {
      canvasContext: context,
      viewport: page.getViewport({ scale: 1 }),
      background: '#fff',
    };
    
    await page.render(renderContext).promise;
    
    const jpegData = canvas.toDataURL('image/jpeg');

    const byteCharacters = atob(jpegData.split(',')[1]);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: 'image/jpeg' });

    // Create a URL for the Blob object and display it in an <img> tag
    const imageUrl = URL.createObjectURL(blob);

    // img 태그 생성
    const imgElement = document.createElement('img');
    // img 태그 src 속성
    imgElement.src = imageUrl;
    document.body.appendChild(imgElement);

    // a태그 생성
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
  }

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
      <button onClick={() => convertToJpg()}>변환 후 다운로드</button>
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

export default PdfToJpgConverter;