import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', table => {
    table.string('first_name').nullable().defaultTo(null).alter()
    table.string('last_name').nullable().defaultTo(null).alter()

    table.string('picture').nullable().defaultTo(null).alter()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', table => {
    table.string('first_name').defaultTo('John').alter()
    table.string('last_name').defaultTo('Doe').alter()

    table.string('picture').nullable().alter()
  })
}
