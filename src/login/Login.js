import styled from 'styled-components'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'

import Input from '../shared/Input'
import Button from '../shared/Button'

function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [buttonEnable, setButtonEnable] = useState(true)

    function signin(event) {
        event.preventDefault();
        if (!buttonEnable) return;
        if (buttonEnable) {
            setButtonEnable(false);
            
            const response = axios.post("http://localhost:5000/login", {
                email: loginData.email,
                password: loginData.password
            });

            response
                .then(() => navigate("/"))
                .catch(err => {
                    alert(`Ocorreu o erro ${err.response.statusText}. Por favor, tente novamente`);
                    setButtonEnable(true);
                })


        }
    }

    return (
        <LoginStyle>
            <Titulo>MyWallet</Titulo>
            <Form onSubmit={signin}>
                <Input
                    type="email"
                    placeholder="E-mail"
                    value={loginData.email}
                    functionOnChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    value={loginData.password}
                    functionOnChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
                <Button
                    input= {
                        buttonEnable ?
                            "Entrar" :
                            <ThreeDots color="#fff" height={70} width={70} />
                    }
                />
            </Form>
            <LinkLogin to='/cadastro'>
                Primeira vez? Cadastre-se!
            </LinkLogin>
        </LoginStyle>
    )
}

const LoginStyle = styled.div`
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

const LinkLogin = styled(Link)`
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
    margin-top: 25px;
    text-decoration: none;
`

export default Login