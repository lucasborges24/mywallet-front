import styled from "styled-components"
import { useNavigate, Link } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import axios from "axios"
import CurrencyInput from "react-currency-input"


import Header from "../shared/Header"
import Button from "../shared/Button"
import Input from "../shared/Input"
import UserContext from "../context/UserContext"
import { ThreeDots } from 'react-loader-spinner'

function Saida() {
    const navigate = useNavigate();
    const { userToken } = useContext(UserContext);
    const [saidaData, setSaidaData] = useState({
        value: 0,
        description: ''
    })
    const [buttonEnable, setButtonEnable] = useState(true)
    const config = {
        headers: {
            "Authorization": `Bearer ${userToken.token}`
        }
    }
    console.log(saidaData)

    function saidaSubmit(e) {
        e.preventDefault();
        if (!buttonEnable) return;
        if (buttonEnable) {
            setButtonEnable(false);
            if (saidaData.value === 0 || saidaData.value === 'R$0,00') {
                alert('Adicione um valor')
                return setButtonEnable(true)
            }

            const valueFormated = Number(saidaData.value.slice(2).split(',').join('.').split('.').join('')) / 100


            const URL = 'https://mywallet-fislucs.herokuapp.com/saida'
            const res = axios.post(URL, {
                value: valueFormated,
                description: saidaData.description,
                type: 'out'
            }, config);

            res
                .then(() => {
                    setButtonEnable(true);
                    navigate('/')
                })
                .catch(err => {
                    setButtonEnable(true)
                    console.log(err.message)
                })
        }
    }



    return (
        <SaidaStyle>
            <Header margin='40'>
                Nova Saída
            </Header>
            <Form onSubmit={saidaSubmit}>
                <InputStyle
                    decimalSeparator=","
                    thousandSeparator="."
                    prefix="R$"
                    required
                    value={saidaData.value}
                    onChangeEvent={(e) => setSaidaData({ ...saidaData, value: e.target.value })}
                />
                <Input
                    type="text"
                    placeholder="Descrição"
                    value={saidaData.description}
                    functionOnChange={(e) => setSaidaData({ ...saidaData, description: e.target.value })}
                />
                <Button
                    input={
                        buttonEnable ?
                            "Salvar saída" :
                            <ThreeDots color="#fff" height={70} width={70} />
                    }
                />
            </Form>
        </SaidaStyle>
    )
}

const SaidaStyle = styled.div`
    width: auto;
    margin: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const InputStyle = styled(CurrencyInput)`
    max-width: 326px;
    width: 100%;
    height: 58px;
    background: #FFFFFF;
    border-radius: 5px;
    margin: 0 auto 15px auto;
    padding: 15px;
    border: none;
    font-size: 20px;
    line-height: 23px;
    color: #000000;

    ::placeholder {
        font-size: 20px;
        line-height: 23px;
        color: rgba(0,0,0,0.5);
    }

    :focus {
        outline: none;
    }
`

const Form = styled.form`
   width: 100%; 
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
`

export default Saida