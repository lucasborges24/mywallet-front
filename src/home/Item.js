import styled from "styled-components"

function Item({
    value,
    description,
    type,
    day
}) {

    const valueFormated = (value.toFixed(2)).replace('.',',')


    return (
        <>
            <ItemStyle>
                <DataDescription>
                    <P name='data' margin='4'>{day}</P>
                    <P name='description'>{description}</P>
                </DataDescription>
                <ValueDelete>
                <P name={type} margin='4'>{valueFormated}</P>
                    <Icon>
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
    margin-right: ${({margin}) => margin}px;
`

const Icon = styled.div`
    font-size: 19px;
    color: #C6C6C6;
`

export default Item