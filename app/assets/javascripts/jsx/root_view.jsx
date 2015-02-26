'use strict';

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var RootView = React.createClass({
  render: function () {
    return (
      <div className='container'>
        <h1>My Todo List!</h1>
        <br />
        <RouteHandler />
      </div>
    );
  }
});

module.exports = RootView;
