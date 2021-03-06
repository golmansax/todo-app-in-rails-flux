'use strict';

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var BindMixin = require('react-bind-mixin');
var TodoStore = require('../../stores/todo_store');
var TodoActions = require('../../actions/todo_actions');
var TodoListItem = require('./todo_list_item');

var TodoList = React.createClass({
  mixins: [PureRenderMixin, BindMixin(TodoStore, 'getStateFromStore')],

  componentWillMount: function () {
    TodoActions.fetchAll();
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
        {this.state.todos.valueSeq().map(this._renderTodo).toJS()}
      </div>
    );
  }
});

module.exports = TodoList;
