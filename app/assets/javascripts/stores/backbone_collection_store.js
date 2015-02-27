'use strict';

var Model = require('backbone').Model;
var Collection = require('backbone').Collection;
var _ = require('underscore');

var BackboneCollectionStore = function () {
  this.initialize();
};
BackboneCollectionStore.extend = Collection.extend;

var EVENTS = 'add remove change reset';

function getClonedAttributes(model) {
  return _(model.attributes).clone();
}

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
    if (this._fetchingAll) {
      return {
        isLoading: true
      };
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
          this._triggerChange();
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
  },

  _triggerChange: function () {
    this._storage.trigger('change');
  }
});

module.exports = BackboneCollectionStore;
