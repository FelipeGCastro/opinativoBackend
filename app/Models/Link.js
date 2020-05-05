'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Link extends Model {
  topic () {
    return this.belongsTo('App/Models/Topic')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  source () {
    return this.belongsTo('App/Models/Topic')
  }
}
module.exports = Link
