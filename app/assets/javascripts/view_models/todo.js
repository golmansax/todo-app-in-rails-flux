'use strict';

var Record = require('immutable').Record;

var Todo = Record({
  id: null,
  name: '',
  completedDate: null,
  dueDate: null
});

module.exports = Todo;
