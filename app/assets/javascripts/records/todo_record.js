var Record = require('immutable').Record;

var TodoRecord = Record({
  id: null,
  name: '',
  completedDate: null,
  dueDate: null
});

module.exports = TodoRecord;
