import styled from "styled-components"
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CurrencyInput from "react-currency-input"


import UserContext from "../context/UserContext"
import { ThreeDots } from 'react-loader-spinner'
import Header from "../shared/Header"
import Button from "../shared/Button"
import Input from "../shared/Input"

function Editar({

}) {

    const { id } = useParams()


    const [buttonEnable, setButtonEnable] = useState(true)

    const navigate = useNavigate()
    const { userToken, setUserToken, values, setValues } = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${userToken.token}`
        }
    }
    const item = values.find(i => i._id === id);
    const [editarData, setEditarData] = useState({
        value: item.value,
        description: item.description
    })

    console.log(editarData)

    function editarSubmit(event) {
        event.preventDefault();
        if (!buttonEnable) return;
        if (buttonEnable) {
            setButtonEnable(false);

            if (editarData.value === 0 || editarData.value === 'R$0,00') {
                alert('Neste caso é melhor cancelar o item')
                return setButtonEnable(true)
            }
            let valueFormated;
            if (typeof editarData.value === 'number') {
                valueFormated = editarData.value
            } else {
                valueFormated = Number(editarData.value.slice(2).split(',').join('.').split('.').join('')) / 100
            }
            console.log(valueFormated)
            const URL = `https://mywallet-fislucs.herokuapp.com/editar/${id}`
            const res = axios.put(URL, {
                value: valueFormated,
                description: editarData.description,
                type: item.type
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
        <>
            <EditarStyle>
                <Header margin='40'>
                    Editar {item.type === 'in' ?
                        'entrada' :
                        'saída'
                    }
                </Header>
                <Form onSubmit={editarSubmit}>
                    <InputStyle
                        decimalSeparator=","
                        thousandSeparator="."
                        prefix="R$"
                        value={editarData.value}
                        onChangeEvent={(e) => setEditarData({ ...editarData, value: e.target.value })}
                    />
                    <Input
                        type="text"
                        placeholder="Descrição"
                        value={editarData.description}
                        functionOnChange={(e) => setEditarData({ ...editarData, description: e.target.value })}
                    />
                    <Button
                        input={
                            buttonEnable ?
                                `Atualizar ${item.type === 'in' ?
                                    'entrada' :
                                    'saída'
                                }` :
                                <ThreeDots color="#fff" height={70} width={70} />
                        }
                    />
                </Form>
            </EditarStyle>
        </>
    )
}

const EditarStyle = styled.div`
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

export default Editar