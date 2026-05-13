import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCourse, getCourseStudents, getStudents, createStudent, enrollStudent } from '../api/api'

function CourseDetailPage() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [students, setStudents] = useState([])
  const [allStudents, setAllStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [newStudentName, setNewStudentName] = useState('')
  const [newStudentEmail, setNewStudentEmail] = useState('')
  const [selectedStudentId, setSelectedStudentId] = useState('')

  useEffect(() => {
    loadData()
  }, [id])

  const loadData = async () => {
    try {
      setLoading(true)
      const [courseData, studentsData, allStudentsData] = await Promise.all([
        getCourse(id),
        getCourseStudents(id),
        getStudents()
      ])
      setCourse(courseData)
      setStudents(studentsData)
      setAllStudents(allStudentsData)
    } catch (err) {
      setError('Erreur lors du chargement des données')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateStudent = async (e) => {
    e.preventDefault()
    if (!newStudentName || !newStudentEmail) return

    try {
      const newStudent = await createStudent({
        name: newStudentName,
        email: newStudentEmail
      })

      await enrollStudent({
        student_id: newStudent.id,
        course_id: parseInt(id)
      })

      setNewStudentName('')
      setNewStudentEmail('')
      loadData()
    } catch (err) {
      setError('Erreur lors de la création de l\'étudiant')
      console.error(err)
    }
  }

  const handleEnrollExistingStudent = async (e) => {
    e.preventDefault()
    if (!selectedStudentId) return

    try {
      await enrollStudent({
        student_id: parseInt(selectedStudentId),
        course_id: parseInt(id)
      })
      setSelectedStudentId('')
      loadData()
    } catch (err) {
      setError('Erreur lors de l\'inscription')
      console.error(err)
    }
  }

  if (loading) return <div className="loading">Chargement...</div>
  if (error) return <div className="error">{error}</div>
  if (!course) return <div className="error">Cours non trouvé</div>

  const enrolledIds = students.map(s => s.id)
  const availableStudents = allStudents.filter(s => !enrolledIds.includes(s.id))

  return (
    <div>
      <Link to="/" className="back-link">← Retour aux cours</Link>

      <div className="card">
        <h2>{course.title}</h2>
        <p>{course.description}</p>
      </div>

      <div className="card">
        <h3>Étudiants inscrits ({students.length})</h3>
        {students.length === 0 ? (
          <div className="empty-state">Aucun étudiant inscrit</div>
        ) : (
          <ul className="student-list">
            {students.map((student) => (
              <li key={student.id} className="student-item">
                <div className="student-info">
                  <span className="student-name">{student.name}</span>
                  <span className="student-email">{student.email}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card enroll-form">
        <h3>Ajouter un nouvel étudiant</h3>
        <form onSubmit={handleCreateStudent}>
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              placeholder="Nom de l'étudiant"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={newStudentEmail}
              onChange={(e) => setNewStudentEmail(e.target.value)}
              placeholder="email@exemple.com"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Créer et inscrire
          </button>
        </form>
      </div>

      {availableStudents.length > 0 && (
        <div className="card enroll-form">
          <h3>Inscrire un étudiant existant</h3>
          <form onSubmit={handleEnrollExistingStudent}>
            <div className="form-group">
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                required
              >
                <option value="">Sélectionner un étudiant</option>
                {availableStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.email})
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-secondary">
              Inscrire
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default CourseDetailPage