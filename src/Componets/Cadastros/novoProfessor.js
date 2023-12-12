import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';
import Navbar from '../navbar'

const MeuComponente = () => {
  const [formData, setFormData] = useState({
    id: '',
    nomeProfessor: '',
    matricula: '',
    telefone: ''
  });

  const [professores, setProfessores] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;

    
    if (id === 'matricula' && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
      [id]: value
    });
  };

  const gerarIdUnico = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const adicionarProfessor = (e) => {
    e.preventDefault();
    if (editMode && editId !== null) {
      const professoresAtualizados = professores.map(professor =>
        professor.id === editId ? { ...formData, id: editId } : professor
      );
      localStorage.setItem('dadosProfessores', JSON.stringify(professoresAtualizados));
      setProfessores(professoresAtualizados);
      setEditMode(false);
      setEditId(null);
    } else {
      const novoProfessor = { ...formData, id: gerarIdUnico() };
      const professoresAtualizados = [...professores, novoProfessor];
      localStorage.setItem('dadosProfessores', JSON.stringify(professoresAtualizados));
      setProfessores(professoresAtualizados);
    }
    setFormData({
      id: '',
      nomeProfessor: '',
      matricula: '',
      telefone: ''
    });
  };

  const excluirProfessor = (id) => {
    const professoresAtualizados = professores.filter(professor => professor.id !== id);
    localStorage.setItem('dadosProfessores', JSON.stringify(professoresAtualizados));
    setProfessores(professoresAtualizados);
  };

  const editarProfessor = (id) => {
    const professorSelecionado = professores.find(professor => professor.id === id);
    if (professorSelecionado) {
      const { id, nomeProfessor, matricula, telefone } = professorSelecionado;
      setFormData({
        id,
        nomeProfessor,
        matricula,
        telefone
      });
      setEditMode(true);
      setEditId(id);
    }
  };
  
  useEffect(() => {
    const professoresSalvos = JSON.parse(localStorage.getItem('dadosProfessores')) || [];
    setProfessores(professoresSalvos);
  }, []);

  return (
    <>
     <Navbar/>
      <Form className='container my-5' onSubmit={adicionarProfessor}>
        <h1>Cadastro de Professores</h1>
        <Form.Group className="mb-3 my-5" controlId="nomeProfessor">
          <Form.Label>Nome do Professor</Form.Label>
          <Form.Control placeholder="Insira o nome do professor" 
           value={formData.nomeProfessor}
           onChange={handleChange}
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="matricula">
            <Form.Label>Matricula do Professor</Form.Label>
            <Form.Control type="number" placeholder="Matricula do Professor" 
            value={formData.matricula}
            onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="telefone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control type="phone" 
            placeholder="Telefone" 
            value={formData.telefone}
           onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Cadastrar
        </Button>

      <Table striped bordered className='my-5'>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome do Professor</th>
              <th>Matricula</th>
              <th>Telefone</th>
              <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {professores.map((professor, index) => (
            <tr key={professor.id}>
              <td>{index + 1}</td>
              <td>{professor.nomeProfessor}</td>
              <td>{professor.matricula}</td>
              <td>{professor.telefone}</td>
              <td>
              <Button className='mx-2'
                  variant="warning"
                  onClick={() => editarProfessor(professor.id)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => excluirProfessor(professor.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Form>
    </>
  );
};

export default MeuComponente;
