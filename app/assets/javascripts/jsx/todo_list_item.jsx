'use strict';

var React = require('react');
var moment = require('moment');
var Button = require('react-bootstrap').Button;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Grid = require('react-bootstrap').Grid;
var Col = require('react-bootstrap').Col;
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
      <ListGroupItem>
        <Grid>
          <Col md={9}>
            <h3 className='todo-list-item-name'>{this.props.name}</h3>
            {this._renderDate()}
          </Col>
          <Col md={3}>
            <Button
              bsSize='large'
              bsStyle='primary'
              block
              onClick={this._onMarkCompleteClick}
              disabled={!!this.props.completedDate}
            >
              Mark Done
            </Button>
            <Button
              bsSize='large'
              bsStyle='default'
              block
              onClick={this._onDestroyClick}
            >
              Remove
            </Button>
          </Col>
        </Grid>
      </ListGroupItem>
    );
  }
});

module.exports = TodoListItem;
