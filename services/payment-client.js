const setPaymentForm = async () => {
    await window.Mercadopago.setPublishableKey("TEST-de473f1e-611d-4f6f-9182-58ef3bff040f");

    await window.Mercadopago.getIdentificationTypes();

    return true
}

function getIssuers(paymentMethodId) {
    window.Mercadopago.getIssuers(
        paymentMethodId,
        setIssuers
    );
}

function setIssuers(status, response) {
    if (status == 200) {
        console.log(response)
        let issuerSelect = document.getElementById('issuer');
        issuerSelect.options.length = 0

        response.forEach(issuer => {
            let opt = document.createElement('option');
            opt.text = issuer.name;
            opt.value = issuer.id;
            issuerSelect.appendChild(opt);
        });

        getInstallments(
            document.getElementById('paymentMethodId').value,
            document.getElementById('transactionAmount').value,
            issuerSelect.value
        );
    } else {
        alert(`issuers method info error: ${response}`);
    }
}

function getInstallments(paymentMethodId, transactionAmount, issuerId) {
    window.Mercadopago.getInstallments({
        "payment_method_id": paymentMethodId,
        "amount": parseFloat(transactionAmount),
        "issuer_id": parseInt(issuerId)
    }, setInstallments);
}

function setInstallments(status, response) {
    if (status == 200) {
        // console.log(response)
        document.getElementById('installments').options.length = 0;
        response[0].payer_costs.forEach(payerCost => {
            let opt = document.createElement('option');
            opt.text = payerCost.recommended_message;
            opt.value = payerCost.installments;
            document.getElementById('installments').appendChild(opt);
        });
    } else {
        alert(`installments method info error: ${response}`);
    }
}


var doSubmit = false;
function getCardToken(event) {
    event.preventDefault();
    if (!doSubmit) {
        let $form = document.getElementById('paymentForm');
        console.log("$form: ", $form)
        window.Mercadopago.createToken($form, setCardTokenAndPay);
        return false;
    }
};

function setCardTokenAndPay(status, response) {
    if (status == 200 || status == 201) {
        console.log("response: ", response)
        let form = document.getElementById('paymentForm');
        let card = document.createElement('input');
        card.setAttribute('name', 'token');
        card.setAttribute('type', 'hidden');
        card.setAttribute('value', response.id);
        console.log("card: ", card)
        form.appendChild(card);
        console.log("form: ", form)
        doSubmit = true;
        const submitting = form.submit();
        console.log("submitting: ", submitting)
    } else {
        alert("Verify filled data!\n" + JSON.stringify(response, null, 4));
    }
};

export {
    setPaymentForm,
    getInstallments,
    getCardToken
}