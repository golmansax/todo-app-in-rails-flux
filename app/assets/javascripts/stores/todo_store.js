'use strict';

var Store = require('./backbone_immutable_collection_store');
var TodoCollection = require('../backbone/todo_collection');
var TodoViewModel = require('../view_models/todo_view_model');

var TodoStoreFactory = Store.extend({
  collection: TodoCollection,

  viewModel: TodoViewModel
});

var TodoStore = new TodoStoreFactory();

module.exports = TodoStore;
