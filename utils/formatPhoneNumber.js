
export const formatPhoneNumber = telefone => {
    const ddd = telefone.substring(0, telefone.length - 9)
    const firstHalf = telefone.substring(telefone.length - 9, telefone.length - 4)
    const lastHalf = telefone.substring(telefone.length - 4, telefone.length)
    const formattedPhone =  "(" + ddd + ")" + " " + firstHalf + "-" + lastHalf

    return formattedPhone
}