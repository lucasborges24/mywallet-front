import styled from "styled-components"
import { useState } from "react"

import Header from "../shared/Header"
import Button from "../shared/Button"
import Input from "../shared/Input"

function Entrada() {

    const [entradaData, setEntradaData] = useState({
        value: 0,
        description: ''
    })


    return (
        <EntradaStyle>
            <Header margin='40'>
                Nova Entrada
            </Header>
            <Input
                type="number"
                placeholder="Valor"
                value={
                    entradaData.value === 0 ?
                        '' : entradaData.value
                }
                functionOnChange={(e) => setEntradaData({ ...entradaData, value: Number(e.target.value) })}
            />
            <Input
                type="text"
                placeholder="Descrição"
                value={entradaData.description}
                functionOnChange={(e) => setEntradaData({ ...entradaData, description: e.target.description })}
            />
            <Button
                input='Salvar entrada'
            />
        </EntradaStyle>
    )
}

const EntradaStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 25px;
`

export default Entrada