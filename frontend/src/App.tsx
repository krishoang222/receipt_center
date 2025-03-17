import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import './App.css';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import { HomeScreen } from './screens/HomeScreen';
import { SigninScreen } from './screens/SigninScreen';
import { SignupScreen } from './screens/SignupScreen';
import { PrivateRoute } from './components/PrivateRoute';
import { useState } from 'react';

export type SetAccessTokenFunction = (accessToken_: string) => void;
export type RemoveAccessTokenFunction = () => void;

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export function App() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken'),
  );

  const setAccessToken_: SetAccessTokenFunction = (accessToken_: string) => {
    localStorage.setItem('accessToken', accessToken_);
    setAccessToken(accessToken_);
  };

  const removeAccessToken: RemoveAccessTokenFunction = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>App()'s Header</h1>
                <div>
                  <h2>Outlet Sections</h2>
                  <Outlet />
                  {/* // Source: how to use error boundary https://kentcdodds.com/blog/use-react-error-boundary-to-handle-errors-in-react */}
                </div>
              </>
            }
          >
            <Route
              index
              element={<HomeScreen removeAccessToken={removeAccessToken} />}
            />
            <Route
              path="/signin"
              element={
                accessToken ? (
                  <Navigate to="/user" replace />
                ) : (
                  <SigninScreen setAccessToken={setAccessToken_} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                accessToken ? <Navigate to="/user" replace /> : <SignupScreen />
              }
            />
            <Route element={<PrivateRoute accessToken={accessToken} />}>
              <Route
                path="/user"
                element={
                  <section>✅: This is private page for logged in user</section>
                }
              />
            </Route>
          </Route>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
