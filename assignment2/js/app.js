(function() {
    "use strict";
    angular.module("App", [])
        .controller("ToBuyController", ToBuyController)
        .controller("AlreadyBoughtController", AlreadyBoughtController)
        .provider("ShoppingListsService", ShoppingListsServiceProvider);

    ToBuyController.$inject = ["ShoppingListsService"];
    // Controller for toBuyList operations
    function ToBuyController(ShoppingListsService) {
        var toBuy = this;

        toBuy.getToBuyList = function functionName() {
            return ShoppingListsService.getToBuyList();
        };
        toBuy.setItemBought = function(index) {
            ShoppingListsService.setItemBought(index);
        };
        toBuy.isEmptyList = function() {
            return ShoppingListsService.getToBuyList().length == 0;
        };
    };

    AlreadyBoughtController.$inject = ["ShoppingListsService"];
    // Controller for AlreadyboughtList operations
    function AlreadyBoughtController(ShoppingListsService) {
        var albou = this;
        albou.getAlreadyList = function functionName() {
            return ShoppingListsService.getAlreadyList();
        };
        albou.isEmptyList = function() {
            return ShoppingListsService.getAlreadyList().length == 0;
        };
    };

    //Service with Business logic
    function ShoppingListsService(defaultList) {
        var service = this;
        var toBuyList = defaultList;
        var alreadyBoughtList = [];
        //returns the alreadyBoughtList
        service.getAlreadyList = function() {
            return alreadyBoughtList;
        };
        //returns the toBuyList
        service.getToBuyList = function() {
            return toBuyList;
        };
        //Moves the selected item from the toBuyList to the alreadyBoughtList
        service.setItemBought = function(index) {
            alreadyBoughtList.push(toBuyList.splice(index, 1)[0]);
        };

    };

    function ShoppingListsServiceProvider() {
        var provider = this;
        provider.defaults = {
            list: [
                {name: "Cookies", quantity: 10},
                {name: "Pancakes",quantity: 3},
                {name: "Chips bags",quantity: 2},
                {name: "Eggs",quantity: 12},
                {name: "Tomatoes",quantity: 5},
                {name: "Onions",quantity: 1},
                {name: "Garlics",quantity: 6},
                {name: "Lettuces",quantity: 1},
                {name: "Potatoes",quantity: 7},
                {name: "Bottles of milk",quantity: 8}
              ]
            }
        provider.$get = function() {
            var shoppingLists = new ShoppingListsService(provider.defaults.list);
            return shoppingLists;
        }
    };
})();
