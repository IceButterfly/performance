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
		$rootScope.clickToOpen("错误");
	});
})

.controller('gradeManagementCtrl', function($scope,Achievements,Grades) {
	Grades.all().success(function (res) {
		if (!res.success) {
			$rootScope.clickToOpen(res.errMsg);
			return false;
		}else{
			if (!res.body) {
				$scope.Grades = [];
			}else{      
				$scope.Grades = res.body;
			}
		}
	}).error(function(res){
		$rootScope.clickToOpen("错误");
	}) ;
})

.controller('gradeDetailCtrl', function($scope,$stateParams,Grades,$rootScope,Session,$http,ENV,$state) {
	Grades.get($stateParams.gradeId).success(function (res) {
		if (!res.success) {
			$rootScope.clickToOpen(res.errMsg);
			return false;
		}else{
			if (!res.body) {
				$scope.grade = [];
			}else{      
				$scope.grade = res.body;
				$scope.Customeres =  res.body['customerVOList']
				$scope.grade.score = 1;
				$scope.grade.conceptScore = 1;
			}
		}
	}).error(function(res){
		$rootScope.clickToOpen("错误");
	}) ;
	Grades.find($stateParams.gradeId).success(function (res) {
		if (!res.success) {
			$rootScope.clickToOpen(res.errMsg);
			return false;
		}else{
			if (!res.body) {
				$scope.score = {conceptScoreValue:'还未自评'};
			}else{      
				$scope.score = res.body;
			}
		}
	}).error(function(res){
		$rootScope.clickToOpen("错误");
	}) ;
	$scope.submitForm = function(grade){
		if(grade.conceptScore==1||grade.score==1){
			if (!grade.reason) {
				$rootScope.clickToOpen("填写3.75或A时,请填写理由");
				return false;
			}
		}
		$http.jsonp( ENV.domain + "performance/score/write/updateScore.do?callback=JSON_CALLBACK&sessionId="+Session.newSessionId+"&score="+grade.score +"&conceptScore="+ grade.conceptScore +"&reason="+grade.reason+"&scoreId="+grade.id)
		.success(function(res){
			if (!res.success) {
				$rootScope.clickToOpen(res.errMsg);
				return false;			
			}else{			
				$rootScope.clickToOpen("评价成功!");
				$state.go('gradeManagement')
			}
		}).error(function(res){
			$rootScope.clickToOpen(res.errMsg);
		});		
	}
})

.controller('findAllEmployeesCtrl', function($scope,Session,$http,ENV) {
	$http.jsonp( ENV.domain + "performance/employee/query/findAllCustomer.do?callback=JSON_CALLBACK&sessionId="+Session.newSessionId+"&employeeName=").success(function(response){
		$scope.Employees = response.body;
	}).error(function(res){
		$rootScope.clickToOpen(res.errMsg);
	});
	$scope.seleteEmployee= function (employee) {
		$scope.$emit("childSeleteEmployees", employee);
	};
})

.controller('achievementDetailCtrl', function($scope,Achievements,$stateParams,ngDialog,Session,$http,ENV,$state,$rootScope) {
	var achievementJson = '';
	var customerIdList = '';
	$scope.Employees = [];
	$scope.InstanceId = $stateParams.InstanceId;
	if ($stateParams.taskId) {
		$http.jsonp(ENV.domain+'performance/task/query/findById.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId+"&taskId="+$stateParams.taskId)
		.success(function (res) {
			if (!res.success) {
				$rootScope.clickToOpen(res.errMsg);
				return false;
			}else{
				$scope.isToChange = true;
				$scope.achievement = res.body;
				$scope.Employees = res.body['customerVOList'];
			}
		})
	}
	else{
		$scope.isToChange = false;
	}
	$scope.$on("parentSeleteEmployees",function (event,employee) {
		for (var i = 0; i < $scope.Employees.length; i++) {
			if ($scope.Employees[i] === employee) {
				return true;
			}
		}
		$scope.Employees.push(employee)
	});
	$scope.changeForm = function(achievement) {
		delete achievement['customerIdList'];
		delete achievement['customerVOList'];
		achievement['taskId'] = $stateParams.taskId;
		for(var i in $scope.Employees){
			customerIdList += $scope.Employees[i].id+',';
		}
		for(var i in achievement){
			achievementJson += "&" + i +"="+ achievement[i];
		}
		$http.jsonp(ENV.domain+'performance/task/write/updateTask.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId+achievementJson+'&customerIdList='+customerIdList)
		.success(function (res) {
			if (!res.success) {
				$rootScope.clickToOpen(res.errMsg);
				return false;
			}else{
				$rootScope.clickToOpen('修改成功！')
				$state.go('instanceList',{InstanceId:$scope.InstanceId})
			}
		})
	}
	$scope.submitForm = function(achievement) {
		achievement['pfinId'] = $scope.InstanceId;
		for(var i in $scope.Employees){
			customerIdList += $scope.Employees[i].id+',';
		}
		for(var i in achievement){
			achievementJson += "&" + i +"="+ achievement[i];
		}
		$http.jsonp(ENV.domain+'performance/task/write/addTask.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId+achievementJson +'&customerIdList='+customerIdList)
		.success(function (res) {
			if (!res.success) {
				$rootScope.clickToOpen(res.errMsg);
				return false;
			}else{
				$rootScope.clickToOpen('提交成功！')
				$state.go('instanceList',{InstanceId:$scope.InstanceId})
			}
		})
	}
	$scope.findAllEmployees = function () {
		ngDialog.open({ template: 'views/findAllEmployees.html', className: 'ngdialog-theme-default',controller:"findAllEmployeesCtrl" });
	};
	$scope.deleteEmployee = function (employee) {
		$scope.Employees.splice($scope.Employees.indexOf(employee), 1);
	};
})

.controller('instanceListCtrl', function($scope,$stateParams,Achievements,$rootScope,$http,ENV,Session,$state) {
	$scope.InstanceId = $stateParams.InstanceId;
	Achievements.all($scope.InstanceId).success(function (res) {
		if (!res.success) {
			$rootScope.clickToOpen(res.errMsg);
			return false;
		}else{
			if (!res.body['taskScoreList']) {
				$scope.Achievements = [];
			}else{      
				$scope.Achievements = res.body['taskScoreList'];
			}
		}
	}).error(function(res){
		$rootScope.clickToOpen("错误");
	}) ;
	$scope.new = function(){
		var Alength =  $scope.Achievements.length;
		var achievement = {
			id : Alength + 1,
			title : '绩效' + (Alength + 1),
			status : 1
		};
		$scope.Achievements.push(achievement);
	};
	$scope.delete = function(id){
		$http.jsonp(ENV.domain+'performance/task/write/deleteTaskById.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId+"&taskId="+id)
		.success(function (res) {
			if (!res.success) {
				$rootScope.clickToOpen(res.errMsg);
				return false;
			}else{
				$rootScope.clickToOpen('删除成功！')
				$state.reload();
			}
		})
	}
})

.controller('achievementManagementCtrl', function($scope,Templates,$rootScope,$http,ENV,Session) {
	$scope.Instance = [];
	$scope.getInstance = function(id){
		Templates.getInstance(id).success(function (res) {//查询实例
			if (!res.success) {
				$rootScope.clickToOpen(res.errMsg);
				return false;
			}else{
				$scope.Instance = res.body;
			}
		}).error(function(res){
			$rootScope.clickToOpen("错误");
		}) 
	};
	$scope.submitInstance = function(id){
		$http.jsonp(ENV.domain+'performance/performanceInstance/write/submitInstance.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId+"&pfinId="+id)
		.success(function (res) {
			if (!res.success) {
				$rootScope.clickToOpen(res.errMsg);
				return false;
			}else{
				$rootScope.clickToOpen('提交成功！')
			}
		})
	};
	Templates.Simpleall().success(function (res) {//查询模板
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

.controller('templateManagementCtrl', function($scope,$stateParams,Templates,$rootScope,$state) {
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

.controller('checkDetailCtrl', function($scope,Achievements,$stateParams,Session,$http,ENV,$rootScope) {
	$http.jsonp(ENV.domain+'performance/task/query/findById.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId+"&taskId="+$stateParams.taskId)
	.success(function (res) {
		if (!res.success) {
			$rootScope.clickToOpen(res.errMsg);
			return false;
		}else{
			$scope.achievement = res.body;
			$scope.Customeres =  res.body['customerVOList']
		}
	})
})

.controller('checkDetailManagementCtrl', function($http,Session,$scope,$stateParams,$rootScope,ENV) {
	$scope.templateId = $stateParams.templateId;
	$scope.instanceId = $stateParams.instanceId;
	$http.jsonp(ENV.domain+'performance/performanceInstance/query/findById.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId+"&pfinId="+$stateParams.instanceId)
	.success(function (res) {
		if (!res.success) {
			$rootScope.clickToOpen(res.errMsg);
			return false;
		}else{
			$scope.Achievements = res.body['taskScoreList'];
		}
	}).error(function(res){
		$rootScope.clickToOpen("错误");
	}) 
})

.controller('checkManagementCtrl', function($http,Session,$scope,$stateParams,$rootScope,ENV,$state) {
	$scope.templateId = $stateParams.templateId;
	$http.jsonp(ENV.domain+'performance/performanceInstance/query/findByPerformanceTemplateId.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId+"&pfmcId="+$stateParams.templateId)
	.success(function (res) {
		if (!res.success) {
			$rootScope.clickToOpen(res.errMsg);
			return false;
		}else{
			$scope.Instances = res.body;
		}
	}).error(function(res){
		$rootScope.clickToOpen("错误");
	}) 
	$scope.passAudit = function(id){
		$http.jsonp(ENV.domain+'performance/performanceInstance/write/passAudit.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId+"&pfinId="+id)
		.success(function (res) {
			if (!res.success) {
				$rootScope.clickToOpen(res.errMsg);
				return false;
			}else{
				$rootScope.clickToOpen("审核通过成功!");
				$state.reload();
			}
		}).error(function(res){
			$rootScope.clickToOpen("错误");
		}) 
	}
	$scope.notPassAudit = function(id){
		$http.jsonp(ENV.domain+'performance/performanceInstance/write/notPassAudit.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId+"&pfinId="+id)
		.success(function (res) {
			if (!res.success) {
				$rootScope.clickToOpen(res.errMsg);
				return false;
			}else{
				$rootScope.clickToOpen("驳回成功!");
				$state.reload();
			}
		}).error(function(res){
			$rootScope.clickToOpen("错误");
		}) 
	}
})

.controller('templateDetailCtrl', function($scope,Templates,$stateParams,$http,ENV,Session,$rootScope,$location) {
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
.controller('reportCtrl', function($scope,Templates,$rootScope) {
	Templates.all().success(function (res) {
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
.controller('reportDetailCtrl', function($scope,$stateParams,$http,ENV,Session,$rootScope) {
	$http.jsonp( ENV.domain + "performance/reportForms/query/findByPerformanceTemplateId.do?callback=JSON_CALLBACK&sessionId="+Session.newSessionId+"&pfmcId="+$stateParams.templateId)
	.success(function(res){
		if (!res.success) {
			$rootScope.clickToOpen(res.errMsg);
			return false;
		}else{
			$scope.reportForms = res.body;
		}
	}).error(function(res){
		$rootScope.clickToOpen("错误");
	}) 
	$scope.scoreOptions = [
	{ name: '3.75', value: '1' }, 
	{ name: '3.5', value: '2' }, 
	{ name: '3.25', value: '3' }
	];

	$scope.conceptScoreOptions = [
	{ name: 'A', value: '1' }, 
	{ name: 'B', value: '2' }, 
	{ name: 'C', value: '3' }
	];
	//$scope.form = {conceptScore : $scope.conceptScoreOptions[0].value,score : $scope.scoreOptions[0].value};

	$scope.update = function(form){
		$http.jsonp( ENV.domain + "performance/performanceInstance/write/updatePerformanceInstance.do?callback=JSON_CALLBACK&sessionId="+Session.newSessionId+"&score="+form.score +"&conceptScore="+ form.conceptScore +"&pfinId="+form.pfmcInstanceId)
		.success(function(res){
			if (!res.success) {
				$rootScope.clickToOpen(res.errMsg);
				return false;
			}else{
				$rootScope.clickToOpen("评分成功!");
				$state.reload();
			}
		}).error(function(res){
			$rootScope.clickToOpen("错误");
		}) 
	}
})