'use strict';

var Model = require('backbone').Model;
var Collection = require('backbone').Collection;
var _ = require('underscore');

var BackboneCollectionStore = function () {
  this.initialize();
};
BackboneCollectionStore.extend = Collection.extend;

var EVENTS = 'add remove change reset sync';

function getClonedAttributes(model) {
  return _(model.attributes).clone();
}

_(BackboneCollectionStore.prototype).extend({
  collection: null,

  model: Model,

  _storage: null,

  _loadingResponse: {
    isLoading: true
  },

  initialize: function () {
    // Prefer using this.collection over this.model
    var CollectionClass;
    if (this.collection) {
      CollectionClass = this.collection;
    } else {
      CollectionClass = Collection.extend({ model: this.model });
    }

    this._storage = new CollectionClass();
    this.model = this._storage.model;

    _(this.Actions).each(this._bindAction.bind(this));
  },

  getAll: function () {
    if (this._fetchingAll) {
      return this._loadingResponse;
    }

    return this._storage.map(getClonedAttributes);
  },

  get: function (id) {
    var model = this._storage.get(id);
    return getClonedAttributes(model);
  },

  addChangeListener: function (callback) {
    this._storage.on(EVENTS, callback);
  },

  removeChangeListener: function (callback) {
    this._storage.off(EVENTS, callback);
  },

  Actions: {
    update: function (id, data) {
      this._storage.get(id).set(data);
    },

    updateAndSave: function (id, data) {
      var model = this._storage.get(id);
      model.set(data);
      model.save();
    },

    destroy: function (id) {
      this._storage.remove(id);
    },

    destroyAndSave: function (id) {
      this._storage.get(id).destroy();
    },

    create: function (data) {
      var model = new this.model(data);
      this._storage.add(model);
    },

    createAndSave: function (data) {
      this._storage.create(data);
    },

    load: function (models) {
      this._storage.reset(models);
    },

    fetchAll: function () {
      this._fetchingAll = true;
      this._storage.fetch({
        silent: true,
        success: function () {
          this._fetchingAll = false;
        }.bind(this)
      });
    },

    save: function (id) {
      var model = this._storage.get(id);
      model.save();
    }
  },

  _bindAction: function (action, name) {
    this.Actions[name] = action.bind(this);
  }
});

module.exports = BackboneCollectionStore;
