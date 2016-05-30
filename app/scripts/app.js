'use strict';

angular
.module('yapp', [
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
    .state('achievementList', {
      url: '/achievementManagement/:templateId',
      parent: 'dashboard',
      templateUrl: 'views/dashboard/achievementList.html',
      controller: 'achievementListCtrl'
    })
    .state('achievementManagement', {
      url: '/achievementManagement',
      parent: 'dashboard',
      templateUrl: 'views/dashboard/achievementManagement.html',
      controller: 'achievementManagementCtrl'
    })
    .state('achievementDetail', {
      url: '/achievementManagement/achievementList/:achievementId',
      parent: 'dashboard',
      templateUrl: 'views/dashboard/achievementDetail.html',
      controller: 'achievementDetailCtrl'
    })
    .state('templateManagement', {
      url: '/templateManagement',
      parent: 'dashboard',
      templateUrl: 'views/dashboard/templateManagement.html',
      controller: 'templateManagementCtrl'
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
    });
  })
  .run(function ($rootScope, $location,Session) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
        if (!Session.userId) {
          $location.path('/login'); 
        } 
    })
  })

