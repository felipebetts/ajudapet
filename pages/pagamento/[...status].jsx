import { CircularProgress } from "@material-ui/core"
import { useRouter } from "next/router"
import CustomButton from "../../components/Button"
import { Flex, Layout, LoginContainer } from "../../components/Containers"
import { H3, Parag } from "../../components/Text"

import Link from "next/link"

const formatState = (status) => {
    let state
    switch (status) {
        case "in_process":
            state = "Seu pagamento ainda está sendo processado"
            break;

        case "rejected":
            state = "Seu pagamento foi recusado"
            break;

        default:
            break;
    }
    return state
}

const formatDetail = (detail) => {
    let textDetail
    switch (detail) {
        case "cc_rejected_bad_filled_card_number":
            textDetail = "Número de cartão de crédito inválido."
            break;

        case "cc_rejected_bad_filled_date":
            textDetail = "Data de vencimento informada inválida."
            break;

        case "cc_rejected_bad_filled_other":
            textDetail = "Dados do cartão informados inválidos."
            break;

        case "cc_rejected_bad_filled_security_code":
            textDetail = "Código de segurança do cartão informado inválido."
            break;

        case "cc_rejected_blacklist":
            textDetail = "O pagamento não pode ser processado."
            break;

        case "cc_rejected_call_for_authorize":
            textDetail = "Você deve autorizar para o seu banco o pagamento do valor ao Mercado Pago."
            break;

        case "cc_rejected_card_disabled":
            textDetail = "Ligue para o seu banco para ativar seu cartão. O telefone está no verso do seu cartão."
            break;

        case "cc_rejected_card_error":
            textDetail = "Não conseguimos processar seu pagamento."
            break;

        case "cc_rejected_duplicated_payment":
            textDetail = "Você já efetuou um pagamento com esse valor. Caso precise pagar novamente, utilize outro cartão ou outra forma de pagamento."
            break;

        case "cc_rejected_high_risk":
            textDetail = "Seu pagamento foi recusado. Escolha outra forma de pagamento. Recomendamos meios de pagamento em dinheiro."
            break;

        case "cc_rejected_insufficient_amount":
            textDetail = "O meio de pagamento selecionado possui saldo insuficiente."
            break;

        case "cc_rejected_invalid_installments":
            textDetail = "O meio de pagamento selecionado não processa pagamentos em múltiplas parcelas."
            break;

        case "cc_rejected_max_attempts":
            textDetail = "Você atingiu o limite de tentativas permitido. Escolha outro cartão ou outra forma de pagamento."
            break;

        case "cc_rejected_other_reason":
            textDetail = "O meio de pagamento selecionado não processa o pagamento."
            break;

        default:
            textDetail = "O pagamento não pode ser processado. Tente fazer o pagamento novamente."
            break;
    }
    return textDetail
}

const PaymentStatus = () => {


    const router = useRouter()
    // const { query } = useRouter()
    const { status } = router.query

    console.log(status)


    if (status) {
        const state = status[0]
        const detail = status[1]

        const formattedState = formatState(state)
        const formattedDetail = formatDetail(detail)

        return (
            <Layout>
                <LoginContainer>
                    <H3>{formattedState}</H3>
                    <Parag>
                        {formattedDetail}
                    </Parag>
                    <CustomButton
                        contained
                        fullWidth
                        onClick={() => {
                            router.back()
                        }}>
                        Retornar ao pagamento
                        </CustomButton>
                </LoginContainer>
                <Flex column margin="10px">
                    <Link href="/">
                        {/* <a style={{ marginTop: "15px" }}> */}
                            Retornar à página inicial
                        {/* </a> */}
                    </Link>
                </Flex>
            </Layout>
        )
    } else {
        return (
            <Layout>
                <LoginContainer>
                    <CircularProgress color="inherit" />
                </LoginContainer>
            </Layout>
        )
    }
}

export default PaymentStatus