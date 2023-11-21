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
    <h1>Cadastro de Periodos</h1>
      <Row className="mb-3 my-5">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Número do Periodo</Form.Label>
          <Form.Control type="text" placeholder="1º periodo, 2º periodo..." />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Inisira o Semestre/Ano do Periodo</Form.Label>
          <Form.Control type="text" placeholder="2/2023..." />
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


      <Row className='mb-3'>
      <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Turno</Form.Label>
          <Form.Select defaultValue="Selecionar...">
          <option>Selecionar...</option>
            <option>Matutino</option>
            <option>Vespertino</option>
            <option>Norturno</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Curso</Form.Label>
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