# Course Manager

Course Manager est une application web full-stack permettant de gerer des cours et des etudiants dans un systeme scolaire ou universitaire.

## Fonctionnalites

### Cours
- Voir la liste des cours
- Ajouter un cours
- Modifier un cours
- Supprimer un cours
- Voir les etudiants inscrits a un cours

### Etudiants
- Voir la liste de tous les etudiants
- Ajouter un etudiant
- Modifier un etudiant
- Supprimer un etudiant
- Rechercher un etudiant par nom ou email

### Inscriptions
- Inscrire un etudiant a un cours
- Desinscrire un etudiant d'un cours
- Creation rapide d'un etudiant + inscription en une seule etape
- Verification des doublons (un etudiant ne peut pas etre inscrit deux fois au meme cours)

### Architecture
- Communication Frontend <-> Backend avec API REST
- Gestion des relations SQL many-to-many (etudiants <-> cours via enrollments)
- Separation controllers / routes cote backend
- Composants React reutilisables cote frontend

---

## Technologies utilisees

### Frontend
- React.js
- React Router
- Axios

### Backend
- Express.js
- Node.js
- dotenv (variables d'environnement)

### Base de donnees
- PostgreSQL

---

## Base de donnees

### Tables

#### students

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);
```

#### courses

```sql
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT
);
```

#### enrollments (table de jointure many-to-many)

```sql
CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id) ON DELETE CASCADE,
  course_id INT REFERENCES courses(id) ON DELETE CASCADE,
  UNIQUE(student_id, course_id)
);
```

---

## Structure du projet

```bash
course-manager/
│
├── backend/
│   ├── controllers/
│   │   ├── courseController.js
│   │   ├── studentController.js
│   │   └── enrollmentController.js
│   ├── routes/
│   │   ├── courseRoutes.js
│   │   ├── studentRoutes.js
│   │   └── enrollmentRoutes.js
│   ├── db.js
│   ├── server.js
│   ├── schema.sql
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── CourseForm.jsx
│   │   │   └── StudentForm.jsx
│   │   ├── pages/
│   │   │   ├── CoursesPage.jsx
│   │   │   ├── CourseDetailPage.jsx
│   │   │   └── StudentsPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
└── README.md
```

---

## API Routes

| Methode | Route | Description |
|---------|-------|-------------|
| GET | `/courses` | Liste de tous les cours |
| GET | `/courses/:id` | Detail d'un cours |
| POST | `/courses` | Creer un cours |
| PUT | `/courses/:id` | Modifier un cours |
| DELETE | `/courses/:id` | Supprimer un cours |
| GET | `/courses/:id/students` | Etudiants inscrits a un cours |
| GET | `/students` | Liste de tous les etudiants |
| GET | `/students/:id` | Detail d'un etudiant |
| POST | `/students` | Creer un etudiant |
| PUT | `/students/:id` | Modifier un etudiant |
| DELETE | `/students/:id` | Supprimer un etudiant |
| POST | `/enroll` | Inscrire un etudiant a un cours |
| DELETE | `/enroll/:id` | Desinscrire un etudiant |

---

## Installation

### 1. Cloner le projet

```bash
git clone <your-repository-url>
```

### 2. Base de donnees

Creer la base de donnees et les tables en executant le fichier `backend/schema.sql` :

```bash
psql -U postgres -f backend/schema.sql
```

### 3. Backend

```bash
cd backend
cp .env.example .env   # copier et adapter les credentials
npm install
npm run dev
```

Le backend demarre sur `http://localhost:5000`.

#### Fichier .env

Creer un fichier `.env` a la racine du backend avec :

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=course_manager
DB_PASSWORD=votre_mot_de_passe
DB_PORT=5432
```

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

Le frontend demarre sur `http://localhost:5173`.

---

## Utilisation

1. Ouvrir `http://localhost:5173` dans le navigateur
2. La page d'accueil affiche la liste des cours
3. Cliquer sur un cours pour voir les details et les etudiants inscrits
4. Naviguer vers "Etudiants" pour gerer tous les etudiants
5. Utiliser les formulaires pour ajouter, modifier ou supprimer des cours/etudiants
