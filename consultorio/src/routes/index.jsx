import { Fragment } from 'react';
import { Route, BrowserRouter, Routes, Navigate, useNavigate } from 'react-router-dom';
// import useAuth from "../hooks/useAuth";

import Signin from '../pages/SingIn';
import Signup from '../pages/Signup';
import SignupPaciente from '../pages/SignupPaciente';
import SignupMedico from '../pages/SignupMedico';
import HomeMedico from '../pages/HomeMedico';
import HomePaciente from '../pages/HomePaciente';
import Agenda from '../pages/Agenda';
import Consultas from '../pages/Consultas';
import ConsultasMedico from '../pages/ConsultasMedico';
import Agendar from '../pages/AgendaMedico';

// Componente privado para páginas de paciente
const PrivatePaciente = ({ Item }) => {
  const userType = localStorage.getItem('user_type');

  if (!userType) {
    return <Navigate to="/" />;
  }

  if (userType !== 'paciente') {
    return <Navigate to="/home/paciente" />;
  }

  return <Item />;
};

// Componente privado para páginas de médico
const PrivateMedico = ({ Item }) => {
  const userType = localStorage.getItem('user_type');

  if (!userType) {
    return <Navigate to="/" />;
  }

  if (userType !== 'doctor') {
    return <Navigate to="/home/medico" />;
  }

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
            element={<PrivateMedico Item={HomeMedico} />}
          />
          <Route
            exact
            path="/home/paciente"
            element={<PrivatePaciente Item={HomePaciente} />}
          />
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/paciente" element={<SignupPaciente />} />
          <Route path="/signup/medico" element={<SignupMedico />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/agenda/medico" element={<PrivateMedico Item={Agendar} />} />
          <Route path="/consultas" element={<PrivatePaciente Item={Consultas} />} /> {/* Para pacientes */}
          <Route path="/consultas/medico" element={<PrivateMedico Item={ConsultasMedico} />} /> {/* Para médicos */}
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
