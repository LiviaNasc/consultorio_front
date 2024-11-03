import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import * as C from './styles';

const Modal = ({ consulta, onClose }) => { 
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [motivoCancelamento, setMotivoCancelamento] = useState('');

  if (!consulta) return null;

  const userType = localStorage.getItem('user_type'); 
  
  const handleCancel = async () => {
    const confirmCancel = window.confirm("Você tem certeza que deseja cancelar esta consulta? Essa operação é irreversível.");
    
    if (confirmCancel) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/consultas/${consulta.id}/atualizar-status/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'cancelada'}), 
        });

        if (!response.ok) {
          throw new Error('Erro ao cancelar a consulta.');
        }

        onClose();
        setMotivoCancelamento(''); 

      } catch (error) {
        console.error(error);
        alert('Ocorreu um erro ao cancelar a consulta. Tente novamente.');
      }
    }
  };

  return (
    <C.ModalOverlay>
      <C.ModalContent>
        <h2>Detalhes da Consulta</h2>
        <C.InfoBox>
          <p><strong>Data:</strong> {new Date(consulta.data_hora).toLocaleDateString('pt-BR')}</p>
          <p><strong>Hora:</strong> {new Date(consulta.data_hora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
          
          {userType === 'paciente' && (
            <p><strong>Médico:</strong> {consulta.nome_medico}</p> 
          )}

          {userType === 'doctor' && (
            <p><strong>Paciente:</strong> {consulta.nome_paciente}</p> 
          )}

          <p><strong>Status:</strong> {consulta.status}</p>
          <p><strong>Motivo:</strong> {consulta.motivo}</p>
        </C.InfoBox>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button onClick={onClose}>Voltar</button>
          {consulta.status.toLowerCase() === 'marcada' && (
            <button 
              onClick={() => setCancelModalOpen(true)} 
              style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
            >
              Cancelar
            </button>
          )}
        </div>
      </C.ModalContent>

      {/* Modal de confirmação de cancelamento */}
      {isCancelModalOpen && (
        <C.ModalOverlay>
          <C.ModalContent style={{ width: '400px', textAlign: 'center' }}>
            <h2>Cancelar Consulta</h2>
            <p>Você tem certeza que deseja cancelar esta consulta? Essa operação é irreversível.</p>
            <label>
              Motivo do Cancelamento:
              <textarea 
                value={motivoCancelamento} 
                onChange={(e) => setMotivoCancelamento(e.target.value)} 
                style={{ width: '100%', height: '100px', margin: '10px 0', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
                placeholder="Digite o motivo do cancelamento..."
              />
            </label>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button onClick={() => setCancelModalOpen(false)}>Cancelar</button>
              <button 
                onClick={handleCancel} 
                style={{ backgroundColor: 'red', color: 'white' }}
              >
                Confirmar Cancelamento
              </button>
            </div>
          </C.ModalContent>
        </C.ModalOverlay>
      )}
    </C.ModalOverlay>
  );
};

Modal.propTypes = {
  consulta: PropTypes.shape({
    data_hora: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    motivo: PropTypes.string.isRequired,
    nome_medico: PropTypes.string,  
    nome_paciente: PropTypes.string,  
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
