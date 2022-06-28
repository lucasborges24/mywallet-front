import styled from "styled-components"

function Header (props) {
    return (
        <HeaderStyled>
            {props.children}
        </HeaderStyled>
    )
}

const HeaderStyled = styled.header`
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
`

export default Header