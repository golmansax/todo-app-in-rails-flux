'use strict';

var Record = require('immutable').Record;
var BackboneCollectionStore = require('./backbone_collection_store');

var BackboneImmutableCollectionStore = BackboneCollectionStore.extend({
  record: Record,

  initialize: function () {
    BackboneCollectionStore.prototype.initialize.call(this);

    this._recordCache = {};
  },

  _createRecord: function (model) {
    var cachedRecord = this._recordCache[model.cid];
    var record;

    if (cachedRecord) {
      record = cachedRecord.merge(model.attributes);
    } else {
      record = new this.record(model.attributes);
    }

    this._recordCache[model.cid] = record;
    return record;
  },

  get: function (id) {
    var model = this._storage.get(id);
    return this._createRecord(model);
  },

  getAll: function () {
    if (this._fetchingAll) {
      return {
        isLoading: true
      };
    }

    return this._storage.map(this._createRecord.bind(this));
  }
});

module.exports = BackboneImmutableCollectionStore;
