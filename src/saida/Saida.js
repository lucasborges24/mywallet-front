import styled from "styled-components"
import { useState } from "react"

import Header from "../shared/Header"
import Button from "../shared/Button"
import Input from "../shared/Input"

function Saida() {

    const [saidaData, setSaidaData] = useState({
        value: 0,
        description: ''
    })

    return (
        <SaidaStyle>
            <Header margin='40'>
                Nova Saída
            </Header>
            <Input
                type="number"
                placeholder="Valor"
                value={
                    saidaData.value === 0 ?
                        '' : saidaData.value
                }
                functionOnChange={(e) => setSaidaData({ ...saidaData, value: Number(e.target.value) })}
            />
             <Input
                type="text"
                placeholder="Descrição"
                value={saidaData.description}
                functionOnChange={(e) => setSaidaData({ ...saidaData, description: e.target.description })}
            />
            <Button
                input='Salvar saída'
            />
        </SaidaStyle>
    )
}

const SaidaStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 25px;
`

export default Saida