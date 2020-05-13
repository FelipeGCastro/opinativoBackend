'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TopicSchema extends Schema {
  up () {
    this.table('topics', (table) => {
      table.text('cover')
    })
  }

  down () {
    this.table('topics', (table) => {
      // reverse alternations
    })
  }
}

module.exports = TopicSchema
