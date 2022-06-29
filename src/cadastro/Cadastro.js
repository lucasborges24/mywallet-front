import styled from 'styled-components'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios'

import Input from '../shared/Input'
import Button from '../shared/Button'

function Cadastro() {

    const navigate = useNavigate();

    const [cadastroData, setCadastroData] = useState({name: '', email: '', password: '', confirmPassword: ''})
    const [buttonEnable, setButtonEnable] = useState(true)

    function checkPasswords(password, confirmPassword) {
        if (password !== confirmPassword ) return false;
        return true;
    }

    function signup(event) {
        event.preventDefault();
        if (!buttonEnable) return;
        if (buttonEnable) {
            setButtonEnable(false);
            const passwordValid = checkPasswords(cadastroData.password, cadastroData.confirmPassword)
            if (!passwordValid) {
                setButtonEnable(true)
                return alert('senhas sao diferentes');
            }
            const response = axios.post("http://localhost:5000/cadastro", {
                name: cadastroData.name,
                email: cadastroData.email,
                password: cadastroData.password
            });

            response
                .then(() => navigate("/login"))
                .catch(err => {
                    alert(`Ocorreu o erro ${err.response.statusText}. Por favor, tente novamente`);
                    setButtonEnable(true);
                })


        }
    }

    return (
        <CadastroStyle>
            <Titulo>MyWallet</Titulo>
            <Form onSubmit={signup}>
                <Input
                    type="text"
                    placeholder="Nome"
                    value={cadastroData.name}
                    functionOnChange={(e) => setCadastroData({ ...cadastroData, name: e.target.value })}
                />
                <Input
                    type="email"
                    placeholder="E-mail"
                    value={cadastroData.email}
                    functionOnChange={(e) => setCadastroData({ ...cadastroData, email: e.target.value })}
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    value={cadastroData.password}
                    functionOnChange={(e) => setCadastroData({ ...cadastroData, password: e.target.value })}
                />
                <Input
                    type="password"
                    placeholder="Confirme a senha"
                    value={cadastroData.confirmPassword}
                    functionOnChange={(e) => setCadastroData({ ...cadastroData, confirmPassword: e.target.value })}
                />
                <Button
                    input= {
                        buttonEnable ?
                            "Cadastrar" :
                            <ThreeDots color="#fff" height={70} width={70} />
                    }
                />
            </Form>
            <LinkCadastro to='/login'>
                Já tem uma conta? Entre agora!
            </LinkCadastro>
        </CadastroStyle>
    )
}

const CadastroStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%)
`

const Titulo = styled.h1`
    font-family: 'Saira Stencil One';
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
    margin-bottom: 25px;
`

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const LinkCadastro = styled(Link)`
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
    margin-top: 25px;
    text-decoration: none;
`

export default Cadastro