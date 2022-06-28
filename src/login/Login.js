import styled from 'styled-components'
import { useState } from 'react'

import Input from '../shared/Input'
import Button from '../shared/Button'

function Login() {

    const [loginData, setLoginData] = useState({email: '', senha: ''})

    return (
        <LoginStyle>
            <Titulo>MyWalldfdet</Titulo>
            <Form onSubmit={() => console.log('enviei')}>
                <Input
                    type="email"
                    placeholder="E-mail"
                    value={loginData.email}
                    functionOnChange={(e) => setLoginData({...loginData, email: e.target.value})}
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    value={loginData.senha}
                    functionOnChange={(e) => setLoginData({...loginData, senha: e.target.value})}
                />
                <Button
                    input='entrar'
                />
            </Form>
            <H6>Primeira vez? Cadastre-se!</H6>
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

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Titulo = styled.h1`
    font-family: 'Saira Stencil One';
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
    margin-bottom: 25px;
`

const H6 = styled.h6`
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
    margin-top: 25px;
`

export default Login