'use strict';

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var BindToStoreMixin = require('../../mixins/bind_to_store_mixin');
var AlertStore = require('../../stores/alert_store');
var AlertActions = require('../../stores/alert_store').Actions;

var AlertModalTrigger = React.createClass({
  mixins: [
    OverlayMixin,
    PureRenderMixin,
    BindToStoreMixin(AlertStore, 'getStateFromStore')
  ],

  getStateFromStore: function () {
    return {
      isShowing: AlertStore.isShowing(),
      message: AlertStore.getMessage()
    };
  },

  _handleHide: function () {
    AlertActions.hide();
  },

  render: function () {
    return null;
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
        onRequestHide={this._handleHide}
        {...this.props}
        >
        <div className='modal-body'>
          {this.state.message}
        </div>
        <div className='modal-footer'>
          <button
            className='btn btn-default'
            onClick={this._handleHide}
            >
            Got it
          </button>
        </div>
      </Modal>
    );
  }
});

module.exports = AlertModalTrigger;
