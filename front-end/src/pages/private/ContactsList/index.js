import { useEffect, useState } from "react";
import Header from "../../../shared/header/index";
import { PageContent } from "../../../shared/styles";
import { 
  Container,
  Table,
  Row,
  Col,
  Navigate
} from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom';
import contactsService from "../../../services/contacts";

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(0);

  const Location = useLocation();

  async function ComponentDidMount() {
    const service = new contactsService();
    try {
      const result = await service.getAll();

      setContacts(result);
    }
    catch(error) {
      console.log(error);
    }
  }

  function RenderLine(contact) {
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
    const interval = setInterval(async () => {
      await ComponentDidMount();
    }, 1000);

    return () => {
      clearInterval(interval); // Clean up the interval on unmount
    };
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
            </Col>
          </Row>
          
          <RenderTable contacts={contacts} />
        </Container>
      </PageContent>
    </>
  )
}