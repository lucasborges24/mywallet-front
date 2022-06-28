import styled from "styled-components"

function Input({
    type,
    placeholder,
    value,
    functionOnChange
}) {
    return (
        <>
            <InputStyle
                type={type}
                placeholder={placeholder}
                required
                value={value}
                onChange={functionOnChange}
            />
        </>
    )
}

const InputStyle = styled.input`
    width: 326px;
    height: 58px;
    background: #FFFFFF;
    border-radius: 5px;
    margin: 0 auto 15px auto;
    padding: 15px;
    border: none;

    ::placeholder {
        font-size: 20px;
        line-height: 23px;
        color: #000000;
    }

    :focus {
        outline: none;
    }
`

export default Input