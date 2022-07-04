import styled from "styled-components"
import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext"
import formatValue from "../shared/formatValue";


function Item({
    value,
    description,
    type,
    day,
    id
}) {

    const navigate = useNavigate()
    const { userToken, setUserToken, values, setValues } = useContext(UserContext);
    const valueFormated = formatValue(value);

    useEffect(() => {
        if (!userToken) {
            navigate("/")
        }
    }, [userToken])


    function deleteItem() {
        if (!values.find(i => i._id === id)) return alert('item não existe')
        if (window.confirm("Você quer mesmo excluir esse item?")) {

            const config = {
                headers: {
                    "Authorization": `Bearer ${userToken.token}`
                }
            }

            const URL = `https://mywallet-fislucs.herokuapp.com/${id}`
            const req = axios.delete(URL, config)

            req
                .then(() => {
                    const URL = "https://mywallet-fislucs.herokuapp.com"
                    const res = axios.get(URL, config);

                    res
                        .then(({ data }) => {
                            setValues(data[1].reverse())
                        })
                        .catch(err => alert(err.message))
                })
                .catch(err => {
                    alert("não foi possível cancelar pelo erro " + err.message)
                })


        }
    }

    return (
        <>
            <ItemStyle>
                <DataDescription onClick={() => navigate(`/editar/${id}`)}>
                    <P name='data' margin='4'>{day}</P>
                    <P name='description'>{description}</P>
                </DataDescription>
                <ValueDelete>
                    <P onClick={() => navigate(`/editar/${id}`)} name={type} margin='4'>{valueFormated}</P>
                    <Icon onClick={deleteItem}>
                        <ion-icon name="close-outline"></ion-icon>
                    </Icon>
                </ValueDelete>
            </ItemStyle>
        </>
    )
}

function text(name) {
    if (name === 'description') return "#000000"
    if (name === 'data') return '#C6C6C6'
    if (name === 'out') return '#C70000'
    if (name === 'in') return '#03AC00'
}

const ItemStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
    transition: 100ms ease;
    cursor: pointer;

    :hover {
        background-color: #f2f2f2;
    }
`

const DataDescription = styled.div`
    display: flex;
    align-items: center;
    margin-right: 5px;
`

const ValueDelete = styled.div`
    display: flex;
    align-items: center;
`

const P = styled.p`
    font-weight: 400;
    line-height: 19px;
    font-size: 16px;
    color: ${({ name }) => text(name)};
    margin-right: ${({ margin }) => margin}px;
`

const Icon = styled.div`
    font-size: 19px;
    color: #C6C6C6;
    transition: 200ms ease;

    cursor: pointer;
    :hover {
        color: #C70000;
    }
`

export default Item