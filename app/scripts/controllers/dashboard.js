'use strict';
 angular.module('yapp')
 .controller('DashboardCtrl', function($scope, $state) {
  $scope.$state = $state;
})
 .controller('templateManagementCtrl', function($scope,Templates) {
  $scope.Templates = Templates.all();
  $scope.new = function(){
    Templates.new();
  };
})
 .controller('templateManagementDetailCtrl', function($scope,Templates,$stateParams) {
  $scope.template = Templates.get($stateParams.templateId);
  $scope.submitForm = function(isValid) {
    if (isValid) {
      alert('our form is amazing');
    }
  };
})