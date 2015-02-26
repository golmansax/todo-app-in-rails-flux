'use strict';

require('es5-shim');
require('es5-shim/es5-sham');

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

var containerEl = window.document.getElementById('react-container');
if (containerEl) {
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler />, containerEl);
  });
}
