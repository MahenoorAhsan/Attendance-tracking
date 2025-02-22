
import { Link, useLocation,Outlet } from 'react-router-dom';
import { RoutePaths } from '../../providers/Router';
import logo from '../../assets/logo.png'


export const Layout = () => {
  const location = useLocation();

  const navLinks = [
    { path: RoutePaths.DASHBOARD, label: 'Dashboard' },
    { path: RoutePaths.ATTENDANCE, label: 'Attendance' },
    { path: RoutePaths.STUDENTS, label: 'Students' },
    { path: RoutePaths.STAFFS , label: 'Staffs'}
  ];

  return (
    <div>
    <header className="bg-white text-black p-5">
    <div className='flex justify-between'>
        <div className='flex justify-center align-middle'>
            <img src={logo} className='h-8 m-1'></img>
            <span className='text-2xl text-center m-1'>RollCallPro</span>
        </div>
      <nav className="flex space-x-4">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-3 py-2 rounded-md ${
              location.pathname === link.path
                ? 'bg-blue-200'
                : 'hover:bg-blue-100'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      </div>
    
    </header>
      <main className="flex-1 p-6">
      <Outlet /> 
    </main>
    </div>
  );
};