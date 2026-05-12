# 🎓 Course Manager

Course Manager est une application web full-stack permettant de gérer des cours et des étudiants dans un système scolaire ou universitaire.

## 🚀 Fonctionnalités

- 📚 Voir la liste des cours
- 👨‍🎓 Voir les étudiants inscrits à un cours
- ➕ Ajouter un étudiant à un cours
- 🔗 Gestion des relations SQL many-to-many
- 🌐 Communication Frontend ↔ Backend avec API REST

---

# 🧱 Technologies utilisées

## Frontend
- React.js
- React Router
- Axios

## Backend
- Express.js
- Node.js

## Database
- PostgreSQL

---

# 🗄️ Base de données

## Tables utilisées

### students

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);
```

### courses

```sql
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  description TEXT
);
```

### enrollments

```sql
CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id) ON DELETE CASCADE,
  course_id INT REFERENCES courses(id) ON DELETE CASCADE
);
```

---

# 📁 Structure du projet

```bash
course-manager/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.jsx
```

---

# ⚙️ Installation

## 1️⃣ Cloner le projet

```bash
git clone <your-repository-url>
```

---

## 2️⃣ Backend

```bash
cd backend
npm install
```

### Lancer le serveur

```bash
npm run dev
```

Le backend démarre sur :

```bash
http://localhost:5000
```

---

## 3️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

Le frontend démarre sur :

```bash
http://localhost:5173
```

---

# 🔗 API Routes

## Courses

| Method | Route |
|---|---|
| GET | /courses |
| GET | /courses/:id |

---

## Students

| Method | Route |
|---|---|
| GET | /students |
| POST | /students |

---

## Enrollments

| Method | Route |
|---|---|
| POST | /enroll |
| GET | /courses/:id/students |

---

# 🧠 Exemple SQL JOIN

```sql
SELECT students.name, students.email
FROM enrollments
JOIN students
ON enrollments.student_id = students.id
WHERE enrollments.course_id = 1;
```

---

# 🎯 Concepts appris

- PostgreSQL Relations
- SQL JOIN
- Many-to-Many Relationships
- REST API
- React Router
- Express.js Architecture
- API Communication
- CRUD Operations

---

# ✨ Bonus possibles

- ❌ Supprimer un étudiant d’un cours
- ✏️ Modifier un cours
- 🔍 Recherche étudiant
- 📊 Statistiques
- 🔐 Authentification JWT

---

# 💼 Objectif du projet

Ce projet a été réalisé pour apprendre le développement full-stack moderne avec React, Express et PostgreSQL tout en utilisant de vraies relations SQL comme dans les applications professionnelles.

---

# 👨‍💻 Auteur

Mohamed Amine Haifi
Hafid Anssem
Ismail ouchraa
