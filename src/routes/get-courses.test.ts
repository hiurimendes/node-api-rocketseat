import { test, expect } from 'vitest'
import request from 'supertest'
import { randomUUID } from 'node:crypto'

import { server } from '../app.ts'
import { makeCourse } from '../tests/factories/make-course.ts'

test('get a course by id', async () => {
  await server.ready()

  const titleId = randomUUID()
  const course = await makeCourse(titleId)
  
  
  const response = await request(server.server)
    .get(`/courses?search=${titleId}`)

  expect(response.status).toBe(200)
  expect(response.body).toEqual({
    total: 1,
    courses: [
      {
        id: expect.any(String),
        title: titleId,
        enrollments: 0,
      }
    ]
  })
})