import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';
import Navbar from '../navbar';

const MeuComponente = () => {
  const [formData, setFormData] = useState({
    id: '',
    nomeDesafio: '',
    periodo: '',
    professor: '',
    dtInicio: '',
    dtFim: '',
    diasSemana: [],
    horario: '',
    sala: ''
  });

  const [desafios, setDesafios] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [periodos, setPeriodo] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [salas, setSalas] = useState([]);


  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
  
    if (type === 'checkbox') {
      const diasSelecionados = formData.diasSemana.includes(value)
        ? formData.diasSemana.filter((dia) => dia !== value)
        : [...formData.diasSemana, value];
  
      setFormData({
        ...formData,
        diasSemana: diasSelecionados,
      });
    } else {
      if (id === 'selectPeriodo') {
        setFormData({
          ...formData,
          periodo: value,
        });
      } else if (id === 'selectProfessor') {
        setFormData({
          ...formData,
          professor: value,
        });
      } else if (id === 'selectSala') {
        setFormData({
          ...formData,
          sala: value,
        });
      } else {
        setFormData({
          ...formData,
          [id]: value,
        });
      }
    }
  };

  const gerarIdUnico = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const adicionarDesafio = (e) => {
    e.preventDefault();
    if (editMode && editId !== null) {
      const desafiosAtualizados = desafios.map((desafio) =>
        desafio.id === editId ? { ...formData, id: editId } : desafio
      );
      localStorage.setItem('dadosDesafios', JSON.stringify(desafiosAtualizados));
      setDesafios(desafiosAtualizados);
      setEditMode(false);
      setEditId(null);
    } else {
      const novoDesafio = { ...formData, id: gerarIdUnico() };
      const desafiosAtualizados = [...desafios, novoDesafio];
      localStorage.setItem('dadosDesafios', JSON.stringify(desafiosAtualizados));
      setDesafios(desafiosAtualizados);
    }
    setFormData({
      id: '',
      nomeDesafio: '',
      periodo: '',
      professor: '',
      dtInicio: '',
      dtFim: '',
      diasSemana: [], 
      horario: '',
      sala: '',
    });
  };

  const excluirDesafio = (id) => {
    const desafiosAtualizados = desafios.filter(desafio => desafio.id !== id);
    localStorage.setItem('dadosDesafios', JSON.stringify(desafiosAtualizados));
    setDesafios(desafiosAtualizados);
  };

  const editarDesafio = (id) => {
    const desafioSelecionado = desafios.find(desafio => desafio.id === id);
    setFormData(desafioSelecionado);
    setEditMode(true);
    setEditId(id);
  };



  useEffect(() => {
    const desafiosSalvos = JSON.parse(localStorage.getItem('dadosDesafios')) || [];
    setDesafios(desafiosSalvos);
    const periodosSalvos = JSON.parse(localStorage.getItem('dadosPeriodos')) || [];
    setPeriodo(periodosSalvos);
    const professoresSalvos = JSON.parse(localStorage.getItem('dadosProfessores')) || [];
    setProfessores(professoresSalvos);
    const salasSalvos = JSON.parse(localStorage.getItem('dadosSalas')) || [];
    setSalas(salasSalvos);
  }, []);







  return (
    <>
      <Navbar />
      <Form className='container my-5' onSubmit={adicionarDesafio}>
        <h1>Cadastro de Desafios</h1>
        <Form.Group className="mb-3 my-5" controlId="nomeDesafio">
          <Form.Label>Nome do Desafio</Form.Label>
          <Form.Control placeholder="Insira o nome do Desafio"
            value={formData.nomeDesafio}
            onChange={handleChange}
          />
        </Form.Group>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId="selectPeriodo">
            <Form.Label>Periodos</Form.Label>
            <Form.Select defaultValue="Selecionar..."
              value={formData.periodo}
              onChange={handleChange}
            >
             <option value="">Selecionar...</option>
              {periodos.map(periodo => (
                <option key={periodo.id} value={periodo.numeroPeriodo}>
                  {periodo.numeroPeriodo || 'Periodo Desconhecido'}
                </option>
              ))} 
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="selectProfessor">
            <Form.Label>Professor</Form.Label>
            <Form.Select defaultValue="Selecionar..."
              value={formData.professor}
              onChange={handleChange}
            >
              <option value="">Selecionar...</option>
              {professores.map(professor => (
                <option key={professor.id} value={professor.nomeProfessor}>
                  {professor.nomeProfessor || 'Periodo Desconhecido'}
                </option>
              ))} 
            </Form.Select>
          </Form.Group>
        </Row>


        <Row className="mb-3">
          <Form.Group as={Col} controlId="dtInicio">
            <Form.Label>Data Inicio</Form.Label>
            <Form.Control type="date" placeholder="Data Inicio" 
            value={formData.dtInicio}
            onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="dtFim">
            <Form.Label>Data Fim</Form.Label>
            <Form.Control type="date" placeholder="Data Fim"
            value={formData.dtFim}
            onChange={handleChange}
            />
          </Form.Group>
        </Row>


        <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Dias da Semana</Form.Label>
          <div>
          <Form.Check
              inline
              label="Domingo"
              type="checkbox"
              id="domingo"
              value="domingo"
              onChange={handleChange}
              checked={formData.diasSemana.includes('domingo')}
            />
            <Form.Check
              inline
              label="Segunda-feira"
              type="checkbox"
              id="segunda"
              value="segunda"
              onChange={handleChange}
              checked={formData.diasSemana.includes('segunda')}
            />
            <Form.Check
              inline
              label="Terça-feira"
              type="checkbox"
              id="terca"
              value="terca"
              onChange={handleChange}
              checked={formData.diasSemana.includes('terca')}
            />
            <Form.Check
              inline
              label="Quarta-feira"
              type="checkbox"
              id="quarta"
              value="quarta"
              onChange={handleChange}
              checked={formData.diasSemana.includes('quarta')}
            />
            <Form.Check
              inline
              label="Quinta-feira"
              type="checkbox"
              id="quinta"
              value="quinta"
              onChange={handleChange}
              checked={formData.diasSemana.includes('quinta')}
            />
            <Form.Check
              inline
              label="Sexta-feira"
              type="checkbox"
              id="sexta"
              value="sexta"
              onChange={handleChange}
              checked={formData.diasSemana.includes('sexta')}
            />
            <Form.Check
              inline
              label="Sábado"
              type="checkbox"
              id="sabado"
              value="sabado"
              onChange={handleChange}
              checked={formData.diasSemana.includes('sabado')}
            />
          </div>
        </Form.Group>
      </Row>


        <Row className="mb-3">
        <Form.Group as={Col} controlId="horario">
          <Form.Label>Horario</Form.Label>
          <Form.Control type="time" placeholder="Horario" 
          value={formData.horario}
          onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="selectSala">
          <Form.Label>Sala</Form.Label>
          <Form.Select defaultValue="Selecionar..."
          value={formData.sala}
          onChange={handleChange}
          >
            <option value="">Selecionar...</option>
              {salas.map(sala => (
                <option key={sala.id} value={sala.numeroSala}>
                  {sala.numeroSala || 'Periodo Desconhecido'}
                </option>
              ))} 
          </Form.Select>
        </Form.Group>
      </Row>
        <Button variant="primary" type="submit">
          Cadastrar
        </Button>

        <Table striped bordered className='my-5'>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome do Desafio</th>
          <th>Periodo</th>
          <th>Professor</th>
          <th>Data Inicio</th>
          <th>Data Fim</th>
          <th>Dias da Semana</th>
          <th>Horario</th>
          <th>Sala</th>
          <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {desafios.map((desafio, index) => (
              <tr key={desafio.id}>
                <td>{index + 1}</td>
                <td>{desafio.nomeDesafio}</td>
                <td>{desafio.periodo}</td>
                <td>{desafio.professor}</td>
                <td>{desafio.dtInicio}</td>
                <td>{desafio.dtFim}</td>
                <td>{desafio.diasSemana ? desafio.diasSemana.join(', ') : ''}</td>
                <td>{desafio.horario}</td>
                <td>{desafio.sala}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => excluirDesafio(desafio.id)}
                  >
                    Excluir
                  </Button>
                  <Button className='mx-2'
                    variant="info"
                    onClick={() => editarDesafio(desafio.id)}
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
