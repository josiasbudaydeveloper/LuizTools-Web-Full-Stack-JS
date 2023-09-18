import { useState, useEffect, useRef } from 'react';
import Header from '../../../shared/header/index';
import { PageContent } from '../../../shared/styles';
import {
  Container,
  Row,
  Col,
  Alert,
  Form,
  Button,
  Table
} from 'react-bootstrap';
import contactsService from '../../../services/contacts';
import { useNavigate, useParams, Link } from 'react-router-dom';
import maskingPhoneInput from '../../../shared/functions/masking-phone-input';
import { contactUpdateSchema } from '../../../schemas/contacts-schemas';

export default function ContactDetails() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const fixedName = useRef();
  const fixedEmail = useRef();
  const fixedPhone = useRef();

  const { contactId } = useParams();

  const phoneInput = useRef();

  const navigate = useNavigate();
  const service = new contactsService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await service.getOne(contactId);
        
        setName(result.name);
        setPhone(result.phone);

        fixedName.current = result.name;
        fixedEmail.current = result.email;
        fixedPhone.current = result.phone;
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [contactId]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    const { error } = contactUpdateSchema.validate({name, phone});

    if (error) {
      const { details } = error;
      const message = details.map(item => item.message).join(',');
      setError(message);
    } else {
      setError('');

      try {
        await service.update(contactId, {name, phone});

        navigate("/contacts");
      } catch (error) {
        setError('There was an error during updating the contact. Please try again or contact the support team.');
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
      <Header/>
      <Container>
        <PageContent>
          <Row>
            <Col>
              <h2>View Contact</h2>
              <p>View or edit this contact</p>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{fixedName.current}</td>
                    <td>{fixedEmail.current}</td>
                    <td>{fixedPhone.current}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col lg={8} sm={12}>
              <Form onSubmit={handleUpdate}>
                <Form.Group>
                  { error && renderError() }

                  <Form.Label className="me-2">
                    Name:
                    <Form.Control 
                      type="text" 
                      placeholder="Type the contact name"
                      name="name"
                      value={name}
                      onChange={event => {setName(event.target.value)}}
                      style={{width: "350px"}}
                      required
                    />
                  </Form.Label>

                  <Form.Label>
                    Phone:
                    <Form.Control 
                      type="text" 
                      placeholder="+000 (000) 00000-0000"
                      name="phone"
                      value={phone}
                      onChange={() => maskingPhoneInput(phoneInput, setPhone)}
                      ref={phoneInput}
                      style={{width: "350px"}}
                    />
                  </Form.Label>
                </Form.Group>

                <Button variant="success" className="mt-1 float-end" type="submit">Update Contact</Button>
                <Link className="btn btn-primary mt-1 mx-2 float-end" to="/contacts">Go back to Contacts</Link>                
              </Form>
            </Col>
          </Row>
        </PageContent>
      </Container>
    </>
  );
}