'use strict';

require('es5-shim');
require('es5-shim/es5-sham');
require('./support/backbone_ajax_overrides');
require('./support/backbone_sync_overrides');

var React = require('react');
var Router = require('react-router');
var routes = require('./jsx/routes');

function bootApplication() {
  var containerEl = window.document.getElementById('react-container');
  if (containerEl) {
    Router.run(routes, Router.HistoryLocation, function (Handler, state) {
      React.render(<Handler {...state.params} />, containerEl);
    });
  }
};

bootApplication();
module.exports = bootApplication;
