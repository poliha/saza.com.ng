var lumensWall = angular.module('lumensWall');

lumensWall.controller('manageDataController', function($scope, $state, $http, $rootScope, Account, User) {

  $scope.manageData = {};
  $scope.statusMsg = false;
  $scope.offers = [];


  $scope.init = function() {
    $scope.manageData.id = $rootScope.currentUser.id;
    $scope.manageData.email = $rootScope.currentUser.email;
    $scope.manageData.token = $rootScope.currentUser.token;


  };

  $scope.closeAlert = function() {
    $scope.statusMsg = {};
  };

  $scope.manageData = function() {
    $scope.manageData.id = $rootScope.currentUser.id;
    $scope.manageData.email = $rootScope.currentUser.email;
    $scope.manageData.token = $rootScope.currentUser.token;
    $scope.manageData.account_id = $rootScope.currentUser.currentAccount;


    Account.manageData($scope.manageData)
      .then(function(resp) {

        console.log("success",resp);
        // show success message
        $scope.statusMsg = {};
        $scope.statusMsg.type = 'alert-success';
        $scope.statusMsg.content = resp.data.content.message;
        $scope.manageData = {};
        window.scrollTo(0, 0);
        $scope.$apply();
        
      })
      .catch(function(resp) {
        console.log("error",resp);

        $scope.statusMsg = {};
        $scope.statusMsg.type = 'alert-danger';
        if (resp.content) {
          $scope.statusMsg.content = resp.content.message;
          $scope.$apply();
        } else{
          $scope.statusMsg.content = resp.data.content.message;
        }

        window.scrollTo(0, 0);


      });
  };





});