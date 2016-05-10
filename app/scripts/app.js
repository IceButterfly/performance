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
  $urlRouterProvider.when('/dashboard', '/dashboard/templateManagement');
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
  .state('templateManagement', {
    url: '/templateManagement',
    parent: 'dashboard',
    templateUrl: 'views/dashboard/templateManagement.html',
    controller: 'templateManagementCtrl'
  })
  .state('templateManagementDetail', {
    url: '/templateManagement/:templateId',
    parent: 'dashboard',
    templateUrl: 'views/dashboard/templateManagementDetail.html',
    controller: 'templateManagementDetailCtrl'
  })
  .state('reports', {
    url: '/reports',
    parent: 'dashboard',
    templateUrl: 'views/dashboard/reports.html'
  });
});
