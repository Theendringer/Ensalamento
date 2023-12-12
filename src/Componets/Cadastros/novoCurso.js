import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';
import Navbar from '../navbar'

const MeuComponente = () => {
  const [formData, setFormData] = useState({
    id: '',
    nomeCurso: '',
    nomeCoodCurso: '',
    dtInicio: ''
  });

  const [cursos, setCursos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const gerarIdUnico = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const adicionarCurso = (e) => {
    e.preventDefault();
    if (editMode && editId !== null) {
      const cursosAtualizados = cursos.map(curso =>
        curso.id === editId ? { ...formData, id: editId } : curso
      );
      localStorage.setItem('dadosCursos', JSON.stringify(cursosAtualizados));
      setCursos(cursosAtualizados);
      setEditMode(false);
      setEditId(null);
    } else {
      const novoCurso = { ...formData, id: gerarIdUnico() };
      const cursosAtualizados = [...cursos, novoCurso];
      localStorage.setItem('dadosCursos', JSON.stringify(cursosAtualizados));
      setCursos(cursosAtualizados);
    }
    setFormData({
      id: '',
      nomeCurso: '',
      nomeCoodCurso: '',
      dtInicio: ''
    });
  };

  const excluirCurso = (id) => {
    const cursosAtualizados = cursos.filter(curso => curso.id !== id);
    localStorage.setItem('dadosCursos', JSON.stringify(cursosAtualizados));
    setCursos(cursosAtualizados);
  };

  const editarCurso = (id) => {
    const cursoSelecionado = cursos.find(curso => curso.id === id);
    setFormData(cursoSelecionado);
    setEditMode(true);
    setEditId(id);
  };

  useEffect(() => {
    const cursosSalvos = JSON.parse(localStorage.getItem('dadosCursos')) || [];
    setCursos(cursosSalvos);
  }, []);

  return (
    <>
     <Navbar/>
      <Form className='container my-5' onSubmit={adicionarCurso}>
        <h1>Cadastro de Cursos</h1>
        <Form.Group className="mb-3 my-5" controlId="nomeCurso">
          <Form.Label>Nome do Curso</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira o nome do Curso"
            value={formData.nome}
            onChange={handleChange}
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="nomeCoodCurso">
            <Form.Label>Nome do Coordenador do Curso</Form.Label>
            <Form.Control
              type="text"
              placeholder="Coordenador do curso"
              value={formData.nomeCoodCurso}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="dtInicio">
            <Form.Label>Data de Início do Curso</Form.Label>
            <Form.Control
              type="date"
              placeholder=""
              value={formData.dtInicio}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Cadastrar
        </Button>

      <Table striped bordered className='my-5'>
        {/* Conteúdo da tabela aqui */}
        <thead>
          <tr>
            <th>#</th>
            <th>Nome do Curso</th>
            <th>Nome do Coordenador</th>
            <th>Data de Início</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso, index) => (
            <tr key={curso.id}>
              <td>{index + 1}</td>
              <td>{curso.nomeCurso}</td>
              <td>{curso.nomeCoodCurso}</td>
              <td>{curso.dtInicio}</td>
              <td>
              <Button className='mx-2'
                  variant="warning"
                  onClick={() => editarCurso(curso.id)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => excluirCurso(curso.id)}
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
