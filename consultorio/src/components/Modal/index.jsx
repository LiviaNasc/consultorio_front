import React from 'react';
import PropTypes from 'prop-types'; 
import * as C from './styles';

const Modal = ({ consulta, medicoNome, pacienteNome, onClose }) => { 
  if (!consulta) return null;

  const userType = localStorage.getItem('user_type'); // Obtendo o tipo de usuário

  return (
    <C.ModalOverlay>
      <C.ModalContent>
        <h2>Detalhes da Consulta</h2>
        <C.InfoBox>
          <p><strong>Data:</strong> {new Date(consulta.data_hora).toLocaleDateString('pt-BR')}</p>
          <p><strong>Hora:</strong> {new Date(consulta.data_hora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
          
          {userType === 'paciente' && (
            <p><strong>Médico:</strong> {medicoNome || 'Carregando...'}</p> // Exibe o nome do médico apenas se for um médico
          )}

          {userType === 'doctor' && (
            <p><strong>Paciente:</strong> {pacienteNome || 'Carregando...'}</p> // Exibe o nome do paciente apenas se for um paciente
          )}

          <p><strong>Status:</strong> {consulta.status}</p>
          <p><strong>Motivo:</strong> {consulta.motivo}</p>
        </C.InfoBox>
        <button onClick={onClose}>Voltar</button>
      </C.ModalContent>
    </C.ModalOverlay>
  );
};

Modal.propTypes = {
  consulta: PropTypes.shape({
    data_hora: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    motivo: PropTypes.string.isRequired,
  }).isRequired,
  medicoNome: PropTypes.string,  
  pacienteNome: PropTypes.string, 
  onClose: PropTypes.func.isRequired,
};

export default Modal;
