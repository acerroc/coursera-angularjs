(function () {
  'use strict';
  angular.module('LunchCheck',[])
  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject=['$scope'];

    function LunchCheckController($scope){
      $scope.lunchMenu = '';

      $scope.checkLunch = function(){
          var status = '';
          var message = '';
          var text =  $scope.lunchMenu;        
          var lunchItems = $scope.lunchMenu.split(',');
          var nullItems= 0;

          //count how many null items exists in the array
          for(var item in lunchItems){
              if(lunchItems[item].trim() == ''){
                nullItems++;
              }
          }
          //calculate how many items exists in the textbox without the null ones
          if(lunchItems.length-nullItems== 0){
            status = 'has-error';
            message ='Please enter data first.';
          }else if (lunchItems.length-nullItems>3){
            status = 'has-success';
            message = 'Too much!'
           }else{
             status = 'has-success';
            message = 'Enjoy!'
           }
          $scope.lunchMessage = message;
          $scope.status = status;
      };
    };
})();
