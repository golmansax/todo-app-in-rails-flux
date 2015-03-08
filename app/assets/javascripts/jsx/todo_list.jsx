'use strict';

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Iterable = require('immutable').Iterable;
var TodoListItem = require('./todo_list_item');
var NewTodoListItem = require('./new_todo_list_item');

var TodoList = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    todos: React.PropTypes.instanceOf(Iterable).isRequired
  },

  _renderTodo: function (todo, index) {
    if (!todo.id) {
      return <NewTodoListItem todo={todo} key={index} />;
    } else {
      return <TodoListItem todo={todo} key={todo.id} />;
    }
  },

  render: function () {
    return (
      <div className='list-group'>
        {this.props.todos.map(this._renderTodo).toJS()}
      </div>
    );
  }
});

module.exports = TodoList;
