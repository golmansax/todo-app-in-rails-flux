'use strict';

var Model = require('backbone').Model;
var Collection = require('backbone').Collection;
var _ = require('underscore');

var BackboneCollectionStore = function () {
  this.initialize();
};
BackboneCollectionStore.extend = Collection.extend;

var EVENTS = 'add remove change reset';

_(BackboneCollectionStore.prototype).extend({
  collection: null,

  model: Model,

  _storage: null,

  initialize: function () {
    // Prefer using this.collection over this.model
    var Collection;
    if (this.collection) {
      Collection = this.collection;
      this.model = this.collection.model;
    } else {
      Collection = Collection.extend({ model: this.model });
    }

    this._storage = new Collection();

    _(this.Actions).each(this._bindAction.bind(this));
  },

  getAll: function () {
    return this._storage.toJSON();
  },

  get: function (id) {
    var model = this._storage.get(id);
    return model.toJSON();
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

    destroy: function (id) {
      this._storage.remove(id);
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
      this._storage.fetch({
        parse: true,
        silent: true,
        success: this._triggerChange.bind(this)
      });
    }
  },

  _bindAction: function (action, name) {
    this.Actions[name] = action.bind(this);
  },

  _triggerChange: function () {
    this._storage.trigger('change');
  }
});

module.exports = BackboneCollectionStore;
