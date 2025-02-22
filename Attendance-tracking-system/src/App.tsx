import { useRef } from 'react'; // Add this if missing
import { useForm } from 'react-hook-form'; // Assuming you're using react-hook-form
//import Login from './components/Login/Login'
import { AppRouter } from './providers/Router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
       <AppRouter />
  )
}

export default App
