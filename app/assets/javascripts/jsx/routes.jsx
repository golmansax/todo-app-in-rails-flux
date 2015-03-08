'use strict';

// React is required for all jsx files
var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var RootView = require('./root_view');
var TodoApp = require('./todo_app');
var TodoRoute = require('./todo_route');

var routes = (
  <Route handler={RootView} path='/'>
    <DefaultRoute handler={TodoApp} />
    <Route name='todo' path='/todos/:id' handler={TodoRoute} />
  </Route>
);

module.exports = routes;
