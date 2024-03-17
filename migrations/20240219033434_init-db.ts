import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.uuid('id').primary()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.string('sub')
    table.string('email').unique()
    table.string('first_name').defaultTo('John')
    table.string('last_name').defaultTo('Doe')
    table.boolean('email_verified').defaultTo(false)
    table.string('picture').nullable()
  })

  await knex.schema.createTable('orders', table => {
    table.uuid('id').primary()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.uuid('buyer_id').references('id').inTable('users')
    table.string('status').defaultTo('PENDING')
  })

  await knex.schema.createTable('products', table => {
    table.uuid('id').primary()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.string('name')
    table.string('description')
    table.uuid('seller_id').references('id').inTable('users')
    table.string('picture').nullable()
    table.integer('price')
    table.string('currency')
    table.integer('quantity').defaultTo(1)
  })

  await knex.schema.createTable('order_products', table => {
    table.uuid('id').primary()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.uuid('product_id').references('id').inTable('products')
    table.uuid('order_id').references('id').inTable('orders')
    table.integer('quantity').defaultTo(1)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('order_products')

  await knex.schema.dropTable('products')

  await knex.schema.dropTable('orders')

  await knex.schema.dropTable('users')
}
