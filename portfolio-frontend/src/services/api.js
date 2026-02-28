import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})

export const getProfile = () => api.get('/profile')
export const getProjects = (params) => api.get('/projects', { params })
export const getProject = (id) => api.get(`/projects/${id}`)
export const getBlogs = (params) => api.get('/blogs', { params })
export const getBlog = (slug) => api.get(`/blogs/${slug}`)
export const sendContact = (data) => api.post('/contact', data)

export default api
