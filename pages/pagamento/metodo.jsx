import { Layout, MainContainer } from '../../components/Containers'
import { H3 } from '../../components/Text'

import dynamic from "next/dynamic"

const PaymentMethodForm = dynamic(
    () => import('../../components/form/PaymentMethodForm'),
    { ssr: false }
)

const paymentMethod = () => {

    return (
        <Layout>
            <MainContainer>

                <H3>Escolha o meio de pagamento</H3>
                
                <PaymentMethodForm />
            </MainContainer>
        </Layout>
    )
}

export default paymentMethod