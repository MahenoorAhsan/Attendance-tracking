
import { Link, useLocation } from 'react-router-dom';
import { RoutePaths } from '../../providers/Router';

export const Layout = () => {
  const location = useLocation();

  const navLinks = [
    { path: RoutePaths.DASHBOARD, label: 'Dashboard' },
    { path: RoutePaths.ATTENDANCE, label: 'Attendance' },
    // { path: RoutePaths.REPORTS, label: 'Reports' },
  ];

  return (
    <header className="bg-blue-200 text-black p-4">
    <div className='flex justify-between'>
        <div>
            <img></img>
            <span className='text-2xl text-center'>RollCallPro</span>
        </div>
      <nav className="flex space-x-4">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-3 py-2 rounded-md ${
              location.pathname === link.path
                ? 'bg-white'
                : 'hover:bg-blue-200'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      </div>
    </header>
  );
};