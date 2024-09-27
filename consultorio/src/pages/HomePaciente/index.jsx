import Header from '../../components/Header';
import * as C from "./styles";
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const HomePaciente = () => {
  const navigate = useNavigate();

  return (
    <div>
    <Header />
    <C.Container> 
      <C.LeftSide>
        <C.Title>
          Seja bem-vindo!
        </C.Title>
      </C.LeftSide>
      <C.RightSide>
        <C.Content>
        <C.Subtitle>Confira os horários do nosso consultório:</C.Subtitle>
        <Button Text={"Agendar!"} onClick={() => navigate('/agenda') }/>
        </C.Content>
      </C.RightSide>  
    </C.Container> 
    
    </div>
  );
}

export default HomePaciente;