import { useState } from 'react';
import InputMask from 'react-input-mask'; // Importe o InputMask
import * as C from "./styles";
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Input/Select';
import { useNavigate } from 'react-router-dom';

const SignupMedico = () => {
    const navigate = useNavigate();

    const [nomeMedico, setNomeMedico] = useState('');
    const [cpf, setCpf] = useState("");
    const [dataNascimento, setDataNascimento] = useState('');
    const [dataNascimentoType, setDataNascimentoType] = useState('text');
    const [email, setEmail] = useState("");
    const [genero, setGenero] = useState("");
    const [especialidade, setEspecialidade] = useState("");
    const [crm, setCrm] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'nomeMedico':
                setNomeMedico(value);
                break;
            case 'cpf':
                setCpf(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'dataNascimento':
                setDataNascimento(value);
                break;
            case 'senha':
                setSenha(value);
                break;
            case 'genero': 
                setGenero(value);
                break;
            case 'especialidade':
                setEspecialidade(value);
                break;
            case 'crm':
                setCrm(value);
                break;
            case 'telefone':
                setTelefone(value);
                break;
            default:
                break;
        }
        setError(""); 
    }

    const handleBlur = () => {
        if (!dataNascimento) {
            setDataNascimentoType('text');
        }
    }

    const handleFocus = () => {
        setDataNascimentoType('date');
    }

    const handleSubmitMedico = async (e) => {
        e.preventDefault();

        const data = {
            user_name: nomeMedico,
            user_cpf: cpf,
            user_password: senha,
            user_email: email,
            user_data_nasc: dataNascimento,
            user_type: 'doctor',  
            user_genero: genero,
            user_telefone: telefone, 
            doctor_especialidade: especialidade,
            doctor_crm: crm
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (!response.ok) {
                console.log(result);
                throw new Error(`Erro no cadastro ${result} res`);
            } else{
                navigate('/singin')
            }

           
            // Redirecionar ou exibir mensagem de sucesso
        } catch (error) {
            setError('Erro ao cadastrar médico ');
            console.error(error);
        }
    };

    return (
        <C.Container> 
            <C.Form>
                <C.FormTitle>Cadastro de Médico</C.FormTitle>

                <C.FormGroup>
                    <Input
                        type="text"
                        name="nomeMedico" 
                        placeholder="Digite o seu Nome"
                        value={nomeMedico}
                        onChange={handleChange} 
                    />
                </C.FormGroup>

                <C.FormGroup>
                    <InputMask
                        mask="999.999.999-99"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    >
                        {() => (
                            <Input
                                type="text"
                                name="cpf"
                                placeholder="Digite seu CPF"
                            />
                        )}
                    </InputMask>
                </C.FormGroup>

                <C.FormGroup>
                    <Input
                        type={dataNascimentoType}
                        name="dataNascimento" 
                        placeholder="Data de nascimento"
                        value={dataNascimento}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange} 
                    />
                </C.FormGroup>

                <C.FormGroup>
                    <Input
                        type="email"
                        name="email" 
                        placeholder="Digite e-mail"
                        value={email}
                        onChange={handleChange} 
                    />
                </C.FormGroup>

                <C.FormGroup>
                    <Select
                        name="genero"
                        value={genero}
                        onChange={handleChange}
                        options={[
                            { value: '', label: 'Selecione o Gênero' },
                            { value: 'masculino', label: 'Masculino' },
                            { value: 'feminino', label: 'Feminino' }
                        ]}
                    />
                </C.FormGroup>

                <C.FormGroup>
                    <Input
                        type="text"
                        name="telefone" 
                        placeholder="Telefone"
                        value={telefone}
                        onChange={handleChange} 
                    />
                </C.FormGroup>

                <C.FormGroup>
                    <Input
                        type="text"
                        name="especialidade" 
                        placeholder="Digite sua especialidade"
                        value={especialidade}
                        onChange={handleChange} 
                    />
                </C.FormGroup>

                <C.FormGroup>
                    <Input
                        type="text"
                        name="crm" 
                        placeholder="CRM"
                        value={crm}
                        onChange={handleChange} 
                    />
                </C.FormGroup>

                <C.FormGroup>
                    <Input
                        type="password"
                        name="senha" 
                        placeholder="Digite sua Senha"
                        value={senha}
                        onChange={handleChange} 
                    />
                </C.FormGroup>

                {error && <C.ErrorMessage>{error}</C.ErrorMessage>}
                <Button Text='Cadastrar' onClick={handleSubmitMedico} />

                <C.LabelSignup>
                    Ainda não possui uma conta?{" "}
                    <C.StrongText onClick={() => navigate("/signin")}>Faça login</C.StrongText>
                </C.LabelSignup>
                
            </C.Form>
        </C.Container>
    )
}

export default SignupMedico;
