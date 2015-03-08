'use strict';

var Collection = require('backbone').Collection;
var TodoModel = require('./todo_model');

var TodoCollection = Collection.extend({
  url: '/todos',

  model: TodoModel
});

module.exports = TodoCollection;
