'use strict';

var React = require('react');
var moment = require('moment');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Link = require('react-router').Link;
var TodoActions = require('../stores/todo_store').Actions;
var TodoRecord = require('../records/todo_record');

var TodoListItem = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    todo: React.PropTypes.instanceOf(TodoRecord)
  },

  _onMarkCompleteClick: function (event) {
    event.preventDefault();
    TodoActions.update(this.props.todo.id, {
      completedDate: moment().format('YYYY-MM-DD')
    });
    TodoActions.save(this.props.todo.id);
  },

  _onMarkIncompleteClick: function (event) {
    event.preventDefault();
    TodoActions.update(this.props.todo.id, { completedDate: null });
    TodoActions.save(this.props.todo.id);
  },

  _onDestroyClick: function (event) {
    event.preventDefault();
    TodoActions.destroy(this.props.todo.id);
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
          onClick={this._onMarkIncompleteClick}
        >
          Not Done Yet
        </button>
      );
    } else {
      return (
        <button
          className='btn btn-lg btn-primary btn-block'
          onClick={this._onMarkCompleteClick}
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
            <h3 className='todo-list-item-name'>{this.props.todo.name}</h3>
            {this._renderDate()}
          </div>
          <div className='col-md-3'>
            {this._renderActionButton()}
            <button
              className='btn btn-lg btn-default btn-block'
              onClick={this._onDestroyClick}
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
