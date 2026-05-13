import axios from 'axios'

const API_URL = 'http://localhost:5000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getCourses = async () => {
  const response = await api.get('/courses')
  return response.data
}

export const getCourse = async (id) => {
  const response = await api.get(`/courses/${id}`)
  return response.data
}

export const getStudents = async () => {
  const response = await api.get('/students')
  return response.data
}

export const createStudent = async (studentData) => {
  const response = await api.post('/students', studentData)
  return response.data
}

export const getCourseStudents = async (courseId) => {
  const response = await api.get(`/courses/${courseId}/students`)
  return response.data
}

export const enrollStudent = async (enrollmentData) => {
  const response = await api.post('/enroll', enrollmentData)
  return response.data
}

export default api