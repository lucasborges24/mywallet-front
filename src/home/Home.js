import styled from "styled-components"
import { useState } from "react"

import Header from "../shared/Header"

function Home() {
    return (
        <HomeLayout>
            <HomeHeader>
                <Header margin='22'>
                    Olá, fulano
                    {/* colocar o nome aq dps */}
                </Header>
                <Icon>
                    <ion-icon name="log-out-outline"></ion-icon>
                </Icon>
            </HomeHeader>
            <Movimentacoes>

            </Movimentacoes>
            <Botoes>
                <EntradaSaida>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <P>
                        Nova entrada
                    </P>
                </EntradaSaida>
                <EntradaSaida>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <P>
                        Nova saída
                    </P>
                </EntradaSaida>
            </Botoes>

        </HomeLayout>
    )
}

const HomeLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 25px;
`

const HomeHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Icon = styled.div`
    height: 50px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    ion-icon {
        color: #FFFFFF;
        font-size: 25px;
    }
`

const Movimentacoes = styled.main`
    width: 326px;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
`

const Botoes = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 15px; left: 25px; right: 25px;
`

const EntradaSaida = styled.div`
    width: 155px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    position: relative;

    ion-icon {
        position: absolute;
        top: 10px; left: 10px;
        color: #ffffff;
        background-color: rgba(0,0,0,0);
        font-size: 22px;
    }
`

const P = styled.p`
    position: absolute;
    bottom: 9px; left: 10px;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    background-color: rgba(255,255,255, 0);
    color: #FFFFFF;
    width: 40%;
`

export default Home