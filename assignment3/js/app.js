(function() {
  "use strict";
  angular.module("NarrowItDownApp", [])
    .controller("NarrowItDownController",NarrowItDownController)
    .service("MenuSearchService",MenuSearchService)
    .directive("foundItems",FoundItemsDirective)
    .constant("URL","https://davids-restaurant.herokuapp.com/menu_items.json");

  NarrowItDownController.$inject =["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    //Bring the results from the server
    ctrl.narrowItDown = function () {
      //Start loading icon
      ctrl.loading = true;
      //Reset states
      ctrl.error = "";
      ctrl.foundItems = [];

      //Get the promise from the service
      var promise = MenuSearchService.getMatchedMenuItems(ctrl.term);
      //If error is defined, it means that the user didnt input any term to search
      if(promise.error  != undefined){
        ctrl.error= promise.error;
        ctrl.loading = false;

      }else{
        promise.then(function (response) {
          ctrl.foundItems = response;
          //If the response doesn't have any result, a error message will be show.
          if(response.length == 0){
            ctrl.error= "Nothing found. Please change the term to search";
          }
        }).finally(function() {
          //Hide the loading animation
          ctrl.loading = false;
        });
      }
    };

    //Remove a row of the table
    ctrl.onRemove = function (index) {
        ctrl.foundItems.splice(index,1);
    };
  }

  //This service calls the server and generate a filtered result list.
  MenuSearchService.$inject = ["$http","URL","$filter"];
  function MenuSearchService($http,URL,$filter) {
    var searchService = this;

    searchService.getMatchedMenuItems = function (nameFilter) {
      //If the input term is empty the function returns an object with an error attribute.
      if(nameFilter == "" || nameFilter == undefined){
        return {error:"Nothing found. Please add a term to search"};
      }

      return $http ({
        method:"GET",
        url:URL
      }).then(function (response) {
        //The list from the server is filtered by the input term.
        var foundItems = $filter("filter")(response.data.menu_items, {name :nameFilter});
        return foundItems;
      });
    }
  };

  function FoundItemsDirective(){
    var ddo = {
      restrict : "E",
      templateUrl : "chinesemenu.html",
      scope : {
        foundItems : "<",
        loading : "<",
        onRemove : "&"
      }
    };
    return ddo;
  }
})();
