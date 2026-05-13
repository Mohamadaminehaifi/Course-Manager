import express from 'express'
import cors from 'cors'
import pool from './db.js'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// Get all courses
app.get('/courses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses ORDER BY id')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Get single course
app.get('/courses/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM courses WHERE id = $1', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cours non trouvé' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Get all students
app.get('/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students ORDER BY id')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Create student
app.post('/students', async (req, res) => {
  try {
    const { name, email } = req.body
    const result = await pool.query(
      'INSERT INTO students (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Enroll student in course
app.post('/enroll', async (req, res) => {
  try {
    const { student_id, course_id } = req.body

    // Check if already enrolled
    const check = await pool.query(
      'SELECT * FROM enrollments WHERE student_id = $1 AND course_id = $2',
      [student_id, course_id]
    )
    if (check.rows.length > 0) {
      return res.status(400).json({ error: 'Étudiant déjà inscrit' })
    }

    const result = await pool.query(
      'INSERT INTO enrollments (student_id, course_id) VALUES ($1, $2) RETURNING *',
      [student_id, course_id]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Get students enrolled in a course
app.get('/courses/:id/students', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      `SELECT students.id, students.name, students.email
       FROM enrollments
       JOIN students ON enrollments.student_id = students.id
       WHERE enrollments.course_id = $1
       ORDER BY students.name`,
      [id]
    )
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
})