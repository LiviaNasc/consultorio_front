import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import * as C from './styles';
import { FaCalendarCheck, FaTimesCircle, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [error, setError] = useState('');

  const fetchConsultas = async () => {
    const userCpf = localStorage.getItem('user_cpf');
    if (!userCpf) {
      setError('Usuário não autenticado.');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/consultas/paciente/${userCpf}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar consultas');
      }

      setConsultas(data);
    } catch (error) {
      console.error('Erro:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchConsultas();
  }, []);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) { 
      case 'marcada':
        return { icon: <FaCalendarCheck size={24} color="#3164e5" />, color: '#3164e5' };
      case 'cancelada':
        return { icon: <FaTimesCircle size={24} color="red" />, color: 'red' };
      case 'concluída':
        return { icon: <FaCheckCircle size={24} color="green" />, color: 'green' };
      case 'atrasada':
        return { icon: <FaExclamationTriangle size={24} color="orange" />, color: 'orange' };
      default:
        return { icon: null, color: 'black' };
    }
  };

  const handleConsultaClick = (consulta) => {
    setSelectedConsulta(consulta);
  };

  const handleCloseModal = () => {
    setSelectedConsulta(null);
    fetchConsultas();
  };

  return (
    <div>
      <Header />
      <C.Title>Histórico de Consultas - Paciente</C.Title>
      {error && <C.ErrorMessage>{error}</C.ErrorMessage>}
      {consultas.length === 0 ? (
        <p>Nenhuma consulta encontrada.</p>
      ) : (
        <C.ConsultasGrid>
          {consultas.map((consulta) => {
            const { icon, color } = getStatusIcon(consulta.status); 
            return (
              <C.ConsultaItem 
                key={consulta.id} 
                onClick={() => handleConsultaClick(consulta)}
                style={{ border: `2px solid ${color}` }} 
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p><strong>Nome do médico:</strong> {consulta.nome_medico}</p>
                    <p><strong>Especialidade:</strong> {consulta.especialidade_medico}</p>
                    <p><strong>Data:</strong> {new Date(consulta.data_hora).toLocaleDateString('pt-BR')}</p>
                    <p><strong>Hora:</strong> {new Date(consulta.data_hora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div style={{ marginLeft: '16px' }}>{icon}</div>
                </div>
              </C.ConsultaItem>
            );
          })}
        </C.ConsultasGrid>
      )}
      {selectedConsulta && <Modal consulta={selectedConsulta} onClose={handleCloseModal} />}
    </div>
  );
};

export default Consultas;
