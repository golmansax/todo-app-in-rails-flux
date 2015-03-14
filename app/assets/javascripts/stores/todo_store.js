'use strict';

var CrudStore = require('flux-crud-store').Store;
var TodoCollection = require('../models/todo_collection');
var TodoViewModel = require('../models/todo_view_model');

var TodoStoreFactory = CrudStore.extend({
  collection: TodoCollection,
  viewModel: TodoViewModel
});

var TodoStore = new TodoStoreFactory();

module.exports = TodoStore;
