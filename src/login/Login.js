import styled from 'styled-components'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ThreeDots, BallTriangle } from 'react-loader-spinner'

import Input from '../shared/Input'
import Button from '../shared/Button'
import UserContext from '../context/UserContext'
import { useEffect } from 'react'

function Login() {

    const { setUserToken } = useContext(UserContext)
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [buttonEnable, setButtonEnable] = useState(true)

    useEffect(() => {
        if ((JSON.parse(localStorage.getItem("loginDataStoraged"))) !== null) {
            const dataStoraged = JSON.parse(localStorage.getItem("loginDataStoraged"))
            
            const res = axios.post("http://localhost:5000/login", {
                email: dataStoraged.email,
                password: dataStoraged.password
            });

            res
                .then(({ data }) => {
                    setUserToken(data)
                    
                    navigate('/')
                })
                .catch(err => {
                    localStorage.removeItem("loginDataStoraged")
                    
                })
        }
    }, [])

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
                .then(({ data }) => {
                    setUserToken(data);
                    console.log(data);
                    localStorage.setItem("loginDataStoraged", JSON.stringify(loginData))
                    navigate('/')
                })
                .catch(err => {
                    alert(`Ocorreu o erro ${err.response.statusText}. Por favor, tente novamente`);
                    setButtonEnable(true);
                })


        }
    }

    function loginForms() {
        return (
            <>
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
                        input={
                            buttonEnable ?
                                "Entrar" :
                                <ThreeDots color="#fff" height={70} width={70} />
                        }
                    />
                </Form>
                <LinkLogin to='/cadastro'>
                    Primeira vez? Cadastre-se!
                </LinkLogin>
            </>
        )
    }

    return (
        <LoginStyle>
            {loginForms()}
        </LoginStyle>
    )
}

const LoginStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 0 10px;
    margin: auto 0;
    height: 100vh;
`

const Titulo = styled.h1`
    font-family: 'Saira Stencil One';
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
    margin-bottom: 25px;
`
const Form = styled.form`
    width: 100%;
    max-width: 326px;
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