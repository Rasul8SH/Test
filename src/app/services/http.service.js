import axios from "axios";
import configFile from "../config.json"
import localStorageService, { setTokens } from "./localStorage.service"
import { httpAuth } from "../hooks/useAuth"
import { toast } from "react-toastify"

const http = axios.create({
    baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(
    async (config) => {
        if (configFile.isFirebase) {
            const containSlash = /\/$/gi.test(config.url)
            config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json"
            const expiresIn = localStorageService.getTokenExpiresDate()
            const refreshToken = localStorageService.getRefreshToken()
            if (refreshToken && expiresIn < Date.now()) {
                const { data } = await httpAuth.post("token", {
                    grant_type: "refresh_token",
                    refresh_token: refreshToken
                })
                setTokens({
                    idToken: data.id_token,
                    refreshToken: data.refresh_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                })
            }
            const accessToken = localStorageService.getAccessToken()
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken }
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

function transformDate(data) {
    return data && !data._id
        ? Object.keys(data).map(item => ({
            ...data[item]
        }))
        : data
}

http.interceptors.response.use(
    (res) => {
        if (configFile.isFirebase) {
            res.data = { content: transformDate(res.data) }
        }
        return res
    },
    (error) => {
        const expectedErrors =
            error.response && error.response.status >= 400 && error.response.status < 500
        if (!expectedErrors) {
            console.log(error)
            toast.error("Something was wrong. Try it later.")
        }
        return Promise.reject(error)
    }
)

const httpService = {
    get: http.get,
    put: http.put,
    post: http.post,
    delete: http.delete,
    patch: http.patch
}

export default httpService