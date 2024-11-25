import  { useState, useEffect } from 'react';
import ProntuarioViewModal from '../../components/ProntuarioViewModal';
import axios from 'axios';
import * as S from './styles';
import Header from '../../components/Header';

const ProntuarioPaciente = () => {
  const [prontuarios, setProntuarios] = useState([]);
  const [selectedProntuario, setSelectedProntuario] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const cpfPaciente = localStorage.getItem('user_cpf'); // CPF do paciente

  useEffect(() => {
    // Carregar os prontuários do paciente
    const fetchProntuarios = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/prontuarios/paciente/${cpfPaciente}`);
        setProntuarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar prontuários:", error);
      }
    };
    fetchProntuarios();
  }, [cpfPaciente]);

  const openViewModal = (prontuario) => {
    setSelectedProntuario(prontuario);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedProntuario(null);
    setIsViewModalOpen(false);
  };


  return (
    <>
    <Header/>
    <S.PageContainer>
    <S.Title>Meus prontuários</S.Title>
      <S.ProntuarioList>
        {prontuarios.map((prontuario) => (
          <S.ProntuarioItem key={prontuario.id} onClick={() => openViewModal(prontuario)}>
            <p><strong>Médico:</strong> {prontuario.medico_nome}</p>
            <p><strong>Motivo:</strong> {prontuario.queixa_principal}</p>
          </S.ProntuarioItem>
        ))}
      </S.ProntuarioList>

      {isViewModalOpen && (
        <ProntuarioViewModal prontuario={selectedProntuario} onClose={closeViewModal} />
      )}

    </S.PageContainer>
    </>
  );
};

export default ProntuarioPaciente;
