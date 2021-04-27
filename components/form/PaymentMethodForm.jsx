import { useEffect } from "react"
import { useState } from "react"
import { setPaymentForm, getPaymentMethods, pixPayment } from "../../services/payment-client"

import Link from 'next/link'
import { useRouter } from 'next/router'

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { PaymentMethodOption } from "./styles";
import { CircularProgress } from "@material-ui/core";


const paymentMethodForm = () => {

    const [method, setMethod] = useState('')
    const [methods, setMethods] = useState([])
    const [isPixLoading, setIsPixLoading] = useState(false)

    const router = useRouter()
    const { valor } = router.query

    // setPaymentForm()

    useEffect(async () => {
        const paymentMethods = await getPaymentMethods()
        setMethods(paymentMethods)
        console.log(paymentMethods)
    }, [])

    return (
        <div>
            {/* { !methods ? null : (
                methods.map((e, i) => (
                    <div>{e.id}</div>
                ))
            )} */}
            <Link href={{
                pathname: '/pagamento/pix',
                query: { valor }
            }}>
                <PaymentMethodOption>
                    <div>Pix</div>
                    <ArrowForwardIosIcon />
                </PaymentMethodOption>
            </Link>
            <Link href={{
                pathname: '/pagamento',
                query: { valor }
            }}>
                <PaymentMethodOption>
                    <div>Cartão de crédito</div>
                    <ArrowForwardIosIcon />
                </PaymentMethodOption>
            </Link>
        </div>
    )
}

export default paymentMethodForm