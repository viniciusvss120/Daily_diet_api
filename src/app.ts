import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { refecao } from './routes/refeicao'
import { usersRoutes } from './routes/users'


export const app = fastify()

app.register(usersRoutes)
app.register(refecao)
app.register(cookie)