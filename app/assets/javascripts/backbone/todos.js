'use strict';

var Collection = require('backbone').Collection;
var Todo = require('./todo');

var Todos = Collection.extend({
  model: Todo,

  url: '/todos',

  parse: function (data) {
    return data.todos || data;
  }
});

module.exports = Todos;
