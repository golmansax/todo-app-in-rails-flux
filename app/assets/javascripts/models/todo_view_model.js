'use strict';

var Record = require('immutable').Record;

var TodoViewModel = Record({
  id: null,
  name: '',
  completedDate: null,
  dueDate: null
});

module.exports = TodoViewModel;
