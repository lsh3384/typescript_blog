import React, { useState } from "react";
import { Document, Page, pdfjs} from "react-pdf";
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import { createCanvas } from "canvas";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfToJpgConverter = () => {
  const [numPages, setNumPages] = useState(0);
  const [pdf, setPdf] = useState<any>(null); // pdf 모듈 추가

  const onDocumentLoadSuccess = ({numPages} : PDFDocumentProxy) => {
    console.log("onDocumentLoadSuccess!");
    setNumPages(numPages);
    setPdf(pdf); // pdf 모듈 설정
  };

  // const convertToJpg = async () => {
  //   const canvas = createCanvas(1000, 1000); // create a canvas with a width and height
  //   const ctx = canvas.getContext("2d"); // get canvas context

  //   for (let i = 1; i <= numPages; i++) {
  //     const pageCanvas = await getPageCanvas(i);
  //     ctx.drawImage(pageCanvas, 0, 0, canvas.width, canvas.height); // draw the page canvas on the main canvas
  //     const imageDataUrl = canvas.toDataURL("image/jpeg"); // convert canvas to image data URL
  //     // Do something with the image data URL, like upload it to server or display it on screen
  //   }
  // };

  // const getPageCanvas = async (pageNumber: number) => {
  //   const page = await pdf.getPage(pageNumber); // pdf 모듈 사용
  //   const viewport = page.getViewport({ scale: 1 });
  //   const canvas = createCanvas(viewport.width, viewport.height);
  //   const ctx = canvas.getContext("2d");
  //   const renderContext = {
  //     canvasContext: ctx,
  //     viewport: viewport,
  //   };
  //   await page.render(renderContext).promise;
  //   return canvas;
  // };

  return (
    <div>
      <Document
        file="http://localhost:5000/sample.pdf"
        onLoadSuccess={onDocumentLoadSuccess} // pdf 모듈 전달
      >
        <Page pageNumber={1} />
        {/* {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))} */}
      </Document>
      {/* <button onClick={convertToJpg}>Convert to JPG</button> */}
    </div>
  );
};

export default PdfToJpgConverter;
