'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var originalAjax = require('backbone.nativeajax');

Backbone.ajax = function (options) {
  var defaultHeaders = { 'X-Requested-With': 'XMLHttpRequest' };
  options.headers = _(defaultHeaders).extend(options.headers);

  return originalAjax(options);
};
