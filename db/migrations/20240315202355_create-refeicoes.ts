import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('refeicoes', (table) => {
    table.text('nome').notNullable()
    table.text('descricao').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.boolean('dieta')
    table.uuid('session_id').notNullable().index()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('refeicoes')
}

