'use strict';

var moment = require('moment');
var BackboneStore = require('./backbone_store');

var TodoStore = new BackboneStore();

TodoStore.Actions.load([
  { name: 'Cut hair', dueDate: moment('2015-03-04'), id: 1 },
  { name: 'Wash car', dueDate: moment('2015-02-20'), id: 2 },
  { name: 'Laundry', dueDate: moment('2015-02-19'), id: 3 },
  { name: 'Buy groceries', completedDate: moment('2015-02-10'), id: 4 },
  { name: 'Start a company', dueDate: moment('2020-01-01'), id: 5 }
]);

module.exports = TodoStore;
