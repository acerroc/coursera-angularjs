(function () {
  'use strict';

  angular.module('MenuApp')
    .controller("MainItemsList",MainItemsList);

  MainItemsList.$inject= ['items'];
  function MainItemsList(items) {
    var itemsList = this;


    itemsList.$onInit = function () {
        itemsList.items = items;
    };
  }
})();
