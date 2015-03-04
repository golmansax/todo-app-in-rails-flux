'use strict';

var Store = require('./backbone_immutable_collection_store');
var Todos = require('../backbone/todos');
var TodoRecord = require('../records/todo_record');

var TodoStoreFactory = Store.extend({
  collection: Todos,

  record: TodoRecord
});

var TodoStore = new TodoStoreFactory();

module.exports = TodoStore;
