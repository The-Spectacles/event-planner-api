'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Event = models.event;
const Rsvp = models.rsvp;

const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  Event.find()
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
        .then(() => res.json({ event }));
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
