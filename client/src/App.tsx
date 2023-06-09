import { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './components/Main';
import NotFound from './components/NotFound';
import PdfToJpgConverter from './components/PdfToJpgConverter';
import Counter from './components/Counter';

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
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/converter/*" element={<PdfToJpgConverter />}></Route>
              <Route path="/counter/*" element={<Counter/>}></Route>
              {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
              <Route path="*" element={<NotFound />}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;