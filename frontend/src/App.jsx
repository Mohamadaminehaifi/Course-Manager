import { Routes, Route, Link } from 'react-router-dom'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import StudentsPage from './pages/StudentsPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <header>
        <div className="container">
          <h1><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Course Manager</Link></h1>
          <Navbar />
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/students" element={<StudentsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
