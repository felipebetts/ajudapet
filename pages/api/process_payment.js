// import mercadopago from "mercadopago"

import axios from 'axios';

const processPayment = (req, res) => {
  if (req.method === "POST") {
    var mercadopago = require('mercadopago');
    mercadopago.configurations.setAccessToken("TEST-2206851614944422-041715-95e971aa0efe01c4f76f137add7cd22f-711330888");
  
    console.log("req.body:", req.body)
    console.log("req.method:", req.method)
    
    var payment_data = {
      transaction_amount: Number(req.body.transactionAmount),
      token: req.body.token,
      description: req.body.description,
      installments: Number(req.body.installments),
      payment_method_id: req.body.paymentMethodId,
      // issuer_id: req.body.issuer,
      payer: {
        email: req.body.email,
        identification: {
          type: req.body.docType,
          number: req.body.docNumber
        }
      }
    };

    
    console.log("payment_data:", payment_data)
    
    return mercadopago.payment.save(payment_data)
    .then(async function (response) {
      console.log("response.body:", response.body)
      // if (response.body.status === "approved") { //response.status === 201 && 
      //   // res.redirect(response , `/obrigado?valor=${response.body.transaction_amount}`, 201)
      //   res.redirect(`/obrigado?valor=${response.body.transaction_amount}`, 201)
      // } else {
      //   res.redirect(`/pagamento/${response.body.status}/${response.body.status_detail}` , response.status)
      // }

      // const result = await axios.post("http://localhost:3000")

      res.status(response.status).json({
        status: response.body.status,
        status_detail: response.body.status_detail,
        id: response.body.id
      });
      })
      .catch(function (error) {
        res.status(500).send(error);
      });
  }
  // if (req.method === "GET") {
  //     res.redirect("/obrigado")
  // }
}

export default processPayment