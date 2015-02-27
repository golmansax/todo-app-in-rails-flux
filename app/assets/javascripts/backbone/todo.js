'use strict';

var Model = require('backbone').Model;
var moment = require('moment');
var _ = require('underscore');

var Todo = Model.extend({
  urlRoot: '/todos',

  parse: function (data) {
    var todo = data;

    return _(todo).extend({
      dueDate: todo.dueDate ? moment(todo.dueDate) : null,
      completedDate: todo.completedDate ? moment(todo.completedDate) : null
    });
  }
});

module.exports = Todo;
