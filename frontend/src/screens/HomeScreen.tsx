import { NavLink } from 'react-router';

export function HomeScreen() {
  return (
    <nav>
      <NavLink to="/signin">Sign In</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
    </nav>
  );
}
