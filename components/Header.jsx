import { Flex, Logo, LogoContainer } from "./Containers"
import { H1 } from "./Text"

const Header = () => {
    return (
        <header>
            <Flex column>
                <H1>Bem vindo ao</H1>
                <LogoContainer>
                    <Logo src="/images/Logo.png" alt="Logo" />
                </LogoContainer>
            </Flex>
        </header>
    )
}

export default Header