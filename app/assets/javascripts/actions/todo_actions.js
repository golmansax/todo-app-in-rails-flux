'use strict';

var CrudStoreActions = require('flux-crud-store').Actions;
var TodoStore = require('../stores/todo_store');

module.exports = CrudStoreActions.boundTo(TodoStore);
