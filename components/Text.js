import styled from "styled-components"

export const H1 = styled.h1`
    font-size: 2.1rem;
    font-weight: 600;
    ${props => props.secondary ? `color: ${props.theme.colors.secondary}` : ""}}
`

export const H2 = styled.h2`
    font-size: 1.6rem;
    font-weight: 500;
    ${props => props.secondary ? `color: ${props.theme.colors.secondary}` : ""}}
`

export const H3 = styled.h3`
    font-size: 1.2rem;
    font-weight: 400;
    align: center;
    ${props => props.secondary ? `color: ${props.theme.colors.secondary}` : ""}}
`

export const Parag = styled.p`
    color: ${({theme}) => theme.colors.secondary};
`