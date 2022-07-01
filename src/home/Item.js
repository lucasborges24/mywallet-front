import styled from "styled-components"
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext"
import formatValue from "../shared/formatValue";


function Item({
    value,
    description,
    type,
    day,
    id,
    config
}) {

    const navigate = useNavigate()
    const { userToken, setUserToken, values, setValues } = useContext(UserContext);
    const valueFormated = formatValue(value);


    function deleteItem() {
        if (!values.find(i => i._id === id)) return console.log('oi')
        if (window.confirm("Você quer mesmo excluir esse item?")) {
            console.log('deu certo')

            const URL = `http://localhost:5000/${id}`
            console.log(config)
            const req = axios.delete(URL, config)

            req
                .then(() => {
                    const URL = "http://localhost:5000/"
                    const res = axios.get(URL, config);

                    res
                        .then(({ data }) => {
                            setValues(data[1].reverse())
                        })
                        .catch(err => console.log(err.message))
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
`

export default Item