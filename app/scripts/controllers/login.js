'use strict';
angular.module('yapp')
.controller('LoginCtrl', function($scope, $location,$http,ENV,md5,Session,ngDialog){
	Session.destroy();
	function toLogin(credentials){		
		$http.jsonp('http://login.redlion56.com/gwlogin/user/login.do?callback=JSON_CALLBACK&account='+credentials.username+"&passwd="+credentials.password+"&roleRefer="+credentials.roleRefer)
		.success(function (res) {			
			if (!res.body) {
				$scope.clickToOpen(res.errMsg);
				return false;
			}else{
				Session.create(
					res.body.userId,
					res.body.email,
					res.body.organizationType,
					res.body.userOrganizationList,
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
			roleRefer: 4
		};
		toLogin(User);
	};
})