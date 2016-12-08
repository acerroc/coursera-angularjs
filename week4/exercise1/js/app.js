(function () {
'use strict'
angular.module('ShoppingListApp',[])
  .controller('ShoppingListController', ShoppingListController)
  .factory('ShoppingListFactory', ShoppingListFactory)
  .component('shoppingList', {
    templateUrl:'templates/shoppinglist.template.html',
      controller : ShoppingListComponentController,
    bindings:{
      listItems : '<',
      myTitle : '@title',
      onRemove : '&'
    }
  })

  function ShoppingListComponentController() {
    var $ctrl = this;
    $ctrl.remove = function (myIndex) {
      console.log("asd");
      $ctrl.onRemove({index : myIndex});
    };
  }

  ShoppingListController.$inject = ['ShoppingListFactory'];
  function ShoppingListController(ShoppingListFactory) {
    var ctrl = this;
    var shoppingList = ShoppingListFactory();

    ctrl.listItems = shoppingList.getItems();

    var origTitle = "Shopping List #1";
    ctrl.title = origTitle + " (" + ctrl.listItems.length + " items )";
  
    // ctrl.title = "Title: Shopping List #1 ( items )";
    ctrl.addItem = function () {
      shoppingList.addItem(ctrl.itemName, ctrl.itemQuantity);
      ctrl.title = origTitle + " (" + ctrl.listItems.length + " items )";
      // console.log(ctrl.listItems);
      //ShoppingListService.addItem(ctrl.item);
    };
    ctrl.removeItem = function (index) {
      console.log("ctrl");
      shoppingList.removeItem(index);
      ctrl.title = origTitle + " (" + ctrl.listItems.length + " items )";
    }
  }

  function ShoppingListService(maxItems){
    var srv = this;
    var items = [];

    srv.addItem = function (itemName, itemQuantity){
        items.push({
          name : itemName,
          quantity : itemQuantity
        });
    };
    srv.removeItem = function (index) {
      console.log("srv");
      items.splice(index,1);

    }
    srv.getItems = function () {
        return items;
    };
  }

  function ShoppingListFactory() {
    var factory = function (maxItems){
      return new ShoppingListService(maxItems);
    };
    return factory;
  }
})();
