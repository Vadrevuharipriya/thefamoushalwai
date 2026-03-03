import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import HomePage from './pages/HomePage/HomePage';
import OccasionPage from './pages/OccasionPage/OccasionPage';
import MenuPage from './pages/MenuPage/MenuPage';
import AboutPage from './pages/AboutPage/AboutPage';
import './App.scss';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-layout">
        <Navbar />
        <div className="app-layout__content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/our-menu" element={<MenuPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services/:occasion" element={<OccasionPage />} />
          </Routes>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
