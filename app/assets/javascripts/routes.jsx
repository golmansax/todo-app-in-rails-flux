'use strict';

// React is required for all jsx files
var React = require('react');
var TodoApp = require('./jsx/todo_app');
var Route = require('react-router').Route;

var routes = (
  <Route handler={TodoApp} path="/">
  </Route>
);

module.exports = routes;
