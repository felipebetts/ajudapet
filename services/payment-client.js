import axios from "axios";
import { localStorageKeyUserId } from "../utils/constants";
import { formatFormData } from "../utils/formatFormData";
import Router from "next/router"

const setPaymentForm = async () => {
    await window.Mercadopago.setPublishableKey("TEST-adb95af8-06af-4982-ad62-7bddc9bacf63");

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
async function getCardToken(e) {
    e.preventDefault();
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
      
        console.log("formattedFormData: ", formatFormData(form))
        doSubmit = true;
        // form.submit();
        submitForm(formatFormData(form))
    } else {
        alert("Verify filled data!\n" + JSON.stringify(response, null, 4));
    }
};

const submitForm = form => {

    console.log("submit ", form)

    const donation = form.transactionAmount

    axios.post("http://localhost:3000/donation/process_payment", form)
        .then(res => {
            console.log(res.data)
            if (res.data.status === "approved") {
                registerUserDonation(donation)
            } else {
                console.log("pagamento não aprovado")
                Router.push(`/pagamento/${res.data.status}/${res.data.status_detail}`)
            }
            return res
        })
        .then(res => {
            if (res.data.status === "approved") {
                Router.push(`/obrigado?valor=${donation}`)
            }
        })
        .catch(err => {
            console.log(err)
        })
}

const registerUserDonation = (donation) => {
    const _id = window.localStorage.getItem(localStorageKeyUserId)
    console.log("_id: ", _id)
    console.log("donation: ", donation)

    const reqData = {
        _id,
        donation
    }

    axios.post("http://localhost:3000/donation/register_donation", reqData)
        .then(res => {
            console.log(res)
        })
}

// async function


export {
    setPaymentForm,
    getInstallments,
    getCardToken
}

// const user = getCurrentUser()
// console.log(user)