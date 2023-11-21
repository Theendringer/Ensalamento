import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Navbar from '../navbar'

function GridComplexExample() {
  return (
    <>
    <Navbar/>
    <Form className='container my-5'>
    <h1>Cadastro de Professores</h1>
      <Form.Group className="mb-3 my-5" controlId="formGridAddress1">
        <Form.Label>Nome do Professor</Form.Label>
        <Form.Control placeholder="Insira o nome do professor" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Matricula do Professor</Form.Label>
          <Form.Control type="number" placeholder="Matricula do Professor" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Telefone</Form.Label>
          <Form.Control type="phone" placeholder="Telefone" />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Cadastrar
      </Button>
    </Form>
    </>
  );
}

export default GridComplexExample;