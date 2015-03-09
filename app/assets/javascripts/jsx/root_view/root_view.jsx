'use strict';

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var AlertModalTrigger = require('./alert_modal_trigger');

var RootView = React.createClass({
  render: function () {
    return (
      <div className='container'>
        <h1>My Todo List!</h1>
        <br />
        <RouteHandler {...this.props} />
        <AlertModalTrigger />
      </div>
    );
  }
});

module.exports = RootView;
