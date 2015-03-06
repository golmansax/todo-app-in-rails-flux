'use strict';

var Record = require('immutable').Record;
var BackboneCollectionStore = require('./backbone_collection_store');

var BackboneImmutableCollectionStore = BackboneCollectionStore.extend({
  viewModel: Record,

  initialize: function () {
    BackboneCollectionStore.prototype.initialize.call(this);

    this._viewModelCache = {};
  },

  _createViewModel: function (model) {
    var cachedViewModel = this._viewModelCache[model.cid];
    var viewModel;

    if (cachedViewModel) {
      viewModel = cachedViewModel.merge(model.attributes);
    } else {
      viewModel = new this.viewModel(model.attributes);
    }

    this._viewModelCache[model.cid] = viewModel;
    return viewModel;
  },

  get: function (id) {
    var model = this._storage.get(id);
    return this._createViewModel(model);
  },

  getAll: function () {
    if (this._fetchingAll) {
      return {
        isLoading: true
      };
    }

    return this._storage.map(this._createViewModel.bind(this));
  }
});

module.exports = BackboneImmutableCollectionStore;
