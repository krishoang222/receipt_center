import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { HomeScreen } from './screens/HomeScreen.tsx';
import { SigninScreen } from './screens/SigninScreen.tsx';
import { SignupScreen } from './screens/SignupScreen.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomeScreen />} />
          <Route path="/signin" element={<SigninScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
