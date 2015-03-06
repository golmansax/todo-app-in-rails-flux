'use strict';

var Store = require('./backbone_immutable_collection_store');
var Todos = require('../backbone/todos');
var Todo = require('../view_models/todo');

var TodoStoreFactory = Store.extend({
  collection: Todos,

  viewModel: Todo
});

var TodoStore = new TodoStoreFactory();

module.exports = TodoStore;
