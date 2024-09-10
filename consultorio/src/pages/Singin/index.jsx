import React, { useState } from 'react';
import * as C from "./styles";
import Button from '../../components/Button';
import  Input  from '../../components/Input';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();

  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

    return (
      <C.Container>
        <C.LeftSide>
          <C.Title>Nome do negócio</C.Title>
          <C.Subtitle>Frase alguma coisa blablabla consultório</C.Subtitle>
        </C.LeftSide>
    
        <C.RightSide>
          <C.Content>
            <C.Form>
              <C.FormTitle>Bem-vindo de volta!</C.FormTitle>
    
              <C.FormGroup>
              {error && <C.ErrorMessage>{error}</C.ErrorMessage>}
                <Input
                  type="text"
                  placeholder="Digite seu E-mail"
                  value={cpf}
                  onChange={(e) => [setCpf(e.target.value), setError("")]}
                />

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
                  setError("Email e senha são obrigatórios!");
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
                  }else{
                    navigate("/home");
                  }

                  console.log('Resposta do servidor:', data);
                } catch (error) {
                  console.error('Erro:', error);
                  setError(error.message);
                }
              }}  />
            </C.Form>
          </C.Content>
        </C.RightSide>
      </C.Container>
    );
}

export default Signin;
