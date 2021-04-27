import { CircularProgress } from "@material-ui/core"
import { useEffect, useState } from "react"
import { Layout, MainContainer } from "../../components/Containers"
import { pixPayment } from "../../services/payment-client"

import { QrCodeImg } from '../../components/Containers'
import { H2, H3 } from "../../components/Text"
import { useRouter } from "next/router"
import CustomButton from "../../components/Button"

import dynamic from "next/dynamic"
import { formatFormData } from "../../utils/formatFormData"

const pixPaymentProcessor = () => {

    const [transactionData, setTransactionData] = useState(null)
    const [paymentForm, setPaymentForm] = useState(null)

    const router = useRouter()
    const { query } = router
    const valor = query.valor


    const PixForm = dynamic(
        () => import('../../components/form/PixForm'),
        { ssr: false }
    )

    if (paymentForm === null) {
        return (
            <Layout>
                <MainContainer>
                    <H2>Pagamento via Pix</H2>
                    <H3>Preencha o formulário abaixo</H3>
                    <form id='pixForm' onSubmit={e => {
                        e.preventDefault()
                        const form = formatFormData(document.getElementById('pixForm'))
                        console.log('formattedForm: ', form)
                        pixPayment(form)
                            .then(res => {
                                console.log(res.data)
                                setTransactionData(res.data.transaction_data)
                                return res.data.transaction_data
                            })
                            .then(() => {
                                setPaymentForm(form)
                            })
                            .catch(err => {
                                console.log('errouu')
                                console.log(err)
                            })
                    }}>
                        <PixForm />
                    </form>
                </MainContainer>
            </Layout>
        )
    }

    return (
        <Layout>
            <MainContainer>
                <H2>Pagamento via Pix</H2>
                {transactionData === null ? <CircularProgress color='inherit' /> : (
                    <>
                        <QrCodeImg src={`data:image/jpeg;base64,${transactionData.qr_code_base64}`} />
                        <H3>Acesse o Qr Code acima com o seu celular</H3>
                        <br />
                        {/* <H3>Ou utilize a chave pix abaixo:</H3>
                        <label for="copiar">Copiar Hash:</label>
                        <input type="text" id="copiar" value={transactionData.qr_code} />
                        <span>{transactionData.qr_code}</span> */}
                    </>
                )}
            </MainContainer>
        </Layout>
    )
}

export default pixPaymentProcessor