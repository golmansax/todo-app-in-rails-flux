Chk.TodoCollection = (function () {
  'use strict';

  return Backbone.Collection.extend({

    model: Chk.Todo,

    update: function (id, data) {
      this.get(id).set(data);
    }

  });
})();
