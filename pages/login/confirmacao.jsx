import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import CustomButton from "../../components/Button"
import { Flex, Layout, LoginContainer } from "../../components/Containers"
import { H2, Parag } from "../../components/Text"
import TextField from "../../components/TextField"

import { useRouter } from "next/router"


const LoginConfirmation = () => {

    const [secret, setSecret] = useState("")
    const [celular, setCelular] = useState("5521983918175")

    const router = useRouter()

    const onChange = (e) => {
        const reg = /^[0-9\b]+$/;

        if (e.target.value === '' || reg.test(e.target.value)) {
           setSecret(e.target.value)
        }
    }

    const handleSmsCheck = () => {

        const requestData = {
            telefone: celular,
            code: secret
        }

        axios.post("http://localhost:3000/account/checkSms", requestData)   
            .then(res => {
                console.log(res)
            })
    } 

    return (
        <Layout>
            <LoginContainer>
                <H2>Digite o código de acesso</H2>
                <Parag>Insira o código de 6 dígitos que enviamos para o número <strong>{ celular }</strong>.</Parag>
                <TextField
                    onChange={e => onChange(e)}
                    value={secret}
                    variant="outlined"
                />
                <Flex column margin="0">
                    <Link href="/">
                        <a>
                            Enviar código novamente para { celular }
                        </a>
                    </Link>
                    <Link href="/login">
                        <a style={{ marginTop: "10px" }}>
                            Alterar o número telefone
                        </a>
                    </Link>
                </Flex>
                <Flex>
                    <Link href="/obrigado">
                        <CustomButton
                            contained
                            onClick={() => handleSmsCheck()}
                        >
                            Confirmar
                        </CustomButton>
                    </Link>
                </Flex>
            </LoginContainer>
        </Layout>
    )
}

export default LoginConfirmation