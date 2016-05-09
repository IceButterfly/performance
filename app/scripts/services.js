  'use strict';
  angular.module('yapp.services', [])
  .factory('Templates', function() {
  	var Templates = [{
  		id: 0,
  		name: '模板1'
  	}, {
  		id: 1,
  		name: '模板2'
  	}, {
  		id: 2,
  		name: '模板3'
  	}];
  	return {
  		all: function() {
  			return Templates;
  		},
  		get: function(templateId) {
  			for (var i = 0; i < Templates.length; i++) {
  				if (Templates[i].id === parseInt(templateId)) {
  					return Templates[i];
  				}
  			}
  			return null;
  		}
  	}
  })