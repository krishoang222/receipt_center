import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import './App.css';
import { Outlet } from 'react-router';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <>
      <h1>App()'s Header</h1>
      <div>
        <h2>Outlet Sections</h2>
        {/* // Source: how to use error boundary https://kentcdodds.com/blog/use-react-error-boundary-to-handle-errors-in-react */}
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Outlet />
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
