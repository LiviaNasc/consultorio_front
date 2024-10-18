import { useNavigate } from 'react-router-dom'; 
import { Container, Content } from './styles';
import { 
  FaTimes, 
  FaHome, 
  FaRegCalendarAlt,
  FaSignOutAlt
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
    navigate('/'); 
  };

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />  
      <Content>
        <SidebarItem Icon={FaHome} Text="Home" onClick={handleHomeRedirect}/>
        <SidebarItem Icon={FaRegCalendarAlt} Text="Agenda" onClick={() => navigate('/agenda')} />
        <SidebarItem Icon={FaRegCalendarAlt} Text="Consultas" onClick={() => navigate('/consultas')} />
        <SidebarItem Icon={FaSignOutAlt} Text="Sair" onClick={handleLogout} /> 
      </Content>
    </Container>
  );
};

export default Sidebar;
