(function () {
  'use strict';
  angular.module('public')
    .controller('SignUpController',SignUpController);
    SignUpController.$inject =['MenuService','$filter','UserService']
    function SignUpController(MenuService,$filter,UserService) {
      var ctrl = this;
      // ctrl.notFound = false;

      ctrl.submit = function () {
        MenuService.getMenuItem(ctrl.user.dish).then(function (data) {
          var user = ctrl.user;

          ctrl.notFound =false;
          user.menuItem = data;
          
          UserService.setUserInfo(user);

        }, function (response) {
          ctrl.notFound = true;
        })
      };
    }
})();
