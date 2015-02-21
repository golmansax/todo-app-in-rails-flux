'use strict';

var React = require('react');
var moment = require('moment');
var Button = require('react-bootstrap').Button;
var Grid = require('react-bootstrap').Grid;
var Col = require('react-bootstrap').Col;
var TodoStore = require('../stores/todo_store');

var TodoOptionsMenu = React.createClass({
  _onAddClick: function () {
    TodoStore.create({ name: 'Eat Groceries', dueDate: moment() });
  },

  render: function () {
    return (
      <Grid>
        <h4>
          <Col md={9}>
            <label>
              <input
                type='checkbox'
                onChange={this._onChange}
                defaultChecked={true}
              />
              Show Completed
            </label>
          </Col>
        </h4>
        <Col md={3}>
          <Button
            block
            bsSize='large'
            bsStyle='primary'
            onClick={this._onAddClick}
          >
            Add Todo
          </Button>
        </Col>
      </Grid>
    );
  }
});

module.exports = TodoOptionsMenu;
