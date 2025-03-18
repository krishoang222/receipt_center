import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { AuthProvider } from './context/authContext.tsx';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

// bring <AuthProvider/> this top layer instead of <App/> as I need accessToken in Routing step to kick user out ASAP token unavailable
// Source: how to use error boundary https://kentcdodds.com/blog/use-react-error-boundary-to-handle-errors-in-react
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
);
