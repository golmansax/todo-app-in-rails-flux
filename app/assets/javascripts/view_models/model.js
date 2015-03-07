'use strict';

var Record = require('immutable').Record;
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var Model = function () {
  this.initialize();
};

_(Model.prototype).extend(EventEmitter.prototype);
_(Model.prototype).extend({
  defaults: {},

  initialize: function (attrs) {
    this._record = new this.Record(this.defaults);
  },

  toViewModel: function () {
    return this._record;
  },

  get: function (attr) {
    return this._record.get(attr);
  },

  set: function (attr, value) {
    var newRecord = this._record.set(attr, value);
    if (newRecord !== this._record) {
      this._emitChange();
      this._record = newRecord;
    }
  },

  save: function () {
  },

  toJSON: function () {
    return this._record.toJSON();
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  _emitChange: function () {
    this.emit(CHANGE_EVENT);
  }
});

module.exports = Model;
