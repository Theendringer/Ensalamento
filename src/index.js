import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Inicio from './Componets/Inicio'
import Desafios from './Componets/Cadastros/desafios'

import Salas from './Componets/Cadastros/salas'
import Calendario from './Componets/calendario';
import NovoCurso from './Componets/Cadastros/novoCurso'
import NovoPeriodo from './Componets/Cadastros/novoPeriodo'
import NovoProfessor from './Componets/Cadastros/novoProfessor'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div> 
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Inicio/>}/>
      <Route path='/novoCurso' element={<NovoCurso/>}/>
      <Route path='/desafios' element={<Desafios/>}/>
      <Route path='/novoPeriodo' element={<NovoPeriodo/>}/>
      <Route path='/novoProfessor' element={<NovoProfessor/>}/>
      <Route path='/salas' element={<Salas/>}/>
      <Route path='/calendario' element={<Calendario/>}/>
    </Routes>
    </BrowserRouter>
  </div>
);

reportWebVitals();
