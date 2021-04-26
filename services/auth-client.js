import { client } from "./api-client";
import { _baseUrl, localStorageKeyToken, localStorageKeyUserId } from "../utils/constants";
import { formatPhoneNumber } from "../utils/formatPhoneNumber";


function handleUserResponse({ data = null, errors = null, ...rest }) {
    // console.log("data: ", data)
    // console.log("data.token: ", data.token)
    window.localStorage.setItem(localStorageKeyToken, data && data.token);
    window.localStorage.setItem(localStorageKeyUserId, data._id);

    console.log(window.localStorage.getItem(localStorageKeyToken))

    if (errors) {
        logout();
        return Promise.reject(errors);
    }
    return {
        ...rest,
        data
    };
}

function handleRegisterUser({ success, message, errors = null, ...rest }) {
    if (errors) {
        return Promise.reject(errors);
    }

    return { success, message, ...rest };
}

function getSms(telefone) {

    const reqData = {
        telefone
    }

    return client("account/getSms", { body: reqData })
}

function checkSms(code, telefone) {

    // console.log("checkSms")
    // console.log("telefone: ", telefone)
    // console.log("telefone.length: ", telefone.length)
    
    
    // console.log("telefoneSemDdd: ", telefoneSemDdd)
    // console.log("formattedPhone: ", formattedPhone)
    // console.log("formattedPhone.length: ", formattedPhone.length)
    // console.log(ddd[0])
    // console.log(ddd.substring(1, ddd.length))
    // if (ddd[0] === 0) {
    //     ddd = ddd.substring(1, ddd.length)
    //     console.log("ddd: ", ddd)
    // }

    // if (ddd.length === 2) {
    //     console.log(formattedPhone)
    // }
    // if (telefone.length <= 11) {
    //     ddd = 
    // } else {
    //     console.log("ddd: ", telefone.substring(0, telefone.length - 9))
    // }

    const reqData = {
        code,
        telefone: formatPhoneNumber(telefone)
    }

    return client("account/checkSms", { body: reqData })
        .then(handleUserResponse)
}

function login(telefone) {

    const reqData = {
        telefone
    }

    return client("account/authenticate", { body: reqData })
        .then(handleUserResponse)
}

function logout() {
    window.localStorage.removeItem(localStorageKeyToken);
    window.localStorage.removeItem(localStorageKeyUserId);

    return Promise.resolve();
}

function register({ name, email, password, phone, tipo }) {
    return client("account/register", {
        body: {
            nome: name,
            email: email,
            senha: password,
            telefone: phone,
            tipo: tipo,
        },
    }).then(handleRegisterUser);
}

function getCurrentUser() {
    const token = getToken();

    if (!token) {
        return Promise.resolve(null);
    }
    return client("users/me")
        .then((res) => {
            if (res && res.data === null) {
                logout();
            }
            return Promise.resolve(res);
        })
        .catch((error) => {
            logout();
            return Promise.reject(error);
        });
}

async function getUser(userId) {
    return await client(`users/help/${userId}`);
}

function getToken() {
    return window.localStorage.getItem(localStorageKeyToken);
}

// function handleUpdateUser({ data, errors = null, ...rest }) {
//   if (errors) {
//     return Promise.reject(errors);
//   }

//   return { ...data, ...rest };
// }

export {
    login,
    logout,
    register,
    getCurrentUser,
    getToken,
    getUser,
    getSms,
    checkSms,
};
