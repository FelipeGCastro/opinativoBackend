'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Topic extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  links () {
    return this.hasMany('App/Models/Link')
  }
}

module.exports = Topic
