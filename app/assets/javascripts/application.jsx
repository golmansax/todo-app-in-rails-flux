'use strict';

require('es5-shim');
require('es5-shim/es5-sham');

var React = require('react');
var TodoApp = require('./jsx/todo_app');

var containerEl = window.document.getElementById('react-container');
if (containerEl) {
  React.render(<TodoApp />, containerEl);
}
