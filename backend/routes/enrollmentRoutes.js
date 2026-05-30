import { Router } from 'express'
import { enrollStudent, unenrollStudent } from '../controllers/enrollmentController.js'

const router = Router()

router.post('/', enrollStudent)
router.delete('/:id', unenrollStudent)

export default router
