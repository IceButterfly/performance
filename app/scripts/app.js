'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
 angular
 .module('yapp', [
  'ui.router',
  'ngAnimate','yapp.services'
  ])
 .config(function($stateProvider, $urlRouterProvider) {
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
  .state('achievementManagement', {
    url: '/achievementManagement',
    parent: 'dashboard',
    templateUrl: 'views/dashboard/achievementManagement.html',
    controller: 'achievementManagementCtrl'
  })
  .state('achievementDetail', {
    url: '/achievementManagement/:achievementId',
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
  .state('reports', {
    url: '/reports',
    parent: 'dashboard',
    templateUrl: 'views/dashboard/reports.html'
  });
});
