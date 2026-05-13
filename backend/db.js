import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'course_manager',
  password: 'postgres',
  port: 5432
})

export default pool