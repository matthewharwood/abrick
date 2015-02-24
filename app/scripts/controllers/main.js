'use strict';

/**
 * @ngdoc function
 * @name abrickApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the abrickApp
 */
angular.module('abrickApp')

  .controller('MainCtrl', function ($scope,  $state, AnnYang, Speech) {
  var msg = undefined;
  var name = undefined;
    $scope.contentList = AnnYang.contentList;
    var addNewObject = function(val){
      console.log(val);
    };

    if (annyang) {
      // Let's define a command.
      var commands = {
        'hello': function(val){
          var message = typeof name == "undefined" ? Speech.speak("hello"): Speech.speak("hello, I'm " + name);
          if (!name){
            Speech.speak("What is my name?");
          }
        },
        'let\'s name you *val': function(val) {
          name = val;
          msg = "Ok, my name is " + name;
          var q = "What gender am I?";
          //var message = Speech.setMsg(msg);
          Speech.speak(msg);
          Speech.speak(q);
        },
        'your gender is *val': function(val){
          Speech.setCurrentParams(val);
          msg = Speech.speak('Ok good, I\'m now a ' + val);
          Speech.speak(msg);
        }
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
