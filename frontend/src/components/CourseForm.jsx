import { useState } from 'react'

function CourseForm({ course, onSubmit, onCancel }) {
  const [title, setTitle] = useState(course?.title || '')
  const [description, setDescription] = useState(course?.description || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({ title, description })
    if (!course) {
      setTitle('')
      setDescription('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Titre</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre du cours"
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description du cours"
        />
      </div>
      <div className="btn-group">
        <button type="submit" className="btn btn-primary">
          {course ? 'Modifier' : 'Créer'}
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

export default CourseForm
