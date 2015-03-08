'use strict';

var Model = require('backbone').Model;
var moment = require('moment');

var TodoModel = Model.extend({
  urlRoot: '/todos',

  defaults: {
    id: null,
    name: '',
    completedDate: null,
    dueDate: null
  },

  validate: function (attrs) {
    if (attrs.dueDate && !moment(attrs.dueDate).isValid()) {
      return 'Due date is not a valid date!';
    }

    if (attrs.completedDate && !moment(attrs.completedDate).isValid()) {
      return 'Completed date is not a valid date!';
    }
  }
});

module.exports = TodoModel;
