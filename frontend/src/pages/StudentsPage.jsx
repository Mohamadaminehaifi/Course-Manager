import { useState, useEffect } from 'react'
import { getStudents, createStudent, updateStudent, deleteStudent } from '../api/api'
import StudentForm from '../components/StudentForm'

function StudentsPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    try {
      const data = await getStudents()
      setStudents(data)
    } catch (err) {
      setError('Erreur lors du chargement des étudiants')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (studentData) => {
    try {
      await createStudent(studentData)
      setShowForm(false)
      loadStudents()
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la création')
    }
  }

  const handleUpdate = async (studentData) => {
    try {
      await updateStudent(editingStudent.id, studentData)
      setEditingStudent(null)
      loadStudents()
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la modification')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cet étudiant ?')) return
    try {
      await deleteStudent(id)
      loadStudents()
    } catch (err) {
      setError('Erreur lors de la suppression')
    }
  }

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="loading">Chargement...</div>

  return (
    <div>
      {error && <div className="error">{error}</div>}

      <div className="page-header">
        <h2>Liste des étudiants</h2>
        <button className="btn btn-primary" onClick={() => { setShowForm(!showForm); setEditingStudent(null) }}>
          {showForm ? 'Annuler' : '+ Ajouter un étudiant'}
        </button>
      </div>

      {showForm && (
        <div className="inline-form">
          <h3>Nouvel étudiant</h3>
          <StudentForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {editingStudent && (
        <div className="inline-form">
          <h3>Modifier l'étudiant</h3>
          <StudentForm student={editingStudent} onSubmit={handleUpdate} onCancel={() => setEditingStudent(null)} />
        </div>
      )}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher un étudiant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          {search ? 'Aucun résultat' : 'Aucun étudiant enregistré'}
        </div>
      ) : (
        <div className="card">
          <ul className="student-list">
            {filtered.map((student) => (
              <li key={student.id} className="student-item">
                <div className="student-info">
                  <span className="student-name">{student.name}</span>
                  <span className="student-email">{student.email}</span>
                </div>
                <div className="btn-group">
                  <button className="btn btn-warning btn-sm" onClick={() => { setEditingStudent(student); setShowForm(false) }}>
                    Modifier
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student.id)}>
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default StudentsPage
