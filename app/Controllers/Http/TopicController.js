'use strict'
const Topic = use('App/Models/Topic')
class TopicController {
  async index ({ request, response, view }) {
    const topics = await Topic.all()
    return topics
  }

  async store ({ request, response, auth }) {
    const data = request.only(['title', 'collection', 'description', 'cover'])
    const topic = await Topic.create({ ...data, user_id: auth.user.id })
    return topic
  }

  async show ({ params, request, response, view }) {
    const topic = await Topic.findOrFail(params.id)
    return topic
  }

  async update ({ params, request, response }) {
    const data = request.only(['title', 'collection', 'description', 'cover'])
    const { id } = params
    const topic = await Topic.findOrFail(id)
    topic.merge(data)

    topic.save()

    return topic
  }

  async destroy ({ params }) {
    const { id } = params
    const topic = await Topic.find(id)

    await topic.delete()
  }
}

module.exports = TopicController
