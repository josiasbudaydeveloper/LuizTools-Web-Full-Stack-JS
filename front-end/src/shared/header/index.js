import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';
import { Header } from './styles';
import { logout } from '../../services/auth';

import Icon from '../../assets/icone.png';


export default function MainMenu() {
  const navigate = useNavigate();
  
  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header>
      <Header>
        <Navbar expand="lg">
          <Container fluid>
            <Navbar.Brand>
              <img src={Icon} alt="MailShrimp" width='50'/> MailShrimp
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <NavLink className='nav-link' to='/'>Home</NavLink>
                <NavLink className='nav-link' to='/contacts'>Contacts</NavLink>
                <NavLink className='nav-link' to='/messages'>Messages</NavLink>
              </Nav>
              <Nav style={{marginRight: '15px'}}>
                <Button variant="outline-secondary" onClick={ handleLogout }>Logout</Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Header>
    </header>
  );
}
