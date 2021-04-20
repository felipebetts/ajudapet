import styled from "styled-components"
import { H3 } from "../Text"

export const PayForm = styled.form`
    width: 100%;
`
export const FormPartTitle = styled(H3)`

    font-size: 1.3rem;
    @media(max-width: 796px) {
        padding-top: 20px;
        border-top: solid 2px ${({ theme }) => theme.colors.terciary};
    }
`

export const FormPart = styled.div`
    widht:100%;
`

export const FormInput = styled.div`

    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 1.1rem;
    margin-top: 20px;
    
    
    label {
        width: 30%;
        // text-align: right;
    }
    
    input {
        background: inherit;
        color: inherit;
        width: ${(props) => props.width ? props.width : "100%"};
        
        margin: 10px;
        margin-left: 20px;
        // margin-right:0;
        
        padding: 5px 8px;
        height: 2.5rem;
        border-radius: 5px;
        border: solid 1px ${({ theme }) => theme.colors.primary};
        
        font: inherit;
        
        &:hover {
            border: solid 1px ${({ theme }) => theme.colors.terciary};
        }
        &:focus {
            border: solid 2px ${({ theme }) => theme.colors.primary};
            outline: none;
        }
        &:-internal-autofill-selected {
            appearance: menulist-button;
            background: ${({ theme }) => theme.colors.background} !important;
            color: ${({ theme }) => theme.colors.primary} !important;
        }
    }
    
    select {
        background: inherit;
        color: inherit;
        font: inherit;
        
        width: 100%;
        margin: 10px;
        margin-left: 20px;
        // margin-right:0;
        height: 2.5rem;
        border: solid 1px ${({ theme }) => theme.colors.primary};
        border-radius: 5px;
        
        option {
            background: #343434 ;
        }
        
        &:active {
            border: solid 1px ${({ theme }) => theme.colors.primary};
            border-radius: 5px;
            
        }
        
    }
    @media(max-width: 796px) {
        flex-direction:column;
        
        
        label{
            width: 100%;
            text-align: left;
            margin: 10px;
            margin-left: 30px;
        }
        
        input {
            margin: 10px;
        }
        
        select {
                margin: 10px;
                
            }
        }
        `
        // border-top-left-radius: 5px;
        // border-top-right-radius: 5px;
// font-size: 1rem;

export const Grid = styled.div`

        display: grid;
        grid-template-columns: 30% 1fr;
        grid-template-rows: repeat(${(props) => props.rows}, 1fr);

        grid-template-areas: 
            ''
            `
export const CardDate = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
        margin: 10px;
    }
`

export const CardFlagContainer = styled.div`
    background: #eee;
    width: 70px;
    height: 40px;
    border-radius: 5px;
    img {
        margin-top: 7px;
    }
`
            