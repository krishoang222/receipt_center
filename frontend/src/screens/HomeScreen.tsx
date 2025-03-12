import { NavLink } from 'react-router';

export default function HomeScreen() {
  return (
    <nav>
      <NavLink to="/login">Log In</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
    </nav>
  );
}
