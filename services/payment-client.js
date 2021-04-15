import axios from "axios";
import { client } from "./api-client";

async function paymentMethods() {
    axios({
        method: "get",
        url: "https://api.mercadopago.com/payment_methods",
        headers: {
            'Authorization': "Bearer TEST-4763540346196517-041513-6d4bf9c6b8e2fc03defe650baf711cba-743727221"
        }
    })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

    // return client(
    //     "https://api.mercadopago.com/payment_methods",
    //     { headers: {
    //             "Authorization": "Bearer TEST-4763540346196517-041513-6d4bf9c6b8e2fc03defe650baf711cba-743727221"
    //         }
    // })
}

export {
    paymentMethods
}