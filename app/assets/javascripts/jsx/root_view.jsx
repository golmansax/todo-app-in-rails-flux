'use strict';

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var RootView = React.createClass({
  render: function () {
    return (
      <RouteHandler />
    );
  }
});

module.exports = RootView;
