'use strict';

var moment = require('moment');
var BackboneCollectionStore = require('./backbone_collection_store');
var Todos = require('../backbone/todos');

var TodoStoreFactory = BackboneCollectionStore.extend({
  collection: Todos
});

var TodoStore = new TodoStoreFactory();

module.exports = TodoStore;
