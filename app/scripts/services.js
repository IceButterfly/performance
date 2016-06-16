'use strict';
angular.module('yapp.services', [])
.factory('Achievements',function($http,ENV,Session) {
	return {
		all: function(pfinId) {
			return $http.jsonp(ENV.domain+'performance/performanceInstance/query/findById.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId +'&pfinId='+pfinId)
		}
	}
})

.factory('Templates',function($http,ENV,Session) {
	return {
		getInstance:function(id){
			return $http.jsonp(ENV.domain+'performance/performanceInstance/query/findAllPfin.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId)
		},
		Simpleall: function() {
			return $http.jsonp(ENV.domain+'performance/performanceTemplate/query/findSimplePerformanceTemplateList.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId)
		},
		all: function() {
			return $http.jsonp(ENV.domain+'performance/performanceTemplate/query/findPerformanceTemplateList.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId)
		},
		delete:function(id){
			return $http.jsonp(ENV.domain+'performance/performanceTemplate/write/deletePerformanceTemplateById.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId + "&pfmcId=" + id)
		},
		create:function(id){
			return $http.jsonp(ENV.domain+'performance/performanceTemplate/write/createInstance.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId + "&pfmcId=" + id)
		},
		startGrade:function(id){
			return $http.jsonp(ENV.domain+'performance/performanceTemplate/write/startGrade.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId + "&pfmcId=" + id)  
		},
		overGrade:function(id){
			return $http.jsonp(ENV.domain+'performance/performanceTemplate/write/overGrade.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId + "&pfmcId=" + id)  
		},
		endPerformance:function(id){
			return $http.jsonp(ENV.domain+'performance/performanceTemplate/write/endPerformance.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId + "&pfmcId=" + id)  
		}
	}
})

.factory('Grades',function($http,ENV,Session){
	return {
		getSelf: function() {
			return $http.jsonp(ENV.domain+'performance/task/query/findSelfList.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId)
		},
		all: function() {
			return $http.jsonp(ENV.domain+'performance/task/query/findList.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId)
		},
		get:function(id){
			return $http.jsonp(ENV.domain+'/performance/task/query/findById.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId+"&taskId="+id)			
		},
		find:function(id){
			return $http.jsonp(ENV.domain+'performance/score/query/findByTaskIdAndCustomerId.do?callback=JSON_CALLBACK&sessionId='+Session.newSessionId+"&taskId="+id)
		}
	}
})

.service('Session', function () {
	this.create = function (userId, email, organizationType,roleType,roleTypeText,newSessionId) {
		this.userId = userId;
		this.email = email;
		this.organizationType = organizationType;
		this.roleType = roleType;
		this.roleTypeText = roleTypeText;
		this.newSessionId = newSessionId;   
	};
	this.destroy = function () {
		this.userId = null;
		this.email = null;
		this.organizationType = null;
		this.email = null;
		this.organizationType = null;
		this.newSessionId = null;   
	};
	return this;
})