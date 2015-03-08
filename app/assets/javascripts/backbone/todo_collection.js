'use strict';

var Collection = require('backbone').Collection;

var TodoCollection = Collection.extend({
  url: '/todos'
});

module.exports = TodoCollection;
