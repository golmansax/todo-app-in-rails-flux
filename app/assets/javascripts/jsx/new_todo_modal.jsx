'use strict';

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Modal = require('react-bootstrap').Modal;

var NewTodoModal = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return (
      <Modal {...this.props} bsStyle='primary' title='Create a Todo' animation={false}>
        <div className='modal-body'>
          <div className='form-group'>
            <label htmlFor='new-todo-name'>Name</label>
            <input id='new-todo-name' className='form-control' />
          </div>
          <div className='form-group'>
            <label htmlFor='new-todo-due-date'>Due Date</label>
            <input id='new-todo-due-date' className='form-control' />
          </div>
        </div>
        <div className='modal-footer'>
          <button
            className='btn btn-default'
            onClick={this.props.onRequestHide}
            >
            Cancel
          </button>
        </div>
      </Modal>
    );
  }
});

module.exports = NewTodoModal;
