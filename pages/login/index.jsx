import { useState } from "react"
import CustomButton from "../../components/Button"
import { Flex, Layout, LoginContainer, LoginFormContainer } from "../../components/Containers"
import { H2, Parag } from "../../components/Text"
import TextField from "../../components/TextField"
import Link from "next/link"

import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const Login = () => {

    const [ddd, setDdd] = useState("")
    const [celular, setCelular] = useState("")

    const onChange = (value, target) => {
        const reg = /^[0-9\b]+$/;

        if (value === '' || reg.test(value)) {
           if (target === "ddd") {
               setDdd(value)
           } 
           if (target === "celular") {
               setCelular(value)
           } 
        }
    }

    return (
        <Layout>
            <LoginContainer>
                <H2>Acesse ou crie sua conta </H2>
                <Parag>Digite seu celular para entrar. Seus dados estão seguros e você não precisa de senha.</Parag>
                <Flex
                    margin="0px"
                    column
                >
                    <LoginFormContainer>
                        <TextField
                            variant="outlined"
                            label="DDD"
                            fieldWidth="62px"
                            type="number"
                            onChange={(e) => onChange(e.target.value, "ddd")}
                            value={ddd}
                        />
                        <TextField
                            variant="outlined"
                            label="Celular"
                            fieldWidth="120px"
                            // fullWidth
                            type="number"
                            onChange={(e) => onChange(e.target.value, "celular")}
                            value={celular}
                        />
                    </LoginFormContainer>
                    <Link href="/login/confirmacao">
                        <CustomButton donate>Receber código por SMS</CustomButton>
                    </Link>
                    <Link href="/login/confirmacao">
                        <CustomButton fullWidth><WhatsAppIcon style={{ marginRight: "8px"}} /> Receber código por Whatsapp</CustomButton>
                    </Link>
                </Flex>
            </LoginContainer>
        </Layout>
    )
}

export default Login