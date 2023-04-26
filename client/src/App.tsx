import { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import PdfToJpgConverter from './PdfToJpgConverter';

function App() {
  const callApi = async () => {
    axios.get("/api").then((res) => {
      console.log(res.data.test)
    });
  }

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div>
      <p>PDF to JPG Converter</p>
      <PdfToJpgConverter></PdfToJpgConverter>
    </div>
  )
}

export default App;