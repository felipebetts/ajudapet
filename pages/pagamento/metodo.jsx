import { Layout, MainContainer } from '../../components/Containers'
import { H3 } from '../../components/Text'

import PaymentMethodForm from '../../components/form/PaymentMethodForm'

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