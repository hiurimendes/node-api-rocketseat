import fastify from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import scalarAPIReference from '@scalar/fastify-api-reference'
import { 
  validatorCompiler, 
  serializerCompiler, 
  jsonSchemaTransform,
  type ZodTypeProvider 
} from 'fastify-type-provider-zod'
import { createCourseRoute } from './src/routes/create-course.ts'
import { getCoursesRoute } from './src/routes/get-courses.ts'
import { getCourseByIdRoute } from './src/routes/get-course-by-id.ts'

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
}).withTypeProvider<ZodTypeProvider>()

/** Swagger documentation */
if (process.env.NODE_ENV === 'development') {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Desafio Node.js',
        version: '1.0.0',
      }
    },
    transform: jsonSchemaTransform,
  })

  server.register(scalarAPIReference, {
    routePrefix: '/docs',
    configuration: {
      theme: 'deepSpace'
    }
  })
}

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(createCourseRoute)
server.register(getCoursesRoute)
server.register(getCourseByIdRoute)

server.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})
