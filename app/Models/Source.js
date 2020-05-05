'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Source extends Model {
  links () {
    return this.hasMany('App/Models/Link')
  }
}

module.exports = Source
