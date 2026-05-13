import { Routes, Route, Link } from 'react-router-dom'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'

function App() {
  return (
    <div>
      <header>
        <div className="container">
          <h1>Course Manager</h1>
          <nav>
            <Link to="/">Liste des cours</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App