'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')

// sourcer can have param ?source=:source_id
Route.get('links', 'LinkController.index')
Route.get('sources', 'SourceController.index')
Route.get('links/:id', 'LinkController.show')

Route.group(() => {
  Route.resource('sources', 'SourceController').except(['index']).apiOnly()
  Route.resource('topics', 'TopicController').apiOnly()
  Route.resource('links', 'LinkController').except(['index', 'show']).apiOnly()
}).middleware(['auth'])
