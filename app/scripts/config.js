"use strict";
 angular.module("yapp.config", [])
.constant("ENV", {
  "version": "1",
  "name": "绩效系统",
  "debug": false,
  "domain": "http://192.168.158.204:8080/",
  "api": "/api/v1"
})
