import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

import UserContext from './context/UserContext';
import Cadastro from './cadastro/Cadastro';
import Editar from './editar/Editar';
import Entrada from './entrada/Entrada';
import Home from './home/Home';
import Login from './login/Login';
import Saida from './saida/Saida';


function App() {

  const [userToken, setUserToken] = useState(null);
  const [values, setValues] = useState([])

  return (
    <UserContext.Provider value={{
      userToken,
      setUserToken,
      values,
      setValues
    }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cadastro' element={<Cadastro />} />
          <Route path='/editar/:id' element={<Editar />} />
          <Route path='/entrada' element={<Entrada />} />
          <Route path='/login' element={<Login />} />
          <Route path='/saida' element={<Saida />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
