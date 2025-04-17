import { NavLink, Outlet } from 'react-router';
import { useAuth } from '../context/authContext';

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
            <button onClick={action.removeAccessToken}>Sign Out</button>
          </>
        ) : (
          <>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </nav>
      <div className="mx-[10vw]">
        <h1 className="text-6xl text-center font-bold mb-7">Receipt Center</h1>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
