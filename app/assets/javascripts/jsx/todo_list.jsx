'use strict';

var React = require('react');
var TodoListItem = require('./todo_list_item');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var TodoList = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    todos: React.PropTypes.array.isRequired
  },

  _renderTodo: function (todo) {
    return <TodoListItem {...todo} key={todo.id} />;
  },

  render: function () {
    return (
      <ul className='list-group'>
        {this.props.todos.map(this._renderTodo)}
      </ul>
    );
  }
});

module.exports = TodoList;
