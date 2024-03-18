import { z } from 'zod'
import { knex } from '../database'
import {FastifyInstance} from 'fastify'
import { randomUUID } from 'crypto'


export async function usersRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    const table = await knex('users').select('*')

    return table
  })

  app.post('/users', async (req, reply) => {
    const createUser = z.object({
      nome: z.string()
    })

    const {nome} = createUser.parse(req.body)
    await knex('users')
      .insert({
        id: randomUUID(),
        nome
      })
  
    return reply.status(201).send()
  })
}