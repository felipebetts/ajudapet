import axios from "axios";
import client from "./api-client";
import { _baseUrl, localStorageKey } from "../utils/constants";


function handleUserResponse({ data = null, errors = null, ...rest }) {
    console.log("data: ", data)
    console.log("data.token: ", data.token)
    window.localStorage.setItem(localStorageKey, data && data.token);

    console.log(window.localStorage.getItem(localStorageKey))

    if (errors) {
        logout();
        return Promise.reject(errors);
    }
    return rest;
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
        .then(res => console.log(res))
}

function checkSms(code, telefone) {

    const reqData = {
        code,
        telefone
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
    window.localStorage.removeItem(localStorageKey);

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

function getUser(userId) {
    return client(`users/help/${userId}`);
}

function getToken() {
    return window.localStorage.getItem(localStorageKey);
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
