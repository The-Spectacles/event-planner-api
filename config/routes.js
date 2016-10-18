'use strict';

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')
.resources('events')
// .resources('rsvps', { except: ['create', 'update', 'destroy'] })
.get('/rsvps', 'rsvps#index')
.get('/rsvps/:id', 'rsvps#show')
.post('/rsvps', 'rsvps#createorupdate')

// custom routes
.get('/my-events', 'events#myevents')

// users of the app have special requirements
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

// all routes created
;
