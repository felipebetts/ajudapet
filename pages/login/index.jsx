import { useState } from "react"
import CustomButton from "../../components/Button"
import { Flex, Layout, MainContainer, LoginFormContainer } from "../../components/Containers"
import { H2, Parag } from "../../components/Text"
import TextField from "../../components/TextField"

import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { useRouter } from "next/router"
import { getSms, login } from "../../services/auth-client"

const Login = () => {

    const [ddd, setDdd] = useState("")
    const [celular, setCelular] = useState("")
    const [loading, setLoading] = useState(false)
    const completeNum =  ddd + celular //"55" +

    const router = useRouter()
    const { query } = useRouter()

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

    const handleSendSms = async () => {
        setLoading(true)
        await getSms(completeNum)
            .then(res => {
                if (res.data.situacao === "OK") {
                    console.log("completeNum: ", completeNum)
                    setLoading(false)
                    router.push({
                        pathname: "/login/confirmacao",
                        query: { cel: `${completeNum}`, valor: `${query.valor}` }
                    })
                }
            })
        // console.log("sent: ", sent)
        // if (sent) {
        //     setLoading(false)
        //     router.push({
        //         pathname: "/login/confirmacao",
        //         query: { cel: `${completeNum}`, valor: `${query.valor}` }
        //     })
        // }
    }

    return (
        <Layout>
            <MainContainer>
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
                            fontSize="3rem"
                            />
                        <TextField
                            variant="outlined"
                            label="Celular "
                            fieldWidth="110px"
                            // fullWidth
                            type="number"
                            onChange={(e) => onChange(e.target.value, "celular")}
                            value={celular}
                            fontSize="3rem"
                            />
                    </LoginFormContainer>
                    <CustomButton
                        variant="contained"
                        fullWidth
                        onClick={() => handleSendSms()}
                        isLoading={loading}
                    >
                        Receber código por SMS
                        </CustomButton>
                    {/* <CustomButton
                            fullWidth
                            onClick={() => getSms(completeNum)}
                        >
                            <WhatsAppIcon style={{ marginRight: "8px"}} /> Receber código por Whatsapp
                        </CustomButton> */}
                </Flex>
            </MainContainer>
        </Layout>
    )
}

export default Login