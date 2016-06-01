'use strict';
angular.module('yapp')
.controller('LoginCtrl', function($scope, $location,$http,ENV,md5,Session,ngDialog){
	Session.destroy();
	function toLogin(credentials){		
		$http.jsonp(ENV.domain+'gwlogin/user/login.do?callback=JSON_CALLBACK&account='+credentials.username+"&passwd="+credentials.password+"&roleRefer="+credentials.roleRefer)
		.success(function (res) {			
			if (!res.body) {
				$scope.clickToOpen(res.errMsg);
				return false;
			}else{
				Session.create(
					res.body.userId,
					res.body.email,
					res.body.organizationType,
					res.body.userOrganizationList[0].roleType,
					res.body.userOrganizationList[0].roleTypeText,
					res.newSessionId
					);
				$scope.clickToOpen('登陆成功！')
				$location.path('/dashboard');
			}
		}).error(function(res){
			alert("错误");
		})
	};
	$scope.clickToOpen = function (msg) {
		ngDialog.open({ template: '<div class="msgDiv"><span>'+msg+'</span></div>', className: 'ngdialog-theme-default', plain: true});
	};	
	$scope.login = function (user) {
		var User = {
			username: user.userName,
			password: md5.createHash(user.passWord),
			roleRefer: 9
		};
		toLogin(User);
	};

	$scope.Login = function (user) {
		var manageUser = {
			username: user.userName,
			password: md5.createHash(user.passWord),
			roleRefer: 8
		};
		toLogin(manageUser);
	};

})