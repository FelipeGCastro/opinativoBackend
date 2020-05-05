'use strict'
const Link = use('App/Models/Link')
const moment = require('moment')
class LinkController {
  async index ({ request, response, view }) {
    const { source, days } = request.all()
    const paramsToChain = {
      source_id: source || null,
      days: days && !isNaN(days) ? Number(days) : null
    }
    const query = Link.query()
    // const dates = [moment().subtract(2, 'days'), moment()]
    Object.keys(paramsToChain).forEach(key => {
      if (paramsToChain[key]) {
        if (key === 'days') {
          query.where('created_at', '>', moment().subtract(paramsToChain[key], 'days').format('YYYY-MM-DD HH:mm:ss'))
        } else {
          query.where(key, paramsToChain[key])
        }
      }
    })
    const links = await query.with('topic').fetch()
    return links
  }

  async store ({ request, response, auth }) {
    const data = request.only(['link', 'source_id', 'topic_id'])
    const link = await Link.create({ ...data, user_id: auth.user.id })
    return link
  }

  async show ({ params, request, response, view }) {
    const link = await Link.findOrFail(params.id)
    await link.load('topic')
    return link
  }

  async update ({ params, request, response }) {
    const data = request.only(['link', 'source_id', 'topic_id'])
    const { id } = params
    const link = await Link.findOrFail(id)
    link.merge(data)

    link.save()

    return link
  }

  async destroy ({ params }) {
    const { id } = params
    const link = await Link.find(id)

    await link.delete()
  }
}

module.exports = LinkController
