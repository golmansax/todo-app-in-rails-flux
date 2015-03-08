'use strict';

var React = require('react');
var moment = require('moment');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Link = require('react-router').Link;
var TodoActions = require('../stores/todo_store').Actions;
var Todo = require('../view_models/todo');

var NewTodoListItem = React.createClass({
  mixins: [PureRenderMixin],

  _handleNameChange: function (event) {
    TodoActions.update(this.props.todo.id, { name: event.target.value });
  },

  _handleSave: function (event) {
    TodoActions.save(this.props.todo.id);
  },

  render: function () {
    return (
      <div className='list-group-item'>
        <div className='row'>
          <div className='col-md-9'>
            <h3 className='todo-list-item-name'>
              <input
                value={this.props.todo.name}
                onChange={this._handleNameChange}
                onBlur={this._handleSave}
              />
            </h3>
          </div>
          <div className='col-md-3'>
            <button
              className='btn btn-lg btn-primary btn-block'
              disabled={true}
            >
              Mark Complete
            </button>
            <button
              className='btn btn-lg btn-default btn-block'
              disabled={true}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NewTodoListItem;
