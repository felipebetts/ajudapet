import { useRouter } from "next/router"
import { useState } from "react"
import { setPaymentForm } from "../../services/payment-client"
import { formatFormData } from "../../utils/formatFormData"
import CustomButton from "../Button"
import { FormInput } from "./styles"


const getQrCode = () => {
        pixPayment({ transaction_amount: valor })
            .then(res => {
                console.log(res.data)
                setTransactionData(res.data.transaction_data)
                return res.data.transaction_data
            })
            // .then(() => {
            //     setIsPixLoading(false)
            // })
            .catch(err => {
                console.log('errouu')
                console.log(err)
            })
        // console.log(pix)
}

const PixForm = () => {

    setPaymentForm()

    const router = useRouter()
    const { query } = router
    const valor = query.valor

    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <div>
                <FormInput>
                    <label for="payerFirstName">Nome</label>
                    <input id="payerFirstName" name="payerFirstName" type="text" />
                </FormInput>
                <FormInput>
                    <label for="payerLastName">Sobrenome</label>
                    <input id="payerLastName" name="payerLastName" type="text"/>
                </FormInput>
                <FormInput>
                    <label for="payerEmail">E-mail</label>
                    <input id="payerEmail" name="payerEmail" type="text" />
                </FormInput>
                <FormInput>
                    <label for="docType">Tipo de documento</label>
                    <select id="docType" name="docType" data-checkout="docType" type="text" />
                </FormInput>
                <FormInput>
                    <label for="docNumber">Número do documento</label>
                    <input id="docNumber" name="docNumber" data-checkout="docNumber" type="text" />
                </FormInput>
            </div>

            <div>
                <div>
                    <input type="hidden" name="transactionAmount" id="transactionAmount" value={valor} />
                    {/* <input type="hidden" name="productDescription" id="productDescription" value="Nome do Produto" /> */}
                    <br />
                    <CustomButton variant='contained' fullWidth type='submit' isLoading={isLoading} onClick={() => setIsLoading(!isLoading)}>Gerar QR Code</CustomButton>
                    <br />
                </div>
            </div>
        </>

    )
}

export default PixForm