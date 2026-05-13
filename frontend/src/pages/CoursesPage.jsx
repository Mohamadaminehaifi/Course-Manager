import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCourses } from '../api/api'

function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      const data = await getCourses()
      setCourses(data)
    } catch (err) {
      setError('Erreur lors du chargement des cours')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Chargement...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div>
      <h2>Liste des cours</h2>
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default CoursesPage