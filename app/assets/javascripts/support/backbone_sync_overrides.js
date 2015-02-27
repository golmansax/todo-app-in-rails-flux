'use strict';

var Backbone = require('backbone');
var snakeize = require('snakeize');
var originalSync = Backbone.sync;

function needsCsrfToken(method) {
  switch (method) {
    case 'delete': return true;
    default: return isSendingAttrs(method);
  }
}

function isSendingAttrs(method) {
  switch (method) {
    case 'create':
    case 'update':
    case 'patch':
      return true;

    default: return false;
  }
}

Backbone.sync = function (method, model, options) {
  var originalBeforeSend = options.beforeSend;
  options.beforeSend = function (xhr) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    if (needsCsrfToken(method)) {
      var csrfTag = window.document.querySelector('meta[name=csrf-token]');
      xhr.setRequestHeader('X-CSRF-Token', csrfTag.content);
    }

    if (originalBeforeSend) {
      return originalBeforeSend.apply(this, arguments);
    }
  };

  if (model && isSendingAttrs(method)) {
    var attrs = options.attrs || model.toJSON(options);
    options.attrs = snakeize(attrs);
  }

  return originalSync(method, model, options);
};
