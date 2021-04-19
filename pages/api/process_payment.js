// import mercadopago from "mercadopago"

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
    .then(function (response) {
      console.log("response:", response)
      if (response.status === 201 && response.body.status === "approved") {
        res.redirect(`/obrigado?valor=${response.body.transaction_amount}`, [201, {
          status: response.body.status,
          status_detail: response.body.status_detail,
          id: response.body.id
        }])
      } else {
        res.status(response.status).json({
          status: response.body.status,
          status_detail: response.body.status_detail,
          id: response.body.id
        });
      }
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