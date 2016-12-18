(function () {
  'use strict';

  angular.module('MenuApp')
    .controller("MainCategoriesList",MainCategoriesList);

  MainCategoriesList.$inject= ['categories'];
  function MainCategoriesList(categories) {
    var categoriesList = this
    var items = [];

    categoriesList.$onInit = function () {
        // console.log(categories);
        categoriesList.categories = categories;
    };
  }
})();
