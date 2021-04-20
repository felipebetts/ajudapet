import { useEffect, useState } from "react"
import { setPaymentForm, getIssuers, getCardToken } from "../services/payment-client"
import TextField from "./TextField"


const PaymentForm = ({ value }) => {
    
    // const [formMounted, setFormMounted] = useState(false)
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
    
            getIssuers(paymentMethod.id);
        } else {
            alert(`payment method info error: ${response}`);
        }
    }

    

    const handleChange = (e) => {
        setCardNumber(e.target.value)
    }

//  
    return (
        <form action="/api/process_payment" method="post" id="paymentForm" onSubmit={e => getCardToken(e)}>
            <h3>Detalhe do comprador</h3>
            <div>
                <div>
                    {/* <label for="email">E-mail</label> */}
                    <TextField id="email" name="email" type="text" label="Email" payment />
                </div>
                <div>
                    <label for="docType">Tipo de documento</label>
                    <select id="docType" name="docType" data-checkout="docType" type="text"></select>
                </div>
                <div>
                    <label for="docNumber">Número do documento</label>
                    <input id="docNumber" name="docNumber" data-checkout="docNumber" type="text" />
                </div>
            </div>
            <h3>Detalhes do cartão</h3>
            <div>
                <div>
                    <label for="cardholderName">Titular do cartão</label>
                    <input id="cardholderName" data-checkout="cardholderName" type="text" />
                </div>
                <div>
                    <label for="">Data de vencimento</label>
                    <div>
                        <input type="text" placeholder="MM" id="cardExpirationMonth" data-checkout="cardExpirationMonth"
                            onselectstart="return false" onpaste="return false"
                            oncopy="return false" oncut="return false"
                            ondrag="return false" ondrop="return false" autocomplete="off" />
                        <span className="date-separator">/</span>
                        <input type="text" placeholder="YY" id="cardExpirationYear" data-checkout="cardExpirationYear"
                            onselectstart="return false" onpaste="return false"
                            oncopy="return false" oncut="return false"
                            ondrag="return false" ondrop="return false" autocomplete="off" />
                    </div>
                </div>
                <div>
                    <label for="cardNumber">Número do cartão</label>
                    <input type="text" id="cardNumber" data-checkout="cardNumber"
                        onselectstart="return false" onpaste="return false"
                        oncopy="return false" oncut="return false"
                        ondrag="return false" ondrop="return false" autocomplete="off"
                        value={cardNumber} onChange={(e) => handleChange(e)} />
                    {!cardFlag.show ? null : (
                        <div style={{ background: "#eee", width: "60px" }}>
                            <img src={cardFlag.src} alt="Bandeira do cartão" />
                        </div>
                    )}
                </div>
                <div>
                    <label for="securityCode">Código de segurança</label>
                    <input id="securityCode" data-checkout="securityCode" type="text"
                        onselectstart="return false" onpaste="return false"
                        oncopy="return false" oncut="return false"
                        ondrag="return false" ondrop="return false" autocomplete="off" />
                </div>
                <div id="issuerInput" style={{ display: "none"}}>
                    <label for="issuer">Banco emissor</label>
                    <select id="issuer" name="issuer" data-checkout="issuer"></select>
                </div>
                <div>
                    <label for="installments">Parcelas</label>
                    <select type="text" id="installments" name="installments"></select>
                </div>
                <div>
                    <input type="hidden" name="transactionAmount" id="transactionAmount" value={value} />
                    <input type="hidden" name="paymentMethodId" id="paymentMethodId" />
                    <input type="hidden" name="description" id="description" />
                    <br />
                    <button type="submit">Pagar</button>
                    <br />
                </div>
            </div>
        </form>
    )
}

export default PaymentForm