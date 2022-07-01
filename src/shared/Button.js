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
    display: flex;
    justify-content: center;
    align-items: center;
    
    max-width: 326px;
    width: 100%;
    height: 46px;
    background: #A328D6;
    border-radius: 5px;
    border: none;
    margin-bottom: 10px;
    transition: 200ms ease;
    cursor: pointer;
    
    :hover {
        filter: brightness(1.1)
    }

    font-weight: 700;
    font-size: 20px;
    line-height: 23px;

    color: #FFFFFF;
`

export default Button