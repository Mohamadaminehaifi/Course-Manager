import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCourse, getCourseStudents, getStudents, createStudent, enrollStudent, unenrollStudent, updateCourse } from '../api/api'
import CourseForm from '../components/CourseForm'

function CourseDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [students, setStudents] = useState([])
  const [allStudents, setAllStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingCourse, setEditingCourse] = useState(false)

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
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateCourse = async (courseData) => {
    try {
      await updateCourse(id, courseData)
      setEditingCourse(false)
      loadData()
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la modification')
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
      setError(err.response?.data?.error || 'Erreur lors de la création de l\'étudiant')
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
      setError(err.response?.data?.error || 'Erreur lors de l\'inscription')
    }
  }

  const handleUnenroll = async (enrollmentId) => {
    if (!confirm('Désinscrire cet étudiant ?')) return
    try {
      await unenrollStudent(enrollmentId)
      loadData()
    } catch (err) {
      setError('Erreur lors de la désinscription')
    }
  }

  if (loading) return <div className="loading">Chargement...</div>
  if (error) return <div className="error">{error}</div>
  if (!course) return <div className="error">Cours non trouvé</div>

  const enrolledIds = students.map(s => s.id)
  const availableStudents = allStudents.filter(s => !enrolledIds.includes(s.id))

  return (
    <div>
      <Link to="/" className="back-link">&larr; Retour aux cours</Link>

      {editingCourse ? (
        <div className="inline-form">
          <h3>Modifier le cours</h3>
          <CourseForm course={course} onSubmit={handleUpdateCourse} onCancel={() => setEditingCourse(false)} />
        </div>
      ) : (
        <div className="card">
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <button className="btn btn-warning btn-sm" style={{ marginTop: '10px' }} onClick={() => setEditingCourse(true)}>
            Modifier le cours
          </button>
        </div>
      )}

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
                <button className="btn btn-danger btn-sm" onClick={() => handleUnenroll(student.enrollment_id)}>
                  Désinscrire
                </button>
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
