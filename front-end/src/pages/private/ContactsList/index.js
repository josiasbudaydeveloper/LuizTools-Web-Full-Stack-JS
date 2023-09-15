import { useEffect, useState } from "react";
import Header from "../../../shared/header/index";
import { PageContent } from "../../../shared/styles";
import { 
  Container,
  Table,
  Row,
  Col,
  Spinner
} from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom';
import contactsService from "../../../services/contacts";

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Location = useLocation();

  async function ComponentDidMount() {
    const service = new contactsService();
    try {
      setIsLoading(true);
      const result = await service.getAll();

      setContacts(result);
      setIsLoading(false);
    }
    catch(error) {
      console.log(error);
    }
  }

  function RenderLine(item) {
    const contact = item.contact;
    return (
      <tr key={contact.id}>
        <td>{contact.name}</td>
        <td>
          <Link to={`${Location.pathname}/${contact.id}`}>{contact.email}</Link>
        </td>
      </tr>
    )
  }

  function RenderTable({ contacts }) {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((item) => <RenderLine contact={item} /> )}
        </tbody>
      </Table>
    )
  }

  useEffect(() => {
    const timeOut = setTimeout( async () => {
      await ComponentDidMount();
    });

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <>
      <Header />
      <PageContent>
        <Container>
          <Row>
            <Col>
              <h2>Contacts</h2>
              <p>List of registered contacts</p>
            </Col>
            <Col>
              <Link className="btn btn-success float-end" to="/contacts/add">Add contact</Link>
              <button className="btn btn-primary float-end me-2" onClick={ComponentDidMount}>Update</button>
            </Col>
          </Row>
          
          {!isLoading ? <RenderTable contacts={contacts} /> : 
            <div className="d-flex justify-content-center align-items-center" style={{height:"200px"}}>
              <Spinner variant="primary" />
            </div>
          }
        </Container>
      </PageContent>
    </>
  )
}