import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (credentials) => api.post('/login', credentials)
export const logout = () => api.post('/logout')
export const getMe = () => api.get('/me')

export const getProfile = () => api.get('/profile')
export const updateProfile = (data) => api.put('/admin/profile', data)

export const getSkills = () => api.get('/skills')
export const adminSkills = {
    create: (data) => api.post('/admin/skills', data),
    update: (id, data) => api.put(`/admin/skills/${id}`, data),
    delete: (id) => api.delete(`/admin/skills/${id}`),
}

export const getProjects = (params) => api.get('/projects', { params })
export const getProject = (id) => api.get(`/projects/${id}`)
export const adminProjects = {
    create: (data) => api.post('/admin/projects', data),
    update: (id, data) => api.put(`/admin/projects/${id}`, data),
    delete: (id) => api.delete(`/admin/projects/${id}`),
}

export const getBlogs = (params) => api.get('/blogs', { params })
export const getBlog = (slug) => api.get(`/blogs/${slug}`)
export const adminBlogs = {
    create: (data) => api.post('/admin/blogs', data),
    update: (id, data) => api.put(`/admin/blogs/${id}`, data),
    delete: (id) => api.delete(`/admin/blogs/${id}`),
}

export const adminExperience = {
    list: () => api.get('/admin/experiences'),
    create: (data) => api.post('/admin/experiences', data),
    update: (id, data) => api.put(`/admin/experiences/${id}`, data),
    delete: (id) => api.delete(`/admin/experiences/${id}`),
}

export const adminEducation = {
    list: () => api.get('/admin/education'),
    create: (data) => api.post('/admin/education', data),
    update: (id, data) => api.put(`/admin/education/${id}`, data),
    delete: (id) => api.delete(`/admin/education/${id}`),
}

export const getContacts = () => api.get('/admin/contacts')
export const sendContact = (data) => api.post('/contact', data)

export default api
