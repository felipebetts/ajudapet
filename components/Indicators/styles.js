import styled from "styled-components"

export const GroupContainer = styled.div`
    width: 80%;

    @media(max-width: 450px) {
        width: 100%;
    };

    display: flex;
    flex-wrap: wrap;
`

export const SingleContainer = styled.div`
    width: 100px;
    padding: 15px;
    margin: 10px 15%;

    display: flex;
    flex: 1;
    align-items: center;
    flex-direction: column;

    background: #343434;

    
    border-radius: 5px;
    `
    // ${(props) => props.border ? `border: solid 1px ${props.theme.colors.primary};` : "" }

export const Text = styled.span`
    color: ${({theme}) => theme.colors.secondary };
    margin-bottom: 5px;
`