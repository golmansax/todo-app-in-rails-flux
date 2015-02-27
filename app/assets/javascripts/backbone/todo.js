'use strict';

var Model = require('backbone').Model;
var moment = require('moment');
var _ = require('underscore');

var Todo = Model.extend({
  urlRoot: '/todos',

  toJSON: function () {
    var data = Model.prototype.toJSON.apply(this, arguments);

    return _(data).extend({
      dueDate: data.dueDate ? data.dueDate.unix() : null,
      completedDate: data.completedDate ? data.completedDate.unix() : null
    });
  },

  parse: function (data) {
    return _(data).extend({
      dueDate: data.dueDate ? moment(data.dueDate) : null,
      completedDate: data.completedDate ? moment(data.completedDate) : null
    });
  }
});

module.exports = Todo;
