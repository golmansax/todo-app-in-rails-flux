Chk.Todo = (function () {
  'use strict';

  return Backbone.Model.extend({

    parse: function (data) {
      if (data.completed_date) {
        data.completed_date = moment(data.completed_date);
      }

      return _(data).extend({
        due_date: moment(data.due_date)
      });
    }

  });
})();
