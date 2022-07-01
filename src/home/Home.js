import styled from "styled-components"
import { useNavigate, Link } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import axios from "axios"

import Header from "../shared/Header"
import UserContext from "../context/UserContext"
import Item from "./Item"
import formatValue from "../shared/formatValue"

function Home() {

    const navigate = useNavigate();
    const { userToken, setUserToken, values, setValues } = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${userToken}`
        }
    }
    const [user, setUser] = useState({})

    useEffect(() => {
        if (!userToken) return navigate("/login");

        const URL = "http://localhost:5000/"
        const res = axios.get(URL, config);

        res
            .then(({ data }) => {
                setValues(data[1].reverse())
                setUser(data[0])
            })
            .catch(err => console.log(err.message))
    }, [])
    console.log(values)

    function sum(values) {
        let saldo = 0;
        for (let i = 0; i < values.length; i++) {
            if (values[i].type === 'in') {
                saldo += values[i].value
            } else if (values[i].type === 'out') {
                saldo -= values[i].value
            }
        }
        return Number(saldo.toFixed(2));
    }

    function changeColor(num) {      
        if (num > 0) return '#03AC00'
        if (num < 0) return '#C70000'
        if (num === 0) return "#C6C6C6"
    }

    function logout() {
        localStorage.removeItem("loginDataStoraged")
        navigate("/login")
    }


    return (
        <HomeLayout>
            <HomeHeader>
                <Header margin='22'>
                    <p>Olá, <span>{user.name}</span></p>
                </Header>
                <Icon onClick={() => logout()}>
                    <ion-icon name="log-out-outline"></ion-icon>
                </Icon>
            </HomeHeader>
            <Main>
                <Movimentacoes>
                    {values.length === 0 ?
                        <Warning>Não há registros de
                        entrada ou saída</Warning> :
                        <>
                            <Values>
                                {values.map((i, key) => <Item
                                    key={key}
                                    value={i.value}
                                    description={i.description}
                                    type={i.type}
                                    day={i.day}
                                    id={i._id}
                                    config={config}
                                ></Item>)}
                            </Values>
                            <Total>
                                <H6 color='#000000'>SALDO</H6>
                                <H6 color={changeColor(sum(values))}>R${formatValue(sum(values))}</H6>
                            </Total>
                        </>
                    }
                </Movimentacoes>
                <Botoes>
                    <EntradaSaida onClick={() => navigate('/entrada')}>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <P >
                            Nova entrada
                        </P>
                    </EntradaSaida>
                    <EntradaSaida onClick={() => navigate('/saida')}>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <P>
                            Nova saída
                        </P>
                    </EntradaSaida>
                </Botoes>
            </Main>

        </HomeLayout>
    )
}



const HomeLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 25px 25px 0 25px;
    
`

const HomeHeader = styled.div`
    max-width: 326px;
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

const Main = styled.main`
    display: flex;
    height: calc(97vh - 53px - 25px);
    flex-direction: column;
    /* align-items: center; */
    justify-content: space-between;
    max-width: 326px;
    width: 100%;
`

const Warning = styled.h2`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    width: 60%;
    text-align: center;
    color: #868686;
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%)
`

const Movimentacoes = styled.div`
    max-width: 326px;
    width: 100%;
    min-height: 100px;
    height: 100%;
    margin-bottom: 15px;
    padding: 15px 5px;
    font-family: 'Raleway';
    background: #FFFFFF;
    border-radius: 5px;

    position: relative;
`

const Values = styled.div`
    max-height: 90%;
    overflow-y: scroll;
`

const Total = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0 5px;
    margin: 10px 5px 10px 0;
    max-width: 320px;
    width: 97%;
    height: 40px;
    background-color: #ffffff;
    position: absolute;
    bottom: 0; right: 0;
`

const H6 = styled.h6`
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: ${({ color }) => color}
`

const Botoes = styled.div`
    max-width: 326px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    /* position: fixed;
    bottom: 15px; left: 25px; right: 25px; */
`

const EntradaSaida = styled.div`
    max-width: 155px;
    width: 48%;
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