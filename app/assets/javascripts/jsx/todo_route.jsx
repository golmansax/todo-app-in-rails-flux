'use strict';

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var TodoStore = require('../stores/todo_store');
var BindToStoreMixin = require('../mixins/bind_to_store_mixin');

var TodoListItem = React.createClass({
  mixins: [PureRenderMixin, BindToStoreMixin(TodoStore, 'getStateFromStore')],

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

module.exports = TodoListItem;
