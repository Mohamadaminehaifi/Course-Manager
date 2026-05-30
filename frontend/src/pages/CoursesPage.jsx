import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCourses, createCourse, deleteCourse } from '../api/api'
import CourseForm from '../components/CourseForm'

function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      const data = await getCourses()
      setCourses(data)
    } catch (err) {
      setError('Erreur lors du chargement des cours')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (courseData) => {
    try {
      await createCourse(courseData)
      setShowForm(false)
      loadCourses()
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la création')
    }
  }

  const handleDelete = async (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    if (!confirm('Supprimer ce cours ?')) return
    try {
      await deleteCourse(id)
      loadCourses()
    } catch (err) {
      setError('Erreur lors de la suppression')
    }
  }

  if (loading) return <div className="loading">Chargement...</div>

  return (
    <div>
      {error && <div className="error">{error}</div>}

      <div className="page-header">
        <h2>Liste des cours</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Annuler' : '+ Ajouter un cours'}
        </button>
      </div>

      {showForm && (
        <div className="inline-form">
          <h3>Nouveau cours</h3>
          <CourseForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {courses.length === 0 ? (
        <div className="empty-state">Aucun cours disponible</div>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <Link
              to={`/courses/${course.id}`}
              key={course.id}
              style={{ textDecoration: 'none' }}
            >
              <div className="card course-card">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-actions">
                  <button className="btn btn-danger btn-sm" onClick={(e) => handleDelete(e, course.id)}>
                    Supprimer
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default CoursesPage
