import { NavLink } from 'react-router';
import { RemoveAccessTokenFunction } from '../App';

type HomeScreenProps = {
  removeAccessToken: RemoveAccessTokenFunction;
};

export function HomeScreen({ removeAccessToken }: HomeScreenProps) {
  console.log('render: HomeScreen()');
  return (
    <>
      <nav>
        <NavLink to="/signin">Sign In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </nav>
      <button onClick={removeAccessToken}>Sign Out</button>
    </>
  );
}
