'use strict';

var OrderedMap = require('immutable').OrderedMap;
var Model = require('./model');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var CollectionStore = function () {
  this.initialize();
};

var CHANGE_EVENT = 'change';

_(CollectionStore.prototype).extend(EventEmitter.prototype);
_(CollectionStore.prototype).extend({
  Model: Model,

  initialize: function () {
    this._models = new OrderedMap();
    this._viewModels = new OrderedMap();
    this._changeListeners = {};
  },

  getAll: function () {
    return this._viewModels;
  },

  get: function (id) {
    return this._viewModels.get(id);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  toJSON: function () {
    return this._models.map(function (model) { return model.toJSON(); });
  },

  _add: function (model) {
    this._models.set(id, model);
    this._viewModels.set(id, model.toViewModel());
    this._changeListeners[id] = this._updateViewModel.bind(this, id);

    model.addChangeListener(this._changeListeners[id]);
  },

  _updateViewModel: function (id) {
    var model = this._models.get(id);
    this._viewModels.set(id, model.toViewModel());
    this._emitChange();
  },

  _remove: function (id) {
    var model = this._models.get(id);
    model.removeChangeListener(this._changeListeners[id]);
    this._changeListeners[id] = null;

    this._models.remove(id);
    this._viewModels.remove(id);
    this._emitChange();
  },

  _bindAction: function (action, name) {
    this.Actions[name] = action.bind(this);
  },

  _emitChange: function () {
    this.emit(CHANGE_EVENT);
  }
});

var Actions: {
  update: function (id, data) {
    this.get(id).set(data);
  },

  remove: function (id) {
    this._storage.remove(id);
  },

  destroy: function (id) {
    this._storage.get(id).destroy();
  },

  create: function (data) {
    var model = new this.model(data);
    var idAttr = model.idAttr || 'id';

    if (!model.get(idAttr)) {
      model.set(idAttr, model.cid);
    }

    this._storage.add(model);
  },

  load: function (models) {
    this._storage.reset(models);
  },

  fetchAll: function () {
    this._fetchingAll = true;
    this._storage.fetch({
      parse: true,
      silent: true,
      success: function () {
        this._fetchingAll = false;
        this._emitChange();
      }.bind(this)
    });
  },

  save: function (id) {
    var model = this._storage.get(id);
    model.save();
  }
};

module.exports = CollectionStore;
