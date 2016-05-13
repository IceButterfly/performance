'use strict';
angular.module('yapp.services', [])
.factory('Achievements',function() {
  var Achievements = [{
    id: 0,
    name: '绩效1'
  },
  {
    id: 1,
    name: '绩效2'
  },
  {
    id: 2,
    name: '绩效3'
  }];
  return {
    all: function() {
      return Achievements;
    },
    get: function(achievementId) {
      for (var i = 0; i < Achievements.length; i++) {
        if (Achievements[i].id === parseInt(achievementId)) {
          return Achievements[i];
        }
      }
      return null;
    },
    new: function() {
      var Alength = Achievements.length;
      var achievement = {
        id: Alength + 1,
        name: '模板' + (Alength + 1)
      };
      Achievements.push(achievement);
    }
  }
})
.factory('Templates',function() {
  var Templates = [{
    id: 0,
    name: '模板1'
  },
  {
    id: 1,
    name: '模板2'
  },
  {
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
    },
    new: function() {
      var Tlength = Templates.length;
      var template = {
        id: Tlength + 1,
        name: '模板' + (Tlength + 1)
      };
      Templates.push(template);
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