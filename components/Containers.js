import styled from "styled-components"

export const Layout = styled.div`
    padding: 1rem;
    width: 100%;
    max-width: 800px;
    margin: auto;
`
export const Flex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align:center;
    margin-top: 30px;

    flex-direction:${props => props.column ? "column" : "row"};
    ${props => props.margin ? `margin: ${props.margin};` : ''}
    ${props => props.alignItems ? `align-items: ${props.alignItems};` : ''}
    ${props => props.justifyContent ? `justify-content: ${props.justifyContent};` : ''}
    ${props => props.width ? `width: ${props.width};` : ''}
`

export const LogoContainer = styled.div`
    max-width: 400px;
`

export const Logo = styled.img`
    width: 100%;
`

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 330px;
    max-width: 100%;
    
    @media(max-width: 350px) {
        width: 300px;
    };

    margin: auto;
`

export const DonationForm = styled.form`
    width: 150px;

    margin: 20px 10px;
    margin-top: 5px;
    margin-right: 0;

    display: flex;
    align-items: center;
`

export const MainContainer = styled.div`
margin: auto;
margin-top: 8%;
padding: 15px;
max-width: 600px;


text-align: center;

@media(min-width: 576px) {
    padding: 15px 10%;
};
`

export const LoginContainer = styled.div`
    margin: auto;
    margin-top: 8%;
    padding: 15px;
    max-width: 600px;

    border: solid 1px ${({ theme }) => theme.colors.primary};
    border-top: solid 5px ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
    
    background: #343434;

    text-align: center;

    @media(min-width: 576px) {
        padding: 15px 10%;
    };
`

export const LoginFormContainer = styled.form`
    width: 80%;
    display: flex;
    justify-content: center;

    margin-bottom: 20px;
`

// color: ${({ theme }) => theme.colors.secondary};
