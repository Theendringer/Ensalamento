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
    <h1>Cadastro de Desafios</h1>
      <Form.Group className="mb-3 my-5" controlId="formGridAddress1">
        <Form.Label>Nome do Desafio</Form.Label>
        <Form.Control placeholder="Insira o nome do Desafio" />
      </Form.Group>

      <Row className='mb-3'>
      <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Periodos</Form.Label>
          <Form.Select defaultValue="Selecionar...">
          <option>Selecionar...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Professor</Form.Label>
          <Form.Select defaultValue="Selecionar...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>
      </Row>


      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Data Inicio</Form.Label>
          <Form.Control type="date" placeholder="Data Inicio" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Data Fim</Form.Label>
          <Form.Control type="date" placeholder="Data Fim" />
        </Form.Group>
      </Row>

      <h5>Inserir check box de dias de semana</h5>


      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Horario</Form.Label>
          <Form.Control type="time" placeholder="Horario" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Sala</Form.Label>
          <Form.Select defaultValue="Selecionar...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
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