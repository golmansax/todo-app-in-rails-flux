'use strict';

var Model = require('backbone').Model;

var Todo = Model.extend({
  urlRoot: '/todos'
});

module.exports = Todo;
