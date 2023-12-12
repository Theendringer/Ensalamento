import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample() {
  return (
    <Navbar expand="lg" bg="primary">
      <Container>
        <Navbar.Brand href="/">Ensalamento</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/calendario">Calendario</Nav.Link>
            <NavDropdown title="Cadastros" id="basic-nav-dropdown">
              <NavDropdown.Item href="/novoCurso">Curso</NavDropdown.Item>
              <NavDropdown.Item href="/novoPeriodo">Periodo</NavDropdown.Item>
              <NavDropdown.Item href="/novoProfessor">Professor</NavDropdown.Item>
              <NavDropdown.Item href="/salas">Salas</NavDropdown.Item>
              <NavDropdown.Item href="/desafios">Desafios</NavDropdown.Item>
              

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;