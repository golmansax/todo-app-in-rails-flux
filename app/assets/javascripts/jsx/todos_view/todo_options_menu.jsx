'use strict';

var React = require('react');
var moment = require('moment');
var TodoActions = require('../../stores/todo_store').Actions;
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var ModalTrigger = require('react-bootstrap').ModalTrigger;
var NewTodoModal = require('./new_todo_modal');
var AlertActions = require('../../stores/alert_store').Actions;

var TodoOptionsMenu = React.createClass({
  mixins: [PureRenderMixin],

  _onChange: function () {
    AlertActions.alert('Todo created!');
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
          <ModalTrigger modal={<NewTodoModal />}>
            <button className='btn btn-block btn-lg btn-primary'>
              Add Todo
            </button>
          </ModalTrigger>
        </div>
      </div>
    );
  }
});

module.exports = TodoOptionsMenu;
