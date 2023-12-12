import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Navbar from './navbar'

function Calendar() {
  const [calendarData, setCalendarData] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const dadosDesafio = JSON.parse(localStorage.getItem('dadosDesafios')) || [];
    const novembroDesafios = [];
  
    dadosDesafio.forEach((desafio) => {
      const diasSemana = desafio.diasSemana || [];
      const dtInicio = new Date(desafio.dtInicio);
      const dtFim = new Date(desafio.dtFim);
  
      while (dtInicio <= dtFim) {
        if (diasSemana.includes(getDayName(dtInicio.getDay()))) {
          const formattedDate = dtInicio.toISOString().split('T')[0];
          const novoDesafio = {
            ...desafio,
            dtInicio: formattedDate,
            dtFim: formattedDate,
          };
          novembroDesafios.push(novoDesafio);
        }
        dtInicio.setDate(dtInicio.getDate() + 1); // Incrementa um dia
      }
    });
  
    setCalendarData(novembroDesafios);
  }, []);
  

  const getDayName = (dayIndex) => {
    const daysOfWeek = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
    return daysOfWeek[dayIndex];
  };
  

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const year = 2023;
  const month = 10; // Mes 10, index começa em 0
  const daysInMonth = getDaysInMonth(year, month);
  let firstDay = getFirstDayOfMonth(year, month);

  if (firstDay > 5) {
    firstDay -= 7;
  }

  const days = Array.from({ length: daysInMonth }).map((_, index) => index + 1);

  const previousMonthDays = getDaysInMonth(year, month - 1);
  for (let i = firstDay - 1; i >= 0; i--) {
    days.unshift(previousMonthDays - i);
  }

  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const chunkedDays = chunkArray(days, 7);

  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedChallenge(null);
    setShowModal(false);
  };

  return (
    <>
    <Navbar/>
    <div className='container my-3'>
        <h1>Calendário Novembro</h1>
      <Table bordered responsive="sm" className='my-3'>
        <thead>
          <tr>
            <th style={{ width: '14.28%' }}>Domingo</th>
            <th style={{ width: '14.28%' }}>Segunda</th>
            <th style={{ width: '14.28%' }}>Terça</th>
            <th style={{ width: '14.28%' }}>Quarta</th>
            <th style={{ width: '14.28%' }}>Quinta</th>
            <th style={{ width: '14.28%' }}>Sexta</th>
            <th style={{ width: '14.28%' }}>Sábado</th>
          </tr>
        </thead>
        <tbody>
          {chunkedDays.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => {
                const currentDate = new Date(year, month, day);
                const formattedDate = currentDate.toISOString().split('T')[0];
                const dailyData = calendarData.filter(
                  (item) => item.dtInicio === formattedDate
                );

                return (
                  <td key={dayIndex} style={{ height: '80px' }}>
                    {dailyData.length > 0 ? (
                      dailyData.map((challenge, index) => (
                        <div
                        key={index}
                        style={{
                          cursor: 'pointer',
                          backgroundColor: 'pink', 
                          padding: '2px', 
                          borderRadius: '5px',
                        }}
                        onClick={() => handleChallengeClick(challenge)}
                      >
                        <strong>{challenge.nomeDesafio || 'Nome Desafio Indisponível'}</strong>
                      </div>
                      ))
                    ) : (
                      day
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedChallenge?.nomeDesafio || 'Detalhes do Desafio'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Professor: {selectedChallenge?.professor}</p>
          <p>Sala: {selectedChallenge?.sala}</p>
          <p>Horário: {selectedChallenge?.horario}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
}

export default Calendar;
