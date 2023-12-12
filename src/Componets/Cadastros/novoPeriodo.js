import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';
import Navbar from '../navbar';

const MeuComponente = () => {
  const [formData, setFormData] = useState({
    id: '',
    numeroPeriodo: '',
    semestre: '',
    dtInicio: '',
    dtFim: '',
    turno: '',
    curso: ''
  });

  const [periodos, setPeriodos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [cursos, setCursos] = useState([]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      curso: value,
      [id]: value
    });
  };

  const gerarIdUnico = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const adicionarPeriodo = (e) => {
    e.preventDefault();
    if (editMode && editId !== null) {
      const periodosAtualizados = periodos.map(periodo =>
        periodo.id === editId ? { ...formData, id: editId } : periodo
      );
      localStorage.setItem('dadosPeriodos', JSON.stringify(periodosAtualizados));
      setPeriodos(periodosAtualizados);
      setEditMode(false);
      setEditId(null);
    } else {
      const novoPeriodo = { ...formData, id: gerarIdUnico() };
      const periodosAtualizados = [...periodos, novoPeriodo];
      localStorage.setItem('dadosPeriodos', JSON.stringify(periodosAtualizados));
      setPeriodos(periodosAtualizados);
    }
    setFormData({
      id: '',
      numeroPeriodo: '',
      semestre: '',
      dtInicio: '',
      dtFim: '',
      turno: '',
      curso: ''
    });
  };

  const excluirPeriodo = (id) => {
    const periodosAtualizados = periodos.filter(periodo => periodo.id !== id);
    localStorage.setItem('dadosPeriodos', JSON.stringify(periodosAtualizados));
    setPeriodos(periodosAtualizados);
  };

  const editarPeriodo = (id) => {
    const periodoSelecionado = periodos.find(periodo => periodo.id === id);
    setFormData(periodoSelecionado);
    setEditMode(true);
    setEditId(id);
  };


  useEffect(() => {
    const periodosSalvos = JSON.parse(localStorage.getItem('dadosPeriodos')) || [];
    setPeriodos(periodosSalvos);
    const cursosSalvos = JSON.parse(localStorage.getItem('dadosCursos')) || [];
    setCursos(cursosSalvos);
  }, []);





  return (
    <>
      <Navbar />
      <Form className='container my-5' onSubmit={adicionarPeriodo}>
        <h1>Cadastro de Periodos</h1>
        <Row className="mb-3 my-5">
          <Form.Group as={Col} controlId="numeroPeriodo">
            <Form.Label>Número do Periodo</Form.Label>
            <Form.Control type="text"
              placeholder="1º periodo, 2º periodo..."
              value={formData.numeroPeriodo}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="semestre">
            <Form.Label>Inisira o Semestre/Ano do Periodo</Form.Label>
            <Form.Control type="text"
              placeholder="2/2023..."
              value={formData.semestre}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="dtInicio">
            <Form.Label>Data Inicio</Form.Label>
            <Form.Control type="date"
              placeholder="Data Inicio"
              value={formData.dtInicio}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="dtFim">
            <Form.Label>Data Fim</Form.Label>
            <Form.Control type="date"
              placeholder="Data Fim"
              value={formData.dtFim}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>


        <Row className='mb-3'>
          <Form.Group as={Col} controlId="turno">
            <Form.Label>Turno</Form.Label>
            <Form.Select defaultValue="Selecionar..."
              value={formData.turno}
              onChange={handleChange}
            >
              <option>Selecionar...</option>
              <option>Matutino</option>
              <option>Vespertino</option>
              <option>Norturno</option>
            </Form.Select>

          </Form.Group>

          <Form.Group as={Col} controlId="selectCurso">
            <Form.Label>Curso</Form.Label>
            <Form.Select
              value={formData.curso}
              onChange={handleChange}
            >
              <option value="">Selecionar...</option>
              {cursos.map(curso => (
                <option key={curso.id} value={curso.nomeCurso}>
                  {curso.nomeCurso || 'Nome do Curso Desconhecido'}
                </option>
              ))}
            </Form.Select>
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
              <th>Número do Periodo</th>
              <th>Semestre/Ano Periodo</th>
              <th>Data Inicio</th>
              <th>Data Fim</th>
              <th>Curso</th>
              <th>Turno</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {periodos.map((periodo, index) => (
              <tr key={periodo.id}>
                <td>{index + 1}</td>
                <td>{periodo.numeroPeriodo}</td>
                <td>{periodo.semestre}</td>
                <td>{periodo.dtInicio}</td>
                <td>{periodo.dtFim}</td>
                <td>{periodo.curso}</td>
                <td>{periodo.turno}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => excluirPeriodo(periodo.id)}
                  >
                    Excluir
                  </Button>
                  <Button className='mx-2'
                    variant="info"
                    onClick={() => editarPeriodo(periodo.id)}
                  >
                    Editar
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
