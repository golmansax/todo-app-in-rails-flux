'use strict';

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var BindMixin = require('react-bind-mixin');
var TodoStore = require('../stores/todo_store');

var TodoView = React.createClass({
  mixins: [PureRenderMixin, BindMixin(TodoStore, 'getStateFromStore')],

  getStateFromStore: function () {
    return {
      todo: TodoStore.get(this.props.id)
    };
  },

  render: function () {
    return (
      <h2>{this.state.todo.name}</h2>
    );
  }
});

module.exports = TodoView;
