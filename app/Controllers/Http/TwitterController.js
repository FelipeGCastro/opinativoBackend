'use strict'
const Twitter = require('twitter-lite')

function newClient () {
  return new Twitter({
    subdomain: 'api',
    consumer_key: 'ep5bpGGTJ8RIg91LK9vDmQ8oK',
    consumer_secret: 'WrFgxElqb5eNGFTf4uXHblw6s5qmbv7QsNI90aPFQLRdhHgYTu',
    access_token_key: '1257720404208160768-VbjUELTW5iwFY3b64CP6FXaCyJJEWA',
    access_token_secret: 'N1s9r0DIKqgvkahpBvQxBTzi15PeFuTYFpc87K8yzbqiU'
  })
}

class TwitterController {
  async index ({ request, response }) {
    const client = newClient()
    const collections = await client.get('collections/list', { screen_name: 'OpinativoO' })
    return collections
  }

  async create ({ request, response }) {
    const { searchText, collectionId, count } = request.all()
    // temp searchText
    let countText = ''
    if (count) {
      countText = `&count=${count}`
    }
    try {
      const searchClient = newClient()
      const search = await searchClient.get('search/tweets', {
        q: encodeURI(`${searchText} filter:verified${countText}`)
      })
      console.log(search.statuses[0].id, search.statuses[0].id_str)
      if (search.statuses.length > 1) {
        const dataObj = {
          id: `custom-${collectionId}`,
          changes: search.statuses.map(tweet => {
            return { op: 'add', tweet_id: tweet.id_str }
          }).reverse()
        }
        try {
          const client = newClient()
          const updateCollection = await client.post('collections/entries/curate', dataObj)
          return updateCollection
        } catch (error) {
          console.log('updateCollection', error)
          return error
        }
      }
    } catch (error) {
      console.log('search', error)
    }
  }
}

module.exports = TwitterController
