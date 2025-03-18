import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { SigninScreen } from './screens/SigninScreen';
import { SignupScreen } from './screens/SignupScreen';
import { PrivateRoute } from './components/PrivateRoute';
import { Header } from './components/Header';
import { useAuth } from './context/authContext';

export type SetAccessTokenFunction = (accessToken_: string) => void;
export type RemoveAccessTokenFunction = () => void;

export function App() {
  const { accessToken } = useAuth();

  console.log('render: App()');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<p>This is home screen at '/'</p>} />
          <Route
            path="/signin"
            element={
              accessToken ? <Navigate to="/user" replace /> : <SigninScreen />
            }
          />
          <Route
            path="/signup"
            element={
              accessToken ? <Navigate to="/user" replace /> : <SignupScreen />
            }
          />
          <Route element={<PrivateRoute />}>
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
  );
}
