'use strict';

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var BindMixin = require('react-bind-mixin');
var AlertStore = require('../../stores/alert_store');
var AlertActions = require('../../stores/alert_store').Actions;

var AlertModalTrigger = React.createClass({
  mixins: [
    OverlayMixin,
    PureRenderMixin,
    BindMixin(AlertStore, 'getStateFromStore')
  ],

  getStateFromStore: function () {
    return {
      isShowing: AlertStore.isShowing(),
      hasCancelButton: AlertStore.hasCancelButton(),
      message: AlertStore.getMessage()
    };
  },

  _handleOK: function () {
    AlertActions.resolvePromise();
    AlertActions.hide();
  },

  _handleCancel: function () {
    AlertActions.rejectPromise();
    AlertActions.hide();
  },

  render: function () {
    return null;
  },

  _renderCancelButton: function () {
    if (!this.state.hasCancelButton) {
      return null;
    }

    return (
      <button className='btn btn-default' onClick={this._handleCancel}>
        Cancel
      </button>
    );
  },

  _renderFooter: function () {
    return (
      <div className='modal-footer'>
        {this._renderCancelButton()}
        <button
          className='btn btn-primary'
          onClick={this._handleOK}
          >
          OK
        </button>
      </div>
    );
  },

  renderOverlay: function () {
    if (!this.state.isShowing) {
      return null;
    }

    return (
      <Modal
        bsStyle='primary'
        title='Alert'
        animation={false}
        onRequestHide={this._handleCancel}
        {...this.props}
        >
        <div className='modal-body'>{this.state.message}</div>
        {this._renderFooter()}
      </Modal>
    );
  }
});

module.exports = AlertModalTrigger;
