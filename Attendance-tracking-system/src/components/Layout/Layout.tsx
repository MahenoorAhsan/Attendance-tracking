
import { Link, useLocation,Outlet, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../providers/Router';
import logo from '../../assets/logo.png'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Toaster } from "@/components/ui/sonner";



export const Layout = () => {
  const location = useLocation();

  const navLinks = [
    { path: RoutePaths.DASHBOARD, label: 'Dashboard' },
    { path: RoutePaths.ATTENDANCE, label: 'Attendance' },
    { path: RoutePaths.STUDENTS, label: 'Students' },
    { path: RoutePaths.STAFFS , label: 'Staffs'}
  ];


  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post('api/auth/logout', { withCredentials: true });
      localStorage.clear();
      sessionStorage.clear();
      Cookies.remove('access_token');
      navigate(RoutePaths.LOGIN);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


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
        <button className='px-3 py-2 rounded-md hover:bg-blue-100' onClick={logout} >Logout </button>
      </nav>
      </div>
    
    </header>
      <main className="flex-1 p-6">
      <Outlet /> 
    </main>
    </div>
  );
};