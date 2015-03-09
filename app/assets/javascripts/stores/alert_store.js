'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var CHANGE_EVENT = 'change';

var AlertStoreFactory = function () {
  this.initialize();
};

assign(AlertStoreFactory.prototype, EventEmitter.prototype, {
  initialize: function () {
    this._storage = {
      isShowing: false
    };

    _(this.Actions).each(this._bindAction.bind(this));
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isShowing: function () {
    return this._storage.isShowing;
  },

  getMessage: function () {
    return this._storage.message;
  },

  _bindAction: function (action, name) {
    this.Actions[name] = action.bind(this);
  },

  _triggerChange: function () {
    this.emit(CHANGE_EVENT);
  },

  Actions: {
    alert: function (message) {
      this._storage.isShowing = true;
      this._storage.message = message;
      this._triggerChange();
    },

    hide: function () {
      this._storage.isShowing = false;
      this._triggerChange();
    }
  }
});

var AlertStore = new AlertStoreFactory();

module.exports = AlertStore;
