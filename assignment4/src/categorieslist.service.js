(function () {
  'use strict';
  angular.module('MenuApp')
    .service('CategoriesListService',CategoriesListService);

  CategoriesListService.$inject=['$http','URL_CATEGORIES', 'URL_MENU_ITEMS'];
  function CategoriesListService($http, URL_CATEGORIES, URL_MENU_ITEMS) {
    var service = this;

    service.getCategories = function () {
      return $http({
        method :'GET',
        url : URL_CATEGORIES
      }).then(function (response) {
        return response.data;
      })
    }
    service.getMenuItems = function (shortName) {
      // console.log(shortName);
      return $http({
        method :'GET',
        url : URL_MENU_ITEMS,
        params : {
          category : shortName
        }
      }).then(function (response) {
        // console.log(response.data.menu_items);
        return response.data.menu_items;
      })

    }
  }
})();
