import * as C from './styles';
import Button from '../../components/Button';
import { FaUser, FaStethoscope } from 'react-icons/fa'; // Ícones para Paciente e Médico
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  return (
    <C.Container>
      <C.Content>
        <C.FormTitle>Como deseja se cadastrar?</C.FormTitle>

        <C.ButtonGroup>
          <C.ButtonWrapper>
            <FaUser size={60} style={{color: "#1b987b"}} />
            <Button Text="Paciente" onClick={() => navigate('/signup/paciente')} style={{backgroundColor: "#1b987b"}}>
            </Button>
          </C.ButtonWrapper>

          <C.ButtonWrapper>
            <FaStethoscope size={60} style={{color: '#00a0ba'}}/>
            <Button Text="Médico" onClick={() => navigate('/signup/medico')} style={{backgroundColor: '#00a0ba'}}>
            </Button>
          </C.ButtonWrapper>
        </C.ButtonGroup>
        <C.LabelSignup>
            Já possui cadastro?{" "}
            <C.StrongText onClick={() => navigate("/signin")}>Faça login</C.StrongText>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Signup;