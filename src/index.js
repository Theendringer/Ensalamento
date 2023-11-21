import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import Inicio from './Componets/Inicio'
import Cursos from './Componets/Cadastros/cursos'
import Desafios from './Componets/Cadastros/desafios'
//import Horarios from './Componets/Cadastros/periodos'
import Periodos from './Componets/Cadastros/periodos'
import Professores from './Componets/Cadastros/professores'
import Salas from './Componets/Cadastros/salas'
import Calendario from './Componets/calendario';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div> 
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Inicio/>}/>
      <Route path='/cursos' element={<Cursos/>}/>
      <Route path='/desafios' element={<Desafios/>}/>
      <Route path='/periodos' element={<Periodos/>}/>
      <Route path='/professores' element={<Professores/>}/>
      <Route path='/salas' element={<Salas/>}/>
      <Route path='/calendario' element={<Calendario/>}/>
    </Routes>
    </BrowserRouter>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();