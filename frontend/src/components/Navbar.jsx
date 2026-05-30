import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  return (
    <nav>
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        Cours
      </Link>
      <Link to="/students" className={location.pathname === '/students' ? 'active' : ''}>
        Étudiants
      </Link>
    </nav>
  )
}

export default Navbar
