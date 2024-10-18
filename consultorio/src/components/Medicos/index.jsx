import { useState, useEffect } from 'react';
import * as C from './styles';
import { FaUserMd } from 'react-icons/fa';  
import { useNavigate } from 'react-router-dom';

const ListaMedicos = () => {
  const navigate = useNavigate(); 
  const [medicos, setMedicos] = useState([]);
  const [selectedMedico, setSelectedMedico] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState('');
  const [pacienteCPF, setPacienteCPF] = useState(localStorage.getItem('user_cpf'));
  const [motivoConsulta, setMotivoConsulta] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  // useEffect para buscar os médicos da API
  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/users/medicos/');
        const data = await response.json();
        setMedicos(data);
        setSelectedMedico(data[0]?.user_cpf || '');
      } catch (error) {
        console.error('Erro ao buscar médicos:', error);
      }
    };

    fetchMedicos();
  }, []);

  const handleChangeMedico = (e) => {
    setSelectedMedico(e.target.value);
    setSelectedHorario('');
    setHorariosDisponiveis([]);
  };

  const handleDateChange = async (e) => {
    setSelectedDate(e.target.value);

    // Busca os horários disponíveis para o médico e data selecionados
    if (selectedMedico && e.target.value) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/consultas/horarios/${selectedMedico}/${e.target.value}`);
        const data = await response.json();
        setHorariosDisponiveis(data.horarios_disponiveis);
      } catch (error) {
        console.error('Erro ao buscar horários:', error);
      }
    }
  };

  const handleMarcarConsulta = () => {
    setIsFormVisible(true);
  };

  const handleTrocarMedico = () => {
    setIsFormVisible(false);
  };

  const handleAgendarConsulta = async () => {
    if (!selectedHorario || selectedHorario === '') {
    alert('Por favor, selecione um horário disponível.');
    return;
    }

    // Criar o objeto para enviar na requisição com os campos especificados
    const consulta = {
      data_hora: selectedHorario,  
      motivo: motivoConsulta,      
      paciente: pacienteCPF,       
      medico: selectedMedico,      
    };

    try {
      // Requisição POST para marcar a consulta
      const response = await fetch('http://127.0.0.1:8000/api/consultas/marcar/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consulta),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Consulta marcada com sucesso!');
        console.log('Consulta marcada:', data);
        navigate('/home/paciente'); 
      } else {
        alert('Erro ao marcar consulta. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao marcar consulta:', error);
    }
  };

  const medicoSelecionado = medicos.find(medico => medico.user_cpf === selectedMedico);

  return (
    <C.Container>
      {isFormVisible ? (
        <C.Form>
          <h3>Marcar Consulta</h3>
          <label>CPF do Paciente:</label>
          <input 
            type="text" 
            placeholder="CPF do Paciente" 
            value={pacienteCPF}
            onChange={(e) => setPacienteCPF(e.target.value)}
          />

          <label>Nome do Médico:</label>
          <input type="text" value={medicoSelecionado?.user_name} readOnly />

          <label>CPF do Médico:</label>
          <input type="text" value={medicoSelecionado?.user_cpf} readOnly />

          <label>Data da Consulta:</label>
          <input type="date" value={selectedDate} onChange={handleDateChange} />

          {horariosDisponiveis.length > 0 && (
            <>
                <label>Horário da Consulta:</label>
                <select 
                value={selectedHorario} 
                onChange={(e) => setSelectedHorario(e.target.value)}
                >
                <option value="">-- Selecione --</option>
                {horariosDisponiveis.map((horario, index) => (
                    <option key={index} value={horario}>
                    {new Date(horario).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </option>
                ))}
                </select>
            </>
            )}

          <label>Motivo da Consulta:</label>
          <textarea 
            placeholder="Descreva o motivo da consulta" 
            value={motivoConsulta}
            onChange={(e) => setMotivoConsulta(e.target.value)}
          ></textarea>

          <C.Button onClick={handleAgendarConsulta}>Confirmar Agendamento</C.Button>

          <C.Button onClick={handleTrocarMedico}>
            Trocar Médico
          </C.Button>
        </C.Form>
      ) : (
        <C.Box>
          <C.IconContainer>
            <FaUserMd size={100} color="gray" />
          </C.IconContainer>

          <h3>{medicoSelecionado?.user_name || 'Nenhum médico selecionado'}</h3>

          <select value={selectedMedico} onChange={handleChangeMedico}>
            {medicos.length > 0 ? (
              medicos.map(medico => (
                <option key={medico.user_cpf} value={medico.user_cpf}>
                  {medico.user_name} - {medico.doctor_especialidade}
                </option>
              ))
            ) : (
              <option value="">Carregando médicos...</option>
            )}
          </select>

          <C.Button onClick={handleMarcarConsulta}>
            Marcar Consulta
          </C.Button>
        </C.Box>
      )}
    </C.Container>
  );
};

export default ListaMedicos;
