import styled from "styled-components"

function Header ({children, margin}) {
    return (
        <HeaderStyled margin={margin}>
            {children}
        </HeaderStyled>
    )
}

const HeaderStyled = styled.header`
    width: 100%;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: ${({margin}) => margin}px;

    span {
        text-transform: capitalize;
    }
`

export default Header