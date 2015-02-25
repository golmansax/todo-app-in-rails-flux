'use strict';

var React = require('react');
var TodoList = require('./todo_list');
var TodoOptionsMenu = require('./todo_options_menu');
var TodoStore = require('../stores/todo_store');
var BindToStoreMixin = require('../mixins/bind_to_store_mixin');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var TodoApp = React.createClass({
  mixins: [PureRenderMixin, BindToStoreMixin(TodoStore, 'getStateFromStore')],

  getStateFromStore: function () {
    return {
      todos: TodoStore.getAll()
    };
  },

  render: function () {
    return (
      <div>
        <TodoOptionsMenu />
        <br />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
});

module.exports = TodoApp;
