'use strict';

var React = require('react');
var TodoListItem = require('./todo_list_item.jsx');
var ListGroup = require('react-bootstrap').ListGroup;

var TodoList = React.createClass({
  propTypes: {
    todos: React.PropTypes.array.isRequired
  },

  _renderTodo: function (todo) {
    return <TodoListItem {...todo} key={todo.id} />;
  },

  render: function () {
    return (
      <ListGroup>
        {this.props.todos.map(this._renderTodo)}
      </ListGroup>
    );
  }
});

module.exports = TodoList;
