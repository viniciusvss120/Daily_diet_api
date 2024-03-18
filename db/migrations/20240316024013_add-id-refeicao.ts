import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('refeicoes', (table) => {
    table.uuid('id').after('name')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('refeicoes', (table) => {
    table.dropColumn('id')
  })
}

