import express from 'express'
import cors from 'cors'
import courseRoutes from './routes/courseRoutes.js'
import studentRoutes from './routes/studentRoutes.js'
import enrollmentRoutes from './routes/enrollmentRoutes.js'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.use('/courses', courseRoutes)
app.use('/students', studentRoutes)
app.use('/enroll', enrollmentRoutes)

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
})
