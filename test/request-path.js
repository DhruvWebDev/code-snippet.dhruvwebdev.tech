import axios from "axios"

export const BASE_URL = axios.BASE_URL("http://localhost:3000/api")
const PATH = {
    login: "/login",
    signup: "/signup",
    snippets: "/snippets",
    snippet: "/snippet/:id",
    adminSnippetDelete: "/admin/snippets/delete/:id",
    adminSnippetUpdate: "/admin/snippets/update/:id",
    adminSnippetAdd: "/admin/snippets/add",
    adminSnippetGet:"/admin/snippets/get",
    adminSnippetGetById:"/admin/snippets/get/:id"
}

const request = {
    login: (data) => axios.post(`${BASE_URL}${PATH.login}`, data),
    signup: (data) => axios.post(`${BASE_URL}${PATH.signup}`, data),
    snippets: () => axios.get(`${BASE_URL}${PATH.snippets}`),
    snippet: (id) => axios.get(`${BASE_URL}${PATH.snippet.replace(":id", id)}`),
    adminSnippetAdd: (data) => axios.post(`${BASE_URL}${PATH.adminSnippetAdd}`, data),
    adminSnippetRemove: (id) => axios.delete(`${BASE_URL}${PATH.adminSnippetRemove.replace(":id", id)}`),
   adminSnippetUpdate: (id, data) => axios.put(`${BASE_URL}${PATH.adminSnippetUpdate.replace(":id", id)}`, data),
}

export default request