import { useState, useEffect } from 'react'; 
import * as C from './styles';
import { useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';


const ListaPacientes = () => {
  const navigate = useNavigate();
  const [selectedPaciente, setSelectedPaciente] = useState('');
  const [pacienteNome, setPacienteNome] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState('');
  const [motivoConsulta, setMotivoConsulta] = useState('');
  
  const selectedMedico = localStorage.getItem('user_cpf'); // CPF do médico logado
  const cpfMask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  const handlePacienteCpfChange = async (e) => {
    const cpf = e.target.value;
    setSelectedPaciente(cpf);
  };

  const handleDateChange = async (e) => {
    setSelectedDate(e.target.value);

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

  const handleAgendarConsulta = async () => {
    if (!selectedHorario) {
      alert('Por favor, selecione um horário disponível.');
      return;
    }

    const consulta = {
      data_hora: selectedHorario,
      motivo: motivoConsulta,
      paciente: selectedPaciente,
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
        alert('Consulta marcada com sucesso!');
        navigate('/home/medico');
      } else {
        alert('Erro ao marcar consulta. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao marcar consulta:', error);
    }
  };

  return (
    <C.Container>
        <C.Form>
          <h3>Marcar Consulta</h3>
          
          <label>CPF do Paciente:</label>
          <MaskedInput
          mask={cpfMask}
          className="input-cpf"
          placeholder="Digite o CPF do paciente"
          value={selectedPaciente}
          onChange={handlePacienteCpfChange}
        />

          <label>Data da Consulta:</label>
          <input type="date" value={selectedDate} onChange={handleDateChange} />

          {horariosDisponiveis.length > 0 && (
            <>
              <label>Horário da Consulta:</label>
              <select value={selectedHorario} onChange={(e) => setSelectedHorario(e.target.value)}>
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
        </C.Form>
    </C.Container>
  );
};

export default ListaPacientes;
