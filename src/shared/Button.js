import styled from "styled-components"

function Button ({input}) {
    return (
        <>
            <ButtonStyle>
                {input}
            </ButtonStyle>
        </>
    )
}

const ButtonStyle = styled.button`
    width: 326px;
    height: 46px;
    background: #A328D6;
    border-radius: 5px;
    border: none;
    margin-bottom: 10px;

    font-weight: 700;
    font-size: 20px;
    line-height: 23px;

    color: #FFFFFF;
`

export default Button