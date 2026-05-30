import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}

// Only include password if it's set (not empty)
if (process.env.DB_PASSWORD) {
  config.password = process.env.DB_PASSWORD
}

const pool = new Pool(config)

export default pool
