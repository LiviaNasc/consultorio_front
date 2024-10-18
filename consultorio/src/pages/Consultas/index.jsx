import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import * as C from './styles';

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [medicoNome, setMedicoNome] = useState(''); 
  const [error, setError] = useState('');

  useEffect(() => {
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

    fetchConsultas();
  }, []);

  // Função para buscar o nome do médico usando o CPF
  const fetchMedicoNome = async (medicoCpf) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${medicoCpf}`);
      const data = await response.json();
      if (response.ok) {
        setMedicoNome(data.user_name); // Armazena o nome do médico
      } else {
        throw new Error('Erro ao buscar nome do médico');
      }
    } catch (error) {
      console.error('Erro ao buscar nome do médico:', error);
      setMedicoNome('Desconhecido');
    }
  };

  const handleConsultaClick = (consulta) => {
    setSelectedConsulta(consulta);
    fetchMedicoNome(consulta.medico); 
  };

  const handleCloseModal = () => {
    setSelectedConsulta(null);
    setMedicoNome(''); 
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
          {consultas.map((consulta) => (
            <C.ConsultaItem key={consulta.id} onClick={() => handleConsultaClick(consulta)}>
              <p>
                <strong>Data:</strong> {new Date(consulta.data_hora).toLocaleDateString('pt-BR')}
              </p>
              <p>
                <strong>Hora:</strong> {new Date(consulta.data_hora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </C.ConsultaItem>
          ))}
        </C.ConsultasGrid>
      )}
      {selectedConsulta && <Modal consulta={selectedConsulta} medicoNome={medicoNome} onClose={handleCloseModal} />}
    </div>
  );
};

export default Consultas;