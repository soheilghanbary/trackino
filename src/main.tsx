import '@/assets/app.css';
import { QueryProvider } from '@/components/providers/query-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ToastProvider } from '@/components/providers/toast-provider';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouteProvider } from './routes/_root';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider defaultTheme="light">
        <RouteProvider />
        <ToastProvider />
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
);
