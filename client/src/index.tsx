import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './components/App';
import ThemeProvider from './components/context/ThemeContext';
import ToastProvider from './components/context/ToastContext';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <ToastProvider>
      <ThemeProvider initialTheme="light">
        <App />
      </ThemeProvider>
    </ToastProvider>
  </StrictMode>
);
