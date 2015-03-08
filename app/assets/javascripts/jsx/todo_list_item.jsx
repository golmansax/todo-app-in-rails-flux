'use strict';

var React = require('react');
var moment = require('moment');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Link = require('react-router').Link;
var TodoActions = require('../stores/todo_store').Actions;
var TodoViewModel = require('../view_models/todo_view_model');

var TodoListItem = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    todo: React.PropTypes.instanceOf(TodoViewModel)
  },

  _handleMarkComplete: function (event) {
    event.preventDefault();
    TodoActions.updateAndSave(this.props.todo.id, {
      completedDate: moment().format('YYYY-MM-DD')
    });
  },

  _handleMarkIncomplete: function (event) {
    event.preventDefault();
    TodoActions.updateAndSave(this.props.todo.id, { completedDate: null });
  },

  _handleDestroy: function (event) {
    event.preventDefault();
    TodoActions.destroyAndSave(this.props.todo.id);
  },

  _handleNameChange: function (event) {
    TodoActions.update(this.props.todo.id, { name: event.target.value });
  },

  _handleSave: function () {
    TodoActions.save(this.props.todo.id);
  },

  _preventDefault: function (event) {
    event.preventDefault();
  },

  _renderDate: function () {
    if (this.props.todo.completedDate) {
      return (
        <p>
          <strong>Completed date: </strong>
          {moment(this.props.todo.completedDate).calendar()}
        </p>
      );
    } else if (this.props.todo.dueDate) {
      return (
        <p>
          <strong>Due date: </strong>
          {moment(this.props.todo.dueDate).calendar()}
        </p>
      );
    } else {
      return (
        <p>
          <strong>No due date</strong>
        </p>
      );
    }
  },

  _renderActionButton: function () {
    if (this.props.todo.completedDate) {
      return (
        <button
          className='btn btn-lg btn-default btn-block'
          onClick={this._handleMarkIncomplete}
        >
          Not Done Yet
        </button>
      );
    } else {
      return (
        <button
          className='btn btn-lg btn-primary btn-block'
          onClick={this._handleMarkComplete}
        >
          Mark Done
        </button>
      );
    }
  },

  render: function () {
    return (
      <Link
        to='todo'
        params={{ id: this.props.todo.id }}
        className='list-group-item'
      >
        <div className='row'>
          <div className='col-md-9'>
            <div className='form-group'>
              <label htmlFor={'name-input-' + this.props.todo.id}>
                Task
              </label>
              <input
                id={'name-input-' + this.props.todo.id}
                className='form-control'
                value={this.props.todo.name}
                onClick={this._preventDefault}
                onChange={this._handleNameChange}
                onBlur={this._handleSave}
              />
            </div>
            {this._renderDate()}
          </div>
          <div className='col-md-3'>
            {this._renderActionButton()}
            <button
              className='btn btn-lg btn-default btn-block'
              onClick={this._handleDestroy}
            >
              Remove
            </button>
          </div>
        </div>
      </Link>
    );
  }
});

module.exports = TodoListItem;
