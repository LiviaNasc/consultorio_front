import { useState } from 'react';
import InputMask from 'react-input-mask'; 
import * as C from "./styles";
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Input/Select';
import { useNavigate } from 'react-router-dom';

const SignupPaciente = () => {
    const navigate = useNavigate();

    const [nomePaciente, setNomePaciente] = useState('');
    const [cpf, setCpf] = useState("");
    const [dataNascimento, setDataNascimento] = useState('');
    const [dataNascimentoType, setDataNascimentoType] = useState('text');
    const [email, setEmail] = useState("");
    const [genero, setGenero] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'nomePaciente':
                setNomePaciente(value);
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

    const validateForm = () => {
        const errors = [];
        if (!nomePaciente) errors.push('Nome do paciente');
        if (!cpf) errors.push('CPF');
        if (!dataNascimento) errors.push('Data de nascimento');
        if (!email) errors.push('E-mail');
        if (!genero) errors.push('Gênero');
        if (!telefone) errors.push('Telefone');
        if (!senha) errors.push('Senha');
        return errors;
    }

    const handleSubmitPaciente = async (e) => {
        e.preventDefault();
    
        const errors = validateForm();
        if (errors.length > 0) {
            setError(`Campos faltando: ${errors.join(', ')}`);
            return;
        }
    
        const data = {
            user_name: nomePaciente,
            user_cpf: cpf,
            user_password: senha,
            user_email: email,
            user_data_nasc: dataNascimento,
            user_type: 'paciente',  
            user_genero: genero,
            user_telefone: telefone 
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
                throw new Error('Erro no cadastro 1');
            } else {
                navigate('/signin');
            }
        } catch (error) {
            setError('Erro ao cadastrar paciente');
            console.error(error);
        }
    };
    
    return (
        <C.Container> 
            <C.Form>
                <C.FormTitle>Cadastro de Paciente</C.FormTitle>

                <C.FormGroup>
                    <Input
                        type="text"
                        name="nomePaciente" 
                        placeholder="Digite o seu Nome"
                        value={nomePaciente}
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
                        type="password"
                        name="senha" 
                        placeholder="Digite sua Senha"
                        value={senha}
                        onChange={handleChange} 
                    />
                </C.FormGroup>
                
                {error && <C.ErrorMessage>{error}</C.ErrorMessage>}
                <Button Text='Cadastrar' onClick={handleSubmitPaciente} style={{backgroundColor: '#1b987b'}} />

                <C.LabelSignup>
                    Já possui uma conta?{" "}
                    <C.StrongText onClick={() => navigate("/signin")}>Faça login</C.StrongText>
                </C.LabelSignup>
                
            </C.Form>
        </C.Container>
    )
}

export default SignupPaciente;
