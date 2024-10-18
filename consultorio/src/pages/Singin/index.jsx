import { useState } from 'react';
import InputMask from 'react-input-mask';
import * as C from "./styles";
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();

  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  return (
    <C.Container>
      <C.LeftSide>
        <C.Title>Consultório Rodrigues</C.Title>
        <C.Subtitle>Cuidando da sua saúde com dedicação e confiança, do agendamento à recuperação.</C.Subtitle>
      </C.LeftSide>

      <C.RightSide>
        <C.Content>
          <C.Form>
            <C.FormTitle>Bem-vindo de volta!</C.FormTitle>

            <C.FormGroup>
              {error && <C.ErrorMessage>{error}</C.ErrorMessage>}
              <InputMask
                mask="999.999.999-99"
                value={cpf}
                onChange={(e) => [setCpf(e.target.value), setError("")]}
              >
                {(inputProps) => <Input {...inputProps} placeholder="Digite seu CPF" />}
              </InputMask>
            </C.FormGroup>

            <C.FormGroup>
              <Input
                type="password"
                placeholder="Digite sua Senha"
                value={senha}
                onChange={(e) => [setSenha(e.target.value), setError("")]}
              />
            </C.FormGroup>

            <Button Text='Entrar' onClick={async () => {
              setError(""); // Limpa erros anteriores
              if (!cpf || !senha) {
                setError("CPF e senha são obrigatórios!");
                return;
              }

              try {
                const response = await fetch('http://127.0.0.1:8000/api/login/', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    user_cpf: cpf,
                    user_password: senha,
                  }),
                });

                const data = await response.json();

                if (!response.ok) {
                  throw new Error(data.message || 'Erro na autenticação');
                } else {
                  localStorage.setItem('user_cpf', data.user.user_cpf);
                  if (data.user.user_type === 'doctor') {
                    localStorage.setItem('user_type', 'doctor');
                    navigate("/home/medico");
                  } else if (data.user.user_type === 'paciente') {
                    localStorage.setItem('user_type', 'paciente');
                    navigate("/home/paciente");
                  }
                }

                console.log('Resposta do servidor:', data);
              } catch (error) {
                console.error('Erro:', error);
                setError(error.message);
              }
            }} />

            <C.LabelSignup>
              Ainda não tem uma conta?{" "}
              <C.StrongText onClick={() => navigate("/signup")}>Cadastre-se</C.StrongText>
            </C.LabelSignup>
            
          </C.Form>
        </C.Content>
      </C.RightSide>
    </C.Container>
  );
}

export default Signin;
