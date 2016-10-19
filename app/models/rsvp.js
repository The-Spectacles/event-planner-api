'use strict';

const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  _event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: false,
  },
  endTime: {
    type: Date,
    required: false,
  },
  questions: {
    type: Array,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});


const Rsvp = mongoose.model('Rsvp', rsvpSchema);

module.exports = Rsvp;
