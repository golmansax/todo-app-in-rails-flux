Chk.TodoListItem = (function () {
  'use strict';

  return React.createClass({

    propTypes: {
      name: React.PropTypes.string.isRequired,
      remove: React.PropTypes.func.isRequired,
      update: React.PropTypes.func.isRequired
    },

    _markComplete: function () {
      this.props.update({ completed_date: moment() });
    },

    _renderDate: function () {
      if (this.props.completed_date) {
        return (
          <p>
            <strong>Completed date: </strong>
            {this.props.completed_date.calendar()}
          </p>
        );
      } else {
        return (
          <p>
            <strong>Due date: </strong>
            {this.props.due_date.calendar()}
          </p>
        );
      }
    },

    render: function () {
      return (
        <li className='list-group-item row'>
          <div className='col-md-9'>
            <h3 className='todo-list-item-name'>{this.props.name}</h3>
            {this._renderDate()}
          </div>
          <div className='col-md-3'>
            <button
              className='btn btn-lg btn-block btn-primary'
              onClick={this._markComplete}
              disabled={!!this.props.completed_date}
            >
              Mark Done
            </button>
            <button
              className='btn btn-lg btn-block btn-default'
              onClick={this.props.remove}
            >
              Remove
            </button>
          </div>
        </li>
      );
    }

  });
})();
