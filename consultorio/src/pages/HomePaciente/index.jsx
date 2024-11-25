import Header from '../../components/Header';
import * as C from "./styles";
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const HomePaciente = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'fixed' ,  width: '100%'}}>
      <Header />
      <C.Container> 
        <C.LeftSide>
          <C.Title>
            Seja bem-vindo!
          </C.Title>
        </C.LeftSide>
        
        <C.RightSide>
          <C.InfoCard> 
            <C.Subtitle>Agende uma consulta com o médico de sua preferêcia</C.Subtitle>
            <Button Text={"Agendar!"} onClick={() => navigate('/agenda') }/>
          </C.InfoCard>
        </C.RightSide>  
      </C.Container> 
    </div>
  );
}

export default HomePaciente;
