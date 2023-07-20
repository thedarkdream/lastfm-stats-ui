import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import ListenTimelinePage from './pages/ListenTimelinePage';
import MainPage from './pages/MainPage';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/timeline" element={<ListenTimelinePage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
