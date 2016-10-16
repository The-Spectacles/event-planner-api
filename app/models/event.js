'use strict';

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
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
    default: [
      {
        text: 'Are you coming?',
        options: ['Yes', 'No', 'Maybe']
      },
    ],
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

eventSchema.virtual('rsvps', {
  ref: 'Rsvp',
  localField: '_id',
  foreignField: '_event'
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
