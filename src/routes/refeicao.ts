import { boolean, string, z } from 'zod'
import { knex } from '../database'
import {FastifyInstance} from 'fastify'
import {verificarCookie} from '../middlewares/verificar_cookie'
import { randomUUID } from 'crypto'

export async function refecao (app: FastifyInstance){
  app.get('/refeicao',{preHandler: [verificarCookie]}, async (req, reply) => {
    const {sessionId} = req.cookies
    const result = await knex('refeicoes').where('session_id', sessionId).select()
    return {result}
  })

  app.get('/refeicao/:id',{preHandler: [verificarCookie]}, async (req, reply) => {
    const {sessionId} = req.cookies
    const _id = z.object({
      id: string()
    })

    const {id} = _id.parse(req.params)
    const result = await knex('refeicoes').where({
      session_id: sessionId,
      id   
    }).select()
    return {result}
  })

  app.get('/refeicao/resumo',{preHandler: [verificarCookie]}, async (req, reply) => {
    const {sessionId} = req.cookies
    const result = await knex('refeicoes').where('session_id', sessionId).select()
    
    // refeições dentro da dieta

    const dentroDieta = result.filter(item => item.dieta === 1)
    const foraDieta = result.filter(item => item.dieta === 0)
    const resumo = {
      qtdRefeicao: result.length,
      qtdDentroDieta: dentroDieta.length,
      qtdforaDieta: foraDieta.length
    }

    return resumo
  })

  app.post('/refeicao', async (req, reply) => {
    const refecao = z.object({
      nome: string(),
      descricao: string(),
      dieta: boolean()
    })

    const {nome, descricao, dieta} = refecao.parse(req.body)

    let cookie = req.cookies.sessionId

    if(!cookie) {
      cookie = randomUUID()

      reply.cookie('sessionId', cookie, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 dias
      })
    }

    
    await knex('refeicoes').insert({
      nome,
      descricao,
      dieta,
      session_id: cookie,
      id: randomUUID()
    })
    
    return reply.status(201).send()
  })

  app.put('/refeicao/:id', async (req, reply) => {
    const refeicao = z.object({
      nome: string(),
      descricao: string(),
      dieta: boolean()
    })

    const paramsId = z.object({
      id: string()
    })

    const {id} = paramsId.parse(req.params)
    const {nome, descricao, dieta} = refeicao.parse(req.body)
    
    await knex('refeicoes').where('id', id).update({
      nome,
      descricao,
      dieta
    })

    return reply.status(201).send()
  })

  app.delete('/refeicao/:id', async (req, reply) => {
    const paramsId = z.object({
      id: string()
    })

    const {id} = paramsId.parse(req.params)
    
    await knex('refeicoes').where('id', id).delete()

    return reply.status(201).send()
  })


}