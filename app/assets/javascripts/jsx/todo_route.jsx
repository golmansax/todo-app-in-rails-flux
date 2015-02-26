'use strict';

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var TodoStore = require('../stores/todo_store');

var TodoListItem = React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    return (
      <h2>Hello</h2>
    );
  }
});

module.exports = TodoListItem;
