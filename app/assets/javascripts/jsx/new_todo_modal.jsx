'use strict';

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Modal = require('react-bootstrap').Modal;
var TodoActions = require('../stores/todo_store').Actions;
var Model = require('backbone').Model;

var NewTodoModal = React.createClass({
  mixins: [PureRenderMixin],

  _handleCreate: function () {
    TodoActions.createAndSave(this._todo.attributes);
    console.log(this._todo.attributes);
    this.props.onRequestHide();
  },

  componentWillMount: function () {
    this._todo = new Model();
    this._todo.on('change', this._forceUpdate);
  },

  _forceUpdate: function () {
    this.forceUpdate();
  },

  componentWillUnmount: function () {
    this._todo.off('change', this._forceUpdate);
  },

  _handleTodoUpdate: function (attr, event) {
    this._todo.set(attr, event.target.value);
  },

  render: function() {
    return (
      <Modal
        {...this.props}
        bsStyle='primary'
        title='Create a Todo'
        animation={false}
        >
        <div className='modal-body'>
          <div className='form-group'>
            <label htmlFor='new-todo-name'>Name</label>
            <input
              id='new-todo-name'
              className='form-control'
              value={this._todo.get('name')}
              onChange={this._handleTodoUpdate.bind(this, 'name')}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='new-todo-due-date'>Due Date</label>
            <input
              id='new-todo-due-date'
              className='form-control'
              value={this._todo.get('dueDate')}
              onChange={this._handleTodoUpdate.bind(this, 'dueDate')}
            />
          </div>
        </div>
        <div className='modal-footer'>
          <button
            className='btn btn-default'
            onClick={this.props.onRequestHide}
            >
            Cancel
          </button>
          <button
            className='btn btn-primary'
            onClick={this._handleCreate}
            >
            Create
          </button>
        </div>
      </Modal>
    );
  }
});

module.exports = NewTodoModal;
