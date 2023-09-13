import { 
  BrowserRouter, 
  Routes, 
  Route
} from 'react-router-dom';
import Login from '../pages/public/Login/index';
import SignUp from '../pages/public/SignUp/index';
import Dashboard from '../pages/private/Dashboard';
import ContactsList from '../pages/private/ContactsList';

import PrivateRoute from './route-wrapper';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <Login /> }/>
        <Route path="/signup" element={ <SignUp /> }/>
        <Route path="/" element={<PrivateRoute Component={Dashboard} />} />
        <Route path="/contacts" element={<PrivateRoute Component={ContactsList} />} />
      </Routes>
    </BrowserRouter>
  )
}