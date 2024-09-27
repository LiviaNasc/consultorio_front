import { Fragment }from 'react'
import { Route, BrowserRouter, Routes, Navigate, useNavigate } from 'react-router-dom';
//import useAuth from "../hooks/useAuth";

import Signin from '../pages/SingIn';
import Signup from '../pages/Signup';
import SignupPaciente from '../pages/SignupPaciente';
import SignupMedico from '../pages/SignupMedico';
import HomeMedico from '../pages/HomeMedico';
import HomePaciente from '../pages/HomePaciente';
import Agenda from '../pages/Agenda';

const Private = ({ Item, allowedUserType }) => {
  const navigate = useNavigate();
  const userType = localStorage.getItem('user_type');

  if (!userType) {
    return <Navigate to="/" />;
  }

  if (userType !== allowedUserType) {
    if (userType === 'doctor') {
      navigate('/home/medico');
    } else if (userType === 'paciente') {
      navigate('/home/paciente');
    }
    return null;
  }

  // Se o tipo de usuário for o permitido, renderiza o componente solicitado
  return <Item />;
};


const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route
            exact
            path="/home/medico"
            element={<Private Item={HomeMedico} allowedUserType="doctor" />}
          />
          <Route
            exact
            path="/home/paciente"
            element={<Private Item={HomePaciente} allowedUserType="paciente" />}
          />
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/paciente" element={<SignupPaciente />} />
          <Route path="/signup/medico" element={<SignupMedico />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};


export default RoutesApp;