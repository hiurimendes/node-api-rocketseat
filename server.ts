import fastify from 'fastify'
import crypto from 'node:crypto'

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname',
        translateTime: 'HH:MM:ss Z',
      },
    }
  },
})

const courses = [
  { id: '1', name: 'Node.js' },
  { id: '2', name: 'React.js' },
  { id: '3', name: 'React Native' },
]

server.get('/courses', () => {
  return { courses }
})

server.get('/courses/:id', (request, reply) => {
  type Params = {
    id: string
  }

  const params = request.params as Params
  const courseId = params.id

  const course = courses.find((course) => course.id === courseId)

  if (course) {
    return { course }
  }

  return reply.status(404).send()
})

server.post('/courses', (request, reply) => {
  type Body = {
    title: string
  }

  const courseId = crypto.randomUUID()

  const body = request.body as Body
  const courseTitle = body.title

  if (!courseTitle) {
    reply.status(400).send({ error: 'Title is required' })
  }

  courses.push({ id: courseId, name: courseTitle })

  return reply.status(201).send({ id: courseId })
})

server.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})
