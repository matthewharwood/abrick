'use strict';

/**
 * @ngdoc function
 * @name abrickApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the abrickApp
 */
angular.module('abrickApp')

  .controller('MainCtrl', function ($scope,  $state) {


    $scope.contentList =
    {
      'main': {
        'masthead': 'let\'s create a <span>key</span> for your <span>new object</span>'
      },
      'main.add':{
        'masthead': 'What would you like to <span>name it?</span>'

      }
    };
    var addNewObject = function(val){
      console.log(val);
    };
    if (annyang) {
      // Let's define a command.
      var commands = {
        'name me *val': function(val) { $scope.myName = 'my name is '+ val; $scope.$apply(); }
      };

      // Add our commands to annyang
      annyang.addCommands(commands);

      // Start listening.
      annyang.start();
    }
    //inits the changes it on state change
    //event, toState, toParams, fromState, fromParams
    $scope.$on('$stateChangeSuccess', function(){
      $scope.stateName = $state.current.name;
      $scope.currentState = $scope.contentList[$scope.stateName];
      
    });
  });
