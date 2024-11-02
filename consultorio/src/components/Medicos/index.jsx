import { useState, useEffect } from 'react';
import * as C from './styles';
import { FaUserMd, FaCheck, FaExchangeAlt  } from 'react-icons/fa';  
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

    const date = e.target.value;
    setSelectedDate(date);
    setHorariosDisponiveis([]); 
    if (!isWeekday(date)) {
      e.target.setCustomValidity("Por favor, selecione uma data entre segunda e sexta-feira.");
      e.target.reportValidity(); 
      return; 
    } else {
      e.target.setCustomValidity("");
      e.target.reportValidity();
    }

    if (selectedMedico && e.target.value && date) {
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

  const isWeekday = (date) => {
    const day = new Date(date + 'T00:00:00Z').getUTCDay(); 
    return day !== 0 && day !== 6; 
  };

  const today = new Date().toISOString().split("T")[0];

  const handleAgendarConsulta = async () => {
    if (!selectedHorario || selectedHorario === '') {
    alert('Por favor, selecione um horário disponível.');
    return;
    }

    const consulta = {
      data_hora: selectedHorario,  
      motivo: motivoConsulta,      
      paciente: pacienteCPF,       
      medico: selectedMedico,      
    };

    try {
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
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={today}
          />

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

          <C.ButtonGroup>
            <C.Button onClick={handleAgendarConsulta} className="confirmar">
              <FaCheck /> Confirmar Agendamento
            </C.Button>
            <C.Button onClick={handleTrocarMedico} className="trocar">
              <FaExchangeAlt /> Trocar Médico
            </C.Button>
          </C.ButtonGroup>
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

          <C.ButtonGroup>
            <C.Button onClick={handleMarcarConsulta} className="confirmar">
              <FaCheck /> Marcar Consulta
            </C.Button>
          </C.ButtonGroup>
        </C.Box>
      )}
    </C.Container>
  );
};

export default ListaMedicos;
