'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Event = models.event;
const Rsvp = models.rsvp;

const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  // find events where owner of event is NOT current user
  // AND where none of the rsvp owners for that event are the current user
  // (where the current user hasn't yet RSVPed for that event)
  // Event.find({ $and: [ { _owner: {$ne: req.currentUser._id } }, { 'rsvps._owner': { $ne: req.currentUser._id } } ] } )
  Event.find({ _owner: { $ne: req.currentUser._id }})
    .populate('rsvps')
    .then((events) => {
      let filteredEvents = [];
      events.forEach((event) => {
        // use array.every() to check whether all of the rsvps have a ._owner that is NOT req.currentUser._id
        // this means the current user has NOT RSVPed to the event
        // which means it's a good event
        // if all rsvps do NOT belong to the user, array.every will return "true"
        // if an rsvp does belong to the user, array.every will return "false"
        let validEvent = event.rsvps.every((rsvp) => {
          return rsvp._owner.toString() !== req.currentUser._id.toString();
        });
        if (validEvent) {
          filteredEvents.push(event);
        }
      });

      return filteredEvents;
    })
    .then(events => res.json({ events }))
    .catch(err => next(err));
};

const myevents = (req, res, next) => {
  let search = { _owner: req.currentUser._id };
  console.log();
  Event.find(search)
    .then(events => res.json({ events }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Event.findById(req.params.id)
    .populate('rsvps')
    .then(event => event ? res.json({ event }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  let event = Object.assign(req.body.event, {
    _owner: req.currentUser._id,

  });
  Event.create(event)
    .then(event => res.json({ event }))
    .catch(err => next(err));
};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Event.findOne(search)
    .then(event => {
      if (!event) {
        return next();
      }

      delete req.body._owner;
      return event.update(req.body.event)
        .then(() => Event.findOne(search))
        .then((event) => res.json({ event }));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Event.findOne(search)
    .then(event => {
      if (!event) {
        return next();
      }
      return Rsvp.remove({ _event: req.params.id })
      .then(() => event.remove())
        .then(() => res.sendStatus(200));
    })
      .catch(err => next(err));
};

module.exports = controller({
  index,
  myevents,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: authenticate, except: [] },
], });
