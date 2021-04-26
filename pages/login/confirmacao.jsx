import axios from "axios"
import NextLink from "next/link"
import { useEffect, useState } from "react"
import CustomButton from "../../components/Button"
import { Flex, Layout, MainContainer } from "../../components/Containers"
import { H2, Parag } from "../../components/Text"
import TextField from "../../components/TextField"

import { useRouter } from "next/router"
import { checkSms, getCurrentUser, getSms } from "../../services/auth-client"
import { formatPhoneNumber } from "../../utils/formatPhoneNumber"
import { CircularProgress, Link } from "@material-ui/core"


const LoginConfirmation = () => {

    const [secret, setSecret] = useState("")
    const [isLoadingNewCode, setIsLoadingNewCode] = useState(false)

    const { query } = useRouter()
    const router = useRouter()

    const cel = query.cel
    console.log(cel)

    const onChange = (e) => {
        const reg = /^[0-9\b]+$/;

        if (e.target.value === '' || reg.test(e.target.value)) {
            setSecret(e.target.value)
        }
    }


    const handleCheckSms = () => {
        checkSms(secret, cel)
            .then(async res => {
                console.log("res:", res)
                const user = await getCurrentUser()
                console.log("user:", user)

                const valor = query.valor
                if (user && valor) {
                    router.push({
                        pathname: "/pagamento",
                        query: { valor: valor }
                    })
                }
            })
    }

    if (!cel) {
        return (
            <Layout>
                <MainContainer>
                    <CircularProgress color="inherit" />
                </MainContainer>
            </Layout>
        )
    } else {
        return (
            <Layout>
                <MainContainer>
                    <H2>Digite o código de acesso</H2>
                    <Parag>Insira o código de 6 dígitos que enviamos para o número <strong>{formatPhoneNumber(cel)}</strong></Parag>
                    <TextField
                        onChange={e => onChange(e)}
                        value={secret}
                        variant="outlined"
                    />
                    <Flex column margin="30px 0px">
                        <CustomButton
                            variant="contained"
                            onClick={() => cel ? handleCheckSms() : false}
                        >
                            Confirmar
                            </CustomButton>
                        <Flex column>
                            <NextLink href="/login">
                                <a style={{ marginBottom: "10px" }}>
                                    Alterar o número telefone
                                </a>
                            </NextLink>
                            <CustomButton
                                // variant="contained"
                                width="220px"
                                size="medium"
                                isLoading={isLoadingNewCode}
                                onClick={() => {
                                    setIsLoadingNewCode(true)
                                    getSms(cel)
                                    .then(res => {
                                        console.log("res: ", res)
                                        console.log("novo codigo")
                                        if (res.data.situacao === "OK") {
                                            setIsLoadingNewCode(false)
                                        }
                                    })
                                }}
                            >
                                Enviar novo código
                        </CustomButton>
                        </Flex>
                    </Flex>
                </MainContainer>
            </Layout>
        )
    }

}

export default LoginConfirmation