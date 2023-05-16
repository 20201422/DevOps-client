import axios from "axios"

axios.defaults.baseURL = "http://localhost:9090"

const request = axios.create({
    timeout:7242,
    headers: {

    }
})

request.interceptors.request.use(config => {
    config.headers["token"] = localStorage.getItem("token")
    return config
})

request.interceptors.request.use(
    response => {
        // console.log(response)
        return response
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default request
