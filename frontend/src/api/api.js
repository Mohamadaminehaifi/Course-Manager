import axios from 'axios'

const API_URL = 'http://localhost:5000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Courses
export const getCourses = async () => {
  const response = await api.get('/courses')
  return response.data
}

export const getCourse = async (id) => {
  const response = await api.get(`/courses/${id}`)
  return response.data
}

export const createCourse = async (courseData) => {
  const response = await api.post('/courses', courseData)
  return response.data
}

export const updateCourse = async (id, courseData) => {
  const response = await api.put(`/courses/${id}`, courseData)
  return response.data
}

export const deleteCourse = async (id) => {
  const response = await api.delete(`/courses/${id}`)
  return response.data
}

// Students
export const getStudents = async () => {
  const response = await api.get('/students')
  return response.data
}

export const getStudent = async (id) => {
  const response = await api.get(`/students/${id}`)
  return response.data
}

export const createStudent = async (studentData) => {
  const response = await api.post('/students', studentData)
  return response.data
}

export const updateStudent = async (id, studentData) => {
  const response = await api.put(`/students/${id}`, studentData)
  return response.data
}

export const deleteStudent = async (id) => {
  const response = await api.delete(`/students/${id}`)
  return response.data
}

// Enrollments
export const getCourseStudents = async (courseId) => {
  const response = await api.get(`/courses/${courseId}/students`)
  return response.data
}

export const enrollStudent = async (enrollmentData) => {
  const response = await api.post('/enroll', enrollmentData)
  return response.data
}

export const unenrollStudent = async (id) => {
  const response = await api.delete(`/enroll/${id}`)
  return response.data
}

export default api
