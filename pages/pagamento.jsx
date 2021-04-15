import { LoginContainer, Layout } from "../components/Containers"
import { H2 } from "../components/Text"
import { paymentMethods } from "../services/payment-client"


const Payment = () => {


    const getData = async () => {
        const payment = await paymentMethods()
        console.log(payment)
    }
    getData()

    return (
        <Layout>
            <LoginContainer>
                <H2>Pagamento</H2>
            </LoginContainer>
        </Layout>
    )
}

export default Payment