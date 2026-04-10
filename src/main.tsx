import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import LoginPage from './pages/LoginPage.tsx';
import EventsPage from './pages/EventsPage.tsx';
import EventDetailsPage from './pages/EventDetailsPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/details" element={<EventDetailsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
