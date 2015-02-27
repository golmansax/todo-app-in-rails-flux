'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var snakeize = require('snakeize');
var originalSync = Backbone.sync;

function isModifier(method) {
  switch(method) {
    case 'create':
    case 'update':
    case 'patch':
    case 'delete':
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

  if (model && !options.data && isModifier(method)) {
    var data = model.toJSON();
    options.data = JSON.stringify(snakeize(data));
    console.log(options.data);
  }

  return originalSync(method, model, options);
};
