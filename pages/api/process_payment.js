// import mercadopago from "mercadopago"

const processPayment = (req, res) => {
  var mercadopago = require('mercadopago');
  mercadopago.configurations.setAccessToken("APP_USR-4763540346196517-041513-3c3759ca86228fc4b17775fd752ee2f3-743727221");

  console.log("req.body:", req.body)
  console.log("req.method:", req.method)

  var payment_data = {
    transaction_amount: Number(req.body.transactionAmount),
    token: req.body.token,
    description: req.body.description,
    installments: Number(req.body.installments),
    payment_method_id: req.body.paymentMethodId,
    issuer_id: req.body.issuer,
    payer: {
      email: req.body.email,
      identification: {
        type: req.body.docType,
        number: req.body.docNumber
      }
    }
  };

  console.log("payment_data", payment_data)

  return mercadopago.payment.save(payment_data)
    .then(function (response) {
      res.status(response.status).json({
        status: response.body.status,
        status_detail: response.body.status_detail,
        id: response.body.id
      });
    })
    .catch(function (error) {
      console.log("error: ", error)
      res.status(500).send(error);
    });
}

export default processPayment