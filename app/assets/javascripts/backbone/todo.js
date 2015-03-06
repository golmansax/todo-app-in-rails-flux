'use strict';

var Model = require('backbone').Model;
var moment = require('moment');
var _ = require('underscore');

var Todo = Model.extend({
  urlRoot: '/todos'
});

module.exports = Todo;
