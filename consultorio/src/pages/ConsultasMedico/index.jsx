import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import * as C from './styles';

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [pacienteNome, setPacienteNome] = useState(''); // Alterado para pacienteNome
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConsultas = async () => {
      const userCpf = localStorage.getItem('user_cpf');
      if (!userCpf) {
        setError('Usuário não autenticado.');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/consultas/medico/${userCpf}`);
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

  // Função para buscar o nome do paciente usando o CPF
  const fetchPacienteNome = async (pacienteCpf) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${pacienteCpf}`);
      const data = await response.json();
      if (response.ok) {
        setPacienteNome(data.user_name); // Armazena o nome do paciente
      } else {
        throw new Error('Erro ao buscar nome do paciente');
      }
    } catch (error) {
      console.error('Erro ao buscar nome do paciente:', error);
      setPacienteNome('Desconhecido');
    }
  };

  const handleConsultaClick = (consulta) => {
    setSelectedConsulta(consulta);
    fetchPacienteNome(consulta.paciente); // Alterado para buscar o nome do paciente
  };

  const handleCloseModal = () => {
    setSelectedConsulta(null);
    setPacienteNome(''); // Resetando o nome do paciente
  };

  return (
    <div>
      <Header />
      <C.Title>Histórico de Consultas - Médico</C.Title>
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
      {selectedConsulta && <Modal consulta={selectedConsulta} pacienteNome={pacienteNome} onClose={handleCloseModal} />} {/* Passando pacienteNome */}
    </div>
  );
};

export default Consultas;
