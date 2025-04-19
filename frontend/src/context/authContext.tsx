import { parseJWTPayload } from '@/utils/parseJWTPayload';
import { createContext, useContext, useRef, useState } from 'react';

// Source: https://kentcdodds.com/blog/how-to-use-react-context-effectively
type AuthProviderProps = {
  children: React.ReactNode;
};
type AccessToken = string | null;
type SetAccessTokenFunction = (accessToken: string) => void;
type RemoveAccessTokenFunction = () => void;
type UserData = {
  email: string;
  firstName: string;
} | null;
type AuthContextValue = {
  user: UserData;
  accessToken: AccessToken;
  action: {
    setAccessToken_: SetAccessTokenFunction;
    removeAccessToken: RemoveAccessTokenFunction;
  };
};

// usually the default context value is useless, as when I decide to use context, I want the app to interact with useful state that re-render oftenly + I can pass default value in useState() when declare Provider
// this pattern from Kent C: to pass undefined as default + type guard it with custom hook - so we can handle error when destructure data when use context
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// wrap provider with value
export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<AccessToken>(() =>
    localStorage.getItem('accessToken'),
  );

  //WARN: not sure this right way to manager data when this "user" data relate to "accessToken" change
  let user = useRef<UserData>(
    JSON.parse(localStorage.getItem('userData') || 'null'),
  );

  const setAccessToken_: SetAccessTokenFunction = (accessToken_) => {
    localStorage.setItem('accessToken', accessToken_);
    const parsedUserData = parseJWTPayload(accessToken_);
    localStorage.setItem('userData', JSON.stringify(parsedUserData));
    user.current = parsedUserData;
    setAccessToken(accessToken_);
  };

  const removeAccessToken: RemoveAccessTokenFunction = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    user.current = null;
    setAccessToken(null);
  };

  const data = {
    user: user.current,
    accessToken,
    action: { setAccessToken_, removeAccessToken },
  };

  return (
    <>
      <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
    </>
  );
}

// handle error to avoid destructuring undefined
export function useAuth() {
  const data = useContext(AuthContext);
  if (data === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  } else return data;
}
