'use strict'
const Source = use('App/Models/Source')

class SourceController {
  async index ({ request, response }) {
    const sources = await Source.all()
    return sources
  }

  async store ({ request }) {
    const data = request.only(['name', 'description', 'url'])
    const source = await Source.create(data)
    return source
  }

  async show ({ params }) {
    const source = await Source.findOrFail(params.id)
    return source
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'description', 'url'])
    const { id } = params
    const source = await Source.findOrFail(id)
    source.merge(data)

    source.save()

    return source
  }

  async destroy ({ params }) {
    const { id } = params
    const source = await Source.find(id)

    await source.delete()
  }
}

module.exports = SourceController
