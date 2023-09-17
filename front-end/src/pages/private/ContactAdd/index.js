import { useState, useRef } from 'react';
import Header from '../../../shared/header/index';
import { BoxContent, PageContent } from '../../../shared/styles';
import { 
  Container,
  Button,
  Form,
  Alert,
  Row,
  Col 
} from 'react-bootstrap';
import ContactsService from '../../../services/contacts';
import { useNavigate, Link } from 'react-router-dom';
import { contactCreationSchema } from '../../../schemas/contacts-schemas';
import maskingPhoneInput from '../../../shared/functions/masking-phone-input';

export default function contactAdd() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const phoneInput = useRef('');

  const navigate = useNavigate();

  const handleAddContact = async (event) => {
    event.preventDefault();

    const { error } = contactCreationSchema.validate({name, phone, email });

    if (error) {
      const { details } = error;
      const message = details.map(item => item.message).join(',');
      setError(message);
    }
    else {
      setError('');
      const contactObject = new ContactsService();

      try {
        await contactObject.add({name, phone, email });

        navigate("/contacts");
      } catch (error) {
        setError('There was an error during adding the contact. Please try again or contact the support team.');
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
    <>
      <Header />
      <PageContent>
        <Container>
          <Row>
            <Col>
              <h2>Add Contact</h2>
              <p>Fill in all fields</p>
            </Col>
          </Row>
          <Row>
            <Col lg={8} sm={12}>
              <Form onSubmit={handleAddContact}>
                <Form.Group>
                  { error && renderError() }

                  <Form.Label className="me-2">
                    Name:
                    <Form.Control 
                      type="text" 
                      placeholder="Type the contact name" 
                      tip="ok"
                      onChange={event => {setName(event.target.value)}}
                      style={{width: "350px"}}
                      required
                    />
                  </Form.Label>

                  <Form.Label>
                    Email:
                    <Form.Control 
                      type="mail" 
                      placeholder="Type the contact email"    
                      onChange={event => {setEmail(event.target.value)}}
                      style={{width: "350px"}}
                      required
                    />
                  </Form.Label>

                  <Form.Label>
                    Phone:
                    <Form.Control 
                      type="numberic" 
                      placeholder="+000 (000) 00000-0000"
                      onChange={() => maskingPhoneInput(phoneInput, setPhone)}
                      ref={phoneInput}
                      style={{width: "350px"}}
                    />
                  </Form.Label>
                </Form.Group>

                <Button variant="success" className="mt-1 float-end" type="submit">Add Contact</Button>
                <Link className="btn btn-primary mt-1 mx-2 float-end" to="/contacts">Go back to Contacts</Link>                
              </Form>
            </Col>
          </Row>
        </Container>
      </PageContent>
    </>
  )
}