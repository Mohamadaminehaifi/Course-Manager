import pool from '../db.js'

export const enrollStudent = async (req, res) => {
  try {
    const { student_id, course_id } = req.body
    if (!student_id || !course_id) {
      return res.status(400).json({ error: 'student_id et course_id sont obligatoires' })
    }

    const existing = await pool.query(
      'SELECT * FROM enrollments WHERE student_id = $1 AND course_id = $2',
      [student_id, course_id]
    )
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'L\'étudiant est déjà inscrit à ce cours' })
    }

    const result = await pool.query(
      'INSERT INTO enrollments (student_id, course_id) VALUES ($1, $2) RETURNING *',
      [student_id, course_id]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l\'inscription' })
  }
}

export const unenrollStudent = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM enrollments WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inscription non trouvée' })
    }
    res.json({ message: 'Étudiant désinscrit' })
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la désinscription' })
  }
}
