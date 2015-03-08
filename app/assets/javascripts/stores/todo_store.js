'use strict';

var Store = require('./backbone_immutable_collection_store');
var TodoCollection = require('../models/todo_collection');
var TodoViewModel = require('../models/todo_view_model');

var TodoStoreFactory = Store.extend({
  collection: TodoCollection,

  viewModel: TodoViewModel
});

var TodoStore = new TodoStoreFactory();

module.exports = TodoStore;
