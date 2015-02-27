'use strict';

var Backbone = require('backbone');
var snakeize = require('snakeize');
var originalSync = Backbone.sync;

// TODO need a better name for this function
function isModifier(method) {
  switch (method) {
    case 'create':
    case 'update':
    case 'patch':
      return true;

    default:
      return false;
  }
}

Backbone.sync = function (method, model, options) {
  var originalBeforeSend = options.beforeSend;
  options.beforeSend = function (xhr) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    if (isModifier(method)) {
      var csrfTag = window.document.querySelector('meta[name=csrf-token]');
      xhr.setRequestHeader('X-CSRF-Token', csrfTag.content);
    }

    if (originalBeforeSend) {
      return originalBeforeSend.apply(this, arguments);
    }
  };

  if (model && isModifier(method)) {
    var attrs = options.attrs || model.toJSON(options);
    options.attrs = snakeize(attrs);
  }

  return originalSync(method, model, options);
};
