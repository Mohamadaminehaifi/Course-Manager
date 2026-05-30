import pool from '../db.js'

export const getAllStudents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students ORDER BY id')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des étudiants' })
  }
}

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM students WHERE id = $1', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Étudiant non trouvé' })
    }
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'étudiant' })
  }
}

export const createStudent = async (req, res) => {
  try {
    const { name, email } = req.body
    if (!name || !email) {
      return res.status(400).json({ error: 'Le nom et l\'email sont obligatoires' })
    }
    const result = await pool.query(
      'INSERT INTO students (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' })
    }
    res.status(500).json({ error: 'Erreur lors de la création de l\'étudiant' })
  }
}

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email } = req.body
    if (!name || !email) {
      return res.status(400).json({ error: 'Le nom et l\'email sont obligatoires' })
    }
    const result = await pool.query(
      'UPDATE students SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Étudiant non trouvé' })
    }
    res.json(result.rows[0])
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' })
    }
    res.status(500).json({ error: 'Erreur lors de la modification de l\'étudiant' })
  }
}

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Étudiant non trouvé' })
    }
    res.json({ message: 'Étudiant supprimé' })
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'étudiant' })
  }
}
