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
    <h1>Cadastro de Salas</h1>
      <Row className="mb-3 my-5">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Andar da Sala</Form.Label>
          <Form.Control type="text" placeholder="1º andar, 2º andar, 3º andar..." />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Número da Sala</Form.Label>
          <Form.Control type="number" placeholder="Número da Sala" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Prédio</Form.Label>
          <Form.Control type="text" placeholder="Dom Bosco..." />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Número de Cadeiras</Form.Label>
          <Form.Control type="number" placeholder="Número de Cadeiras" />
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