'use strict';

var Record = require('immutable').Record;
var OrderedMap = require('immutable').OrderedMap;
var BackboneCollectionStore = require('./backbone_collection_store');

var BackboneImmutableCollectionStore = BackboneCollectionStore.extend({
  viewModel: Record,

  initialize: function () {
    BackboneCollectionStore.prototype.initialize.call(this);

    this._viewModels = new OrderedMap();
  },

  _cacheViewModel: function (model) {
    var cachedViewModel = this._viewModels.get(model.cid);
    var viewModel;

    if (cachedViewModel) {
      viewModel = cachedViewModel.merge(model.attributes);
    } else {
      viewModel = new this.viewModel(model.attributes);
    }

    this._viewModels = this._viewModels.set(model.cid, viewModel);
    return viewModel;
  },

  get: function (id) {
    var model = this._storage.get(id);

    if (!model) {
      return null;
    } else {
      return this._cacheViewModel(model);
    }
  },

  getAll: function () {
    if (this._fetchingAll) {
      return this._loadingResponse;
    }

    // First pass is to remove any unused models
    this._viewModels.keySeq().forEach(function (key) {
      if (!this._storage.get(key)) {
        this._viewModels = this._viewModels.remove(key);
      }
    }.bind(this));

    // This updates and creates models as necessary
    this._storage.each(this._cacheViewModel.bind(this));

    return this._viewModels;
  }
});

module.exports = BackboneImmutableCollectionStore;
