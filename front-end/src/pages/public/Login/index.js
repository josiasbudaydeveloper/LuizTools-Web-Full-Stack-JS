import React, { useState } from 'react';
import { 
  Button, 
  Form, 
  Container, 
  Row, 
  Col,
  Alert
} from 'react-bootstrap';
import Logo from '../../../assets/logo.png';
import { BoxContent, BoxForm } from '../../../shared/styles/index';
import { Link, useNavigate } from 'react-router-dom';
import { accountLoginSchema } from '../../../schemas/accounts-schemas';
import AccountService from '../../../services/accounts';
import { login } from '../../../services/auth';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    
    const { error } = accountLoginSchema.validate({email, password});

    if (error) {
      const { details } = error;
      const message = details.map(item => item.message).join(',');
      setError(message);
    }
    else {
      setError('');
      const accountObject = new AccountService();

      try {
        const response = await accountObject.login(email, password);

        login(response.data.token);
        navigate("/");
      } catch (error) {
        setError('There was an error during login. Please, check your credentials again or contact the support team.');
        console.log(error);
      }

    }
  }

  const renderError = () => {
    return (
      <Alert variant='danger'>
        {error}
      </Alert>
    )
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xm={12} md={6}>
          <BoxContent>
            <img src={ Logo } alt="MailShrimp" />
          </BoxContent>
          <h2>Login</h2>
          <p>Inform your data to authenticate</p>
          <BoxForm>
            <Form onSubmit={ handleLogin }>

              { error && renderError() }

              <Form.Group controlId="email-group">
                <Form.Label>
                  Email: 
                </Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Type your email"
                  onChange={event => {setEmail(event.target.value)}}
                />
              </Form.Group>
              <Form.Group controlId="password-group">
                <Form.Label>
                  Password: 
                </Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Type your password"
                  onChange={event => {setPassword(event.target.value)}}
                />
              </Form.Group>
              
              <div className="d-grid py-3">
                <Button variant="secondary" type="submit" size="lg">
                  Login
                </Button>
              </div>
            </Form>
          </BoxForm>
          
          <BoxContent>
            <p>New to MailShrimp?</p>   
            <Link to="/signup" className='btn btn-primary'>Creat new account</Link>
          </BoxContent>
        </Col>
      </Row>
    </Container>
  )
}