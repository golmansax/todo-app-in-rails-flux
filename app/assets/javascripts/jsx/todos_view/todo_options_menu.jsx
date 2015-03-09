'use strict';

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var ModalTrigger = require('react-bootstrap').ModalTrigger;
var NewTodoModal = require('./new_todo_modal');

var TodoOptionsMenu = React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    return (
      <div className='row'>
        <h4>
          <div className='col-md-9'>
            <label>
              <input
                type='checkbox'
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
