'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');
var Promise = require('es6-promise').Promise;

var CHANGE_EVENT = 'change';

var AlertStoreFactory = function () {
  this.initialize();
};

assign(AlertStoreFactory.prototype, EventEmitter.prototype, {
  initialize: function () {
    this._resetStorage();
    _(this.Actions).each(this._bindAction.bind(this));
  },

  _resetStorage: function () {
    this._storage = {
      isShowing: false,
      hasCancelButton: false,
      message: '',
      resolvePromise: null,
      rejectPromise: null
    };
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

  hasCancelButton: function () {
    return this._storage.hasCancelButton;
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

  _storePromiseHandlers: function (resolve, reject) {
    assign(this._storage, { resolvePromise: resolve, rejectPromise: reject });
  },

  Actions: {
    alert: function (message) {
      var promise = new Promise(this._storePromiseHandlers.bind(this));

      assign(this._storage, {
        isShowing: true,
        message: message,
      });
      this._triggerChange();

      return promise;
    },

    confirm: function (message) {
      var promise = new Promise(this._storePromiseHandlers.bind(this));

      assign(this._storage, {
        isShowing: true,
        message: message,
        hasCancelButton: true
      });
      this._triggerChange();

      return promise;
    },

    hide: function () {
      this._resetStorage();
      this._triggerChange();
    },

    resolvePromise: function () {
      this._storage.resolvePromise();
    },

    rejectPromise: function () {
      this._storage.rejectPromise();
    }
  }
});

var AlertStore = new AlertStoreFactory();

module.exports = AlertStore;
