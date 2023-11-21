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
    <h1>Cadastro de Cursos</h1>
      <Form.Group className="mb-3 my-5" controlId="formGridAddress1">
        <Form.Label>Nome do Curso</Form.Label>
        <Form.Control placeholder="Insira o nome do curso" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Nome do Coodernador do Curso</Form.Label>
          <Form.Control type="text" placeholder="Coodernador do curso" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Data Inicio do Curso</Form.Label>
          <Form.Control type="date" placeholder="" />
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