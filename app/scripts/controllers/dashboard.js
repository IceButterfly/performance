'use strict';
angular.module('yapp')
.run(function($rootScope,ngDialog) {
 $rootScope.clickToOpen = function (msg) {
  ngDialog.open({template: '<div class="msgDiv"><span>'+msg+'</span></div>', className: 'ngdialog-theme-default', plain: true});
};
$rootScope.$on("childSeleteEmployees",function(event,msg){
 $rootScope.$broadcast("parentSeleteEmployees", msg);
})
})
.controller('DashboardCtrl', function($scope, $state,Session,$http,ENV) {
  $scope.$state = $state;
  $scope.Session=Session;
  $http.jsonp( ENV.domain + "performance/employee/query/findByUicId.do?callback=JSON_CALLBACK&sessionId="+Session.newSessionId+"&uicId="+Session.userId).success(function(response){
    $scope.user = response.body;
  }).error(function(){
    alert("错误");
  });
})
.controller('gradeManagementCtrl', function($scope,Achievements,Grades) {
  $scope.Achievements = Achievements.all();
  $scope.Grades = Grades.all(); 
})
.controller('gradeDetailCtrl', function($scope,$stateParams,Grades) {
 $scope.grade = Grades.get($stateParams.gradeId);
})
.controller('achievementDetailCtrl', function($scope,Achievements,$stateParams,ngDialog,Session,$http,ENV) {
  $scope.Employees = [];
  $scope.$on("parentSeleteEmployees",function (event,employee) {
    for (var i = 0; i < $scope.Employees.length; i++) {
      if ($scope.Employees[i] === employee) {
        return true;
      }
    }
    $scope.Employees.push(employee)
  });

  $scope.submitForm = function(isValid) {
  };
  $scope.findAllEmployees = function () {
    ngDialog.open({ template: 'views/findAllEmployees.html', className: 'ngdialog-theme-default',controller:"findAllEmployeesCtrl" });
  };
  $scope.deleteEmployee = function (employee) {
    $scope.Employees.splice($scope.Employees.indexOf(employee), 1);
  };
})
.controller('findAllEmployeesCtrl', function($scope,$stateParams,ngDialog,Session,$http,ENV) {
  $http.jsonp( ENV.domain + "performance/employee/query/findByCondition.do?callback=JSON_CALLBACK&sessionId="+Session.newSessionId+"&employeeName=").success(function(response){
   $scope.Employees = response.body;
 }).error(function(){
  alert("错误");
});
 $scope.seleteEmployee= function (employee) {
  $scope.$emit("childSeleteEmployees", employee);
};
})
.controller('achievementListCtrl', function($scope,$stateParams,Achievements,$rootScope) {
  Achievements.all($stateParams.templateId).success(function (res) {
    if (!res.success) {
      $rootScope.clickToOpen(res.errMsg);
      return false;
    }else{
      if (!res.body) {
        $scope.Achievements = [];
      }else{      
        $scope.Achievements = res.body;
      }
    }
  }).error(function(res){
    $rootScope.clickToOpen("错误");
  }) 

  $scope.new = function(){
   var Alength =  $scope.Achievements.length;
   var achievement = {
    id : Alength + 1,
    name : '绩效' + (Alength + 1),
    status : 1
  };
  $scope.Achievements.push(achievement);
}
})

.controller('achievementManagementCtrl', function($scope,Templates) {
  Templates.Simpleall().success(function (res) {
    if (!res.success) {
      $rootScope.clickToOpen(res.errMsg);
      return false;
    }else{
      $scope.Templates = res.body;
    }
  }).error(function(res){
    $rootScope.clickToOpen("错误");
  }) 
})

.controller('templateManagementCtrl', function($scope,$stateParams,Templates,ngDialog,$rootScope,$state) {
  Templates.all().success(function (res) {
    if (!res.success) {
      $rootScope.clickToOpen(res.errMsg);
      return false;
    }else{
      if (!res.body) {
        $scope.Templates = [];
      }else{      
        $scope.Templates = res.body;
      }
    }
  }).error(function(res){
    $rootScope.clickToOpen("错误");
  }) 

  $scope.new = function(){
   var Tlength =  $scope.Templates.length;
   var template = {
    id : Tlength + 1,
    name : '模板' + (Tlength + 1),
    status : 0
  };
  $scope.Templates.push(template);
}
//删除绩效模板
$scope.delete = function(pfmcId) {
 Templates.delete(pfmcId).success(function (res) {
  if (!res.success) {
    $rootScope.clickToOpen(res.errMsg);
    return false;
  }else{
    $rootScope.clickToOpen("成功");
    $state.reload();
  }
}).error(function(res){
 $rootScope.clickToOpen("错误");
}) 
}
//生成绩效实例
$scope.create = function(pfmcId) {
 Templates.create(pfmcId).success(function (res) {
  if (!res.success) {
    $rootScope.clickToOpen(res.errMsg);
    return false;
  }else{
    $rootScope.clickToOpen("成功");
    $state.reload();
  }
}).error(function(res){
 $rootScope.clickToOpen("错误");
}) 
}
//开始评分
$scope.startGrade = function(pfmcId) {
 Templates.startGrade(pfmcId).success(function (res) {
  if (!res.success) {
    $rootScope.clickToOpen(res.errMsg);
    return false;
  }else{
    $rootScope.clickToOpen("成功");
    $state.reload();
  }
}).error(function(res){
 $rootScope.clickToOpen("错误");
}) 
}
//结束评分
$scope.overGrade = function(pfmcId) {
 Templates.overGrade(pfmcId).success(function (res) {
  if (!res.success) {
    $rootScope.clickToOpen(res.errMsg);
    return false;
  }else{
    $rootScope.clickToOpen("成功");
    $state.reload();
  }
}).error(function(res){
 $rootScope.clickToOpen("错误");
}) 
}
//结束绩效
$scope.endPerformance = function(pfmcId) {
 Templates.endPerformance(pfmcId).success(function (res) {
  if (!res.success) {
    $rootScope.clickToOpen(res.errMsg);
    return false;
  }else{
    $rootScope.clickToOpen("成功");
    $state.reload();
  }
}).error(function(res){
 $rootScope.clickToOpen("错误");
}) 
}
})

.controller('templateDetailCtrl', function($scope,Templates,$stateParams,$http,ENV,Session,ngDialog,$rootScope,$location) {
 var newTemplateJson= "";
 $scope.submitForm = function(template) {
  var templateJson = {
    departmentId:$scope.template.departmentId,
    startTime:Date.parse(new Date($scope.template.startTime)),
    endTime:Date.parse(new Date($scope.template.endTime)),
    name:$scope.template.name,
    ownerUid:$scope.template.ownerUid.originalObject.id,
    statisticsUid:$scope.template.statisticsUid.originalObject.id
  }
  for(var i in templateJson){
    newTemplateJson += "&" + i +"="+ templateJson[i];
  }
  $http.jsonp(ENV.domain+'performance/performanceTemplate/write/addPerformanceTemplate.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId+newTemplateJson)
  .success(function (res) {     
    if (!res.success) {
     $rootScope.clickToOpen(res.errMsg);
     return false;
   }else{
     $rootScope.clickToOpen('发布成功！')
     $location.path('/dashboard/templateManagement');
   }
 }).error(function(res){
  $rootScope.clickToOpen("错误");
})
};

$scope.options = {
  format: 'yyyy-mm-dd', 
  monthsFull: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  weekdaysShort: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  today: '今天',
  clear: '清除',
  onClose: function(e) {
  }
};

$http.jsonp( ENV.domain + "performance/department/query/findAll.do?callback=JSON_CALLBACK&sessionId="+Session.newSessionId).success(function(response){
  $scope.Departments = response.body;
}).error(function(){
  alert("错误");
});
$http.jsonp( ENV.domain + "performance/employee/query/findByCondition.do?callback=JSON_CALLBACK&sessionId="+Session.newSessionId+"&employeeName=").success(function(response){
 $scope.Employees = response.body;
}).error(function(){
  alert("错误");
});
})