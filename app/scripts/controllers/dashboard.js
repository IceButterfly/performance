'use strict';
angular.module('yapp')
.controller('DashboardCtrl', function($scope, $state) {
  $scope.$state = $state;
})
.controller('achievementManagementCtrl', function($scope,Achievements) {
  $scope.Achievements = Achievements.all();
  $scope.new = function(){
    Achievements.new();
  };
})
.controller('achievementDetailCtrl', function($scope,Achievements,$stateParams) {
  $scope.achievement = Achievements.get($stateParams.achievementId);
  $scope.submitForm = function(isValid) {
    if (isValid) {
      alert('our form is amazing');
    }
  };
})
.controller('templateManagementCtrl', function($scope,$stateParams,Templates) {
  $scope.Templates = Templates.all();
  $scope.new = function(){
    Templates.new();
  };
})
.controller('templateDetailCtrl', function($scope,Templates,$stateParams) {
  $scope.template = Templates.get($stateParams.templateId);
  $scope.submitForm = function(isValid) {
    if (isValid) {
      alert('our form is amazing');
    }
  };
})