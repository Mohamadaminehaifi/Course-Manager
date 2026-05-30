import { Router } from 'express'
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseStudents
} from '../controllers/courseController.js'

const router = Router()

router.get('/', getAllCourses)
router.get('/:id', getCourseById)
router.post('/', createCourse)
router.put('/:id', updateCourse)
router.delete('/:id', deleteCourse)
router.get('/:id/students', getCourseStudents)

export default router
