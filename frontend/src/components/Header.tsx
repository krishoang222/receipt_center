import { NavLink, Outlet } from 'react-router';
import { useAuth } from '../context/authContext';
import { Button } from '@/components/ui/button';

export function Header() {
  const { accessToken, action } = useAuth();

  console.log('render: Header()');

  return (
    <>
      <nav className="flex justify-end gap-4 items-center px-[5vw] py-8">
        <NavLink to="/">Home</NavLink>
        {accessToken ? (
          <>
            <NavLink to="/bills">Bills</NavLink>
            <Button onClick={action.removeAccessToken}>Sign Out</Button>
          </>
        ) : (
          <>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </nav>
      <div className="mx-[10vw] text-center">
        <h1 className="text-6xl font-bold mb-7">What is this bill?</h1>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
