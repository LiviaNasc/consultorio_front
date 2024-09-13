import React from 'react';
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

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />  
      <Content>
        <SidebarItem Icon={FaHome} Text="Home" />
        <SidebarItem Icon={FaRegCalendarAlt} Text="Agenda" />
        <SidebarItem Icon={FaSignOutAlt} Text="Sair" onClick={handleLogout} /> 
      </Content>
    </Container>
  );
};

export default Sidebar;
