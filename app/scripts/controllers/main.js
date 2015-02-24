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
    //event, toState, toParams, fromState, fromParams
    $scope.$on('$stateChangeSuccess', function(){
      $scope.stateName = $state.current.name;
      $scope.currentState = $scope.contentList[$scope.stateName];
      
    });
  });
