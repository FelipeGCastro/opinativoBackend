'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TopicSchema extends Schema {
  up () {
    this.create('topics', (table) => {
      table.increments()
      table.text('title').notNullable()
      table.text('collection').notNullable()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('topics')
  }
}

module.exports = TopicSchema
