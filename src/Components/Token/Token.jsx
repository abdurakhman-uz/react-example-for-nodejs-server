const get = localStorage.getItem("token")

export const Token = () => {
    return get
}

export const setToken = (token) => {
    return localStorage.setItem("token", token)
}

export const removeToken = () => {
    return localStorage.removeItem("token")
}