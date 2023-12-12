import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';
import Navbar from '../navbar'

const MeuComponente = () => {
  const [formData, setFormData] = useState({
    id: '',
    andarSala: '',
    numeroSala: '',
    predio: '',
    numeroCadeira: ''
  });

  const [salas, setSalas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if ((id === 'numeroSala' || id === 'numeroCadeira') && !/^\d*$/.test(value)) {
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

  const adicionarSala = (e) => {
    e.preventDefault();
    if (editMode && editId !== null) {
      const salasAtualizadas = salas.map(sala =>
        sala.id === editId ? { ...formData, id: editId } : sala
      );
      localStorage.setItem('dadosSalas', JSON.stringify(salasAtualizadas));
      setSalas(salasAtualizadas);
      setEditMode(false);
      setEditId(null);
    } else {
      const novaSala = { ...formData, id: gerarIdUnico() };
      const salasAtualizadas = [...salas, novaSala];
      localStorage.setItem('dadosSalas', JSON.stringify(salasAtualizadas));
      setSalas(salasAtualizadas);
    }
    setFormData({
      andarSala: '',
      numeroSala: '',
      predio: '',
      numeroCadeira: ''
    });
  };

  const excluirSala = (id) => {
    const salasAtualizadas = salas.filter(sala => sala.id !== id);
    localStorage.setItem('dadosSalas', JSON.stringify(salasAtualizadas));
    setSalas(salasAtualizadas);
  };

  const editarSala = (id) => {
    const salaSelecionada = salas.find(sala => sala.id === id);
    if (salaSelecionada) {
      const { id, andarSala, numeroSala, predio, numeroCadeira } = salaSelecionada;
      setFormData({
        id,
        andarSala,
        numeroSala,
        predio,
        numeroCadeira
      });
      setEditMode(true);
      setEditId(id);
    }
  };
  
  useEffect(() => {
    const salasSalvas = JSON.parse(localStorage.getItem('dadosSalas')) || [];
    setSalas(salasSalvas);
  }, []);

  return (
    <>
     <Navbar/>
      <Form className='container my-5' onSubmit={adicionarSala}>
        <h1>Cadastro de Salas</h1>
        <Row className="mb-3 my-5">
          <Form.Group as={Col} controlId="andarSala">
            <Form.Label>Andar da Sala</Form.Label>
            <Form.Control type="text" placeholder="1º andar, 2º andar, 3º andar..." 
            value={formData.andarSala}
            onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="numeroSala">
            <Form.Label>Número da Sala</Form.Label>
            <Form.Control type="number" placeholder="Número da Sala" 
            value={formData.numeroSala}
            onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="predio">
            <Form.Label>Prédio</Form.Label>
            <Form.Control type="text" placeholder="Dom Bosco..."
            value={formData.predio}
            onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="numeroCadeira">
            <Form.Label>Número de Cadeiras</Form.Label>
            <Form.Control type="number" placeholder="Número de Cadeiras" 
            value={formData.numeroCadeira}
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
            <th>Andar da Sala</th>
              <th>Número da Sala</th>
              <th>Prédio</th>
              <th>Número de cadeiras</th>
              <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {salas.map((sala, index) => (
            <tr key={sala.id}>
              <td>{index + 1}</td>
              <td>{sala.andarSala}</td>
              <td>{sala.numeroSala}</td>
              <td>{sala.predio}</td>
              <td>{sala.numeroCadeira}</td>
              <td>
              <Button className='mx-2'
                  variant="warning"
                  onClick={() => editarSala(sala.id)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => excluirSala(sala.id)}
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
