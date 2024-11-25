import Header from '../../components/Header';
import * as C from "./styles";
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProntuarioModal from '../../components/ProntuarioModal';
import ProntuarioViewModal from '../../components/ProntuarioViewModal';
import Swal from 'sweetalert2';


const HomeMedico = () => {
  const [medicoCPF] = useState(localStorage.getItem('user_cpf'));
  const [medicoNome] = useState(localStorage.getItem('user_name'));
  const [consultasHoje, setConsultasHoje] = useState([]);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
  const [prontuarios, setProntuarios] = useState([]);
  const [isProntuarioModalOpen, setProntuarioModalOpen] = useState(false);
  const [prontuarioVisualizado, setProntuarioVisualizado] = useState(null);

  const navigate = useNavigate();

  const fetchConsultasHoje = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/consultas/hoje/${medicoCPF}/`);
      setConsultasHoje(response.data);
    } catch (error) {
      console.error("Erro ao buscar consultas de hoje:", error);
    }
  };

  const fetchProntuarios = async (cpfPaciente) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/prontuarios/paciente/${cpfPaciente}`);
      
      setProntuarios(response.data);
      console.log('Response recebida:', response.data);
      console.log('Prontuários recebidos:', prontuarios);
    } catch (error) {
      console.error("Erro ao buscar prontuários do paciente:", error);
    }
  };

  useEffect(() => {
    fetchConsultasHoje();
  }, [medicoCPF]);

  useEffect(() => {
    console.log('Prontuários atualizados:', prontuarios);
  }, [prontuarios]);

  const handleConsultaClick = (consulta) => {
    setConsultaSelecionada(consulta);
    fetchProntuarios(consulta.paciente);
  };

  const closeModal = () => {
    setConsultaSelecionada(null);
    setProntuarios([]); 
  };

  const handleViewProntuario = (prontuario) => {
    setProntuarioVisualizado(prontuario);
  };
  
  const closeViewProntuarioModal = () => {
    setProntuarioVisualizado(null);
  };

  const handleConfirm = async (consultaId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/consultas/${consultaId}/atualizar-status/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'concluída' }), 
      });

      if (!response.ok) {
        throw new Error('Erro ao concluir a consulta.');
      } else {
        await fetchConsultasHoje();
        closeModal();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Ocorreu um erro ao concluir a consulta. Tente novamente.',
        confirmButtonText: 'Fechar',
      });    }
  };

  const handleProntuarioOpen = () => {
    setProntuarioModalOpen(true);
  };

  const handleProntuarioSave = (data) => {
    console.log("Dados do Prontuário:", data);
  };

  return (
    <div style={{ position: 'fixed' ,  width: '100%'}}>
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
  
        {/* Modal de detalhes da consulta */}
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
                <p><strong>Status:</strong> {consultaSelecionada.status}</p>
                <p><strong>Hora:</strong> {new Date(consultaSelecionada.data_hora).toLocaleTimeString()}</p>
                
                <h4>Prontuários Anteriores:</h4>
                <C.ProntuarioGrid>
                  {prontuarios.length > 0 ? (
                    prontuarios.map((prontuario, index) => (
                      <C.ProntuarioItem
                        key={index}
                        onClick={() => handleViewProntuario(prontuario)}
                      >
                        <p><strong>Queixa:</strong> {prontuario.queixa_principal}</p>
                      </C.ProntuarioItem>
                    ))
                  ) : (
                    <p>Nenhum prontuário encontrado para este paciente.</p>
                  )}
                </C.ProntuarioGrid>
  
                <Button Text={"Concluída"} onClick={() => handleConfirm(consultaSelecionada.id)} /> 
                <Button Text={"Prontuário"} onClick={handleProntuarioOpen}/>
  
                {isProntuarioModalOpen && (
                  <ProntuarioModal 
                    onClose={() => setProntuarioModalOpen(false)} 
                    onSave={handleProntuarioSave} 
                    cpfPaciente={consultaSelecionada.paciente} 
                    nomePaciente={consultaSelecionada.nome_paciente} 
                    consultaId={consultaSelecionada.id}
                  />
                )}
              </C.ModalBody>
            </C.ModalContent>
          </C.ModalOverlay>
        )}
  
        {/* Modal de visualização de prontuário */}
        {prontuarioVisualizado && (
          <ProntuarioViewModal 
            prontuario={prontuarioVisualizado} 
            onClose={closeViewProntuarioModal} 
          />
        )}
        
      </C.Container> 
    </div>
  );
}

export default HomeMedico;
