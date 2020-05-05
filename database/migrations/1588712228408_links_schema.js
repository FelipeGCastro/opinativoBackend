'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LinksSchema extends Schema {
  up () {
    this.table('links', (table) => {
      table.text('description').notNullable()
    })
  }

  down () {
    this.table('links', (table) => {
      // reverse alternations
    })
  }
}

module.exports = LinksSchema
