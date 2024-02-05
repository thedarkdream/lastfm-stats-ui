import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import ListenTimelinePage from './pages/ListenTimelinePage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import TagTimelinePage from './pages/TagTimelinePage';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/timeline" element={<ListenTimelinePage />} />
          <Route path="/tagtimeline" element={<TagTimelinePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
