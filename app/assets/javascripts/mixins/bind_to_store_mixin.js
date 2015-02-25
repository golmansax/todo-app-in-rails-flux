'use strict';

var BindToStoreMixin = function (Store, getStateAttr) {
  return {
    getInitialState: function () {
      return this[getStateAttr]();
    },

    _updateStateFromStore: function (getStateAttr) {
      this.setState(this[getStateAttr]());
    },

    componentDidMount: function () {
      this._changeListeners = this._changeListeners || {};

      var changeListener = this._updateStateFromStore.bind(this, getStateAttr);
      this._changeListeners[Store] = changeListener;

      Store.addChangeListener(this._changeListeners[Store]);
    },

    componentWillUnmount: function () {
      Store.removeChangeListener(this._changeListeners[Store]);
      this._changeListeners[Store] = null;
    },

    componentWillReceiveProps: function () {
      this._updateStateFromStore.bind(this, getStateAttr);
    }
  };
};

module.exports = BindToStoreMixin;
