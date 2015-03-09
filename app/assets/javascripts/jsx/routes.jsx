'use strict';

// React is required for all jsx files
var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var RootView = require('./root_view/root_view');
var TodosView = require('./todos_view/todos_view');
var TodoView = require('./todo_view');

var routes = (
  <Route handler={RootView} path='/'>
    <DefaultRoute handler={TodosView} />
    <Route name='todo' path='/todos/:id' handler={TodoView} />
  </Route>
);

module.exports = routes;
