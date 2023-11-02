import axios from 'axios'

const axiosIns = axios.create({
    baseURL: `https://node-crud-api-ggll.onrender.com`
})

const UserApi = {
    readAll: () => {
        return axiosIns.request({
            url: `/api/user`,
            method: "GET"
        })
    },
    readSingle: (id) => {
        return axiosIns.request({
            url: `/api/user/single/${id}`,
            method: "GET"
        })
    },
    create: (user) => {
        return axiosIns.request({
            url: `/api/user/add`,
            method: "POST",
            data: user
        })
    },
    update: (user,id) => {
        return axiosIns.request({
            url: `/api/user/update/${id}`,
            method: "PATCH",
            data: user
        })
    },
    delete: (id) => {
        return axiosIns.request({
            url: `/api/user/delete/${id}`,
            method: "DELETE"
        })
    }
}

export default UserApi