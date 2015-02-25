'use strict';

var React = require('react');
var moment = require('moment');
var TodoActions = require('../stores/todo_store').Actions;
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var TodoOptionsMenu = React.createClass({
  mixins: [PureRenderMixin],

  _onAddClick: function () {
    TodoActions.create({ name: 'Eat Groceries', dueDate: moment() });
    window.alert('Todo created!');
  },

  render: function () {
    return (
      <div className='row'>
        <h4>
          <div className='col-md-9'>
            <label>
              <input
                type='checkbox'
                onChange={this._onChange}
                defaultChecked={true}
              />
              Show Completed
            </label>
          </div>
        </h4>
        <div className='col-md-3'>
          <button
            className='btn btn-block btn-lg btn-primary'
            onClick={this._onAddClick}
          >
            Add Todo
          </button>
        </div>
      </div>
    );
  }
});

module.exports = TodoOptionsMenu;
