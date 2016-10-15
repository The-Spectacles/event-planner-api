'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Rsvp = models.rsvp;

const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  Rsvp.find()
    .then(rsvps => res.json({ rsvps }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Rsvp.findById(req.params.id)
    .then(rsvp => rsvp ? res.json({ rsvp }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  let rsvp = Object.assign(req.body.rsvp, {
    _owner: req.currentUser._id,

  });
  Rsvp.create(rsvp)
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
