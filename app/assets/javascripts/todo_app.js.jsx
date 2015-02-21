Chk.TodoApp = (function () {
  'use strict';

  return React.createClass({

    componentWillMount: function () {
      this._todos = new Chk.TodoCollection([
        { name: 'Cut hair', due_date: '2015-03-04', id: 1 },
        { name: 'Wash car', due_date: '2015-02-20', id: 2 },
        { name: 'Laundry', due_date: '2015-02-19', id: 3 },
        { name: 'Buy groceries', completed_date: '2015-02-10', id: 4 },
        { name: 'Start a company', due_date: '2020-01-01', id: 5 }
      ], { parse: true });
    },

    componentDidMount: function () {
      this._onTodosChange = this.forceUpdate.bind(this, null);
      this._todos.on('add remove change', this._onTodosChange);
    },

    componentWillUnmount: function () {
      this._todos.off('add remove change', this._onTodosChange);
    },

    render: function () {
      return (
        <Chk.TodoListContainer
          todos={this._todos.toJSON()}
          remove={this._todos.remove.bind(this._todos)}
          update={this._todos.update.bind(this._todos)}
        />
      );
    }

  });
})();

(function () {
  'use strict';

  var container_el = window.document.getElementById('react-container');
  if (container_el) {
    React.render(<Chk.TodoApp />, container_el);
  }
})();
