'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Rsvp = models.rsvp;
const Event = models.event;

const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  let search = { _owner: req.currentUser._id };
  Rsvp.find(search)
    .then(rsvps => res.json({ rsvps }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Rsvp.findById(req.params.id)
    .then(rsvp => rsvp ? res.json({ rsvp }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  // event id will come in req.body.rsvp._event
  let search = { _id: req.body.rsvp._event };
  // find the event & get back event information
  Event.findOne(search)
    .then(event => {
      if (!event) {
        return next();
      }

      // set up temp object to hold the data we want from the event
      // this lets us get rid of the timestamps, etc.
      let temp = {
        _event: event._id,
        title: event.title,
        location: event.location,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
      };

      // merge the temporary object with the rsvp data we send in the request
      // set the RSVP owner to the current user
      let rsvp = Object.assign(temp, req.body.rsvp, {
        _owner: req.currentUser._id,
      });

      return Rsvp.update({ _event: req.body.rsvp._event, _owner: req.currentUser._id}, rsvp, { upsert: true});
    })
    .then(rsvp => res.json({ rsvp }))
    .catch(err => next(err));
};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Rsvp.findOne(search)
    .then(rsvp => {
      if (!rsvp) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return rsvp.update(req.body.rsvp)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

// const destroy = (req, res, next) => {
//   let search = { _id: req.params.id, _owner: req.currentUser._id };
//   Rsvp.findOne(search)
//     .then(rsvp => {
//       if (!rsvp) {
//         return next();
//       }
//
//       return rsvp.remove()
//         .then(() => res.sendStatus(200));
//     })
//     .catch(err => next(err));
// };

module.exports = controller({
  index,
  show,
  create,
  update,
//  destroy,
}, { before: [
  { method: authenticate, except: [] },
], });
