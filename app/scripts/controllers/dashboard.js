'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function($scope, $state) {
    $scope.$state = $state;
  })
  .controller('overviewCtrl', function($scope,Templates) {
  	$scope.Templates = Templates.all();
  })

