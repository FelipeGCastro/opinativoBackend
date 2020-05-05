'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LinkSchema extends Schema {
  up () {
    this.create('links', (table) => {
      table.increments()
      table.text('link').notNullable()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('source_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('sources')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('topic_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('topics')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('links')
  }
}

module.exports = LinkSchema
