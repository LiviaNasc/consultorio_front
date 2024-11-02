import Header from '../../components/Header';
import * as C from "./styles";
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const HomeMedico = () => {
  const [medicoCPF] = useState(localStorage.getItem('user_cpf'));
  const [medicoNome] = useState(localStorage.getItem('user_name'));
  const [consultasHoje, setConsultasHoje] = useState([]);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultasHoje = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/consultas/hoje/${medicoCPF}/`);
        setConsultasHoje(response.data);
      } catch (error) {
        console.error("Erro ao buscar consultas de hoje:", error);
      }
    };
    fetchConsultasHoje();
  }, [medicoCPF]);

  const handleConsultaClick = (consulta) => {
    setConsultaSelecionada(consulta);
  };

  const closeModal = () => {
    setConsultaSelecionada(null);
  };

  return (
    <div>
      <Header />
      <C.Container> 
        <C.LeftSide>
          <C.Title>
            Bem-vindo (a), {medicoNome}
          </C.Title>
          <C.Subtitle>Confira as consultas do dia:</C.Subtitle>
          <C.ListContainer>
            {consultasHoje.length > 0 ? (
              consultasHoje.map((consulta) => (
                <C.ConsultaItem
                  key={consulta.id}
                  onClick={() => handleConsultaClick(consulta)}
                >
                  <p><strong>Paciente:</strong> {consulta.nome_paciente}</p>
                  <p><strong>Hora:</strong> {new Date(consulta.data_hora).toLocaleTimeString()}</p>
                  <p><strong>Status:</strong> {consulta.status}</p>
                </C.ConsultaItem>
              ))
            ) : (
              <p>Nenhuma consulta marcada para hoje.</p>
            )}
          </C.ListContainer>
        </C.LeftSide>  

        <C.RightSide>
          <C.InfoCard>
            <C.CardTitle>Agendar Consulta</C.CardTitle>
            <C.CardDescription>Use o botão abaixo para agendar uma consulta para seu paciente.</C.CardDescription>
            <Button Text={"Agendar!"} onClick={() => navigate('/agenda/medico')} />
          </C.InfoCard>
        </C.RightSide>

        {consultaSelecionada && (
          <C.ModalOverlay onClick={closeModal}>
            <C.ModalContent onClick={(e) => e.stopPropagation()}>
              <C.ModalHeader>
                <h3>Detalhes da Consulta</h3>
                <button onClick={closeModal}>X</button>
              </C.ModalHeader>
              <C.ModalBody>
                <p><strong>Paciente:</strong> {consultaSelecionada.nome_paciente}</p>
                <p><strong>Motivo:</strong> {consultaSelecionada.motivo}</p>
                <p><strong>Especialidade:</strong> {consultaSelecionada.especialidade_medico}</p>
                <p><strong>Status:</strong> {consultaSelecionada.status}</p>
                <p><strong>Hora:</strong> {new Date(consultaSelecionada.data_hora).toLocaleTimeString()}</p>
              </C.ModalBody>
            </C.ModalContent>
          </C.ModalOverlay>
        )}
      </C.Container> 
    </div>
  );
}

export default HomeMedico;
