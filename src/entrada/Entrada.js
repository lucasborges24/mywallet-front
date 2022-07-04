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



function Entrada() {

    const navigate = useNavigate();
    const { userToken } = useContext(UserContext);

    useEffect(() => {
        if (!userToken) {
            navigate("/")
        }
    }, [userToken])

    const [entradaData, setEntradaData] = useState({
        value: 0,
        description: ''
    })
    const [buttonEnable, setButtonEnable] = useState(true)
    

    function entradaSubmit(event) {
        event.preventDefault();
        if (!buttonEnable) return;
        if (buttonEnable) {
            setButtonEnable(false);

            const config = {
                headers: {
                    "Authorization": `Bearer ${userToken.token}`
                }
            }

            if (entradaData.value === 0 || entradaData.value === 'R$0,00') {
                alert('Adicione um valor')
                return setButtonEnable(true)
            }

            const valueFormated = Number(entradaData.value.slice(2).split(',').join('.').split('.').join('')) / 100

            const URL = 'https://mywallet-fislucs.herokuapp.com/entrada'
            const res = axios.post(URL, {
                value: valueFormated,
                description: entradaData.description,
                type: 'in'
            }, config);

            res
                .then(() => {
                    setButtonEnable(true);
                    navigate('/')
                })
                .catch(err => {
                    setButtonEnable(true)
                })
        }
    }


    return (
        <EntradaStyle>
            <Header margin='40'>
                Nova Entrada
            </Header>
            <Form onSubmit={entradaSubmit}>
                <InputStyle
                    decimalSeparator=","
                    thousandSeparator="."
                    prefix="R$"
                    value={entradaData.value}
                    onChangeEvent={(e) => setEntradaData({ ...entradaData, value: e.target.value })}
                />
                <Input
                    type="text"
                    placeholder="Descrição"
                    value={entradaData.description}
                    functionOnChange={(e) => setEntradaData({ ...entradaData, description: e.target.value })}
                />
                <Button
                    input={
                        buttonEnable ?
                            "Salvar Entrada" :
                            <ThreeDots color="#fff" height={70} width={70} />
                    }
                />
            </Form>
        </EntradaStyle>
    )
}

const EntradaStyle = styled.div`
    width: auto;
    /* height: 50%; */
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

export default Entrada