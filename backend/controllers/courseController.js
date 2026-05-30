import pool from '../db.js'

export const getAllCourses = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses ORDER BY id')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des cours' })
  }
}

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM courses WHERE id = $1', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cours non trouvé' })
    }
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération du cours' })
  }
}

export const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body
    if (!title) {
      return res.status(400).json({ error: 'Le titre est obligatoire' })
    }
    const result = await pool.query(
      'INSERT INTO courses (title, description) VALUES ($1, $2) RETURNING *',
      [title, description || '']
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création du cours' })
  }
}

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description } = req.body
    if (!title) {
      return res.status(400).json({ error: 'Le titre est obligatoire' })
    }
    const result = await pool.query(
      'UPDATE courses SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description || '', id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cours non trouvé' })
    }
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la modification du cours' })
  }
}

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM courses WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cours non trouvé' })
    }
    res.json({ message: 'Cours supprimé' })
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression du cours' })
  }
}

export const getCourseStudents = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      `SELECT enrollments.id AS enrollment_id, students.id, students.name, students.email
       FROM enrollments
       JOIN students ON enrollments.student_id = students.id
       WHERE enrollments.course_id = $1
       ORDER BY students.name`,
      [id]
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des étudiants' })
  }
}
