import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import * as C from './styles';

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [expandedConsultas, setExpandedConsultas] = useState([]);
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

  
  const handleConsultaClick = (consulta) => {
    setExpandedConsultas((prev) => {
      if (prev.includes(consulta)) {
        // Se a consulta já está expandida, remove-a
        return prev.filter((c) => c !== consulta);
      } else {
        // Caso contrário, adiciona a consulta
        return [...prev, consulta];
      }
    });
  };

  return (
    <div>
      <Header />
      <C.Title>Histórico de Consultas</C.Title>
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
              {expandedConsultas.includes(consulta) && (
                <>
                  <p><strong>Médico:</strong> {consulta.medico_nome}</p>
                  <p><strong>Status:</strong> {consulta.status}</p>
                  <p><strong>Motivo:</strong> {consulta.motivo}</p>
                </>
              )}
            </C.ConsultaItem>
          ))}
        </C.ConsultasGrid>
      )}
    </div>
  );
};

export default Consultas;
