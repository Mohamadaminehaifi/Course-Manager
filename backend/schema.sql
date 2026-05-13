-- Script pour créer la base de données et les tables

-- Créer la base de données
CREATE DATABASE course_manager;

-- Se connecter à la base de données
\c course_manager;

-- Table students
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);

-- Table courses
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT
);

-- Table enrollments (jointure many-to-many)
CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id) ON DELETE CASCADE,
  course_id INT REFERENCES courses(id) ON DELETE CASCADE,
  UNIQUE(student_id, course_id)
);

-- Insérer des données de test
INSERT INTO students (name, email) VALUES
  ('Alice Martin', 'alice@example.com'),
  ('Bob Dupont', 'bob@example.com'),
  ('Claire Bernard', 'claire@example.com');

INSERT INTO courses (title, description) VALUES
  ('Introduction à la programmation', 'Cours de base pour débutants'),
  ('Base de données', 'Apprendre SQL et les bases de données relationnelles'),
  ('Développement Web', 'HTML, CSS, JavaScript et frameworks');