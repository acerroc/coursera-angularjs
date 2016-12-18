(function () {
  'use strict';

  angular.module('MenuApp')
    .controller("MainCategoriesList",MainCategoriesList);

  MainCategoriesList.$inject= ['CategoriesListService','categories'];
  function MainCategoriesList(CategoriesListService,categories) {
    var categoriesList = this
    var items = [];

    categoriesList.$onInit = function () {
        // console.log(categories);
        categoriesList.categories = categories;
    };
  }
})();
