(function () {
  'use strict';
  angular.module('MenuApp')
    .config(RoutesConfig)

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state({
      name:'home',
      url:'/',
      templateUrl:'src/templates/home.template.html'
    });

    $stateProvider.state({
      name:'categories',
      url:'/categories',
      templateUrl:'src/templates/main-categorieslist.template.html',
      controller: 'MainCategoriesList as categoriesList',
      resolve: {
        categories : ['CategoriesListService', function (CategoriesListService) {
          return CategoriesListService.getCategories();
        }]
      }
    });

    $stateProvider.state({
      name:'items',
      url:'/items/{shortName}',
      templateUrl:'src/templates/main-itemslist.template.html',
      controller: 'MainItemsList as itemsList',
      resolve : {
        items : ['$stateParams','CategoriesListService', function ($stateParams,CategoriesListService) {
          // console.log($stateParams);
          return CategoriesListService.getMenuItems($stateParams.shortName);
        }]
      }
    });


  }
}
)();
