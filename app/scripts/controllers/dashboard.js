'use strict';
angular.module('yapp')
.controller('DashboardCtrl', function($scope, $state) {
  $scope.$state = $state;
})
.controller('gradeManagementCtrl', function($scope,Achievements,Grades) {
  $scope.Achievements = Achievements.all();
   $scope.Grades = Grades.all();
})
.controller('gradeDetailCtrl', function($scope,$stateParams,Grades) {
   $scope.grade = Grades.get($stateParams.gradeId);
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
  $scope.options = {
    format: 'yyyy年mm月dd日', 
    monthsFull: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    weekdaysShort: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    today: '今天',
    clear: '清除',
    onClose: function(e) {
      console.log()
  }
}
})