// ProntuarioModal.jsx
import React, { useState } from 'react';
import * as S from './styles';
import Button from '../../components/Button';
import axios from 'axios';

const ProntuarioModal = ({ onClose, onSave, cpfPaciente, nomePaciente, consultaId}) => {
  const [currentPage, setCurrentPage] = useState('anamnese');
  const [nome, setNome] = useState(nomePaciente);
  const [cpf, setCpf] = useState(cpfPaciente);
  const [queixaPrincipal, setQueixaPrincipal] = useState('');
  const [historiaDoencaAtual, setHistoriaDoencaAtual] = useState('');
  const [antecedentesPessoaisFisiologicos, setAntecedentesPessoaisFisiologicos] = useState('');
  const [antecedentesPessoaisPatologicos, setAntecedentesPessoaisPatologicos] = useState('');
  const [antecedentesFamiliares, setAntecedentesFamiliares] = useState('');
  const [habitosCondicoesVida, setHabitosCondicoesVida] = useState('');
  
  const [subjetivo, setSubjetivo] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [pressaoArterial, setPressaoArterial] = useState('');
  const [frequenciaRespiratoria, setFrequenciaRespiratoria] = useState('');
  const [frequenciaCardiaca, setFrequenciaCardiaca] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [saturacaoO2, setSaturacaoO2] = useState('');
  const [vacinaEmDia, setVacinaEmDia] = useState(false);
  const [examesSolicitados, setExamesSolicitados] = useState('');
  const [avaliacao, setAvaliacao] = useState('');
  const [problemaCondicao, setProblemaCondicao] = useState('');
  const [plano, setPlano] = useState('');

  const calculateIMC = () => {
    if (peso && altura) {
      const alturaMetros = altura / 100;
      return (peso / (alturaMetros * alturaMetros)).toFixed(2);
    }
    return '';
  };

  const handleNext = () => {
    setCurrentPage('soap');
  };

  const handleBack = () => {
    setCurrentPage('anamnese');
  };

  const handleSave = async () => {
    const prontuarioData = {
        consulta: consultaId,
        nome,
        cpf,
        queixa_principal: queixaPrincipal,
        historia_doenca_atual: historiaDoencaAtual,
        antecedentes_pessoais_fisiologicos: antecedentesPessoaisFisiologicos,
        antecedentes_pessoais_patologicos: antecedentesPessoaisPatologicos,
        antecedentes_familiares: antecedentesFamiliares,
        habitos_condicoes_vida: habitosCondicoesVida,
        subjetivo,
        objetivo,
        peso: parseFloat(peso),  
        altura: parseFloat(altura), 
        pressao_arterial: pressaoArterial,
        frequencia_respiratoria: frequenciaRespiratoria,
        frequencia_cardiaca: frequenciaCardiaca,
        temperatura: parseFloat(temperatura), 
        saturacao_o2: parseFloat(saturacaoO2), 
        vacina_em_dia: vacinaEmDia,
        exames_solicitados: examesSolicitados,
        avaliacao,
        problema_condicao: problemaCondicao,
        plano,
        medico_nome: localStorage.getItem('user_name'),
        medico_cpf: localStorage.getItem('user_cpf')
      };
    
  
    console.log("Payload sendo enviado:", prontuarioData);
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/prontuarios/criar/', prontuarioData);
      alert("Prontuário salvo com sucesso!");
      onSave(prontuarioData);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar o prontuário:", error.response?.data || error.message);
      alert("Erro ao salvar o prontuário. Verifique os dados e tente novamente.");
    }
  };

  const handleAutopreencher = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/prontuarios/ultima-anamnese/${cpfPaciente}/`);
      const anamneseData = response.data;
      

      setQueixaPrincipal(anamneseData.queixa_principal);
      setHistoriaDoencaAtual(anamneseData.historia_doenca_atual);
      setAntecedentesPessoaisFisiologicos(anamneseData.antecedentes_pessoais_fisiologicos);
      setAntecedentesPessoaisPatologicos(anamneseData.antecedentes_pessoais_patologicos);
      setAntecedentesFamiliares(anamneseData.antecedentes_familiares);
      setHabitosCondicoesVida(anamneseData.habitos_condicoes_vida);

    } catch (error) {
      console.error("Erro ao buscar anamnese:", error);
      alert("Erro ao buscar anamnese anterior. Verifique se o paciente possui prontuários anteriores.");
    }
  };

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <h3>Prontuário - {currentPage === 'anamnese' ? 'Anamnese' : 'SOAP'}</h3>
          <button onClick={onClose}>X</button>
        </S.ModalHeader>
        <S.ModalBody>
          {currentPage === 'anamnese' ? (
            <>
              <S.FieldGroup>
                <S.FieldHalf>
                  <label>Nome</label>
                  <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </S.FieldHalf>
                <S.FieldHalf>
                  <label>CPF</label>
                  <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </S.FieldHalf>
              </S.FieldGroup>
              <S.FieldHalf>
                <label>Queixa principal e duração</label>
                <input type="text" value={queixaPrincipal} onChange={(e) => setQueixaPrincipal(e.target.value)} />
                </S.FieldHalf>
                
                <S.FieldHalf>
                    <label>História da Doença Atual</label>
                    <input type="text" value={historiaDoencaAtual} onChange={(e) => setHistoriaDoencaAtual(e.target.value)} />
                </S.FieldHalf>

                <S.FieldHalf>
                    <label>Antecedentes pessoais fisiológicos</label>
                    <input type="text" value={antecedentesPessoaisFisiologicos} onChange={(e) => setAntecedentesPessoaisFisiologicos(e.target.value)} />
                </S.FieldHalf>
                
                <S.FieldHalf>
                    <label>Antecedentes pessoais patológicos</label>
                    <input type="text" value={antecedentesPessoaisPatologicos} onChange={(e) => setAntecedentesPessoaisPatologicos(e.target.value)} />
                </S.FieldHalf>

                <S.FieldHalf>
                    <label>Antecedentes familiares</label>
                    <input type="text" value={antecedentesFamiliares} onChange={(e) => setAntecedentesFamiliares(e.target.value)} />
                </S.FieldHalf>

                <S.FieldHalf>
                    <label>Hábitos e condições de vida</label>
                    <input type="text" value={habitosCondicoesVida} onChange={(e) => setHabitosCondicoesVida(e.target.value)} />
                </S.FieldHalf>
                <S.ModalFooter><Button Text="Autopreencher" onClick={handleAutopreencher} /><Button Text="Próximo" onClick={handleNext} /></S.ModalFooter>
              
            </>
          ) : (
            <>
            <S.FieldHalf>
                <label>Subjetivo</label>
                <input type="text" value={subjetivo} onChange={(e) => setSubjetivo(e.target.value)} />
            </S.FieldHalf>
              
            <S.FieldHalf>
                <label>Objetivo</label>
                <input type="text" value={objetivo} onChange={(e) => setObjetivo(e.target.value)} />
            </S.FieldHalf>
              
              

              <S.FieldGroup>
                <S.FieldHalf>
                  <label>Peso (kg)</label>
                  <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} />
                </S.FieldHalf>
                <S.FieldHalf>
                  <label>Altura (cm)</label>
                  <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} />
                </S.FieldHalf>
              </S.FieldGroup>
              <p>IMC: {calculateIMC()}</p>

              <S.FieldHalf>
                <label>Pressão Arterial</label>
                <input type="text" value={pressaoArterial} onChange={(e) => setPressaoArterial(e.target.value)} />
              </S.FieldHalf>
              

              <S.FieldHalf>
                <label>Frequência Respiratória</label>
                <input type="text" value={frequenciaRespiratoria} onChange={(e) => setFrequenciaRespiratoria(e.target.value)} />
              </S.FieldHalf>
              
              <S.FieldHalf>
                <label>Frequência Cardíaca</label>
                <input type="text" value={frequenciaCardiaca} onChange={(e) => setFrequenciaCardiaca(e.target.value)} />
              </S.FieldHalf>
              
              <S.FieldHalf>
                <label>Temperatura (°C)</label>
                <input type="text" value={temperatura} onChange={(e) => setTemperatura(e.target.value)} />
              </S.FieldHalf>
              
              <S.FieldHalf>
                <label>Saturação de O2 (%)</label>
                <input type="text" value={saturacaoO2} onChange={(e) => setSaturacaoO2(e.target.value)} />
              </S.FieldHalf>
              
                <div>
                    <label>Vacinação em dia</label> <input type="checkbox" checked={vacinaEmDia} onChange={(e) => setVacinaEmDia(e.target.checked)} />
                </div>
                

              
              <S.FieldHalf>
                <label>Exames Solicitados</label>
                <input type="text" value={examesSolicitados} onChange={(e) => setExamesSolicitados(e.target.value)} />
              </S.FieldHalf>
              
              <S.FieldHalf>
                <label>Avaliação</label>
                <input type="text" value={avaliacao} onChange={(e) => setAvaliacao(e.target.value)} />
              </S.FieldHalf>
              
              <S.FieldHalf>
                <label>Problema/Condição Detectada</label>
                <input type="text" value={problemaCondicao} onChange={(e) => setProblemaCondicao(e.target.value)} />
              </S.FieldHalf>
              
              <S.FieldHalf>
                <label>Plano</label>
                <input type="text" value={plano} onChange={(e) => setPlano(e.target.value)} />
              </S.FieldHalf>
              
              <S.ModalFooter>
                <Button Text="Voltar" onClick={handleBack} />
                <Button Text="Salvar" onClick={handleSave} />
              </S.ModalFooter>
            </>
          )}
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default ProntuarioModal;
