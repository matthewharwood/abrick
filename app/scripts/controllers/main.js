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

    //inits the changes it on state change
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      $scope.currentState = $scope.contentList[$state.current.name];
    });
  });
