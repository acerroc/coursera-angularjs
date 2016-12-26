(function () {
  'use strict';
  angular.module('common')
    .service('UserService',UserService);

    function UserService() {
      var srv = this;
      var user;
      srv.setUserInfo = function (userInfo) {
        user = userInfo;
      };
      srv.getUserInfo = function () {
        return user;
      };
    }
})();
