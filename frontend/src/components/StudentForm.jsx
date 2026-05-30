import { useState } from 'react'

function StudentForm({ student, onSubmit, onCancel }) {
  const [name, setName] = useState(student?.name || '')
  const [email, setEmail] = useState(student?.email || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    onSubmit({ name, email })
    if (!student) {
      setName('')
      setEmail('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nom</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom de l'étudiant"
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@exemple.com"
          required
        />
      </div>
      <div className="btn-group">
        <button type="submit" className="btn btn-primary">
          {student ? 'Modifier' : 'Ajouter'}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  )
}

export default StudentForm
