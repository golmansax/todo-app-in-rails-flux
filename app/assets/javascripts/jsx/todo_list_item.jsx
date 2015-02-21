'use strict';

var React = require('react');
var moment = require('moment');
var TodoStore = require('../stores/todo_store');

var TodoListItem = React.createClass({
  propTypes: {
    id: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]).isRequired,
    name: React.PropTypes.string.isRequired
  },

  _onMarkCompleteClick: function () {
    TodoStore.update(this.props.id, { completedDate: moment() });
  },

  _onDestroyClick: function () {
    TodoStore.destroy(this.props.id);
  },

  _renderDate: function () {
    if (this.props.completedDate) {
      return (
        <p>
          <strong>Completed date: </strong>
          {this.props.completedDate.calendar()}
        </p>
      );
    } else {
      return (
        <p>
          <strong>Due date: </strong>
          {this.props.dueDate.calendar()}
        </p>
      );
    }
  },

  render: function () {
    return (
      <li className='list-group-item'>
        <div className='row'>
          <div className='col-md-9'>
            <h3 className='todo-list-item-name'>{this.props.name}</h3>
            {this._renderDate()}
          </div>
          <div className='col-md-3'>
            <button
              className='btn btn-lg btn-primary btn-block'
              onClick={this._onMarkCompleteClick}
              disabled={!!this.props.completedDate}
            >
              Mark Done
            </button>
            <button
              className='btn btn-lg btn-default btn-block'
              onClick={this._onDestroyClick}
            >
              Remove
            </button>
          </div>
        </div>
      </li>
    );
  }
});

module.exports = TodoListItem;
