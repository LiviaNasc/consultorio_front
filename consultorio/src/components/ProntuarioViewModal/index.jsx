import React from 'react';
import * as S from './styles';
import Button from '../Button';

const ProntuarioViewModal = ({ prontuario, onClose }) => {
  if (!prontuario) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <h3>Prontuário Completo</h3>
          <button onClick={onClose}>X</button>
        </S.ModalHeader>
        <S.ModalBody>
          <p><strong>Queixa principal:</strong> {prontuario.queixa_principal}</p>
          <p><strong>História da doença atual:</strong> {prontuario.historia_doenca_atual}</p>
          <p><strong>Antecedentes pessoais fisiológicos:</strong> {prontuario.antecedentes_pessoais_fisiologicos}</p>
          <p><strong>Antecedentes pessoais patológicos:</strong> {prontuario.antecedentes_pessoais_patologicos}</p>
          <p><strong>Antecedentes familiares:</strong> {prontuario.antecedentes_familiares}</p>
          <p><strong>Hábitos e condições de vida:</strong> {prontuario.habitos_condicoes_vida}</p>
          <p><strong>Subjetivo:</strong> {prontuario.subjetivo}</p>
          <p><strong>Objetivo:</strong> {prontuario.objetivo}</p>
          <p><strong>Peso:</strong> {prontuario.peso} kg</p>
          <p><strong>Altura:</strong> {prontuario.altura} cm</p>
          <p><strong>IMC:</strong> {prontuario.imc}</p>
          <p><strong>Pressão Arterial:</strong> {prontuario.pressao_arterial}</p>
          <p><strong>Frequência Respiratória:</strong> {prontuario.frequencia_respiratoria}</p>
          <p><strong>Frequência Cardíaca:</strong> {prontuario.frequencia_cardiaca}</p>
          <p><strong>Temperatura:</strong> {prontuario.temperatura} °C</p>
          <p><strong>Saturação de O2:</strong> {prontuario.saturacao_o2} %</p>
          <p><strong>Vacinação em dia:</strong> {prontuario.vacina_em_dia ? 'Sim' : 'Não'}</p>
          <p><strong>Exames Solicitados:</strong> {prontuario.exames_solicitados}</p>
          <p><strong>Avaliação:</strong> {prontuario.avaliacao}</p>
          <p><strong>Problema/Condição Detectada:</strong> {prontuario.problema_condicao}</p>
          <p><strong>Plano:</strong> {prontuario.plano}</p>
        </S.ModalBody>
        <S.ModalFooter>
          <Button Text="Fechar" onClick={onClose} />
        </S.ModalFooter>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default ProntuarioViewModal;
