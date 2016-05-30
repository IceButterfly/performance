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

.factory('Grades',function(){
  var Grades = [{
    id:0,
    name:'刘芒',
    gradeList:[{
      id:0,
      name:'绩效1'
    },{
     id:1,
     name:'绩效2'
   }]
 },{
  id:1,
  name:'浮尘',
  gradeList:[{
   id:3,
   name:'绩效3'
 },{
   id:4,
   name:'绩效4'
 }]
}];
return {
  all: function() {
    return Grades;
  },
  get: function(gradeId) {
    for (var i = 0; i < Grades.length; i++) {
      for (var j = 0; j < Grades[i].gradeList.length; j++) {
        if (Grades[i].gradeList[j].id === parseInt(gradeId)) {
          return Grades[i].gradeList[j];
        }
      }
    }
    return null;
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