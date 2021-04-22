import { useEffect, useState } from "react"
import { MainContainer, Layout } from "../../components/Containers"
import { H2 } from "../../components/Text"
import { createPayment, setPaymentForm } from "../../services/payment-client"
// import TextField from "../components/TextField"

import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { CircularProgress } from "@material-ui/core"


const Payment = () => {

    const PaymentForm = dynamic(
        () => {
            return import("../../components/form/PaymentForm")
        },
        { ssr: false }
    )

    const { query } = useRouter()
    const valor = query.valor

    if (valor !== undefined) {
        return (
            <Layout>
                <MainContainer>
                    <H2>Pagamento</H2>
                    <PaymentForm value={valor} />
                </MainContainer>
            </Layout>
        )
    } else {
        return (
            <Layout>
                {/* <MainContainer> */}
                    <H2>Pagamento</H2>
                    <CircularProgress color="inherit" />
                {/* </MainContainer> */}
            </Layout>
        )
    }
}

export default Payment



                // <form id="form-checkout" >
                //     <input type="text" name="cardNumber" id="form-checkout__cardNumber" />
                //     <input type="text" name="cardExpirationMonth" id="form-checkout__cardExpirationMonth" />
                //     <input type="text" name="cardExpirationYear" id="form-checkout__cardExpirationYear" />
                //     <input type="text" name="cardholderName" id="form-checkout__cardholderName" />
                //     <input type="email" name="cardholderEmail" id="form-checkout__cardholderEmail" />
                //     <input type="text" name="securityCode" id="form-checkout__securityCode" />
                //     <select name="issuer" id="form-checkout__issuer"></select>
                //     <select name="identificationType" id="form-checkout__identificationType"></select>
                //     <input type="text" name="identificationNumber" id="form-checkout__identificationNumber" />
                //     <select name="installments" id="form-checkout__installments"></select>
                //     <button type="submit" id="form-checkout__submit">Pagar</button>
                //     <progress value="0" className="progress-bar">Carregando...</progress>
                // </form>