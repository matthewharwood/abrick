'use strict;'

angular.module('abrickApp')
  .factory('AnnYang', function () {

    var AnnYang = {};
    AnnYang.contentList = {
      'main': {
        'masthead': 'let\'s create a <span>key</span> for your <span>new object</span>'
      },
      'main.add':{
        'masthead': 'What would you like to <span>name it?</span>'
      }
    };
    AnnYang.setCommands = function(){

      return function(callback){

      }

    };
    AnnYang.commands = {
      'name me *val': function(val) { $scope.myName = 'my name is '+ val; $scope.$apply(); }
    };

    return AnnYang;


  });
