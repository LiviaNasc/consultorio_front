import { useNavigate } from 'react-router-dom'; 
import { Container, Content } from './styles';
import { 
  FaTimes, 
  FaHome, 
  FaRegCalendarAlt,
  FaSignOutAlt,
  FaUserMd
} from 'react-icons/fa';

import SidebarItem from '../SidebarItem';

const Sidebar = ({ active }) => {
  const navigate = useNavigate(); 

  const closeSidebar = () => {
    active(false);
  };

  const handleHomeRedirect = () => {
    const userType = localStorage.getItem('user_type');

    if (userType === 'doctor') {
      navigate('/home/medico');
    } else if (userType === 'paciente') {
      navigate('/home/paciente');
    } 
  };

  const handleLogout = () => {
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_cpf');
    localStorage.removeItem('user_name');
    navigate('/'); 
  };

  const handleConsultasRedirect = () => {
    const userType = localStorage.getItem('user_type');

    if (userType === 'doctor') {
      navigate('/consultas/medico'); 
    } else if (userType === 'paciente') {
      navigate('/consultas'); 
    } 
  };

  //agendamento de consultas
  const handleAgendaRedirect = () => {
      const userType = localStorage.getItem('user_type');
  
      if (userType === 'doctor') {
        navigate('/agenda/medico');
      } else if (userType === 'paciente') {
        navigate('/agenda');
      }
    };

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />  
      <Content>
        <SidebarItem Icon={FaHome} Text="Home" onClick={handleHomeRedirect}/>
        <SidebarItem Icon={FaRegCalendarAlt} Text="Agendar" onClick={handleAgendaRedirect} />
        <SidebarItem Icon={FaUserMd} Text="Consultas" onClick={handleConsultasRedirect} /> 
        <SidebarItem Icon={FaSignOutAlt} Text="Sair" onClick={handleLogout} /> 
      </Content>
    </Container>
  );
};

export default Sidebar;
