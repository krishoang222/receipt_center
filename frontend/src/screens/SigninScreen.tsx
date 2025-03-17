import { SetAccessTokenFunction } from '../App';
import { SigninForm } from '../components/SigninForm';

type SigninScreenProps = {
  setAccessToken: SetAccessTokenFunction;
};

export function SigninScreen({ setAccessToken }: SigninScreenProps) {
  return <SigninForm setAccessToken={setAccessToken} />;
}
