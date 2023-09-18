import { 
  BrowserRouter, 
  Routes, 
  Route
} from 'react-router-dom';
import PrivateRoute from './route-wrapper';

import Login from '../pages/public/Login/index';
import SignUp from '../pages/public/SignUp/index';
import Dashboard from '../pages/private/Dashboard';
import ContactsList from '../pages/private/ContactsList';
import ContactAdd from '../pages/private/ContactAdd';
import ContactDetails from '../pages/private/ContactDetails';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <Login /> }/>
        <Route path="/signup" element={ <SignUp /> }/>
        <Route path="/" element={<PrivateRoute Component={Dashboard} />} />
        <Route path="/contacts" element={<PrivateRoute Component={ContactsList} />} />
        <Route path="/contacts/add" element={<PrivateRoute Component={ContactAdd} />} />
        <Route path="/contacts/details/:contactId" element={<PrivateRoute Component={ContactDetails} />} />
      </Routes>
    </BrowserRouter>
  )
}