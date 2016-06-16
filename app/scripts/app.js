'use strict';
angular.module('yapp', [
	'ui.router',
	'ngAnimate',
	'yapp.services',
	'angular-datepicker',
	'yapp.config',
	'angucomplete',
	'angular-md5',
	'ngDialog'
	]).config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.when('/dashboard', '/dashboard/achievementManagement');
		$urlRouterProvider.otherwise('/login');

		$stateProvider
		.state('base', {
			abstract: true,
			url: '',
			templateUrl: 'views/base.html'
		})
		.state('login', {
			url: '/login',
			parent: 'base',
			templateUrl: 'views/login.html',
			controller: 'LoginCtrl'
		})
		.state('dashboard', {
			url: '/dashboard',
			parent: 'base',
			templateUrl: 'views/dashboard.html',
			controller: 'DashboardCtrl'
		})
		.state('instanceList', {
			url: '/achievementManagement/:instanceId',
			parent: 'dashboard',
			templateUrl: 'views/dashboard/instanceList.html',
			controller: 'instanceListCtrl'
		})
		.state('instanceList.achievementDetail', {
			url: '/achievementManagement/:instanceId/:taskId',
			parent: 'dashboard',
			templateUrl: 'views/dashboard/achievementDetail.html',
			controller: 'achievementDetailCtrl'
		})
		.state('achievementManagement', {
			url: '/achievementManagement',
			parent: 'dashboard',
			templateUrl: 'views/dashboard/achievementManagement.html',
			controller: 'achievementManagementCtrl'
		})
		.state('templateManagement', {
			url: '/templateManagement',
			parent: 'dashboard',
			templateUrl: 'views/dashboard/templateManagement.html',
			controller: 'templateManagementCtrl'
		})
		.state('checkManagement', {
			url: '/checkManagement/:templateId',
			parent: 'dashboard',
			templateUrl: 'views/dashboard/checkManagement.html',
			controller: 'checkManagementCtrl'
		})
		.state('checkManagement.checkDetailManagement', {
			url: '/checkManagement/:templateId/:instanceId',
			parent: 'dashboard',
			templateUrl: 'views/dashboard/checkDetailManagement.html',
			controller: 'checkDetailManagementCtrl'
		})
		.state('checkManagement.checkDetailManagement.checkDetail', {
			url: '/checkManagement/:templateId/:instanceId/:taskId',
			parent: 'dashboard',
			templateUrl: 'views/dashboard/checkDetail.html',
			controller: 'checkDetailCtrl'
		})
		.state('templateDetail', {
			url: '/templateManagement/:templateId',
			parent: 'dashboard',
			templateUrl: 'views/dashboard/templateDetail.html',
			controller: 'templateDetailCtrl'
		})
		.state('gradeManagement', {
			url: '/gradeManagement',
			parent: 'dashboard',
			templateUrl: 'views/dashboard/gradeManagement.html',
			controller: 'gradeManagementCtrl'
		})
		.state('gradeDetail', {
			url: '/gradeManagement/:gradeId',
			parent: 'dashboard',
			templateUrl: 'views/dashboard/gradeDetail.html',
			controller: 'gradeDetailCtrl'
		})
		.state('report', {
			url: '/report',
			parent: 'dashboard',
			templateUrl: 'views/dashboard/report.html',
			controller: 'reportCtrl'
		})
		.state('report.reportDetail', {
			url: '/report/:templateId',
			parent: 'dashboard',
			templateUrl: 'views/dashboard/reportDetail.html',
			controller: 'reportDetailCtrl'
		});
	})
	.run(function ($rootScope, $location,Session) {
		$rootScope.$on('$stateChangeStart', function (event, next) {
			if (!Session.userId) {
				$location.path('/login'); 
			} 
		})
	})

