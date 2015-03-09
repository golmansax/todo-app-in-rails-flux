'use strict';

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var BindToStoreMixin = require('../../mixins/bind_to_store_mixin');
var TodoStore = require('../../stores/todo_store');
var TodoListItem = require('./todo_list_item');

var TodoList = React.createClass({
  mixins: [PureRenderMixin, BindToStoreMixin(TodoStore, 'getStateFromStore')],

  componentWillMount: function () {
    TodoStore.Actions.fetchAll();
    this.setState(this.getStateFromStore());
  },

  getStateFromStore: function () {
    return {
      todos: TodoStore.getAll()
    };
  },

  _renderTodo: function (todo) {
    if (!todo.id) {
      return <div className='list-group-item'>Loading...</div>;
    } else {
      return <TodoListItem todo={todo} key={todo.id} />;
    }
  },

  render: function () {
    if (this.state.todos.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className='list-group'>
        {this.state.todos.map(this._renderTodo).toJS()}
      </div>
    );
  }
});

module.exports = TodoList;
