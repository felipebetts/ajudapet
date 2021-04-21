import { useEffect, useState } from "react"
import { setPaymentForm, getInstallments, getCardToken } from "../../services/payment-client"
import CustomButton from "../Button"
import { Flex } from "../Containers"
// import { FormPartTitle } from "../Text"
import TextField from "../TextField"
import { CardDate, FormInput, PayForm, FormPart, FormPartTitle, CardFlagContainer } from "./styles"


const PaymentForm = ({ value }) => {

    // const [formMounted, setFormMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [cardNumber, setCardNumber] = useState("")
    const [cardFlag, setCardFlag] = useState({ show: false, src: "" })


    useEffect(() => {
        console.log("valor da doação: ", value)
    }, [value])

    setPaymentForm()

    useEffect(() => {
        let textLength = cardNumber.length
        if (textLength >= 6) {
            let bin = cardNumber.substring(0, 6)
            window.Mercadopago.getPaymentMethod({
                "bin": bin
            }, setPaymentMethod);
        }
    }, [cardNumber])

    function setPaymentMethod(status, response) {
        if (status == 200) {
            let paymentMethod = response[0];
            document.getElementById('paymentMethodId').value = paymentMethod.id;
            setCardFlag({ show: true, src: paymentMethod.secure_thumbnail })

            // getIssuers(paymentMethod.id);
            getInstallments(
                document.getElementById('paymentMethodId').value,
                document.getElementById('transactionAmount').value,
            )
        } else {
            alert(`payment method info error: ${response}`);
        }
    }



    const handleChange = (e) => {
        setCardNumber(e.target.value)
    }

    //  http://localhost:3000/donation/process_payment
    return (
        <PayForm action="/api/process_payment" method="post" id="paymentForm" onSubmit={e => getCardToken(e)}>
            <FormPartTitle>Detalhe do comprador</FormPartTitle>
            <FormPart>
                <FormInput>
                    <label for="email">E-mail</label>
                    <input id="email" name="email" type="text" />
                    {/* label="Email" */}
                </FormInput>
                <FormInput>
                    <label for="docType">Tipo de documento</label>
                    <select id="docType" name="docType" data-checkout="docType" type="text"></select>
                </FormInput>
                <FormInput>
                    <label for="docNumber">Número do documento</label>
                    <input id="docNumber" name="docNumber" data-checkout="docNumber" type="text" />
                </FormInput>
            </FormPart>
            <FormPartTitle>Detalhes do cartão</FormPartTitle>
            <div>
                <FormInput>
                    <label for="cardholderName">Titular do cartão</label>
                    <input id="cardholderName" data-checkout="cardholderName" type="text" />
                </FormInput>
                <FormInput >
                    <label for="">Data de vencimento</label>
                    <CardDate>
                        <input type="text" placeholder="MM" id="cardExpirationMonth" data-checkout="cardExpirationMonth"
                            onselectstart="return false" onpaste="return false"
                            oncopy="return false" oncut="return false"
                            ondrag="return false" ondrop="return false" autocomplete="off" />
                        <span className="date-separator">/</span>
                        <input type="text" placeholder="YY" id="cardExpirationYear" data-checkout="cardExpirationYear"
                            onselectstart="return false" onpaste="return false"
                            oncopy="return false" oncut="return false"
                            ondrag="return false" ondrop="return false" autocomplete="off" />
                    </CardDate>
                </FormInput>
                <FormInput>
                    <label for="cardNumber">Número do cartão</label>
                        <>
                            <input type="text" id="cardNumber" data-checkout="cardNumber"
                                onselectstart="return false" onpaste="return false"
                                oncopy="return false" oncut="return false"
                                ondrag="return false" ondrop="return false" autocomplete="off"
                                value={cardNumber} onChange={(e) => handleChange(e)} />
                                {!cardFlag.show ? null : (
                            <CardFlagContainer>
                                <img src={cardFlag.src} alt="Bandeira do cartão" />
                            </CardFlagContainer>
                    )}
                        </>
                </FormInput>
                <FormInput>
                    <label for="securityCode">Código de segurança</label>
                    <input id="securityCode" data-checkout="securityCode" type="text"
                        onselectstart="return false" onpaste="return false"
                        oncopy="return false" oncut="return false"
                        ondrag="return false" ondrop="return false" autocomplete="off" />
                </FormInput>
                {/* <div id="issuer" style={{ display: "none"}}>
                    <label for="issuer">Banco emissor</label>
                    <select id="issuer" name="issuer" data-checkout="issuer"></select>
                </div> */}
                <FormInput>
                    <label for="installments">Parcelas</label>
                    <select type="text" id="installments" name="installments"></select>
                </FormInput>
                <div>
                    <input variant="outlined" type="hidden" name="transactionAmount" id="transactionAmount" value={value} />
                    <input variant="outlined" type="hidden" name="paymentMethodId" id="paymentMethodId" />
                    <input variant="outlined" type="hidden" name="description" id="description" />
                    <br />
                    <CustomButton donate type="submit" isLoading={isLoading} onClick={() => setIsLoading(true)}>Doar</CustomButton>
                    {/* <button type="submit"></button> */}
                    <br />
                </div>
            </div>
        </PayForm>
    )
}

export default PaymentForm