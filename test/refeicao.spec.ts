import request from 'supertest'
import { it, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'
import { execSync} from 'node:child_process'
import { app } from '../src/app'
import { randomUUID } from 'node:crypto'


describe('Testando as requisições para a tabela refeição', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('criar refeições', async () => {
    await request(app.server)
      .post('/refeicao')
      .send({
        nome: 'X-SALADA',
        descricao: 'pão, hamburgue, alface, tomate, queijo',
        dieta: false
      })
      .expect(201)
  })

  it('listar todas as refeições', async () => {
    const createRefeicao = await request(app.server)
      .post('/refeicao')
      .send(
        {
          nome: 'X-SALADA',
          descricao: 'pão, hamburgue, alface, tomate, queijo',
          dieta: false
        }
      )
      
      const cookie = createRefeicao.get('Set-Cookie')
      const listRefeicao = await request(app.server)
        .get('/refeicao')
        .set('Cookie',cookie)
        .expect(200)

      expect(listRefeicao.body.result).toEqual([
        expect.objectContaining({
          nome: 'X-SALADA',
          descricao: 'pão, hamburgue, alface, tomate, queijo'
        })
      ])
  })

  it('listar uma determinada refeição', async () => {
    const createRefeicao = await request(app.server)
      .post('/refeicao')
      .send(
        {
          // id: randomUUID(),
          nome: 'X-SALADA',
          descricao: 'pão, hamburgue, alface, tomate, queijo',
          dieta: false
        }
      )
      
      const cookie = createRefeicao.get('Set-Cookie')

      const listRefeicao = await request(app.server)
        .get('/refeicao')
        .set('Cookie',cookie)
        .expect(200)
      
      const getRefeicaoId = listRefeicao.body.result[0].id

      const getRefeicaoById = await request(app.server)
        .get(`/refeicao/${getRefeicaoId}`)
        .set('Cookie', cookie)
        .expect(200)

      expect(getRefeicaoById.body.result).toEqual([
        expect.objectContaining({
          nome: 'X-SALADA',
          descricao: 'pão, hamburgue, alface, tomate, queijo'
        })
      ])
  })

  it('editar refeição', async () => {
    const createRefeicao = await request(app.server)
      .post('/refeicao')
      .send({
        nome: 'Almoço BR',
        descricao: 'Arroz, Feijão, Bife de boi e salada de repolho com tomate',
        dieta: true
      })
      .expect(201)

    const cookie = createRefeicao.get('Set-Cookie')

    const getRefeicao = await request(app.server)
      .get('/refeicao')
      .set('Cookie', cookie)
      .expect(200)

    const getRefeicaoId = getRefeicao.body.result[0].id


    await request(app.server)
      .put(`/refeicao/${getRefeicaoId}`)
      .send({
        nome: 'Almoço BR',
        descricao: 'Arroz, Feijão, Bife de boi, Macarrão e salada de repolho com tomate',
        dieta: true
      })
      .expect(201)
  })

  it('deletar refeição', async () => {
    const createRefeicao = await request(app.server)
      .post('/refeicao')
      .send({
        nome: 'Almoço BR',
        descricao: 'Arroz, Feijão, Bife de boi e salada de repolho com tomate',
        dieta: true
      })
      .expect(201)

    const cookie = createRefeicao.get('Set-Cookie')

    const getRefeicao = await request(app.server)
      .get('/refeicao')
      .set('Cookie', cookie)
      .expect(200)

    const getRefeicaoId = getRefeicao.body.result[0].id


    await request(app.server)
      .delete(`/refeicao/${getRefeicaoId}`)
      .expect(201)
  })
})