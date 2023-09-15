import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../../assets/logo.png';
import { BoxContent, BoxForm } from '../../../shared/styles/index';
import { accountCreationSchema } from '../../../schemas/accounts-schemas'; 
import AccountService from '../../../services/accounts';

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();

    const { error } = accountCreationSchema.validate({name, email, password, domain });

    if (error) {
      const { details } = error;
      const message = details.map(item => item.message).join(',');
      setError(message);
    }
    else {
      setError('');
      const accountObject = new AccountService();

      try {
        await accountObject.singup({
          name, email, password, domain
        });

        navigate("/login");
      } catch (error) {
        setError('There was an error during signup. Please try again or contact the support team.');
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
            <h2>Sign Up</h2>
            <p>Fill in the fields to create your account</p>
            <BoxForm>
              <Form onSubmit={ handleSignUp }>
                
                { error && renderError() }

                <Form.Group controlId="name-group">
                  <Form.Label>
                    Name:
                  </Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Type your name" 
                    onChange={event => {setName(event.target.value)}}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="email-group">
                  <Form.Label>
                    Email:
                  </Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Type your email" 
                    onChange={event => {setEmail(event.target.value)}}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password-group">
                  <Form.Label>
                    Password:
                  </Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Type your Password" 
                    onChange={event => {setPassword(event.target.value)}}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="domain-group">
                  <Form.Label>
                    Domain:
                  </Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Type your Domain" 
                    onChange={event => {setDomain(event.target.value)}}
                  />
                </Form.Group>

                <div className="d-grid py-3">
                  <Button variant="secondary" type="submit" size="lg">
                    Sign Up
                  </Button>
                </div>
              </Form>
            </BoxForm>
            <BoxContent>
              <p>Already have an account?</p>   
              <Link to="/login" className='btn btn-primary'>Go back to Login</Link>
            </BoxContent>
          </Col>
        </Row>
      </Container>
  )
}