'use strict';

var React = require('react');
var TodoList = require('./todo_list');
var TodoOptionsMenu = require('./todo_options_menu');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var TodoApp = React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    return (
      <div>
        <TodoOptionsMenu />
        <br />
        <TodoList />
      </div>
    );
  }
});

module.exports = TodoApp;
