import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

import Cadastro from './cadastro/Cadastro';
import Editar from './editar/Editar';
import Entrada from './entrada/Entrada';
import Home from './home/Home';
import Login from './home/Home';
import Saida from './saida/Saida';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/editar' element={<Editar />} />
        <Route path='/entrada' element={<Entrada />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/saida' element={<Saida />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
